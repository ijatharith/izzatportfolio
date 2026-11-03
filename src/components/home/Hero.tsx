"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { ButtonLink, Meta } from "@/components/ui/primitives";
import { LocalTime } from "@/components/layout/LocalTime";
import { toolGroups } from "@/data/tools";
import { ToolMarquee } from "./ToolMarquee";

// Every app and tool on the Uses page, in the "Works with" carousel.
const worksWith = [...new Set(toolGroups.flatMap((g) => g.tools.map((t) => t.name)))];

/**
 * The tagline is drafted, then made real: construction guides draw in,
 * "Ideas" appears as a blueprint outline, "into reality." rises as an
 * outline and is then filled with ink.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Capture the real element once. Next keeps visited routes mounted but
      // hidden, and React clears refs while hidden — so never read ref.current
      // or scoped string selectors later from inside GSAP callbacks.
      const root = ref.current;
      if (!root) return;
      const q = (sel: string) => root.querySelectorAll<HTMLElement>(sel);
      const mm = gsap.matchMedia();

      mm.add(motion.queries.motionOK, () => {
        // Sequence: draft the grid → make the name real → introduce the
        // roles → bring in everything else. Retime by moving the labels.
        const tl = gsap.timeline({
          defaults: { duration: 0.9, ease: motion.ease.expo },
        });

        tl.addLabel("draft", 0)
          .addLabel("realise", "draft+=0.35")
          .addLabel("roles", "realise+=0.2")
          .addLabel("details", "roles+=0.25");

        tl.fromTo(
          q("[data-hero-guide]"),
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.2, stagger: 0.035, ease: motion.ease.inOut },
          "draft",
        )
          // The idea becomes real: ink sweeps across the outlined name.
          .fromTo(
            q("[data-hero-fill]"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: motion.ease.inOut },
            "realise",
          )
          .fromTo(
            q("[data-hero-word]"),
            { opacity: 0, yPercent: 100 },
            { opacity: 1, yPercent: 0, stagger: 0.035 },
            "roles",
          )
          .fromTo(
            q("[data-hero-rest]"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: motion.ease.out },
            "details",
          );
      });

      // Subtle parallax as the hero scrolls away — desktop only.
      mm.add(motion.queries.desktop, () => {
        gsap.to(q("[data-hero-title]"), {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    {},
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Construction guides — the grid the idea is drafted on */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="mx-auto grid h-full max-w-[1280px] grid-cols-4 px-[var(--gutter)] md:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              data-hero-guide
              className={`border-l border-line ${i >= 4 ? "hidden md:block" : ""} ${i === 11 ? "border-r" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-[1280px] flex-col px-[var(--gutter)] pb-10 pt-8 md:pb-14 md:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-3" data-hero-rest>
          <Meta>
            {profile.location}, <LocalTime timeZone={profile.timeZone} />
          </Meta>
          {profile.currentActivity && (
            <ActivityIndicator {...profile.currentActivity} />
          )}
        </div>

        <div className="mt-auto grid gap-10 pt-16 md:grid-cols-12 md:gap-8">
          <h1
            id="hero-title"
            data-hero-title
            className="font-semibold md:col-span-12"
          >
            <span className="sr-only">
              {profile.greeting} {profile.fullName}
            </span>
            {/* Greeting: quiet, so the name carries the line. Solid rather
                than outlined — Geist's variable outlines overlap on glyphs
                like "H", which a text stroke would expose. */}
            <span
              aria-hidden="true"
              className="block text-[clamp(1.875rem,4.6vw,4rem)] font-medium leading-[1] tracking-[-0.05em] text-muted"
            >
              {profile.greeting}
            </span>
            {/* Name: drafted in outline, then filled with ink */}
            <span
              aria-hidden="true"
              className="mask-line mt-2 text-[clamp(3.5rem,20vw,7rem)] leading-[0.86] tracking-[-0.065em] md:mt-3 md:text-display"
            >
              <span className="relative block">
                <span className="type-idea block">
                  {profile.fullName.split(" ").map((part, i) => (
                    <span key={i}>
                      {i > 0 && <br className="md:hidden" />}
                      {i > 0 && <span className="hidden md:inline"> </span>}
                      {part}
                    </span>
                  ))}
                </span>
                <span className="type-real absolute inset-0 block" data-hero-fill>
                  {profile.fullName.split(" ").map((part, i) => (
                    <span key={i}>
                      {i > 0 && <br className="md:hidden" />}
                      {i > 0 && <span className="hidden md:inline"> </span>}
                      {part}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          {profile.portrait && (
            <div className="md:col-span-3" data-hero-rest>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-line">
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  fill
                  preload
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 md:mt-14 md:grid-cols-12 md:gap-8">
          <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.035em] md:col-span-6">
            {profile.roles.join(", ").split(" ").map((word, i, all) => (
              <span key={i} className="inline-block overflow-clip pb-[0.08em] align-top">
                <span data-hero-word className="inline-block">
                  {word}
                  {i < all.length - 1 ? "\u00a0" : ""}
                </span>
              </span>
            ))}
          </p>

          <div className="flex flex-col gap-6 md:col-span-5 md:col-start-8" data-hero-rest>
            <p className="max-w-[46ch] text-muted">{profile.description}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects">Explore my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary" icon={false}>
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-10"
          data-hero-rest
        >
          <CodeCard />
          <div className="flex min-w-0 flex-col gap-3 md:max-w-[620px] md:flex-1">
            <ToolMarquee tools={worksWith} />
            <SocialRow />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityIndicator({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span aria-hidden="true" className="pulse-dot block size-2 rounded-full bg-success text-success" />
      <span className="meta text-ink">
        {label} <span className={href ? "underline decoration-line-strong underline-offset-4" : ""}>{value}</span>
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="inline-flex items-center gap-2.5 hover:text-accent">
      {content}
    </Link>
  ) : (
    <span className="inline-flex items-center gap-2.5">{content}</span>
  );
}

/** A small code card that says what the work is about, in code. */
function CodeCard() {
  return (
    <figure
      className="w-full max-w-[420px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-white"
      aria-label="Code card: a summary of what Izzat builds"
    >
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="meta">izzat.ts</span>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-accent" />
        </span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.75rem] sm:text-[0.8125rem] leading-[1.7] text-ink">
        <code>
          <span className="text-muted">const</span> izzat = {"{"}
          {"\n"}  builds: [<span className="text-accent">&quot;software&quot;</span>,{" "}
          <span className="text-accent">&quot;security&quot;</span>,{" "}
          <span className="text-accent">&quot;design&quot;</span>],
          {"\n"}  based: <span className="text-accent">&quot;Malaysia&quot;</span>,
          {"\n"}  motto: <span className="text-accent">&quot;Ideas into reality.&quot;</span>,
          {"\n"}{"}"};
        </code>
      </pre>
    </figure>
  );
}

function SocialRow() {
  if (profile.socials.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end" aria-label="Elsewhere">
      {profile.socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="meta link-draw text-ink hover:text-accent"
          >
            {s.label}
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${profile.email}`} className="meta link-draw text-ink hover:text-accent">
          Email
        </a>
      </li>
    </ul>
  );
}
