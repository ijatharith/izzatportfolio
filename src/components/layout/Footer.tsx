import Link from "next/link";
import { profile } from "@/data/profile";
import { contactNavItem, navItems } from "@/lib/site";
import { Container, Meta } from "@/components/ui/primitives";
import { CurrentYear, LocalTime } from "./LocalTime";
import { FooterTagline } from "./FooterTagline";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer id="site-footer" className="mt-auto border-t border-line pt-16 md:pt-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Meta>Contact</Meta>
            <p className="mt-4 max-w-sm text-lead text-muted">
              Open to collaborations, projects and conversations.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-draw mt-4 inline-block break-all text-[clamp(1.375rem,2.6vw,2rem)] font-medium tracking-[-0.035em] transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <Meta>Navigation</Meta>
            <ul className="mt-4 flex flex-col gap-1.5">
              {[...navItems, contactNavItem].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-ink hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <Meta>Elsewhere</Meta>
            <ul className="mt-4 flex flex-col gap-1.5">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw text-ink hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="link-draw text-ink hover:text-accent">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <FooterTagline />
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © <CurrentYear /> {profile.fullName}. Designed and built by {profile.fullName}.
          </p>
          <p className="meta">
            {profile.location}, <LocalTime timeZone={profile.timeZone} />
          </p>
          <BackToTop className="meta link-draw hover:text-ink" />
        </div>
      </Container>
    </footer>
  );
}
