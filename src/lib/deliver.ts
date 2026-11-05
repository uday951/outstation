// Server-only. Sends an enquiry to the channels configured through environment variables.
// A request only counts as delivered if at least one channel really accepted it.
// Nothing here runs in the browser, and no key ever reaches client code.
import { summarise, type Fields, type FormType } from './enquiry';

export interface DeliveryResult { delivered: boolean; configured: boolean; channels: string[]; failures: string[]; }

const titles: Record<FormType | 'payment', string> = { booking: 'Transfer request', callback: 'Callback request', contact: 'Website message', payment: 'Advance payment received' };

export async function deliver(type: FormType | 'payment', fields: Fields, reference: string, env: Record<string, string | undefined> = process.env): Promise<DeliveryResult> {
  const subject = `[${reference}] ${titles[type]}: ${fields.name ?? ''}${fields.destination ? ` to ${fields.destination}` : ''}`.slice(0, 180);
  const text = `${titles[type]}  (${reference})\nReceived: ${new Date().toISOString()}\n\n${summarise(fields)}\n`;
  const jobs: Promise<string>[] = [];
  const names: string[] = [];

  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL && env.LEAD_FROM_EMAIL) {
    names.push('email');
    jobs.push(
      fetchWithTimeout(env.RESEND_API_URL || 'https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.LEAD_FROM_EMAIL, to: env.LEAD_TO_EMAIL.split(',').map((s) => s.trim()), subject, text }),
      }).then((r) => assertOk(r, 'email')),
    );
  }
  if (env.LEAD_WEBHOOK_URL) {
    names.push('webhook');
    jobs.push(
      fetchWithTimeout(env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, type, receivedAt: new Date().toISOString(), subject, text, fields }),
      }).then((r) => assertOk(r, 'webhook')),
    );
  }

  if (!jobs.length) return { delivered: false, configured: false, channels: [], failures: [] };

  const results = await Promise.allSettled(jobs);
  const channels: string[] = [];
  const failures: string[] = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') channels.push(names[i]);
    else failures.push(`${names[i]}: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`);
  });
  return { delivered: channels.length > 0, configured: true, channels, failures };
}

function fetchWithTimeout(url: string, init: RequestInit, ms = 10000) {
  return fetch(url, { ...init, signal: AbortSignal.timeout(ms) });
}

async function assertOk(r: Response, name: string) {
  if (!r.ok) throw new Error(`${name} responded ${r.status}`);
  return name;
}
