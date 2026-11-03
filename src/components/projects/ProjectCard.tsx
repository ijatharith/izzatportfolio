import Link from "next/link";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { StatusMeter } from "@/components/ui/primitives";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Project card. The whole card is one link target via the title's
 * stretched pseudo-element, so there is a single tab stop per card.
 */
export function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  headingLevel = "h3",
  revealImage = true,
  className,
  sizes,
  eager,
  tall,
}: {
  project: Project;
  aspect?: string;
  headingLevel?: "h2" | "h3";
  revealImage?: boolean;
  className?: string;
  sizes?: string;
  /** Load the image immediately — for cards above the fold. */
  eager?: boolean;
  /** Portrait slot: use the project's tall image when it has one. */
  tall?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div data-reveal={revealImage ? "image" : undefined}>
        <ProjectVisual project={project} className={aspect} sizes={sizes} eager={eager} tall={tall} />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <StatusMeter status={project.status} />
        <span className="meta">
          {project.category.join(" / ")}
          {project.year ? ` — ${project.year}` : ""}
        </span>
      </div>
      <Heading className="mt-3 text-card font-semibold">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 max-w-[58ch] text-muted">{project.description}</p>
      {project.context && <p className="meta mt-3 text-ink">{project.context}</p>}
      {project.technologies.length > 0 && (
        <p className="meta mt-3 text-ink/70">
          <span className="sr-only">Technologies: </span>
          {project.technologies.join(", ")}
        </p>
      )}
    </article>
  );
}
