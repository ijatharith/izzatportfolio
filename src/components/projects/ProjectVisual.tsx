import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { CoverArt } from "./covers";

/**
 * A project's visual: the real thumbnail when one exists, otherwise its
 * illustrative cover. Always reserves its aspect ratio to avoid layout shift.
 *
 * - `tall`: the slot is portrait. If the project has `thumbnailTall`, that
 *   image is used and the frame takes its exact proportions (no crop).
 * - `preload`: the page's main image (e.g. the detail-page hero).
 * - `eager`: above the fold but not the main image (e.g. a grid's first row).
 */
export function ProjectVisual({
  project,
  className,
  tall,
  preload,
  eager,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  className?: string;
  tall?: boolean;
  preload?: boolean;
  eager?: boolean;
  sizes?: string;
}) {
  const tallImage = tall ? project.thumbnailTall : undefined;
  const src = tallImage?.src ?? project.thumbnail;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white",
        // A tall image sets its own proportions instead of the slot's.
        !tallImage && className,
      )}
      style={tallImage ? { aspectRatio: `${tallImage.width} / ${tallImage.height}` } : undefined}
    >
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]">
        {src ? (
          <Image
            src={src}
            alt={project.thumbnailAlt ?? `${project.title} preview`}
            fill
            sizes={sizes}
            preload={preload}
            loading={eager ? "eager" : undefined}
            className="object-cover"
            style={{ objectPosition: tallImage ? "center" : (project.thumbnailPosition ?? "center") }}
          />
        ) : (
          <CoverArt cover={project.cover} />
        )}
      </div>
    </div>
  );
}
