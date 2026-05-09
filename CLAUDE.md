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

**Blog content collection** (`src/content.config.ts`). Astro v6 Content Layer API: `glob()` loader points at `src/content/blog/*.md`, and `generateId` strips the `.md` extension so the URL matches the filename. Posts are rendered in `[id].astro` via `render(post)` from `astro:content`. The blog index filters out `data.draft === true` and sorts by `data.date` desc. Schema fields: `title`, `date`, `description` (all required), `draft` (optional, default false).

**Wave background** (`src/components/WaveBackground.astro`). 2D canvas Gerstner-wave animation, drawn as a stack of stroked lines. Tunable knobs in order of visual impact:

- `components[]` — short-wavelength wave components summed per layer; shorter wavelengths add chop, raise/lower their `amp` to dial squiggle.
- `SWELL` — single very-long-wavelength wave applied uniformly to every layer so the whole field rises and falls together.
- `layers[]` — per-band `y`/color/`width`, plus `ampScale`, `kScale`, `omegaScale`, `phaseShift` so the bands don't crest in unison.
- `GRAVITY` — global speed scalar; deep-water dispersion is `omega = sqrt(GRAVITY * k)`, so a single value drives both the swell and the chop at physically consistent speeds.

The canvas has `transition:persist` so it survives ClientRouter view transitions. The `<script>` re-runs on every navigation (Astro behavior), so it guards with a `_waveInit` flag on the canvas element to avoid double-binding the `resize` listener and double-running the rAF loop.

## Astro v6 gotchas

Training data and many tutorials describe the older Content/Transitions APIs. In this repo:

- Content collection config is `src/content.config.ts` (not `src/content/config.ts`).
- Render markdown with `render(entry)` imported from `astro:content`, NOT `entry.render()`.
- Post URL slug is `post.id`, NOT `post.slug`.
- `z` imports from `astro/zod`, not the standalone `zod` package.
- View transitions: import `ClientRouter` from `astro:transitions`. `ViewTransitions` is deprecated.

## Devlog

Joe keeps a free-form log in `devlog.md` at the repo root with session notes, decisions, and small pending annoyances (e.g. blog post template duplicates the H1). Read it when picking up after a break — it captures intent that isn't in code or git history.
