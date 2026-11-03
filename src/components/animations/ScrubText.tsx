"use client";

import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * A statement whose words darken from faint to ink as it scrolls through
 * the viewport. Text is real, selectable and fully opaque without motion.
 */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      // Capture the real element once. Next keeps visited routes mounted but
      // hidden, and React clears refs while hidden — so never read ref.current
      // or scoped string selectors later from inside GSAP callbacks.
      const root = ref.current;
      if (!root) return;
      const words = root.querySelectorAll("[data-word]");
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        gsap.fromTo(
          words,
          // Starts at a 3.3:1 grey (large text stays legible) and darkens to ink.
          { color: "#8a8a89" },
          {
            color: "#171717",
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          },
        );
      });
      return () => mm.revert();
    },
    {},
  );

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i} data-word="">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
