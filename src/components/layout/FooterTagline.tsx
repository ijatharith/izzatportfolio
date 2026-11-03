"use client";

import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";

/**
 * The tagline closes every page. It starts as a blueprint outline and fills
 * with ink as the reader reaches the end — the idea becomes real.
 * Without motion it is shown already filled.
 */
export function FooterTagline() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Capture the real element once. Next keeps visited routes mounted but
      // hidden, and React clears refs while hidden — so never read ref.current
      // or scoped string selectors later from inside GSAP callbacks.
      const root = ref.current;
      if (!root) return;
      const fill = root.querySelector("[data-footer-fill]");
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        gsap.fromTo(
          fill,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 95%",
              end: "bottom bottom",
              scrub: 0.5,
            },
          },
        );
      });
      return () => mm.revert();
    },
    {},
  );

  return (
    <div ref={ref} className="relative select-none" aria-hidden="true">
      <p className="type-idea whitespace-nowrap text-[clamp(2rem,9.4vw,8.1rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
        {profile.tagline}
      </p>
      <p
        data-footer-fill
        className="absolute inset-0 whitespace-nowrap text-[clamp(2rem,9.4vw,8.1rem)] font-semibold leading-[0.9] tracking-[-0.065em] type-real"
      >
        {profile.tagline}
      </p>
    </div>
  );
}
