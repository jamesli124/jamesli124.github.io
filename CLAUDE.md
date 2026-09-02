# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on localhost:4321
npm run build    # production build into dist/
npm run preview  # serve dist/ exactly as it will ship
npm run check    # astro check — prompts to install @astrojs/check + typescript on first run
```

There is no test suite, linter, or formatter in this project. Do not invent commands for them.
`npm run build` is the verification step: it type-checks `.astro` frontmatter, resolves every
image import, and fails on a broken route. Run it after any change.

## Architecture

A static Astro site deployed to GitHub Pages. Two structural decisions shape almost everything:

### Content lives in `src/data/`, not in markup

`src/data/site.ts`, `cv.ts`, and `photos.ts` are typed data modules that the pages render.
Routine content edits belong there, not in `.astro` files. In particular, `/cv` is generated
entirely from `cv.ts` — changing CV markup when the intent was a content change is a mistake.

`cv.ts` exports one ordered array, `cvSections`, of a discriminated union (`kind:
'entries' | 'publications' | 'skills'`). Page order *is* array order, so reordering the CV means
reordering that array — there is no separate layout list to keep in sync. `cv.astro` switches on
`kind`; adding a new section shape means extending both the union and that switch.

### Zero JavaScript by default; interactivity is opt-in per page

No UI framework is installed. The homepage ships zero script tags. Interactive work has two paths:

- **Vanilla** — an inline `<script>` in the `.astro` file, as in `src/components/Lightbox.astro`.
- **Framework island** — run `npx astro add react` (or svelte/vue/solid), put the component in
  `src/components/apps/`, and mount it with `client:load` on one page. Only that route pays the
  bundle cost; the CV and gallery stay at zero.

Prefer vanilla for anything small. Do not add a framework speculatively.

## Non-obvious invariants

**The CV's print stylesheet is a feature, not decoration.** `/cv` has a *Print / save as PDF*
button, and `src/pages/cv.astro:354` is the print block that makes the output a real CV — it
drops nav and chrome, tightens spacing, and appends `(href)` after external links since paper
can't be clicked. Changing CV layout means checking both screen and print. `.no-print` and the
print overrides in `src/styles/global.css:284` are the shared machinery.

**The photo gallery is filesystem-driven.** `src/pages/photography.astro:13` globs
`src/photos/*`, so every image in that folder is published — there is no list to maintain.
`src/data/photos.ts` only *layers on* alt text, captions, and ordering, keyed by filename
without extension, and every field falls back gracefully when absent. Never convert this to an
explicit array. Sorting is `order` → `date` descending → filename, with the filename tiebreak
keeping builds deterministic.

**Alt text is enforced at build time.** `src/lib/photo-check.ts` runs from
`photography.astro` on every build: it warns in `dev` (so you can preview while drafting) and
**throws in `build`** when any photograph lacks `alt`. This is deliberate — a missing `alt`
renders an empty attribute, so the gallery looks perfect and is unusable with a screen reader.
Do not soften this to a warning to get a build through; write the alt text. It also reports
metadata entries whose image was renamed or deleted.

**Two image URLs per photo, deliberately.** The `<Image>` component emits a responsive `srcset`
for the grid; `getImage()` at `photography.astro:29` separately produces one large WebP whose
URL rides on a `data-full` attribute for the lightbox. Both are needed.

**Design tokens are the styling contract.** `src/styles/global.css:7` defines the light palette
and fluid type scale on `:root`; `:46` (`prefers-color-scheme: dark`) overrides *only* colors.
Never give a color its sole definition inside the dark block. Page-level styles are scoped
`<style>` blocks in `.astro` files, and styling Astro's `<Image>` output from a scoped block
requires `:global(img)`.

**The seal is one file, referenced three ways.** `public/seal.svg` is the site owner's personal chop; it
is the favicon, the CV masthead stamp, and the footer sign-off. Changing the mark means
overwriting that one file — never fork it into per-use copies. `src/components/Seal.astro`
renders it decoratively (`alt=""`, `aria-hidden`) because the name always sits beside it, and
`seal` in `site.ts` can be set to `null` to remove it everywhere at once.

**This is a GitHub *user* site** (`jamesli124.github.io`), served from the domain root. No `base`
path is configured, so internal links are plain absolute paths (`/cv`, `/apps/...`). Don't add
base-path handling.

## Deployment

Push to `main`; `.github/workflows/deploy.yml` builds via `withastro/action` and publishes.
Requires a one-time repo setting — **Settings → Pages → Source → GitHub Actions** — without
which the deploy job fails.

## Content status

`src/data/cv.ts` holds **James Wenhan Li's real CV** — transcribed from their own document,
including real people (advisors, coauthors), institutions, DOIs, and awards. Treat it as a factual record:
never invent an entry, a publication, a date, or a skill to fill a gap. If something is missing,
leave it missing and say so. Uncertain items are marked with `TODO` comments.

`src/data/site.ts` deliberately omits their phone number, which the PDF CV carries — this site is
public and permanently scraped. Do not add it.

**The email address is deliberately obfuscated and must stay that way.** It is stored split
(`emailUser` / `emailDomain`) and rendered as `user [at] domain`; the joined string appears
nowhere — not in source (the repo is public), not in the built HTML, not in the JSON-LD. Never
add a `mailto:` link, never restore the schema.org `email` field, and never join the two halves
into a single literal. This was an explicit request, not an oversight. Unknown social handles are commented out rather
than stubbed, because a dead link on a page that hiring committees read is worse than no link.

**Apps and Writing are hidden, not deleted.** They live at `src/pages/_apps/` and
`src/pages/_writing/`; the leading underscore stops Astro routing them, so they are not built,
linked, or in the sitemap, while the scaffolding and its how-to comments stay intact. They were
hidden because they were still placeholders. To restore one: drop the underscore and uncomment
its entry in `nav` in `site.ts`. Do not "fix" the underscore — it is load-bearing.

The disclaimer at the foot of the apps page (prototypes only, not a medical device, not for
patient care) should survive edits to that page, and any new clinical tool should carry the
same caveat.
