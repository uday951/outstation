import type { APIRoute } from 'astro';
import { originAllowed, rateLimited } from '../../../lib/guard';
import { validatePayment } from '../../../lib/payment';
import { cashfreeConfig, createOrder, makeOrderId } from '../../../lib/cashfree';
import type { Fields } from '../../../lib/enquiry';

export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const POST: APIRoute = async ({ request, clientAddress, url, site }) => {
  if (!originAllowed(request, url, site)) return json(403, { ok: false, code: 'forbidden' });
  if (rateLimited(request, () => clientAddress, 'pay')) return json(429, { ok: false, code: 'rate_limited' });

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json(400, { ok: false, code: 'bad_request' });
  }
  const fields: Fields = {};
  for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') fields[k] = v.trim().slice(0, 200);

  const errors = validatePayment(fields);
  if (Object.keys(errors).length) return json(422, { ok: false, code: 'invalid', errors });

  const config = cashfreeConfig();
  if (!config) {
    console.error('[payment] Cashfree keys are not configured');
    return json(503, { ok: false, code: 'not_configured' });
  }

  const orderId = makeOrderId();
  try {
    const paymentSessionId = await createOrder(config, {
      orderId,
      amount: Number(fields.amount),
      name: fields.name,
      phone: fields.phone,
      email: fields.email || undefined,
      reference: fields.reference || undefined,
      site: (site?.href ?? url.origin).replace(/\/$/, ''),
    });
    return json(200, { ok: true, orderId, paymentSessionId, mode: config.mode });
  } catch (e) {
    console.error(`[payment] could not create ${orderId}:`, e instanceof Error ? e.message : e);
    return json(502, { ok: false, code: 'gateway_error' });
  }
};

export const ALL: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
