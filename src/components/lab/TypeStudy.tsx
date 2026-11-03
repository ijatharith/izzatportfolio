"use client";

import { useId, useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";

/**
 * The identity as an instrument: one dial moves the tagline from blueprint
 * outline (idea) to solid ink (reality); another sets the weight.
 */
export function TypeStudy() {
  const uid = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const fillInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const state = useRef({ fill: 35, weight: 600 });

  const apply = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--fill", `${state.current.fill}%`);
    el.style.setProperty("--wght", String(state.current.weight));
    if (fillInput.current) fillInput.current.value = String(Math.round(state.current.fill));
    if (weightInput.current) weightInput.current.value = String(Math.round(state.current.weight));
  };

  useGSAP(
    () => {
      apply();
      const target = state.current;
      return () => gsap.killTweensOf(target);
    },
    {},
  );

  const play = () => {
    const reduce = window.matchMedia(motion.queries.reduce).matches;
    gsap.killTweensOf(state.current);
    if (reduce) {
      state.current.fill = state.current.fill >= 100 ? 0 : 100;
      apply();
      return;
    }
    gsap
      .timeline({ onUpdate: apply })
      .to(state.current, { fill: 0, weight: 300, duration: 0.6, ease: motion.ease.inOut })
      .to(state.current, { fill: 100, weight: 700, duration: 1.6, ease: motion.ease.inOut });
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <div
        ref={stageRef}
        className="relative px-5 py-12 md:px-8 md:py-16"
        style={{ ["--fill" as string]: "35%", ["--wght" as string]: "600" }}
      >
        <p
          aria-hidden="true"
          className="type-idea whitespace-nowrap text-[clamp(2rem,6.6vw,4.75rem)] leading-[0.95] tracking-[-0.06em]"
          style={{ fontWeight: "var(--wght)" as unknown as number }}
        >
          {profile.tagline}
        </p>
        <p
          className="type-real absolute inset-x-5 top-12 whitespace-nowrap text-[clamp(2rem,6.6vw,4.75rem)] leading-[0.95] tracking-[-0.06em] md:inset-x-8 md:top-16"
          style={{
            fontWeight: "var(--wght)" as unknown as number,
            clipPath: "inset(0 calc(100% - var(--fill)) 0 0)",
          }}
        >
          {profile.tagline}
        </p>
      </div>
      <div className="grid gap-5 border-t border-line p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end md:p-7">
        <div>
          <label htmlFor={`${uid}-fill`} className="meta mb-2 flex justify-between">
            <span>Idea</span>
            <span>Reality</span>
          </label>
          <input
            ref={fillInput}
            id={`${uid}-fill`}
            type="range"
            min={0}
            max={100}
            defaultValue={35}
            aria-label="Idea to reality"
            onChange={(e) => {
              gsap.killTweensOf(state.current);
              state.current.fill = Number(e.target.value);
              apply();
            }}
            className="w-full accent-[var(--color-accent)]"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-wght`} className="meta mb-2 flex justify-between">
            <span>Weight</span>
            <span>300 – 800</span>
          </label>
          <input
            ref={weightInput}
            id={`${uid}-wght`}
            type="range"
            min={300}
            max={800}
            step={10}
            defaultValue={600}
            onChange={(e) => {
              gsap.killTweensOf(state.current);
              state.current.weight = Number(e.target.value);
              apply();
            }}
            className="w-full accent-[var(--color-accent)]"
          />
        </div>
        <button
          type="button"
          onClick={play}
          className="h-10 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Make it real
        </button>
      </div>
    </div>
  );
}
