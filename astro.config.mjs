// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Old addresses from earlier versions of the site. GitHub Pages can't do
// server-side redirects, so Astro builds each of these as a small page that
// forwards instantly (meta refresh + canonical link).
const wordpressPosts = [
  '2023-01-23-does-the-first-impression-rose-matter-statistically',
  '2023-01-30-the-best-dancers-in-french-electro-2022',
  '2023-03-25-second-thoughts-on-second-brains',
  '2023-04-16-chat-gpt-is-not-your-coding-coach',
  '2024-07-16-carefree-data-viz-with-chatgpt',
  '2025-05-27-ux-lessons-from-redesigning-a-web-platform',
  '2026-01-28-why-i-stopped-using-journal-apps',
  '2026-03-09-3-web-redesign-projects-for-a-marine-science-institute',
];
const redirects = {
  // WordPress permalinks: /YYYY/MM/DD/slug/ -> /blog/YYYY-MM-DD-slug/
  ...Object.fromEntries(wordpressPosts.map((id) => {
    const [y, m, d] = id.split('-');
    return [`/${y}/${m}/${d}/${id.slice(11)}`, `/blog/${id}/`];
  })),
  '/2026/05/10/my-favorite-thing-ive-vibe-coded': '/blog/2026-05-10-vibe-coded-workout-app-claude-code/',
  '/blog/2026-05-10-my-favorite-thing-ive-vibe-coded': '/blog/2026-05-10-vibe-coded-workout-app-claude-code/',
  '/blog-posts': '/blog/',
  // Old journalism pages -> About, which covers that work.
  '/archives': '/about/',
  '/virginia-gazette': '/about/',
  '/austin-monitor': '/about/',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://jwcaterine.com',
  redirects,
  integrations: [mdx(), sitemap()],
});
