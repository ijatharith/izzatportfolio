"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * ScrollTrigger refreshes itself on viewport resize, but not when content
 * changes the page's height — filtering projects, showing form errors,
 * revealing ciphertext in the Lab, fonts loading or a route change. Those
 * leave start/end positions stale (e.g. the footer tagline fill and the
 * progress bar). This watches the document height and refreshes, debounced,
 * only when it actually changes.
 */
export function ScrollTriggerSync() {
  useEffect(() => {
    let timer: number | undefined;
    let lastHeight = document.documentElement.scrollHeight;

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        if (height === lastHeight) return;
        lastHeight = height;
        ScrollTrigger.refresh();
      }, 200);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
