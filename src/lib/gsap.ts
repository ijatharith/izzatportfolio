"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, client-side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

/** Shared motion tokens so every animation keeps the same rhythm. */
export const motion = {
  ease: {
    out: "power3.out",
    inOut: "power3.inOut",
    expo: "expo.out",
  },
  duration: {
    fast: 0.35,
    base: 0.7,
    slow: 1.1,
  },
  stagger: 0.05,
  /** matchMedia conditions used across components. */
  queries: {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduce: "(prefers-reduced-motion: reduce)",
    desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  },
} as const;

export { gsap, ScrollTrigger, useGSAP };
