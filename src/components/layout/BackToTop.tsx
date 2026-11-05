"use client";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap, motion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

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
        const duration = Math.min(1.4, 0.5 + window.scrollY / 4000);
        // With smooth scrolling on, let Lenis drive the scroll so the two
        // don't fight over the position.
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(0, {
            duration,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
            onComplete: focusTop,
          });
          return;
        }
        gsap.to(window, {
          scrollTo: { y: 0, autoKill: true },
          duration,
          ease: motion.ease.inOut,
          onComplete: focusTop,
        });
      }}
    >
      Back to top
    </a>
  );
}
