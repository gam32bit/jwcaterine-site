# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website for Joe Caterine (jwcaterine.com). Astro 6.x static site built from the minimal template — no UI framework, no test runner, no linter. Single content collection (`blog`). Hand-authored posts; do not propose script-driven publishing pipelines.

## Commands

- `npm run dev` — local dev server at `http://localhost:4321`
- `npm run build` — build static site to `./dist/` (also the source-of-truth check that the content schema and all post frontmatters are consistent)
- `npm run preview` — serve the built `./dist/` locally
- `npm run astro check` — type-check `.astro` files; run after schema or content edits

## Architecture

**Layout chain.** Every page renders inside `src/layouts/BaseLayout.astro`, which mounts `<WaveBackground />` and `<ClientRouter />` (view transitions) and provides the shared `<nav>` + `<footer>`. Routes live in `src/pages/`: `index.astro`, `about.astro`, `blog/index.astro` (listing), `blog/[id].astro` (post template via `getStaticPaths()`).

**Blog content collection** (`src/content.config.ts`). Astro v6 Content Layer API: `glob()` loader matches `**/*.{md,mdx}` under `src/content/blog/`, and `generateId` strips both `.md`/`.mdx` and a trailing `/index` so a folder post `my-post/index.mdx` and a flat post `my-post.md` both resolve to id `my-post`. Posts render in `[id].astro` (wrapped in `<article>`) via `render(post)` from `astro:content`. The blog index filters out `data.draft === true` and sorts by `data.date` desc. Schema fields: `title`, `date`, `description` (all required), `draft` (optional, default false), `hero` (optional `image()` — auto-optimized cover image), `heroAlt` (required iff `hero` is set; enforced via `.refine`).

**Blog authoring workflow.** New posts go in folder form: `src/content/blog/<slug>/index.mdx`, with images co-located in the same folder and referenced by relative path (`./cover.jpg`). The template renders the post's H1 and date from frontmatter, so posts should NOT include a `# Title` line — start the body at H2 or with prose. Three patterns for images:

- **Plain markdown** `![alt](./foo.jpg)` — centered, optimized via `astro:assets`. Use for the common case.
- **`<Figure>`** (`src/components/Figure.astro`) — for captions, floats (`float="left|right"`), and explicit widths. Requires MDX; import the component and image at the top of the post.
- **Hero** — set `hero: ./cover.jpg` + `heroAlt: "…"` in frontmatter; the template renders it above `<Content />`.

`draft: true` hides a post from the listing but it remains reachable by direct URL in `npm run dev` (useful for sharing a preview link). Flat legacy `.md` posts still work but can't reference local images.

**Wave background** (`src/components/WaveBackground.astro`). 2D canvas Gerstner-wave animation, drawn as a stack of stroked lines. Tunable knobs in order of visual impact:

- `components[]` — wave components summed per layer. The two longest wavelengths are deliberately close so their beat makes waves arrive in groups ("sets"); amplitudes fall off steeply so one band dominates (equal amps read as noise). Keep `sum(steepness*amp*k)` < 1 per layer or crests loop over themselves.
- `SWELL` — single very-long-wavelength wave applied uniformly to every layer so the whole field rises and falls together.
- `layers[]` — per-band `y`/color/`width`, plus `ampScale`/`kScale`/`phaseShift` modeling the same surface at increasing distance (farther = fainter, perspective-compressed, offset). Temporal frequency is intentionally NOT scaled per layer.
- `GRAVITY` — global speed scalar in CSS-px/s² (time `t` is rAF seconds, so speed is refresh-rate independent); deep-water dispersion is `omega = sqrt(GRAVITY * k)`, so a single value drives both the swell and the chop at physically consistent speeds.

The canvas has `transition:persist` so it survives ClientRouter view transitions. The `<script>` re-runs on every navigation (Astro behavior), so it guards with a `_waveInit` flag on the canvas element to avoid double-binding the `resize` listener and double-running the rAF loop.

## Astro v6 gotchas

Training data and many tutorials describe the older Content/Transitions APIs. In this repo:

- Content collection config is `src/content.config.ts` (not `src/content/config.ts`).
- Render markdown with `render(entry)` imported from `astro:content`, NOT `entry.render()`.
- Post URL slug is `post.id`, NOT `post.slug`.
- `z` imports from `astro/zod`, not the standalone `zod` package.
- View transitions: import `ClientRouter` from `astro:transitions`. `ViewTransitions` is deprecated.
- The schema factory form `schema: ({ image }) => z.object({...})` is required to use the `image()` helper for frontmatter image fields.

## Devlog

Joe keeps a free-form log in `devlog.md` at the repo root with session notes, decisions, and small pending annoyances (e.g. blog post template duplicates the H1). Read it when picking up after a break — it captures intent that isn't in code or git history.
