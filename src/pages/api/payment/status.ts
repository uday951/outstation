import type { APIRoute } from 'astro';
import { rateLimited } from '../../../lib/guard';
import { ORDER_ID_PATTERN } from '../../../lib/payment';
import { cashfreeConfig, getOrder, notifyPaid } from '../../../lib/cashfree';

export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Asks Cashfree directly. The browser's return to this site proves nothing about payment.
// Returns only status and amount, never customer details, and only for this site's order format.
export const GET: APIRoute = async ({ request, clientAddress, url }) => {
  if (rateLimited(request, () => clientAddress, 'pay-status', 30)) return json(429, { ok: false, code: 'rate_limited' });

  const orderId = url.searchParams.get('order_id') ?? '';
  if (!ORDER_ID_PATTERN.test(orderId)) return json(400, { ok: false, code: 'bad_request' });

  const config = cashfreeConfig();
  if (!config) return json(503, { ok: false, code: 'not_configured' });

  try {
    const order = await getOrder(config, orderId);
    if (!order) return json(404, { ok: false, code: 'not_found' });
    if (order.status === 'PAID') await notifyPaid(orderId, order);
    return json(200, { ok: true, orderId, status: order.status, amount: order.amount });
  } catch (e) {
    console.error(`[payment] status check failed for ${orderId}:`, e instanceof Error ? e.message : e);
    return json(502, { ok: false, code: 'gateway_error' });
  }
};
