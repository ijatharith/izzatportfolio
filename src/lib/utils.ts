import type { ProjectStatus, ExperimentStatus } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Where a status sits on the idea → reality scale (1–4).
 * Archived work is shown separately, not as progress. On-hold work keeps
 * the stage it paused at.
 */
export function statusStage(status: ProjectStatus | ExperimentStatus): number | null {
  switch (status) {
    case "Proposal":
      return 1;
    case "Experimental":
      return 2;
    case "In Progress":
    case "On Hold":
      return 3;
    case "Completed":
      return 4;
    default:
      return null;
  }
}

export function statusLabel(status: ProjectStatus | ExperimentStatus): string {
  if (status === "In Progress") return "In progress";
  if (status === "On Hold") return "On hold";
  return status;
}

export function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(
    new Date(`${iso}T00:00:00`),
  );
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
