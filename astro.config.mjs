// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://superdoge1.github.io',
  base: '/vibe-coding',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
