# jwcaterine.com

My personal site and blog — live at **[jwcaterine.com](https://jwcaterine.com)**.

It's a static [Astro](https://astro.build) site built from the minimal template on
purpose: I wanted to learn web development by assembling the pieces myself rather
than inheriting someone else's theme. No UI framework, no CMS. Posts are
hand-written markdown files in this repo.

## Running it locally

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
```

| Command | What it does |
| :-- | :-- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Serve the built `./dist/` locally |
| `npm run astro check` | Type-check `.astro` files and post frontmatter |

There's no test runner or linter. `npm run build` is the real check — it fails if a
post's frontmatter doesn't match the content schema.

## Layout of the repo

```text
src/
├── content/blog/           One folder per post: index.mdx + its images
│   └── _template/          Copy-me starter for a new draft
├── content.config.ts       Blog schema: title, date, description, draft, tags, hero
├── layouts/
│   └── BaseLayout.astro    Shared nav + footer, wraps every page
├── components/
│   ├── WaveBackground.astro  Canvas ocean-wave animation behind the whole site
│   ├── Figure.astro          Captioned / floated images for MDX posts
│   └── Lightbox.astro        Click an image to enlarge it
├── pages/
│   ├── index.astro           Home, with live sliders for the wave physics
│   ├── about.astro
│   ├── 404.astro
│   ├── blog/index.astro      Post listing + client-side search
│   ├── blog/[id].astro       Post template
│   ├── rss.xml.js            RSS feed
│   └── search.json.js        Search index the blog listing fetches
└── styles/global.css
public/                     CNAME, favicons, robots.txt
```

## Deploying

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes to GitHub Pages. The custom domain comes from
`public/CNAME`. Nothing to run by hand.
