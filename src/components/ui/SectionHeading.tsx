import type { ReactNode } from "react";
import { Count, Meta } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Section opener: bracketed label with optional item count, then a large
 * heading that rises out of its line when revealed (inside <Reveal>).
 */
export function SectionHeading({
  label,
  count,
  title,
  id,
  aside,
  className,
}: {
  label: string;
  count?: number;
  title: ReactNode;
  id: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end md:gap-8", className)}>
      <div className="md:col-span-8">
        <p className="flex items-baseline gap-2" data-reveal>
          <Meta>{label}</Meta>
          {count !== undefined && <Count value={count} />}
        </p>
        <h2 id={id} className="mt-4 text-section font-semibold">
          <span className="mask-line">
            <span className="block" data-reveal="mask">
              {title}
            </span>
          </span>
        </h2>
      </div>
      {aside && (
        <div className="md:col-span-4 md:justify-self-end" data-reveal>
          {aside}
        </div>
      )}
    </div>
  );
}
