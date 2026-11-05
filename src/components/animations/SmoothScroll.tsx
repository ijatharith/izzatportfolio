"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, motion, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * Smooth wheel scrolling with Lenis, driven by GSAP's ticker so Lenis and
 * ScrollTrigger update on the same frame (no jitter on scrubbed or pinned
 * animations). Touch keeps native scrolling, and it stays off entirely for
 * readers who prefer reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia(motion.queries.reduce);
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || media.matches) return;
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      ScrollTrigger.refresh();
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenis = null;
      setLenis(null);
    };

    // When navigation starts, drop any in-flight smoothing. Otherwise Lenis
    // keeps easing toward the old page's target and drags the new page away
    // from the top where Next.js placed it.
    const settle = () => {
      if (!lenis) return;
      lenis.stop();
      lenis.start();
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (link instanceof HTMLAnchorElement && link.origin === location.origin && !link.target) settle();
    };

    // Follow the reduced-motion setting live, not just on load.
    const onChange = () => (media.matches ? stop() : start());
    start();
    media.addEventListener("change", onChange);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", settle);
    return () => {
      media.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", settle);
      stop();
    };
  }, []);

  // Recalculate the scroll limit once the new page has rendered.
  useEffect(() => {
    getLenis()?.resize();
  }, [pathname]);

  return null;
}
