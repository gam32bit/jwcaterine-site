## 2026-03-25 — Astro site setup

**What I did**
Set up jwcaterine.com as an Astro v6.0.8 project with minimal template,
base layout, about page, and blog collection with dynamic routing. Chose minimal template since part of the reason I wanted to build my website with Astro was to learn more web dev skills.

**What I learned**
- File-based routing: folder structure = URL structure, no router config needed
- Dynamic routes: single [id].astro file handles all posts via getStaticPaths
- Runtime enforcement vs types: Zod validates actual data at build time,
  TypeScript types only assist you while writing code

**Gotchas**
- Claude's instructions were slightly outdated:
    - Astro v6 uses Content Layer API: config moves to src/content.config.ts,
  collections require explicit glob() loader, z imports from astro/zod
    - entry.render() replaced by render(entry) imported from astro:content
    - post.slug replaced by post.id — verify correct URL slug handling against docs
- Was skeptical of solution that Claude proposed for stripping md file type extension from the slugs, looked at documentation and found a helper function that defines how ids are generated. Essentially does the same thing but a little cleaner.
