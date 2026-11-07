import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { CoverArt } from "./covers";

/**
 * Logo sizing. Every logo gets the same visual area rather than the same
 * width, so a long wordmark (BayarSwift) and a compact one (Palas) read as
 * the same size. Sizes are in px at desktop and scale down on phones via
 * --logo-scale. All logo frames share one height so cards line up.
 */
const LOGO_AREA = 25_000; // px², e.g. 260 × 96
const LOGO_MAX_HEIGHT = 96; // tallest a logo may be
const LOGO_FRAME_HEIGHT = 160; // frame height, logo centred inside

function logoBox(width: number, height: number) {
  const aspect = width / height;
  const h = Math.min(LOGO_MAX_HEIGHT, Math.sqrt(LOGO_AREA / aspect));
  return { w: Math.round(h * aspect), h: Math.round(h) };
}

/**
 * A project's visual: the real thumbnail when one exists, otherwise its
 * illustrative cover. Always reserves its size to avoid layout shift.
 *
 * - Logos (`thumbnailFit: "contain"` with `thumbnailSize`) render at one
 *   consistent size on every page, with no frame, ignoring the slot shape.
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
  const logo =
    !tallImage && project.thumbnailFit === "contain" && project.thumbnailSize
      ? project.thumbnailSize
      : undefined;

  if (src && logo) {
    const box = logoBox(logo.width, logo.height);
    return (
      <div
        className="relative flex items-center justify-center [--logo-scale:0.8] md:[--logo-scale:1]"
        style={{ height: `calc(var(--logo-scale) * ${LOGO_FRAME_HEIGHT}px)` }}
      >
        <div className="transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.035]">
          <Image
            src={src}
            alt={project.thumbnailAlt ?? `${project.title} logo`}
            width={logo.width}
            height={logo.height}
            sizes={`${box.w}px`}
            preload={preload}
            loading={eager ? "eager" : undefined}
            className="block h-auto max-w-full"
            style={{ width: `calc(var(--logo-scale) * ${box.w}px)` }}
          />
        </div>
      </div>
    );
  }

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
            className={project.thumbnailFit === "contain" ? "object-contain p-[8%]" : "object-cover"}
            style={{ objectPosition: tallImage ? "center" : (project.thumbnailPosition ?? "center") }}
          />
        ) : (
          <CoverArt cover={project.cover} />
        )}
      </div>
    </div>
  );
}
