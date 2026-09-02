/**
 * Site-wide identity and navigation.
 * Edit this file to change the name, tagline, nav, or footer links everywhere.
 */

export const site = {
  /* Full middle name is deliberate: "James Li" is a very common name, and the
     full form is what makes this site, the CV, and the publications resolve to
     one person. */
  name: 'James Wenhan Li',
  /** Short, appears under the name on the homepage and in <title>. */
  tagline: 'Medicine, genomics, and open-source tooling',
  /** Used for <meta name="description"> when a page does not set its own. */
  description:
    'James Wenhan Li — medical student at Northwestern Feinberg. Computational genomics, cell-free DNA fragmentomics, clinical research, and photography.',
  url: 'https://jamesli124.github.io',
  location: 'Chicago, IL',
  /**
   * Deliberately no phone number. The CV PDF carries one, but this page is
   * public and permanently scraped; hand the number out per-application instead.
   */
} as const;

/**
 * Personal seal, used as the favicon, on the CV masthead, and as the footer
 * sign-off. Set to `null` to remove it everywhere at once.
 * The file lives at `public/seal.svg` — overwrite that file to change the mark.
 */
export const seal = {
  src: '/seal.svg',
} as const;

/**
 * Contact address, kept split on purpose.
 *
 * The joined `user@domain` string appears nowhere: not in this file (the repo
 * is public, so source is as scrapable as the site), not in the built HTML,
 * and not in the JSON-LD. It renders as "user [at] domain" — readable by a
 * person, missed by harvesters that regex for an @. Do not add a `mailto:`
 * link or a schema.org `email` field; that would undo the whole point.
 */
const emailUser = 'james.li3';
const emailDomain = 'northwestern.edu';
export const emailDisplay = `${emailUser} [at] ${emailDomain}`;

export interface NavItem {
  label: string;
  href: string;
  /** Shown on the homepage section cards. */
  blurb?: string;
}

/**
 * Apps and Writing are hidden while they are still placeholders. Their pages
 * live at `src/pages/_apps/` and `src/pages/_writing/` — the leading underscore
 * keeps Astro from routing them, so they are not built, linked, or in the
 * sitemap, but the scaffolding and its how-to comments are intact.
 *
 * To bring one back: drop the underscore from the folder name and uncomment
 * its entry below.
 */
export const nav: NavItem[] = [
  {
    label: 'CV',
    href: '/cv',
    blurb: 'Education, research, publications, and service — the record, kept current.',
  },
  { label: 'Photography', href: '/photography', blurb: 'A selection of photographs, made mostly on foot.' },
  // {
  //   label: 'Writing',
  //   href: '/writing',
  //   blurb: 'Notes on computation in medicine: what it measures well, and what it only appears to.',
  // },
  // {
  //   label: 'Apps',
  //   href: '/apps',
  //   blurb: 'Small interactive tools for biomedical research, medical education, and clinical workflows.',
  // },
];

export interface SocialLink {
  label: string;
  href: string;
}

/** Footer and CV masthead both read this list. */
export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/jamesli124' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=PnY2jA0AAAAJ&hl=en&inst=13592255891762573016',
  },
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-1658-9230' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/james-li-009a7719b/' },
];

/**
 * schema.org Person, emitted as JSON-LD in the <head> of every page.
 *
 * This is the machine-readable half of the disambiguation problem: "James Li"
 * is a common name, so search engines need an explicit statement tying this
 * site, these profiles, and this affiliation to one entity. `sameAs` is the
 * field doing that work — each URL is an identity claim that the linked
 * profile can corroborate.
 */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  /** How the name appears in author lists on the papers. */
  alternateName: 'Li JW',
  url: site.url,
  jobTitle: 'Medical Student',
  description: site.description,
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Northwestern University Feinberg School of Medicine',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Wake Forest University',
  },
  /** ORCID is the strongest identifier here — it is purpose-built for this. */
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'ORCID',
    value: 'https://orcid.org/0000-0002-1658-9230',
  },
  sameAs: socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
};
