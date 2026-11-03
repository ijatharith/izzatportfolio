import type { ReactNode } from "react";
import { Count, Meta } from "./primitives";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Two-column editorial row: a bracketed label on the left, content on the
 * right. The building block for About and Uses.
 */
export function EditorialRow({
  label,
  count,
  id,
  title,
  children,
}: {
  label: string;
  count?: number;
  id: string;
  /** Visible heading for the section. */
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 md:py-20">
      <Reveal className="grid gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4" data-reveal>
          <p className="flex items-baseline gap-2">
            <Meta>{label}</Meta>
            {count !== undefined && <Count value={count} />}
          </p>
          <h2
            id={id}
            className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em]"
          >
            {title}
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6" data-reveal>
          {children}
        </div>
      </Reveal>
    </section>
  );
}
