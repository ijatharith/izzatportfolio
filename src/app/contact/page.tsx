import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { Container, Meta } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { LocalTime } from "@/components/layout/LocalTime";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Izzat about projects, collaborations and ideas.",
  path: "/contact",
});

export default function ContactPage() {
  const formEnabled = Boolean(process.env.RESEND_API_KEY);

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's build something."
        intro={
          <p>
            Have a project, a collaboration or an idea you want to talk through? Send a message
            or email me directly — I read everything and reply by email.
          </p>
        }
      />

      <Container className="pb-24 md:pb-32">
        <div className="grid gap-16 border-t border-line pt-14 md:grid-cols-12 md:gap-8 md:pt-20">
          <Reveal className="flex flex-col gap-10 md:col-span-4">
            <div data-reveal>
              <Meta>Email</Meta>
              <a
                href={`mailto:${profile.email}`}
                className="link-draw mt-3 block break-all text-[clamp(1.25rem,2vw,1.625rem)] font-medium tracking-[-0.03em] hover:text-accent"
              >
                {profile.email}
              </a>
              <div className="mt-4">
                <CopyEmail email={profile.email} />
              </div>
            </div>

            {profile.socials.length > 0 && (
              <div data-reveal>
                <Meta>Elsewhere</Meta>
                <ul className="mt-3 flex flex-col">
                  {profile.socials.map((s) => (
                    <li key={s.label} className="border-b border-line">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline justify-between py-3 hover:text-accent"
                      >
                        <span className="text-[1.125rem] font-medium tracking-[-0.02em]">{s.label}</span>
                        {s.handle && <span className="meta">{s.handle}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div data-reveal>
              <Meta>Based in</Meta>
              <p className="mt-3 text-[1.125rem]">
                {profile.location} — <LocalTime timeZone={profile.timeZone} />
              </p>
            </div>
          </Reveal>

          <section aria-labelledby="form-title" className="md:col-span-7 md:col-start-6">
            <h2 id="form-title" className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.045em]">
              Send a message
            </h2>
            <ContactForm enabled={formEnabled} email={profile.email} />
          </section>
        </div>
      </Container>
    </>
  );
}
