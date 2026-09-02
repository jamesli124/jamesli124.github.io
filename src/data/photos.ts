/**
 * Photograph metadata.
 *
 * The gallery does NOT read this list to decide what to show — it globs
 * `src/photos/*.{jpg,jpeg,png,webp,avif}` at build time, so dropping a file in
 * that folder is enough to publish it. This file only adds captions and
 * ordering on top, keyed by filename (without the extension).
 *
 * Anything missing falls back to sensible defaults, so partial metadata is fine.
 *
 * A note on file size: GitHub warns above 50 MB per file and recommends
 * keeping repositories under 1 GB. Export long-edge ~2400px, JPEG quality
 * ~80, and Astro will generate the smaller responsive sizes for you.
 */

export interface PhotoMeta {
  /** Required for accessibility if you write anything at all — describe the image. */
  alt?: string;
  /** Shown under the photo in the lightbox. */
  caption?: string;
  location?: string;
  /** ISO date, e.g. '2025-08-14'. Used for sorting (newest first). */
  date?: string;
  /** Manual override; lower numbers sort first and beat `date`. */
  order?: number;
  /** Set true to render this one across the full grid width. */
  feature?: boolean;
}

export const photoMeta: Record<string, PhotoMeta> = {
  // Alt text is required — `npm run build` fails without it. Describe what is
  // in the frame for someone who cannot see it; do not start with "Photo of".
  //
  // Captions are shown under the photo and in the lightbox. They are kept
  // deliberately shorter than the alt text rather than duplicating it: a
  // caption that repeats the alt makes a screen reader announce the same
  // sentence twice, and adds nothing for someone who can already see the frame.
  //
  // `location` and `date` are still unset — fill them in and they appear in the
  // lightbox and drive the gallery's sort order (newest first).
  'James_Li_ig_eclipse-8167': {
    alt: 'Airliner in distance on a deep blue sky.',
    caption: 'An airliner crossing the deep blue',
  },
  'James_Li_ig_eclipse-8177': {
    alt: 'Partial solar eclipse.',
    caption: 'The partial phase',
  },
  'James_Li_ig_eclipse-8353': {
    alt: 'Total solar eclipse with bright corona.',
    caption: 'Totality, and the corona',
  },
  'James_Li_ig_eclipse-8354': {
    alt: 'Total solar eclipse showing solar prominences.',
    caption: 'Prominences at totality',
  },
  'websafe_ducks-6545': {
    alt: 'A row of three ducks on an autumn forest floor.',
    caption: 'Three in a row',
  },
};
