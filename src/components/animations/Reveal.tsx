"use client";

import { useRef, type ReactNode } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered entrance for a group of elements, using one ScrollTrigger.
 *
 * Mark descendants with:
 *  - data-reveal="mask"  — text that rises out of an overflow-clipped line
 *  - data-reveal="image" — media revealed with a clip wipe and settle
 *  - data-reveal         — fade and rise
 * If nothing is marked, direct children fade and rise.
 *
 * Content stays fully visible without JS and under reduced motion.
 */
export function Reveal({
  children,
  className,
  start = "top 82%",
  stagger = motion.stagger * 1.4,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(motion.queries.motionOK, () => {
        let items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        if (!items.length) items = Array.from(root.children) as HTMLElement[];

        const masks = items.filter((el) => el.dataset.reveal === "mask");
        const images = items.filter((el) => el.dataset.reveal === "image");
        const fades = items.filter((el) => !masks.includes(el) && !images.includes(el));

        // One ScrollTrigger on the timeline (never on child tweens); plays
        // once when the group enters.
        const tl = gsap.timeline({
          defaults: { duration: motion.duration.base, ease: motion.ease.out },
          // Plays once (default toggleActions: play none none none). Not
          // `once: true` — a trigger that kills itself during a batch refresh
          // (e.g. a hidden route re-appearing while scrolled down) splices
          // ScrollTrigger's internal list mid-loop and crashes.
          scrollTrigger: { trigger: root, start },
        });

        if (masks.length) {
          tl.from(masks, { yPercent: 110, duration: 1, ease: motion.ease.expo, stagger: 0.08 }, 0);
        }
        if (images.length) {
          tl.fromTo(
            images,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: motion.ease.inOut,
              stagger: 0.12,
              clearProps: "clipPath",
            },
            0,
          );
          images.forEach((img, i) => {
            const inner = img.firstElementChild;
            if (inner) {
              tl.from(inner, { scale: 1.12, duration: 1.4 }, i * 0.12);
            }
          });
        }
        if (fades.length) {
          tl.from(
            fades,
            { y: 28, autoAlpha: 0, stagger },
            masks.length || images.length ? 0.12 : 0,
          );
        }
      });

      return () => mm.revert();
    },
    {},
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
