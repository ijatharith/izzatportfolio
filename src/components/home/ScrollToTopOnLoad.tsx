"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

/**
 * A reload of the home page always starts at the top. The browser would
 * otherwise restore the old scroll position after the hero has laid out, which
 * puts the page a little lower than the top. Scroll restoration is turned back
 * on when the visitor leaves home, so other pages keep the browser default.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });

    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  return null;
}
