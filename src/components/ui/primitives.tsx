import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, statusLabel, statusStage } from "@/lib/utils";
import type { ExperimentStatus, ProjectStatus } from "@/types";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer" | "article";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1280px] px-[var(--gutter)]", className)}>
      {children}
    </Tag>
  );
}

/** Bracketed mono metadata, e.g. [ Malaysia ]. Brackets are visual only. */
export function Meta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("meta inline-flex items-baseline gap-[0.35em]", className)}>
      <span aria-hidden="true">[</span>
      <span>{children}</span>
      <span aria-hidden="true">]</span>
    </span>
  );
}

/** Item count shown beside a label, e.g. (6). */
export function Count({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("meta tabular-nums", className)} aria-label={`${value} items`}>
      ({value})
    </span>
  );
}

/**
 * Status shown on the idea → reality scale: four segments plus a text
 * label, so the meaning never depends on colour alone.
 */
export function StatusMeter({
  status,
  note,
  className,
}: {
  status: ProjectStatus | ExperimentStatus;
  note?: string;
  className?: string;
}) {
  const stage = statusStage(status);
  const label = statusLabel(status);
  const paused = status === "On Hold";
  return (
    <span
      className={cn("meta inline-flex items-center gap-2 text-ink", className)}
      title={
        stage
          ? paused
            ? `Paused at stage ${stage} of 4, from idea to reality`
            : `Stage ${stage} of 4, from idea to reality`
          : "Archived"
      }
    >
      <span aria-hidden="true" className="flex gap-[3px]">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[7px] w-[11px] rounded-[1.5px]",
              stage === null
                ? "border border-dashed border-muted"
                : i <= stage && paused
                  ? "bg-muted"
                  : i < stage
                  ? "bg-ink"
                  : i === stage
                    ? "bg-accent"
                    : "bg-line-strong",
            )}
          />
        ))}
      </span>
      <span>{note ?? label}</span>
      {note && <span className="sr-only">(status: {label})</span>}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="meta inline-flex h-7 items-center rounded-full border border-line px-3 text-ink">
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "secondary";

const buttonBase =
  "group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
};

/** Label that rolls upward on hover. */
function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden leading-6">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  icon = true,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">) {
  const content = (
    <>
      <RollLabel>{children}</RollLabel>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );
  const cls = cn(buttonBase, buttonVariants[variant], className);
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export { RollLabel, buttonBase, buttonVariants };

/** Text link with drawn underline. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = cn("link-draw text-ink transition-colors hover:text-accent", className);
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
