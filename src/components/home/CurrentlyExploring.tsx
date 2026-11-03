import { currentlyExploring } from "@/data/skills";
import { Container, Count, Meta } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";

export function CurrentlyExploring() {
  if (currentlyExploring.length === 0) return null;
  return (
    <section aria-labelledby="exploring-title" className="bg-wash py-20 md:py-28">
      <Container>
        <Reveal className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="flex items-baseline gap-2" data-reveal>
              <Meta>Now</Meta>
              <Count value={currentlyExploring.length} />
            </p>
            <h2
              id="exploring-title"
              className="mt-4 text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
              data-reveal
            >
              Currently exploring
            </h2>
          </div>
          <ul className="md:col-span-8">
            {currentlyExploring.map((item) => (
              <li
                key={item.topic}
                data-reveal
                className="flex flex-col gap-1 border-b border-accent/15 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-[1.25rem] font-medium tracking-[-0.025em]">{item.topic}</span>
                <span className="meta text-ink/70">{item.context}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
