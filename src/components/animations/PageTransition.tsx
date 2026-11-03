"use client";

import { useRef, type ReactNode } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";

// The first page load has its own intro sequence; only route changes get
// the transition. Comparing paths (rather than a "first run" flag) keeps
// this correct when effects run twice in development.
let lastPath: string | null = null;

/**
 * Route entrance: an accent line sweeps across the top while the new page
 * settles into place. Used from app/template.tsx so it runs on every route.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const path = window.location.pathname;
      const isRouteChange = lastPath !== null && lastPath !== path;
      lastPath = path;
      if (!isRouteChange) return;
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        // The accent line sweeps across while the page settles in beneath it.
        const tl = gsap.timeline({ defaults: { duration: 0.55, ease: motion.ease.out } });
        tl.addLabel("sweep", 0)
          .fromTo(
            wipeRef.current,
            { scaleX: 0, transformOrigin: "left center", autoAlpha: 1 },
            { scaleX: 1, duration: 0.5, ease: motion.ease.inOut },
            "sweep",
          )
          .fromTo(
            ref.current,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, clearProps: "transform,opacity,visibility" },
            "sweep+=0.08",
          )
          .to(wipeRef.current, { autoAlpha: 0, duration: 0.25 }, "sweep+=0.45");
      });
      return () => mm.revert();
    },
    {},
  );

  return (
    <>
      <div
        ref={wipeRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-x-0 top-0 z-[70] h-[3px] bg-accent"
      />
      <div ref={ref}>{children}</div>
    </>
  );
}
