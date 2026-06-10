# Blog authoring: rough draft → published

The whole lifecycle of a post lives in one folder under `src/content/blog/`. There's no separate drafts directory, no CMS — drafts and published posts are the same files, distinguished only by the `draft` flag in frontmatter.

## 1. Start a new draft

Pick a slug (this becomes the URL: `/blog/<slug>`). Keep it short and stable — renaming later breaks any links you've shared.

```bash
mkdir src/content/blog/my-new-post
$EDITOR src/content/blog/my-new-post/index.mdx
```

Paste this frontmatter template into the new file:

```mdx
---
title: My New Post
date: 2026-05-12
description: One sentence that shows up in listings and link previews.
draft: true
---

Start writing here. No `# Title` line — the template renders the title from frontmatter.
```

That's enough to render. Drop in any rough text — outline, notes, whatever — it's not going anywhere public while `draft: true`.

## 2. Preview as you write

```bash
npm run dev
```

Visit `http://localhost:4321/blog/my-new-post`. The page hot-reloads on save. Drafts don't appear in the `/blog` listing, but the direct URL works (handy for sharing a preview link with someone before publishing).

## 3. Add images

Save images into the post's folder, next to `index.mdx`:

```
src/content/blog/my-new-post/
  ├── index.mdx
  ├── cover.jpg
  └── notebook.jpg
```

Three patterns, pick whichever fits:

**Plain markdown** — for the common case of a centered image between paragraphs. Astro optimizes it automatically.

```mdx
![A page of handwritten workout logs.](./notebook.jpg)
```

**`<Figure>` component** — when you want a caption, a float-with-text-wrap, or a specific width. Add the import once near the top of the post:

```mdx
import Figure from '../../../components/Figure.astro';
import notebook from './notebook.jpg';

<Figure src={notebook} alt="A page of handwritten workout logs." caption="Pre-app tracking." />

<Figure src={notebook} alt="Detail." float="right" width={240} />
```

Props: `src` (the imported image), `alt` (required), `caption` (optional), `float` (`"left"` | `"right"`, optional), `width` (pixels, optional, only meaningful when floating). Floats collapse to centered on viewports under 540px.

**Hero image** — for a banner at the top of the post. Set it in frontmatter; the template renders it above the body. If you set `hero`, you must also set `heroAlt` (the schema rejects the post otherwise).

```yaml
hero: ./cover.jpg
heroAlt: A wave breaking at dusk.
```

## 4. Polish

Things worth checking before flipping the draft flag:

- The `description` reads well on its own — it's what shows up in the listing and in any social-card preview.
- Every image has alt text. Plain `![]()` images need it in the brackets; `<Figure>` requires it as a prop.
- Internal links use site-relative paths (`/about`, `/blog/other-post`), not full URLs.
- `npm run build` succeeds. The build is the source-of-truth check for the schema (typos in frontmatter, missing `heroAlt`, etc.) — if it builds, the post is structurally sound.

## 5. Publish

Open `index.mdx`, change `draft: true` to `draft: false`, save. The post is now in the listing in `npm run dev`.

```bash
git add src/content/blog/my-new-post
git commit -m "publish: my new post"
git push
```

> **Heads up:** there's no auto-deploy wired up yet. Pushing to the repo doesn't update jwcaterine.com on its own — that step still needs `npm run build` plus a manual upload of `./dist/` until hosting is set up. Setting up Cloudflare Pages / Netlify on push is a planned follow-up.

## Quick reference

| Task                       | What to do                                                  |
| -------------------------- | ----------------------------------------------------------- |
| Start a draft              | `mkdir src/content/blog/<slug>` → create `index.mdx`        |
| Preview                    | `npm run dev` → `/blog/<slug>`                              |
| Share a draft preview      | Just send the localhost URL while `npm run dev` is running  |
| Inline centered image      | `![alt](./image.jpg)` in markdown                           |
| Caption / float / sized    | `<Figure src={…} alt="…" caption="…" float="right" />`      |
| Hero image                 | `hero: ./cover.jpg` + `heroAlt: "…"` in frontmatter         |
| Publish                    | `draft: false` → commit → push (then manual build/upload)   |
| Unpublish                  | Set `draft: true` and push (will hide once deploy is wired) |

## Where things live

- `src/content/blog/<slug>/index.mdx` — your post
- `src/content/blog/<slug>/*.{png,jpg,jpeg,webp}` — its images
- `src/content.config.ts` — schema (what frontmatter fields are allowed/required)
- `src/components/Figure.astro` — the figure component
- `src/pages/blog/[id].astro` — the post template (renders title, date, optional hero, body)
- `src/styles/global.css` — prose, figure, float styles
