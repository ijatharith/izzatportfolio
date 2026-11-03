import Image from "next/image";
import { experiments } from "@/data/experiments";
import { pageMetadata } from "@/lib/metadata";
import { Container, Meta, StatusMeter, Tag } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { CipherBench } from "@/components/lab/CipherBench";
import { TypeStudy } from "@/components/lab/TypeStudy";
import { formatMonth } from "@/lib/utils";
import type { Experiment } from "@/types";

export const metadata = pageMetadata({
  title: "Lab",
  description:
    "Experiments, prototypes and small technical explorations by Izzat — including an in-browser AES-GCM tamper demo and an interactive type study.",
  path: "/lab",
});

const demos: Record<NonNullable<Experiment["demo"]>, () => React.ReactNode> = {
  "cipher-bench": CipherBench,
  "type-study": TypeStudy,
};

export default function LabPage() {
  return (
    <>
      <PageHeader
        label="Lab"
        count={experiments.length}
        title="Ideas, before they're projects."
        intro={
          <p>
            Prototypes, experiments and things I&apos;m figuring out. Some will grow into projects;
            some are here to learn from. Everything below runs live in your browser.
          </p>
        }
      />

      <Container className="pb-24 md:pb-32">
        {experiments.length === 0 ? (
          <p className="border-t border-line py-16 text-muted">
            No experiments yet — the first ones are on the bench.
          </p>
        ) : (
          <ol className="border-t border-line">
            {experiments.map((exp, i) => {
              const Demo = exp.demo ? demos[exp.demo] : null;
              return (
                <li key={exp.slug} id={exp.slug} className="border-b border-line py-14 md:py-20">
                  <Reveal className="grid gap-10 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-4" data-reveal>
                      <p className="meta">
                        Exp. {String(i + 1).padStart(2, "0")} — {formatMonth(exp.createdAt)}
                      </p>
                      <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                        {exp.title}
                      </h2>
                      <p className="mt-4 max-w-[48ch] text-muted">{exp.description}</p>
                      <dl className="mt-6 flex flex-col gap-3">
                        <div>
                          <dt className="sr-only">Status</dt>
                          <dd>
                            <StatusMeter status={exp.status} />
                          </dd>
                        </div>
                        <div>
                          <dt className="sr-only">Category</dt>
                          <dd>
                            <Meta>{exp.category}</Meta>
                          </dd>
                        </div>
                        <div>
                          <dt className="sr-only">Technologies</dt>
                          <dd className="flex flex-wrap gap-2">
                            {exp.technologies.map((t) => (
                              <Tag key={t}>{t}</Tag>
                            ))}
                          </dd>
                        </div>
                      </dl>
                      {exp.githubUrl && (
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw mt-6 inline-block text-ink hover:text-accent"
                        >
                          Source on GitHub
                        </a>
                      )}
                    </div>
                    <div className="md:col-span-8" data-reveal>
                      {Demo ? (
                        <Demo />
                      ) : exp.image ? (
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line">
                          <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        )}
      </Container>
    </>
  );
}
