// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Repo is `jamesli124.github.io`, a GitHub *user* site, so it is served from
// the domain root. That means no `base` path — internal links can all be
// absolute (`/cv`, `/apps/...`) without rewriting.
export default defineConfig({
  site: 'https://jamesli124.github.io',
  integrations: [sitemap()],
});
