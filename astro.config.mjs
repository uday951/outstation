// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { legacyRedirects } from './src/data/redirects.mjs';

// On Render, a deploy uses its own onrender.com address (and stays noindex, see Base.astro)
// until SITE_URL is set to https://bestambulance.in at cutover.
const site = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://bestambulance.in';

// Legal pages awaiting business review are noindex, so they stay out of the sitemap too.
const draftLegal = ['/refund-policy', '/cancellation-policy', '/terms', '/privacy-policy', '/disclaimer', '/service-delivery-policy', '/request-received', '/request-not-sent', '/pay', '/pay/status'];

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'directory' },
  adapter: node({ mode: 'standalone' }),
  redirects: legacyRedirects,
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !draftLegal.includes(path) && !Object.keys(legacyRedirects).includes(path);
      },
    }),
  ],
  // The enquiry endpoint does its own origin check, which also works behind a reverse proxy.
  security: { checkOrigin: false },
  image: { responsiveStyles: false },
});
