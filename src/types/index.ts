export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "On Hold"
  | "Experimental"
  | "Proposal"
  | "Archived";

export type ExperimentStatus = "Experimental" | "In Progress" | "Completed" | "Archived";

/** Keys for the illustrative SVG covers in components/projects/covers. */
export type CoverKey =
  | "vigilance"
  | "jomsadaqah"
  | "palas"
  | "bayarswift"
  | "secure-messaging"
  | "tasktrek";

export interface Project {
  slug: string;
  title: string;
  /** One-line summary used on cards. */
  description: string;
  /** Longer introduction for the detail page. Falls back to description. */
  overview?: string;

  category: string[];
  status: ProjectStatus;
  /** Free-text nuance shown beside the status, e.g. "Ongoing brand". */
  statusNote?: string;
  /** Who the work was done with, e.g. "Academic team project". */
  context?: string;
  featured: boolean;
  /** Position among featured projects on the homepage (1 = first). */
  featuredOrder?: number;
  /** Optional until a verified year is provided. */
  year?: number;

  /** Path under /public. When absent, the illustrative cover is used. */
  thumbnail?: string;
  /** Describes the thumbnail for screen readers. */
  thumbnailAlt?: string;
  /** CSS object-position used when the thumbnail is cropped, e.g. "left center". */
  thumbnailPosition?: string;
  /**
   * Optional portrait version for tall cards (the homepage's tall slots).
   * The card takes this image's own proportions, so it is never cropped.
   */
  thumbnailTall?: { src: string; width: number; height: number };
  cover: CoverKey;
  gallery?: { src: string; alt: string }[];

  /** Technologies or tools. */
  technologies: string[];
  /** Areas the project covers — scope, not results. */
  scope: string[];

  problem?: string;
  objectives?: string[];
  solution?: string;
  role?: string;
  architecture?: string;
  process?: string;
  challenges?: string[];
  results?: string;
  learnings?: string[];

  githubUrl?: string;
  liveUrl?: string;
}

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: ExperimentStatus;
  technologies: string[];
  /** ISO date (YYYY-MM-DD). */
  createdAt: string;
  /** Interactive demo rendered inline on the Lab page. */
  demo?: "cipher-bench" | "type-study";
  image?: { src: string; alt: string };
  githubUrl?: string;
}

export interface SocialLink {
  label: "LinkedIn" | "GitHub" | "Instagram";
  href: string;
  handle?: string;
}

export interface TimelineEntry {
  /** Display period, e.g. "2022 – 2026". */
  period: string;
  title: string;
  organisation?: string;
  kind: "Education" | "Experience" | "Project" | "Milestone";
  description?: string;
}

export interface ToolGroup {
  title: string;
  tools: { name: string; note: string }[];
}
