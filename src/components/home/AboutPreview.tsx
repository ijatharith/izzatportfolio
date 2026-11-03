import { profile } from "@/data/profile";
import { interests } from "@/data/skills";
import { Container, Meta, TextLink } from "@/components/ui/primitives";
import { ScrubText } from "@/components/animations/ScrubText";
import { Reveal } from "@/components/animations/Reveal";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="py-24 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <Meta>About</Meta>
            <h2 id="about-preview-title" className="sr-only">
              About {profile.fullName}
            </h2>
          </div>
          <div className="md:col-span-9">
            <ScrubText
              text={profile.about.preview}
              className="text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.12] tracking-[-0.04em]"
            />
          </div>
        </div>

        <Reveal className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 md:col-start-4" data-reveal>
            <p className="text-muted">{profile.about.intro[1]}</p>
          </div>
          <div className="md:col-span-3 md:col-start-10" data-reveal>
            <p className="meta">Interests</p>
            <ul className="mt-3 flex flex-col gap-1">
              {interests.map((i) => (
                <li key={i} className="text-[0.9375rem]">
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <TextLink href="/about">More about me</TextLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
