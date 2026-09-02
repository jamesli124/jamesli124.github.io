/**
 * The CV, as data.
 *
 * `/cv` renders this file, and the print stylesheet turns that page into a
 * clean PDF via the browser's Save-as-PDF. Editing here updates both, so the
 * web CV and the PDF can never drift apart.
 *
 * Section order on the page is exactly the order of `cvSections` below —
 * reorder that array to reorder the CV.
 */

/** Names to bold in author lists, the usual convention for one's own papers. */
export const authorNames = ['Li JW', 'Li J'];

export interface EntryLink {
  label: string;
  href: string;
}

export interface CVEntry {
  /** e.g. 'Dec 2025 – present'. Rendered in the left rail. */
  period: string;
  /** Role, degree, or award. */
  title: string;
  /** Department and institution. */
  org?: string;
  location?: string;
  /** Optional link on the title. */
  href?: string;
  /** Research advisor / PI — conventional on medical and academic CVs. */
  advisor?: string;
  /** Bullet points. */
  detail?: string[];
  /** Inline resource links shown under the entry — the "interactive" part. */
  links?: EntryLink[];
}

export interface Publication {
  authors: string;
  title: string;
  /** Journal name, or the meeting for a presentation. */
  venue: string;
  /** Volume/issue, or the dates and city for a meeting. */
  detail?: string;
  year?: string | number;
  href?: string;
  /** e.g. 'In press', 'Under review', '*co-first author'. */
  note?: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export type CVSection =
  | { kind: 'entries'; id: string; heading: string; entries: CVEntry[] }
  | {
      kind: 'publications';
      id: string;
      heading: string;
      /** 'article' → Journal. Year;vol(iss).   'presentation' → Presented at: Meeting; dates; city. */
      style: 'article' | 'presentation';
      items: Publication[];
    }
  | { kind: 'skills'; id: string; heading: string; groups: SkillGroup[] };

export const headline =
  'Medical student at Northwestern University Feinberg School of Medicine. Developer of open-source bioinformatics software. Interested in LLMs for clinical research.';

export const cvSections: CVSection[] = [
  {
    kind: 'entries',
    id: 'education',
    heading: 'Education',
    entries: [
      {
        period: '2025 – 2029',
        title: 'Doctor of Medicine',
        org: 'Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL',
        detail: ['Expected Spring 2029.'],
      },
      {
        period: '2021 – 2025',
        title: 'Bachelor of Arts, Computer Science',
        org: 'Wake Forest University',
        location: 'Winston-Salem, NC',
        detail: [
          'Summa cum laude.',
          'Minors in Chemistry and Chinese Language & Culture.',
        ],
      },
    ],
  },

  {
    kind: 'entries',
    id: 'certifications',
    heading: 'Certifications',
    entries: [
      {
        period: 'Aug 2025 – Aug 2027',
        title: 'Basic Life Support for Healthcare Providers (BLS)',
        org: 'American Heart Association',
        // Drop this line if you would rather not publish the credential ID —
        // it is a verification aid, not a secret, but it is an identifier.
        detail: ['Credential ID 265414455990.'],
      },
    ],
  },

  {
    kind: 'entries',
    id: 'research',
    heading: 'Research Experience',
    entries: [
      {
        period: 'Mar 2026 – present',
        title: 'Student Researcher',
        org: 'Department of Preventive Medicine (Biostatistics and Informatics), Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL',
        advisor: 'Adin-Cristian (Adi) Andrei, PhD',
        detail: [
          'Developed AESOP (Agentic Evidence Synthesis and Outcome Pipeline), an LLM-powered system that automates literature search and evidence synthesis.',
          'Built the pipeline to generalize across specialties; piloting it in trauma surgery with the CRITICAL research group (Anne Stey, MD, MS).',
        ],
      },
      {
        period: 'Dec 2025 – present',
        title: 'Student Researcher',
        org: "Division of Orthopaedic Surgery and Sports Medicine, Ann & Robert H. Lurie Children's Hospital of Chicago",
        location: 'Chicago, IL',
        advisor: 'Neeraj Patel, MD, MPH, MBS',
        detail: [
          'Contributing to a retrospective study of pediatric fractures and neighborhood-level social determinants of health.',
          'Conducted the literature review and drafted the IRB submission in collaboration with colleagues.',
          'Built the REDCap database and chart-review instrument used for data collection.',
        ],
      },
      {
        period: 'Sep 2023 – present',
        title: 'Data Analyst',
        org: 'Department of Biochemistry & Molecular Genetics, Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL · part-time, remote',
        advisor: 'Yaping Liu, PhD',
        detail: [
          'Develop and maintain a high-performance Python toolkit that extracts clinically relevant cell-free DNA fragmentation features for cancer biomarker research.',
          'Currently applying fragmentomic features to the prediction of preterm birth.',
          'Wrote the package documentation to make the toolkit usable by other labs.',
          'First author on the resulting peer-reviewed manuscript; presented at institutional and international conferences.',
        ],
        links: [
          { label: 'FinaleToolkit', href: 'https://github.com/epifluidlab/FinaleToolkit' },
          { label: 'Documentation', href: 'https://epifluidlab.github.io/FinaleToolkit/' },
        ],
      },
      {
        period: 'May 2023 – Aug 2023',
        title: 'Student Researcher',
        org: "Department of Human Genetics, Cincinnati Children's Hospital Medical Center",
        location: 'Cincinnati, OH',
        advisor: 'Yaping Liu, PhD',
        detail: [
          'Developed and tested a genomics Python package and standalone software generating fragmentation features from aligned cell-free DNA sequence reads.',
          'Optimized the implementation to outperform existing tools by up to 50× on high-depth (~96×) whole-genome sequencing datasets.',
        ],
      },
    ],
  },

  {
    kind: 'publications',
    id: 'publications',
    heading: 'Peer-Reviewed Publications',
    style: 'article',
    items: [
      {
        authors: 'Ndjonko LCM, Ebada A, Li J, et al.',
        title:
          'Surgical delay of proximal hamstring ruptures results in increased risk of post-operative pain and stiffness: a systematic review.',
        venue: 'J Ortho Sci Res',
        detail: '7(1)',
        year: 2026,
        href: 'https://doi.org/10.46889/JOSR.2026.7103',
      },
      {
        authors: 'Li JW, Sayegh MJ, Hong H, Li Z.',
        title:
          'Extradigital glomus tumor mimicking incisional neuroma after total knee arthroplasty: a case report.',
        venue:
          'Stony Brook Medicine Journal of Scholarship, Innovation and Quality Improvement — Orthopaedics',
        detail: 'Published online January 2026',
        href: 'https://renaissance.stonybrookmedicine.edu/orthopaedics/journal/2026/Li',
      },
      {
        authors: 'Li JW, Bandaru R, Baliga K, Liu Y.',
        title:
          'FinaleToolkit: accelerating cell-free DNA fragmentation analysis with a high-speed computational toolkit.',
        venue: 'Bioinformatics Advances',
        detail: '5(1)',
        year: 2025,
        href: 'https://doi.org/10.1093/bioadv/vbaf236',
      },
    ],
  },

  {
    kind: 'publications',
    id: 'presentations',
    heading: 'Abstracts & Poster Presentations',
    style: 'presentation',
    items: [
      {
        authors: 'Calhoun B, Henslee E, Li J.',
        title: 'University makerspaces with helping and assistive design in mind.',
        venue: 'ISAM 2024',
        detail: 'September 11–13, 2024; Sheffield, UK',
      },
      {
        authors: 'Li JW, Bandaru R, Liu Y.',
        title:
          'FinaleToolkit: accelerating cell-free DNA fragmentation analysis with a high-speed computational toolkit.',
        venue: 'ISMB 2024',
        detail: 'July 12–16, 2024; Montreal, Canada',
      },
      {
        authors: 'Li JW, Liu Y.',
        title: 'FinaleTools: fragmentomics toolkit for cell-free DNA analysis.',
        venue: 'URECA Day 2023',
        detail: 'August 22, 2023; Winston-Salem, NC',
      },
      {
        authors: 'Li JW, Liu Y.',
        title: 'FinaleTools: fragmentomics toolkit for cell-free DNA analysis.',
        venue: 'SURF-CCHMC Capstone Poster Symposium',
        detail: 'July 2023; Cincinnati, OH',
      },
    ],
  },

  {
    kind: 'entries',
    id: 'honors',
    heading: 'Honors, Awards & Fellowships',
    // Reverse chronological — the original document had these out of order.
    entries: [
      { period: '2024', title: 'Phi Beta Kappa Honor Society', org: 'Wake Forest University' },
      {
        period: '2024',
        title: '2nd Place, Flash Talk',
        org: 'ISCB Student Council Symposium',
      },
      { period: '2024', title: 'Goldwater Scholarship Nominee', org: 'Wake Forest University' },
      { period: '2024', title: 'Starr Travel Grant ($700)', org: 'Wake Forest University' },
      { period: '2024', title: 'Segal Education Award ($3,447.50)', org: 'AmeriCorps' },
      {
        period: '2023',
        title: 'Signature Scholars Summer Grant ($2,942)',
        org: 'Wake Forest University',
      },
      { period: '2023', title: 'Omicron Delta Kappa Honor Society', org: 'Wake Forest University' },
      {
        period: '2021',
        title: 'Guy and Clara Carswell Scholarship',
        org: 'Wake Forest University',
        detail: ['Full cost of attendance.'],
      },
    ],
  },

  {
    kind: 'entries',
    id: 'leadership',
    heading: 'Leadership & Professional Activities',
    entries: [
      {
        period: 'Jan 2026 – present',
        title: 'Co-President, Medical Mandarin',
        org: 'Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL',
        detail: ['Teach peers the Mandarin language skills relevant to providing inclusive care.'],
      },
      {
        period: 'Jan 2026 – present',
        title: 'Treasurer, Interventional Radiology Interest Group',
        org: 'Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL',
        detail: [
          'Manage the group budget and coordinate talks, panels, and meetings for students interested in interventional radiology.',
        ],
      },
      {
        period: 'Jan 2026 – present',
        title: 'Treasurer, APAMSA',
        org: 'Northwestern University Feinberg School of Medicine',
        location: 'Chicago, IL',
        detail: ['Request and manage the budget for the Feinberg chapter.'],
      },
      {
        period: 'Aug 2023 – May 2025',
        title: 'Co-President and Treasurer, Bioethics Club',
        org: 'Wake Forest University',
        location: 'Winston-Salem, NC',
        detail: [
          'Led biweekly discussions on contemporary bioethics for undergraduate and law students.',
          'Planned meetings and events, delegating roles across club officers.',
        ],
      },
    ],
  },

  {
    kind: 'entries',
    id: 'service',
    heading: 'Volunteer & Community Service',
    entries: [
      {
        period: 'Oct 2025 – present',
        title: 'Student Volunteer',
        org: 'Indian American Medical Association of Illinois Charitable Foundation Clinic',
        location: 'Chicago, IL',
        detail: [
          'Provide care to an uninsured and diverse patient population.',
          'Gather histories and perform physical exams alongside students and physicians.',
        ],
      },
      {
        period: 'Oct 2025 – present',
        title: 'Student Volunteer',
        org: 'Chicago Medicine & Street Outreach',
        location: 'Chicago, IL',
        detail: [
          'Work with a multidisciplinary team providing free health screenings and daily necessities to unhoused people in Streeterville and the Loop through routine street runs.',
        ],
      },
      {
        period: 'Sep 2023 – Oct 2024',
        title: 'Public Health AmeriCorps Member',
        org: 'AmeriCorps',
        location: 'Winston-Salem, NC',
        detail: [
          'Handled blood and sputum specimens and performed CLIA-waived testing at the Forsyth County Department of Public Health laboratory.',
          'Performed intake for uninsured patients at the AHWFB Mobile Clinic, gathering vital signs and administering health questionnaires alongside a provider.',
          'Navigated survivors of domestic violence and abuse at a local family justice center through referral to public health programs.',
          'Distributed public health information to the public at community vending events.',
        ],
      },
      {
        period: 'Jan 2023 – Jun 2025',
        title: 'Data Entry Volunteer and Kitchen Host',
        org: 'SECU Family House',
        location: 'Winston-Salem, NC',
        detail: [
          'Researched contact information for past and prospective donors to support development.',
          'Served meals to patients and families, and coordinated food storage and preparation.',
        ],
      },
    ],
  },

  {
    kind: 'skills',
    id: 'skills',
    heading: 'Research & Technical Skills',
    groups: [
      {
        group: 'Python',
        items: ['pandas', 'NumPy', 'matplotlib', 'scikit-learn', 'OpenCV', 'pysam'],
      },
      { group: 'R', items: ['ggplot2', 'Bioconductor'] },
      { group: 'Genomics', items: ['bedtools', 'samtools', 'genome browsers'] },
      {
        group: 'Statistics',
        items: ['regression', 'hypothesis testing', 'data visualization'],
      },
      { group: 'Clinical research', items: ['REDCap', 'chart review', 'IRB submission'] },
    ],
  },

  {
    kind: 'skills',
    id: 'languages',
    heading: 'Languages',
    groups: [
      { group: 'Mandarin Chinese', items: ['Intermediate proficiency'] },
    ],
  },
];
