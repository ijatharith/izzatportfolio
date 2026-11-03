import Link from "next/link";
import { areas } from "@/data/skills";
import { getProject } from "@/data/projects";
import { Container } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

export function AreasOfExploration() {
  return (
    <section aria-labelledby="areas-title" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="areas-title"
            label="Areas of exploration"
            count={areas.length}
            title="Where the ideas come from."
          />
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <ul className="border-t border-line">
            {areas.map((area) => (
              <li
                key={area.title}
                data-reveal
                className="group grid gap-3 border-b border-line py-7 transition-colors md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
              >
                <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] transition-transform duration-500 ease-[var(--ease-out-quart)] md:col-span-5 md:group-hover:translate-x-2">
                  {area.title}
                </h3>
                <p className="max-w-[48ch] text-muted md:col-span-4">{area.description}</p>
                <p className="meta md:col-span-3 md:text-right">
                  <span className="sr-only">Related work: </span>
                  {area.work.map((item, i) => {
                    const project = "slug" in item ? getProject(item.slug) : undefined;
                    const key = "slug" in item ? item.slug : item.label;
                    if ("slug" in item && !project) return null;
                    return (
                      <span key={key}>
                        {i > 0 && ", "}
                        {project ? (
                          <Link
                            href={`/projects/${project.slug}`}
                            className="link-draw text-ink hover:text-accent"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          <span className="text-ink">{key}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
