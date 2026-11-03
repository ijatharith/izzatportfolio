import { profile } from "@/data/profile";
import { ButtonLink, Container, Meta } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";

export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="pb-24 pt-8 md:pb-32">
      <Container>
        <Reveal className="rounded-[20px] bg-ink px-6 py-14 text-paper md:px-14 md:py-20">
          <p data-reveal>
            <Meta className="text-paper/60">Open to collaborate</Meta>
          </p>
          <h2
            id="cta-title"
            className="mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em]"
          >
            <span className="mask-line">
              <span className="block" data-reveal="mask">
                Have an idea?
              </span>
            </span>
            <span className="mask-line">
              <span className="block" data-reveal="mask">
                Let&apos;s build something.
              </span>
            </span>
          </h2>
          <div
            className="mt-12 flex flex-col gap-8 border-t border-paper/15 pt-8 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <p className="max-w-[42ch] text-paper/70">
              Projects, collaborations or a conversation about an idea — send a message and
              I&apos;ll reply by email.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <ButtonLink
                href={`mailto:${profile.email}`}
                variant="secondary"
                icon={false}
                className="border-paper/40 text-paper hover:bg-paper hover:text-ink"
              >
                Email me
              </ButtonLink>
            </div>
          </div>
          {profile.socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta link-draw text-paper/80 hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
