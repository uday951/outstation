// Server-only. The client secret must never reach browser code.
// Docs: https://www.cashfree.com/docs/api-reference/payments/latest/orders/create
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { deliver } from './deliver';
import { tenDigitPhone } from './payment';

const API_VERSION = '2026-01-01';
const BASE = { sandbox: 'https://sandbox.cashfree.com/pg', production: 'https://api.cashfree.com/pg' };

export type Mode = keyof typeof BASE;

/** Live mode must be switched on deliberately. Anything else stays in sandbox. */
export function cashfreeConfig(env: Record<string, string | undefined> = process.env) {
  if (!env.CASHFREE_CLIENT_ID || !env.CASHFREE_CLIENT_SECRET) return null;
  const mode: Mode = env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
  return {
    mode,
    baseUrl: env.CASHFREE_API_URL || BASE[mode], // the override exists for automated tests
    clientId: env.CASHFREE_CLIENT_ID,
    clientSecret: env.CASHFREE_CLIENT_SECRET,
  };
}
type Config = NonNullable<ReturnType<typeof cashfreeConfig>>;

function headers(c: Config) {
  return {
    'Content-Type': 'application/json',
    'x-api-version': API_VERSION,
    'x-client-id': c.clientId,
    'x-client-secret': c.clientSecret,
  };
}

export function makeOrderId(now = new Date()) {
  const d = new Date(now.getTime() + 5.5 * 3600_000).toISOString().slice(2, 10).replace(/-/g, '');
  return `BA-PAY-${d}-${randomBytes(5).toString('hex').toUpperCase()}`;
}

export interface NewOrder { orderId: string; amount: number; name: string; phone: string; email?: string; reference?: string; site: string; }

export async function createOrder(c: Config, o: NewOrder) {
  const returnUrl = `${o.site}/pay/status?order_id=${o.orderId}`;
  const notifyUrl = `${o.site}/api/payment/webhook`;
  const phone = tenDigitPhone(o.phone);
  const res = await fetch(`${c.baseUrl}/orders`, {
    method: 'POST',
    headers: headers(c),
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      order_id: o.orderId,
      order_amount: o.amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust${phone}`,
        customer_phone: phone,
        customer_name: o.name,
        ...(o.email ? { customer_email: o.email } : {}),
      },
      order_meta: {
        return_url: returnUrl,
        ...(notifyUrl.startsWith('https://') ? { notify_url: notifyUrl } : {}),
      },
      ...(o.reference ? { order_tags: { booking_reference: o.reference } } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Cashfree create order responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  if (!data.payment_session_id) throw new Error('Cashfree response had no payment_session_id');
  return data.payment_session_id as string;
}

export interface OrderInfo { status: string; amount: number; name?: string; phone?: string; email?: string; reference?: string; }

/** Null means Cashfree has no such order. */
export async function getOrder(c: Config, orderId: string): Promise<OrderInfo | null> {
  const res = await fetch(`${c.baseUrl}/orders/${encodeURIComponent(orderId)}`, { headers: headers(c), signal: AbortSignal.timeout(15000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Cashfree get order responded ${res.status}`);
  const d = await res.json();
  return {
    status: d.order_status,
    amount: d.order_amount,
    name: d.customer_details?.customer_name,
    phone: d.customer_details?.customer_phone,
    email: d.customer_details?.customer_email,
    reference: d.order_tags?.booking_reference,
  };
}

/** Signature is Base64(HMAC-SHA256(timestamp + raw body, client secret)), per Cashfree's code samples. */
export function webhookSignatureValid(c: Config, rawBody: string, timestamp: string | null, signature: string | null) {
  if (!timestamp || !signature) return false;
  const expected = createHmac('sha256', c.clientSecret).update(timestamp + rawBody).digest();
  const given = Buffer.from(signature, 'base64');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// The webhook and the status page can both report the same payment, and Cashfree may retry.
// This stops repeat notices from one server. After a restart a repeat is possible but harmless.
const notified = new Set<string>();

/**
 * Tells the business a payment succeeded. Returns false only if a configured channel failed,
 * so the webhook can ask Cashfree to retry.
 */
export async function notifyPaid(orderId: string, info: OrderInfo) {
  if (notified.has(orderId)) return true;
  notified.add(orderId);
  const result = await deliver('payment', {
    name: info.name ?? 'Unknown',
    phone: info.phone ?? '',
    email: info.email ?? '',
    amount: `INR ${info.amount}`,
    reference: info.reference ?? '',
    orderId,
  }, orderId);
  if (result.configured && !result.delivered) {
    notified.delete(orderId);
    console.error(`[payment] PAID ${orderId} but the notice failed`, result.failures);
    return false;
  }
  if (!result.configured) console.warn(`[payment] PAID ${orderId}, but no delivery channel is configured`);
  return true;
}
