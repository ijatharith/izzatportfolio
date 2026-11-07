import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { getProject, getRelatedProjects, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { profile } from "@/data/profile";
import { ButtonLink, Container, Meta, StatusMeter, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

// Known slugs are prerendered below. Unknown slugs must resolve on the
// server to return a real 404, so this route is allowed to block.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    // Projects with a real image use it as the link preview.
    image: project.thumbnail && project.thumbnailSize
      ? {
          url: project.thumbnail,
          ...project.thumbnailSize,
          alt: project.thumbnailAlt ?? `${project.title} preview`,
        }
      : undefined,
  });
}

/** Case-study sections, rendered only when the content exists. */
function caseSections(p: Project) {
  return [
    { id: "about", title: "About the project", paragraphs: p.about },
    { id: "problem", title: "Problem", body: p.problem },
    { id: "objectives", title: "Objectives", list: p.objectives },
    { id: "role", title: "My role", body: p.role },
    { id: "solution", title: "Solution", body: p.solution },
    { id: "architecture", title: "Architecture and design", body: p.architecture },
    { id: "process", title: "Development process", body: p.process },
    { id: "challenges", title: "Challenges", list: p.challenges },
    { id: "results", title: p.status === "Completed" ? "Results" : "Current progress", body: p.results },
    { id: "learnings", title: "Lessons learned", list: p.learnings },
  ].filter(
    (s) =>
      (s.body && s.body.length > 0) ||
      (s.list && s.list.length > 0) ||
      (s.paragraphs && s.paragraphs.length > 0),
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = caseSections(project);
  const related = getRelatedProjects(project, 2);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Status", value: <StatusMeter status={project.status} note={project.statusNote} /> },
    { label: "Category", value: project.category.join(", ") },
  ];
  if (project.context) facts.push({ label: "Context", value: project.context });
  if (project.year) facts.push({ label: "Year", value: String(project.year) });

  return (
    <article>
      <header>
        <Container className="pb-12 pt-10 md:pb-16 md:pt-16">
          <Link
            href="/projects"
            className="meta inline-flex items-center gap-1.5 hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <p data-intro>
                <Meta>{project.category.join(" / ")}</Meta>
              </p>
              <h1 className="mt-5 text-page font-semibold" data-intro style={{ "--d": "80ms" } as React.CSSProperties}>
                {project.title}
              </h1>
              <p className="mt-8 max-w-[60ch] text-lead text-muted" data-intro style={{ "--d": "160ms" } as React.CSSProperties}>
                {project.overview ?? project.description}
              </p>
            </div>

            <dl className="self-end md:col-span-4" data-intro style={{ "--d": "240ms" } as React.CSSProperties}>
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-t border-line py-3">
                  <dt className="meta">{f.label}</dt>
                  <dd className="text-[0.9375rem]">{f.value}</dd>
                </div>
              ))}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                  {project.liveUrl && (
                    <ButtonLink href={project.liveUrl} className="h-10 px-4 text-sm">
                      Visit live site
                    </ButtonLink>
                  )}
                  {project.githubUrl && (
                    <ButtonLink href={project.githubUrl} variant="secondary" className="h-10 px-4 text-sm">
                      Source on GitHub
                    </ButtonLink>
                  )}
                </div>
              )}
            </dl>
          </div>
        </Container>
      </header>

      <Container>
        <Reveal>
          <div data-reveal="image">
            <ProjectVisual
              project={project}
              preload
              className={
                project.thumbnail ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[16/10]"
              }
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
          </div>
          {!project.thumbnail && (
            <p className="meta mt-3" data-reveal>
              Illustrative cover, not a screenshot.
            </p>
          )}
        </Reveal>
      </Container>

      <Container className="py-20 md:py-28">
        {project.status === "Proposal" && (
          <aside className="mb-14 flex gap-4 rounded-[var(--radius-card)] bg-wash px-5 py-5 md:mb-20 md:px-7">
            <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="max-w-[70ch] text-[0.9375rem]">
              <strong className="font-semibold">This is a proposal.</strong> It presents a design and
              business concept. It is not an official redesign and has not been deployed.
            </p>
          </aside>
        )}

        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <section aria-labelledby="scope-title" data-reveal>
              <h2 id="scope-title" className="meta">
                Scope
              </h2>
              <ul className="mt-4">
                {project.scope.map((s) => (
                  <li key={s} className="border-b border-line py-3 text-[1.0625rem] tracking-[-0.01em]">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
            {project.technologies.length > 0 && (
              <section aria-labelledby="tech-title" className="mt-12" data-reveal>
                <h2 id="tech-title" className="meta">
                  Technologies and tools
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            {sections.length > 0 ? (
              <div className="flex flex-col gap-14">
                {sections.map((s) => (
                  <Reveal key={s.id}>
                    <section aria-labelledby={`${s.id}-title`}>
                      <h2 id={`${s.id}-title`} className="text-[1.75rem] font-semibold tracking-[-0.035em]" data-reveal>
                        {s.title}
                      </h2>
                      {s.body && <p className="mt-4 max-w-[64ch] text-muted" data-reveal>{s.body}</p>}
                      {s.paragraphs?.map((para) => (
                        <p key={para.slice(0, 40)} className="mt-4 max-w-[64ch] text-muted" data-reveal>
                          {para}
                        </p>
                      ))}
                      {s.list && (
                        <ul className="mt-4 flex flex-col gap-2" data-reveal>
                          {s.list.map((item) => (
                            <li key={item} className="max-w-[64ch] text-muted">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="rounded-[var(--radius-card)] border border-dashed border-line-strong p-7 md:p-10" data-reveal>
                  <Meta>Case study</Meta>
                  <p className="mt-4 text-[clamp(1.375rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.03em]">
                    The full write-up — problem, process, decisions and outcomes — is being prepared
                    as this project develops.
                  </p>
                  <p className="mt-4 text-muted">
                    Want to hear about it sooner? Ask me directly and I&apos;ll walk you through it.
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/contact" variant="secondary" icon={false}>
                      Ask about {project.title}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section aria-labelledby="preview-title" className="mt-20 md:mt-28">
            <h2 id="preview-title" className="meta">
              Preview
            </h2>
            {/* One screen per row: app screenshots need full width to be legible. */}
            <Reveal className="mt-6 grid gap-8 md:gap-10">
              {project.gallery.map((img) => (
                <div
                  key={img.src}
                  data-reveal="image"
                  className={cn(
                    "relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white",
                    !(img.width && img.height) && "aspect-[4/3]",
                  )}
                  // Known proportions: show the whole screen, uncropped.
                  style={img.width && img.height ? { aspectRatio: `${img.width} / ${img.height}` } : undefined}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    className={img.width && img.height ? "object-contain" : "object-cover"}
                  />
                </div>
              ))}
            </Reveal>
          </section>
        )}
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line py-20 md:py-28">
          <Container>
            <h2 id="related-title" className="text-section font-semibold">
              Related projects
            </h2>
            <Reveal className="mt-12 grid gap-12 md:grid-cols-2 md:gap-8">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} sizes="(min-width: 768px) 50vw, 100vw" />
              ))}
            </Reveal>
          </Container>
        </section>
      )}

      {next && next.slug !== project.slug && (
        <Container className="pb-20">
          <Link
            href={`/projects/${next.slug}`}
            className="group block rounded-[20px] bg-ink px-6 py-10 text-paper md:px-12 md:py-14"
          >
            <span className="meta text-paper/60">Next project</span>
            <span className="mt-3 block text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.055em] transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:translate-x-2">
              {next.title}
            </span>
          </Link>
        </Container>
      )}

      <p className="sr-only">Project by {profile.fullName}.</p>
    </article>
  );
}
