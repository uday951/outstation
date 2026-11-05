import type { APIRoute } from 'astro';
import { ORDER_ID_PATTERN } from '../../../lib/payment';
import { cashfreeConfig, notifyPaid, webhookSignatureValid } from '../../../lib/cashfree';

export const prerender = false;

// Called by Cashfree, so a payment is recorded even if the customer closes the tab.
export const POST: APIRoute = async ({ request }) => {
  const config = cashfreeConfig();
  if (!config) return new Response('Not configured', { status: 503 });

  // The signature covers the exact bytes, so verify before parsing.
  const raw = await request.text();
  const valid = webhookSignatureValid(config, raw, request.headers.get('x-webhook-timestamp'), request.headers.get('x-webhook-signature'));
  if (!valid) {
    console.warn('[payment] rejected a webhook with an invalid signature');
    return new Response('Invalid signature', { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const orderId: string = event?.data?.order?.order_id ?? '';
  // Other events, and orders not made by this site, are acknowledged and ignored.
  if (event?.type !== 'PAYMENT_SUCCESS_WEBHOOK' || event?.data?.payment?.payment_status !== 'SUCCESS' || !ORDER_ID_PATTERN.test(orderId)) {
    return new Response('Ignored', { status: 200 });
  }

  const c = event.data.customer_details ?? {};
  const sent = await notifyPaid(orderId, {
    status: 'PAID',
    amount: event.data.order.order_amount,
    name: c.customer_name,
    phone: c.customer_phone,
    email: c.customer_email,
    reference: event.data.order.order_tags?.booking_reference,
  });
  // A non-2xx reply makes Cashfree retry later.
  return sent ? new Response('OK', { status: 200 }) : new Response('Notice failed', { status: 500 });
};
