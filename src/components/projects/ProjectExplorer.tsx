"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { Project } from "@/types";
import { Flip } from "gsap/Flip";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Registered here (not globally) so only the Projects page loads Flip.
gsap.registerPlugin(Flip);
import { StatusMeter } from "@/components/ui/primitives";
import { ProjectCard } from "./ProjectCard";
import { CoverArt } from "./covers";
import { featuredRank } from "@/data/projects";

type View = "grid" | "index";
const ALL = "All";

function matches(p: Project, q: string): boolean {
  if (!q) return true;
  const hay = [p.title, p.description, p.status, ...p.category, ...p.technologies, ...p.scope]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

export function ProjectExplorer({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [view, setView] = useState<View>("grid");
  const interacted = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Restore filters from the URL so filtered views can be shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const q = params.get("q");
    const v = params.get("view");
    // Syncing from an external source (the URL) on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (c && categories.includes(c)) setCategory(c);
    if (q) setQuery(q);
    if (v === "index" || v === "grid") setView(v);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [categories]);

  useEffect(() => {
    if (!interacted.current) return;
    const params = new URLSearchParams();
    if (category !== ALL) params.set("category", category);
    if (query) params.set("q", query);
    if (view !== "grid") params.set("view", view);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, query, view]);

  const results = useMemo(() => {
    const filtered = projects.filter(
      (p) => (category === ALL || p.category.includes(category)) && matches(p, query),
    );
    // Featured first, in their homepage order; the rest keep data order.
    return [...filtered].sort((a, b) => featuredRank(a) - featuredRank(b));
  }, [projects, category, query]);

  const countFor = (c: string) =>
    c === ALL ? projects.length : projects.filter((p) => p.category.includes(c)).length;

  const resultKey = `${view}|${results.map((r) => r.slug).join(",")}`;

  // Layout captured just before a filter change, consumed after React renders.
  const flipState = useRef<Flip.FlipState | null>(null);

  // Animate the result set after user input:
  //  - filtering in grid view → Flip: cards that stay slide to their new
  //    place, new ones fade in, so the change is easy to follow;
  //  - switching grid/index → the layout is entirely different, so the
  //    results simply rise in.
  useGSAP(
    () => {
      if (!interacted.current) return;
      // Capture the real element (refs are cleared while a route is hidden).
      const root = rootRef.current;
      if (!root) return;
      const state = flipState.current;
      flipState.current = null;
      const mm = gsap.matchMedia();
      mm.add(motion.queries.motionOK, () => {
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-flip-id]"));
        if (state && items.length) {
          Flip.from(state, {
            targets: items,
            duration: 0.6,
            ease: motion.ease.inOut,
            onEnter: (entering) =>
              gsap.fromTo(
                entering,
                { autoAlpha: 0, scale: 0.96 },
                { autoAlpha: 1, scale: 1, duration: 0.45, delay: 0.15, ease: motion.ease.out },
              ),
          });
          return;
        }
        gsap.from(root.querySelectorAll("[data-result]"), {
          y: 18,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: motion.ease.out,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [resultKey], revertOnUpdate: true },
  );

  const touch = () => {
    interacted.current = true;
  };

  /** Records the current grid layout so the next render can Flip from it. */
  const captureLayout = () => {
    touch();
    const root = rootRef.current;
    if (view !== "grid" || !root) return;
    flipState.current = Flip.getState(root.querySelectorAll("[data-flip-id]"));
  };

  const clear = () => {
    captureLayout();
    setQuery("");
    setCategory(ALL);
  };

  return (
    <div ref={rootRef}>
      {/* Controls */}
      <div className="flex flex-col gap-6 border-y border-line py-6 lg:flex-row lg:items-start lg:justify-between">
        <fieldset className="min-w-0">
          <legend className="meta mb-3">Filter by category</legend>
          <div className="flex flex-wrap gap-2">
            {[ALL, ...categories].map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    captureLayout();
                    setCategory(c);
                  }}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm tracking-[-0.01em] transition-colors",
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-ink hover:border-ink",
                  )}
                >
                  {c}
                  <span className={cn("font-mono text-[0.6875rem]", active ? "text-paper/70" : "text-muted")}>
                    {countFor(c)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end lg:flex-col lg:items-end">
          <div className="w-full sm:w-72">
            <label htmlFor="project-search" className="meta mb-2 block">
              Search projects
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                strokeWidth={1.75}
              />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => {
                  captureLayout();
                  setQuery(e.target.value);
                }}
                placeholder="Title, tool or topic"
                autoComplete="off"
                className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-10 text-base outline-none transition-colors placeholder:text-muted/80 focus:border-accent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    captureLayout();
                    setQuery("");
                  }}
                  aria-label="Clear search"
                  className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-ink"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div role="group" aria-label="View" className="flex rounded-full border border-line bg-white p-1">
            {(["grid", "index"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => {
                  touch();
                  setView(v);
                }}
                className={cn(
                  "h-8 rounded-full px-4 text-sm capitalize transition-colors",
                  view === v ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="meta mt-6" role="status" aria-live="polite">
        {results.length === 1 ? "1 project" : `${results.length} projects`}
        {category !== ALL ? ` in ${category}` : ""}
        {query ? ` matching "${query}"` : ""}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-card font-semibold">No projects match that yet.</p>
          <p className="mx-auto mt-3 max-w-[44ch] text-muted">
            Try a different word or category. Some ideas haven&apos;t become projects — the{" "}
            <Link href="/lab" className="link-draw text-ink hover:text-accent">
              Lab
            </Link>{" "}
            has smaller experiments.
          </p>
          <button
            type="button"
            onClick={clear}
            className="mt-6 h-11 rounded-full border border-ink px-5 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            Clear filters
          </button>
        </div>
      ) : view === "grid" ? (
        <ul className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <li key={p.slug} data-result data-flip-id={p.slug}>
              {p.featured && (
                <span className="meta mb-2 block text-accent">Featured</span>
              )}
              <ProjectCard
                project={p}
                headingLevel="h2"
                revealImage={false}
                eager={i < 3}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      ) : (
        <ProjectIndex projects={results} />
      )}
    </div>
  );
}

/** Table-like index with a cover that follows the cursor on fine pointers. */
function ProjectIndex({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview) return;
      gsap.set(preview, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.9 });
      // Handler-created tweens live outside the context; kill them on unmount.
      return () => gsap.killTweensOf(preview);
    },
    {},
  );

  const quick = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const enabled = () =>
    typeof window !== "undefined" && window.matchMedia(motion.queries.finePointer).matches;

  const onMove = (e: React.MouseEvent) => {
    if (!enabled() || !previewRef.current) return;
    if (!quick.current) {
      quick.current = {
        x: gsap.quickTo(previewRef.current, "x", { duration: 0.55, ease: motion.ease.out }),
        y: gsap.quickTo(previewRef.current, "y", { duration: 0.55, ease: motion.ease.out }),
      };
    }
    quick.current.x(e.clientX);
    quick.current.y(e.clientY);
  };

  const show = (slug: string | null) => {
    setActive(slug);
    if (!enabled() || !previewRef.current) return;
    gsap.to(previewRef.current, {
      autoAlpha: slug ? 1 : 0,
      scale: slug ? 1 : 0.9,
      duration: slug ? 0.4 : 0.25,
      ease: motion.ease.out,
      overwrite: "auto",
    });
  };

  return (
    <div ref={listRef} className="relative mt-8" onMouseMove={onMove} onMouseLeave={() => show(null)}>
      <div className="meta hidden grid-cols-12 gap-6 border-b border-line pb-3 md:grid" aria-hidden="true">
        <span className="col-span-5">Name</span>
        <span className="col-span-3">Category</span>
        <span className="col-span-3">Status</span>
        <span className="col-span-1 text-right">Year</span>
      </div>
      <ul>
        {projects.map((p) => (
          <li
            key={p.slug}
            data-result
            className="group relative grid grid-cols-1 gap-2 border-b border-line py-5 md:grid-cols-12 md:items-center md:gap-6"
            onMouseEnter={() => show(p.slug)}
          >
            <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.035em] transition-[color,transform] duration-500 ease-[var(--ease-out-quart)] group-hover:text-accent md:col-span-5 md:group-hover:translate-x-1.5">
              <Link
                href={`/projects/${p.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
                onFocus={() => setActive(p.slug)}
              >
                {p.title}
              </Link>
            </h2>
            <span className="meta md:col-span-3">{p.category.join(" / ")}</span>
            <span className="md:col-span-3">
              <StatusMeter status={p.status} />
            </span>
            <span className="meta md:col-span-1 md:text-right">{p.year ?? "—"}</span>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-[320px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_24px_60px_-24px_rgba(23,23,23,0.35)] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        {projects.map((p) => (
          <div
            key={p.slug}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              active === p.slug ? "opacity-100" : "opacity-0",
            )}
          >
            {p.thumbnail && p.thumbnailFit === "contain" ? (
              <div className="absolute inset-x-[12%] inset-y-[10%]">
                <Image src={p.thumbnail} alt="" fill sizes="320px" className="object-contain" />
              </div>
            ) : p.thumbnail ? (
              <Image
                src={p.thumbnail}
                alt=""
                fill
                sizes="320px"
                className="object-cover"
                style={{ objectPosition: p.thumbnailPosition ?? "center" }}
              />
            ) : (
              <CoverArt cover={p.cover} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
