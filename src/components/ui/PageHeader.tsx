import type { ReactNode } from "react";
import { Container, Count, Meta } from "./primitives";

const delay = (i: number) => ({ "--d": `${i * 80}ms` }) as React.CSSProperties;

/** Opening block for internal pages: label, large title, short intro. */
export function PageHeader({
  label,
  count,
  title,
  intro,
  children,
}: {
  label: string;
  count?: number;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <Container className="pb-14 pt-12 md:pb-20 md:pt-20">
        <p className="flex items-baseline gap-2" data-intro>
          <Meta>{label}</Meta>
          {count !== undefined && <Count value={count} />}
        </p>
        <h1 className="mt-6 max-w-[15ch] text-page font-semibold" data-intro style={delay(1)}>
          {title}
        </h1>
        {intro && (
          <div className="mt-8 max-w-[58ch] text-lead text-muted" data-intro style={delay(2)}>
            {intro}
          </div>
        )}
        {children && <div data-intro style={delay(3)}>{children}</div>}
      </Container>
    </>
  );
}
