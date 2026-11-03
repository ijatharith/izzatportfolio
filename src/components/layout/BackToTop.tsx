"use client";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap, motion } from "@/lib/gsap";

gsap.registerPlugin(ScrollToPlugin);

/**
 * "Back to top" as a real #top link (works without JS). With JS it eases
 * up the page, stops if the reader scrolls themselves (autoKill), jumps
 * instantly under reduced motion, and moves keyboard focus to the top.
 */
export function BackToTop({ className }: { className?: string }) {
  const focusTop = () => {
    document.querySelector<HTMLElement>("#main")?.focus({ preventScroll: true });
  };

  return (
    <a
      href="#top"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (window.matchMedia(motion.queries.reduce).matches) {
          window.scrollTo(0, 0);
          focusTop();
          return;
        }
        gsap.to(window, {
          scrollTo: { y: 0, autoKill: true },
          duration: Math.min(1.4, 0.5 + window.scrollY / 4000),
          ease: motion.ease.inOut,
          onComplete: focusTop,
        });
      }}
    >
      Back to top
    </a>
  );
}
