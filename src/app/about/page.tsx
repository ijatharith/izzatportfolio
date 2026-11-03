import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { capabilities, interests } from "@/data/skills";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink, Container, Meta } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialRow } from "@/components/ui/EditorialRow";
import { ToolBars } from "@/components/about/ToolBars";
import { LocalTime } from "@/components/layout/LocalTime";
import type { TimelineEntry } from "@/types";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Izzat is a multidisciplinary developer and designer in Malaysia working across software, cybersecurity, AI, design and entrepreneurship.",
  path: "/about",
});

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="border-l border-line">
      {entries.map((e) => (
        <li key={`${e.period}-${e.title}`} className="relative pb-8 pl-6 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[4.5px] top-2 size-2 rounded-full bg-accent" />
          <p className="meta">
            {e.period}
          </p>
          <p className="mt-1 text-[1.25rem] font-medium tracking-[-0.025em]">
            {e.title}
            {e.organisation && <span className="text-muted">, {e.organisation}</span>}
          </p>
          {e.description && <p className="mt-2 max-w-[60ch] text-muted">{e.description}</p>}
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const { about } = profile;
  return (
    <>
      <PageHeader
        label="About"
        title="Developer, designer, builder."
        intro={
          <>
            <p className="text-ink">{about.intro[0]}</p>
            <p className="mt-4">{about.intro[1]}</p>
          </>
        }
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Meta>
            {profile.location}, <LocalTime timeZone={profile.timeZone} />
          </Meta>
          {profile.cvUrl && (
            <ButtonLink href={profile.cvUrl} variant="secondary" external download>
              Download CV
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      {profile.portrait && (
        <Container className="pb-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-line md:w-2/3">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="pb-12">
        {profile.education.length > 0 && (
          <EditorialRow
            label="Education"
            count={profile.education.length}
            id="education-title"
            title="Background and education"
          >
            <Timeline entries={profile.education} />
          </EditorialRow>
        )}

        {profile.timeline.length > 0 && (
          <EditorialRow
            label="Experience"
            count={profile.timeline.length}
            id="timeline-title"
            title="Experience timeline"
          >
            <Timeline entries={profile.timeline} />
          </EditorialRow>
        )}

        <EditorialRow
          label="Interests"
          count={interests.length}
          id="interests-title"
          title="Professional interests"
        >
          <ul className="flex flex-col">
            {interests.map((item) => (
              <li
                key={item}
                className="border-b border-line py-3 text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.035em] first:pt-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </EditorialRow>

        <EditorialRow
          label="Capabilities"
          count={capabilities.length}
          id="capabilities-title"
          title="Technical capabilities"
        >
          <p className="mb-6 max-w-[56ch] text-muted">
            The tools and technologies used across my projects, grouped by discipline. The{" "}
            <Link href="/uses" className="link-draw text-ink hover:text-accent">
              Uses
            </Link>{" "}
            page has the full list.
          </p>
          <dl>
            {capabilities.map((group) => (
              <div
                key={group.discipline}
                className="grid gap-1 border-t border-line py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
              >
                <dt className="meta pt-0.5">{group.discipline}</dt>
                <dd className="text-[1.0625rem]">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </EditorialRow>

        <EditorialRow label="Design" id="design-title" title="Design experience">
          <p className="max-w-[60ch] text-lead text-muted">{about.designExperience}</p>
          {profile.creativeTools.length > 0 && (
            <div className="mt-10 max-w-[480px]">
              <p className="meta mb-4">Creative tools, self-rated</p>
              <ToolBars tools={profile.creativeTools} />
            </div>
          )}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/projects/palas-creative" className="link-draw text-ink hover:text-accent">
                Palas Creative
              </Link>
            </li>
          </ul>
        </EditorialRow>

        <EditorialRow
          label="Initiatives"
          id="leadership-title"
          title="Leadership and entrepreneurship"
        >
          <p className="max-w-[60ch] text-lead text-muted">{about.leadership}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/projects/palas-creative" className="link-draw text-ink hover:text-accent">
                Palas Creative
              </Link>
            </li>
            <li>
              <Link
                href="/projects/bayarswift"
                className="link-draw text-ink hover:text-accent"
              >
                BayarSwift
              </Link>
            </li>
          </ul>
        </EditorialRow>

        {profile.languages.length > 0 && (
          <EditorialRow
            label="Languages"
            count={profile.languages.length}
            id="languages-title"
            title="Languages"
          >
            <dl>
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3 first:pt-0"
                >
                  <dt className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium tracking-[-0.035em]">
                    {lang.name}
                  </dt>
                  <dd className="meta text-ink">{lang.level}</dd>
                </div>
              ))}
            </dl>
            {profile.languagesNote && <p className="mt-4 text-muted">{profile.languagesNote}</p>}
          </EditorialRow>
        )}

        <section className="border-t border-line py-16 md:py-24" aria-labelledby="about-cta">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2
              id="about-cta"
              className="max-w-[16ch] text-section font-semibold"
            >
              Have a project in mind?
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
              <ButtonLink href="/projects" variant="secondary" icon={false}>
                See projects
              </ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
