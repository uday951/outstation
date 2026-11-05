import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? '').replace(/\/$/, '');
  const body = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /request-received\nDisallow: /request-not-sent\n\nSitemap: ${base}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
