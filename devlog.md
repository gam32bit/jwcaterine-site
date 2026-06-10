## 2026-05-09

Messed around with waves a bit, got it to a place I like it. Could probably be
more wave like but it's mostly good. Would like to add interactive element at
some point.

Also removed leftover integration with journal stuff. Next thing to think about
will be the blog workflow, and/or the project portfolio.

##2026-03-28 - adding post via journal scripts

There was a typo in config but eventually got it working.

Also had to add source frontmatter fields to schema.

H1 line spacing too big for blog post, need to fix that. The current
template also reproduces the title which is uncessary. 

##2026-03-27 - Wave Background and CSS

https://claude.ai/share/a0c5f8b3-abd3-437b-85ff-00d049aedf4d

Looking more like a proper website now. The waves even out weirdly, would want
them to stay in one motion more like an actual ocean wave. Also need to figure
out what to do with the home page.

It was glitching between pages with the wave background, I guess because the
component is initializing each time, but Claude suggested another component to
deal with that "ViewTransitions" but it was outdated, correct one is
"ClientRouter".

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
