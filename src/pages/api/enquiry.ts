import type { APIRoute } from 'astro';
import { validate, type Fields, type FormType } from '../../lib/enquiry';
import { deliver } from '../../lib/deliver';
import { originAllowed, rateLimited } from '../../lib/guard';

export const prerender = false;

const FORM_TYPES: FormType[] = ['booking', 'callback', 'contact'];
function makeReference() {
  const d = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(2, 10).replace(/-/g, '');
  const r = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `BA-${d}-${r}`;
}

export const POST: APIRoute = async ({ request, clientAddress, redirect, url, site }) => {
  const contentType = request.headers.get('content-type') ?? '';
  const wantsJson = contentType.includes('application/json');

  const respond = (status: number, body: Record<string, unknown>) => {
    if (wantsJson) return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
    // Browsers without JavaScript post the form directly, so send them to a real result page.
    return redirect(body.ok ? `/request-received?ref=${encodeURIComponent(String(body.reference ?? ''))}` : '/request-not-sent', 303);
  };

  // Reject posts from other sites.
  if (!originAllowed(request, url, site)) return respond(403, { ok: false, code: 'forbidden' });

  let raw: Record<string, unknown>;
  try {
    raw = wantsJson ? await request.json() : Object.fromEntries((await request.formData()).entries());
  } catch {
    return respond(400, { ok: false, code: 'bad_request' });
  }

  const fields: Fields = {};
  for (const [k, v] of Object.entries(raw)) if (typeof v === 'string') fields[k] = v.slice(0, 2000);

  const type = fields.formType as FormType;
  if (!FORM_TYPES.includes(type)) return respond(400, { ok: false, code: 'bad_request' });

  // Spam trap: real visitors never fill this hidden field. Bots get a generic reply and nothing is sent.
  if (fields.website) return respond(200, { ok: true, reference: makeReference() });

  if (rateLimited(request, () => clientAddress, 'enquiry')) return respond(429, { ok: false, code: 'rate_limited' });

  const errors = validate(type, fields);
  if (Object.keys(errors).length) return respond(422, { ok: false, code: 'invalid', errors });

  const reference = makeReference();
  const result = await deliver(type, fields, reference);

  if (!result.delivered) {
    console.error(`[enquiry] NOT DELIVERED ${reference}`, result.configured ? result.failures : 'no delivery channel configured');
    return respond(result.configured ? 502 : 503, { ok: false, code: result.configured ? 'delivery_failed' : 'not_configured' });
  }
  if (result.failures.length) console.warn(`[enquiry] partial delivery ${reference}`, result.failures);
  return respond(200, { ok: true, reference });
};

export const ALL: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
