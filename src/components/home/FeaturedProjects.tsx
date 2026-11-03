import { getFeaturedProjects, projects } from "@/data/projects";
import { Container, TextLink } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

// Asymmetric editorial placement on a 3-row grid. The two tall cards each
// span two rows, so the left column (1 → 3) and right column (2 → 4) flow
// independently instead of every row stretching to its tallest card — that
// row-stretching is what left large empty gaps. DOM order stays 1, 2, 3, 4,
// so mobile stacking and keyboard order follow the featured order.
// Tall slots use a project's portrait image (thumbnailTall) when it has one.
const layout = [
  {
    col: "md:col-span-7 md:col-start-1 md:row-start-1",
    aspect: "aspect-[4/3]",
    tall: false,
    sizes: "(min-width: 768px) 56vw, 100vw",
  },
  {
    col: "md:col-span-4 md:col-start-9 md:row-start-1 md:row-span-2 md:pt-24",
    aspect: "aspect-[4/5]",
    tall: true,
    sizes: "(min-width: 768px) 30vw, 100vw",
  },
  {
    col: "md:col-span-4 md:col-start-2 md:row-start-2 md:row-span-2",
    aspect: "aspect-[4/5]",
    tall: true,
    sizes: "(min-width: 768px) 30vw, 100vw",
  },
  {
    col: "md:col-span-5 md:col-start-8 md:row-start-3",
    aspect: "aspect-[4/3]",
    tall: false,
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
];

export function FeaturedProjects() {
  const featured = getFeaturedProjects(4);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-title" className="py-24 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            id="featured-title"
            label="Selected work"
            count={featured.length}
            title="Ideas that became projects."
            aside={<TextLink href="/projects">See all projects ({projects.length})</TextLink>}
          />
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-20">
          {featured.map((project, i) => {
            const l = layout[i % layout.length];
            return (
              <Reveal key={project.slug} className={cn(l.col)}>
                <ProjectCard
                  project={project}
                  aspect={l.aspect}
                  tall={l.tall}
                  sizes={l.sizes}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
