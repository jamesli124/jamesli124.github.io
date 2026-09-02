/**
 * Build-time guard for photograph metadata.
 *
 * Alt text cannot be optional: a missing `alt` renders an empty attribute,
 * which is silent — the gallery looks perfect and is unusable with a screen
 * reader. So this runs on every build.
 *
 * In `dev` it warns, so you can preview while drafting. In `build` it throws,
 * so an inaccessible gallery cannot reach the deploy. Captions stay optional
 * and are only reported, never fatal.
 */

export interface CheckablePhoto {
  slug: string;
  alt?: string;
  caption?: string;
}

export function checkPhotoMetadata(
  photos: CheckablePhoto[],
  knownSlugs: string[],
  isDev: boolean
): void {
  const missingAlt = photos.filter((p) => !p.alt?.trim()).map((p) => p.slug);
  const missingCaption = photos.filter((p) => !p.caption?.trim()).map((p) => p.slug);

  // Metadata whose image was renamed or deleted — dead weight that silently
  // stops applying.
  const fileSlugs = new Set(photos.map((p) => p.slug));
  const orphaned = knownSlugs.filter((slug) => !fileSlugs.has(slug));

  const lines: string[] = [];

  if (missingAlt.length > 0) {
    lines.push(
      `${missingAlt.length} photograph(s) missing alt text in src/data/photos.ts:`,
      ...missingAlt.map((s) => `    ${s}`),
      '',
      '  Paste this in and fill it out:',
      ...missingAlt.map((s) => `    '${s}': { alt: '' },`)
    );
  }

  if (orphaned.length > 0) {
    lines.push(
      '',
      `${orphaned.length} metadata entr(ies) with no matching image (safe to delete):`,
      ...orphaned.map((s) => `    ${s}`)
    );
  }

  if (missingCaption.length > 0 && missingAlt.length === 0) {
    lines.push('', `Note: ${missingCaption.length} photograph(s) have no caption (optional).`);
  }

  if (lines.length === 0) return;

  const report = ['', '── Photograph metadata ──', ...lines, ''].join('\n');

  if (missingAlt.length > 0 && !isDev) {
    throw new Error(
      `${report}\nAlt text is required for a production build. ` +
        `Run \`npm run dev\` to preview while you write it.`
    );
  }

  console.warn(report);
}
