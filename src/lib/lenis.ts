"use client";

import type Lenis from "lenis";

/**
 * The page's single Lenis instance, set by <SmoothScroll />. It is null on
 * the server, before mount, and when smooth scrolling is off (reduced
 * motion), so callers must always fall back to native scrolling.
 */
let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}
