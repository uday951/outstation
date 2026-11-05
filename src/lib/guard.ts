// Request checks shared by the server endpoints.

const WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();

/** True once a client exceeds `max` requests in the window, counted per bucket. In memory, per server instance. */
export function rateLimited(request: Request, clientAddress: () => string, bucket: string, max = 8) {
  let ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!ip) {
    try { ip = clientAddress(); } catch { ip = 'unknown'; }
  }
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

/** Rejects posts from other sites. Also works behind a reverse proxy. Requests with no Origin header pass. */
export function originAllowed(request: Request, url: URL, site?: URL) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const allowed = [url.host, site?.host, request.headers.get('host'), request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()];
  try {
    return allowed.includes(new URL(origin).host);
  } catch {
    return false;
  }
}
