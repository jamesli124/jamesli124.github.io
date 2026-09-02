# jamesli124.github.io

Personal site: CV, writing, small web apps, and photography.
Built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve dist/ locally, exactly as it will ship
```

## Where things live

| Path                     | What it is |
| ------------------------ | ---------- |
| `src/data/site.ts`       | Name, tagline, nav, social links. Header and footer read this. |
| `src/data/cv.ts`         | The whole CV as typed data. `/cv` renders it; print gives the PDF. |
| `src/data/photos.ts`     | Optional captions/ordering for photographs. |
| `src/photos/`            | The photographs themselves. Any image dropped here is published. |
| `src/pages/`             | One file per route. `_apps/` and `_writing/` are hidden stubs. |
| `src/styles/global.css`  | Design tokens (color, type scale, spacing) and shared furniture. |
| `src/layouts/Base.astro` | The HTML shell: meta tags, header, footer. |

## Common tasks

**Update the CV.** Edit `src/data/cv.ts`. The web page and the printable PDF both come from
that one file, so they cannot drift apart. Visitors get the PDF via the *Print / save as PDF*
button on `/cv`.

**Add a photograph.** Export it long-edge ~2400px at JPEG quality ~80, drop it in
`src/photos/`, and it appears on the next build. Astro generates the responsive sizes.

Then add a matching key in `src/data/photos.ts`. **Alt text is required**: `npm run build`
fails and names every photograph missing it, printing a paste-ready snippet. `npm run dev`
only warns, so you can preview while writing. Captions, location, and date stay optional.

Export size matters for the *repository*, not the page — Astro optimizes what it serves, but
git keeps every version of the original forever, so a 6 MB original is 6 MB you never get back.

**Unhide Apps or Writing.** Both are scaffolded but hidden while they hold placeholder
content: rename `src/pages/_apps/` to `src/pages/apps/` (drop the underscore) and uncomment the
matching entry in `nav` in `src/data/site.ts`. Astro ignores anything under `src/pages`
prefixed with `_`, so until then they are not built, linked, or indexed.

**Add a web app.** Astro ships zero JavaScript by default, so an interactive page needs a UI
framework — but only on that page:

```bash
npx astro add react
```

Then put the component in `src/components/apps/`, create `src/pages/apps/your-app.astro`, and
mount it with a client directive:

```astro
---
import Base from '../../layouts/Base.astro';
import YourApp from '../../components/apps/YourApp.tsx';
---
<Base title="Your App">
  <YourApp client:load />
</Base>
```

The CV and gallery still ship 0 kB of JS; only `/apps/your-app` pays for React.

**Start writing.** Create `src/content/writing/*.md`, define the schema in
`src/content.config.ts`, then swap the placeholder array in `src/pages/writing/index.astro`
for `await getCollection('writing')` and add `src/pages/writing/[...slug].astro`.

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.

One-time setup in the repo: **Settings → Pages → Build and deployment → Source → GitHub
Actions**. Without that, the deploy step fails.

## Notes

- Repo name `jamesli124.github.io` makes this a *user* site served from the domain root, so
  no `base` path is needed and internal links are plain (`/cv`, `/apps/...`).
- Keep the repository under ~1 GB. If the photo library outgrows that, move originals to
  external storage and commit only web-ready exports.
