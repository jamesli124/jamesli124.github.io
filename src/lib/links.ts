/**
 * External links open in a new tab so a visitor reading the CV does not lose
 * their place. `mailto:` and internal paths are left alone — a new tab for
 * those is just clutter.
 */

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Spread onto an <a>: `<a href={h} {...externalAttrs(h)}>`. */
export const externalAttrs = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
