"use client";

import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  mark: string;
  shape: "tile" | "round";
  level: number;
}

/**
 * Creative tools with self-rated levels, as on the CV. Each bar is a
 * `meter` with a text alternative, so the level never depends on the
 * visual length alone. Bars fill once when the list scrolls into view.
 */
export function ToolBars({ tools }: { tools: Tool[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      // Capture the real element once. Next keeps visited routes mounted but
      // hidden, and React clears refs while hidden — reading ref.current (or a
      // scoped string selector) later from a GSAP callback gave ScrollTrigger
      // an undefined trigger and crashed when leaving the About page.
      const root = ref.current;
      if (!root) return;
      const fills = root.querySelectorAll("[data-bar-fill]");
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        gsap.from(fills, {
          scaleX: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: motion.ease.out,
          // Plays once (default toggleActions). Not `once: true`: a self-killing
          // trigger can splice ScrollTrigger's list mid-refresh and crash.
          scrollTrigger: { trigger: root, start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    {},
  );

  return (
    <ul ref={ref} className="flex flex-col gap-4">
      {tools.map((tool) => {
        const level = Math.max(0, Math.min(100, tool.level));
        return (
          <li key={tool.name} className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center bg-accent text-white",
                tool.shape === "round"
                  ? "rounded-full text-[0.625rem] font-semibold italic tracking-[-0.02em]"
                  : "rounded-[9px] text-[1.0625rem] font-bold tracking-[-0.03em]",
              )}
            >
              {tool.mark}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-[0.9375rem] font-medium">{tool.name}</span>
              </div>
              <div
                role="meter"
                aria-label={`${tool.name}, self-rated`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={level}
                aria-valuetext={`${level} out of 100`}
                className="h-2.5 overflow-hidden rounded-full bg-line"
              >
                <div
                  data-bar-fill
                  className="h-full origin-left rounded-full bg-ink"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
