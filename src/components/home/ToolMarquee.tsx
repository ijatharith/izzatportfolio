"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap, motion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * A continuous carousel of the apps and tools from the Uses page.
 *
 * - Pauses on hover, with a visible Pause/Play button, and while off-screen.
 * - Reduced motion: no movement — the list simply wraps.
 * - Screen readers get the list once; the loop's duplicate is aria-hidden.
 */
export function ToolMarquee({ tools }: { tools: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const userPaused = useRef(false);
  const hovering = useRef(false);
  const onScreen = useRef(true);
  const [paused, setPaused] = useState(false);

  const sync = () => {
    const tween = tweenRef.current;
    if (!tween) return;
    const shouldPlay = !userPaused.current && !hovering.current && onScreen.current;
    tween.paused(!shouldPlay);
  };

  useGSAP(
    () => {
      // Capture real elements (refs are cleared while a route is hidden).
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        // The track holds the list twice; moving it by half loops seamlessly.
        tweenRef.current = gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: Math.max(24, tools.length * 2.2),
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            onScreen.current = self.isActive;
            sync();
          },
        });
        sync();
        return () => {
          tweenRef.current = null;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [tools.length] },
  );

  const toggle = () => {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    sync();
  };

  const pill =
    "inline-flex h-10 shrink-0 items-center rounded-full border border-line bg-white px-4 text-[0.9375rem] tracking-[-0.01em] text-ink";

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="meta">Works with</span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          className="meta inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-ink transition-colors hover:bg-line motion-reduce:hidden"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> tools carousel</span>
        </button>
      </div>

      <div
        ref={rootRef}
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]"
        onPointerEnter={() => {
          hovering.current = true;
          sync();
        }}
        onPointerLeave={() => {
          hovering.current = false;
          sync();
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-2 motion-reduce:block motion-reduce:w-auto"
        >
          <ul
            className="flex shrink-0 gap-2 pr-2 motion-reduce:flex-wrap motion-reduce:pr-0"
            aria-label="Apps and tools I've worked with"
          >
            {tools.map((t) => (
              <li key={t} className={pill}>
                {t}
              </li>
            ))}
          </ul>
          <ul className="flex shrink-0 gap-2 pr-2 motion-reduce:hidden" aria-hidden="true">
            {tools.map((t) => (
              <li key={t} className={pill}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
