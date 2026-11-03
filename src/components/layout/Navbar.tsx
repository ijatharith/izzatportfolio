"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, motion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { contactNavItem, isActivePath, navItems } from "@/lib/site";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { RollLabel } from "@/components/ui/primitives";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  // ---- Active indicator --------------------------------------------------
  const moveIndicator = useCallback((target: HTMLElement | null, instant = false) => {
    const bar = indicatorRef.current;
    if (!bar) return;
    if (!target) {
      gsap.to(bar, { autoAlpha: 0, duration: 0.2 });
      return;
    }
    const reduce = window.matchMedia(motion.queries.reduce).matches;
    gsap.to(bar, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      autoAlpha: 1,
      duration: instant || reduce ? 0 : 0.5,
      ease: motion.ease.out,
      overwrite: "auto",
    });
  }, []);

  const activeLink = useCallback(
    () => listRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null,
    [],
  );

  useGSAP(
    () => {
      moveIndicator(activeLink());
    },
    { dependencies: [pathname], scope: headerRef },
  );

  useEffect(() => {
    const onResize = () => moveIndicator(activeLink(), true);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveIndicator, activeLink]);

  // ---- Hide on scroll down, reveal on scroll up --------------------------
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const show = gsap.quickTo(header, "yPercent", { duration: 0.45, ease: motion.ease.out });
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 8;
          header.dataset.scrolled = String(scrolled);
          const hide =
            self.direction === 1 &&
            self.scroll() > 240 &&
            !header.contains(document.activeElement) &&
            header.dataset.menu !== "open";
          show(hide ? -100 : 0);
        },
      });
      const onFocus = () => show(0);
      header.addEventListener("focusin", onFocus);
      return () => {
        st.kill();
        header.removeEventListener("focusin", onFocus);
      };
    },
    { scope: headerRef },
  );

  // ---- Mobile menu -------------------------------------------------------
  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const reduce = window.matchMedia(motion.queries.reduce).matches;
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(menu, { autoAlpha: 1 })
        .fromTo(
          menu,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 0.6, ease: motion.ease.inOut },
        )
        .fromTo(
          menu.querySelectorAll("[data-menu-item]"),
          { yPercent: reduce ? 0 : 110 },
          { yPercent: 0, duration: reduce ? 0 : 0.7, ease: motion.ease.expo, stagger: 0.05 },
          reduce ? 0 : 0.25,
        )
        .fromTo(
          menu.querySelectorAll("[data-menu-fade]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: reduce ? 0 : 0.4 },
          reduce ? 0 : 0.45,
        );
    },
    { scope: headerRef },
  );

  useEffect(() => {
    const tl = menuTl.current;
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    if (headerRef.current) headerRef.current.dataset.menu = open ? "open" : "closed";
    if (open) {
      tl?.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      if (main) main.inert = true;
      if (footer) footer.inert = true;
      window.setTimeout(() => {
        menuRef.current?.querySelector<HTMLElement>("a")?.focus();
      }, 80);
    } else {
      tl?.timeScale(1.6).reverse();
      document.documentElement.style.overflow = "";
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    }
  }, [open]);

  // Close on route change (adjusting state during render) and on Escape.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const contactActive = isActivePath(pathname, contactNavItem.href);

  return (
    <>
    <header
      ref={headerRef}
      data-scrolled="false"
      className="group/header fixed inset-x-0 top-0 z-50 bg-paper transition-[box-shadow] duration-300 data-[scrolled=true]:shadow-[0_1px_0_var(--color-line)]"
    >
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1280px] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link
          href="/"
          className="relative z-10 flex items-baseline gap-3"
          aria-label={`${profile.fullName}, home`}
        >
          <span className="text-[1.375rem] font-semibold tracking-[-0.05em]">{profile.name}</span>
          <span className="meta hidden lg:inline" aria-hidden="true">
            {profile.tagline}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul
            ref={listRef}
            className="relative flex items-center gap-1"
            onMouseLeave={() => moveIndicator(activeLink())}
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                    onFocus={(e) => moveIndicator(e.currentTarget)}
                    onBlur={() => moveIndicator(activeLink())}
                    className={cn(
                      "flex h-11 items-center gap-1 px-3 text-[0.9375rem] tracking-[-0.01em] transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <sup className="meta -translate-y-1 text-[0.625rem]" aria-hidden="true">
                        ({item.count})
                      </sup>
                    )}
                  </Link>
                </li>
              );
            })}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute bottom-1.5 left-0 h-[1.5px] w-0 bg-accent"
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={contactNavItem.href}
            aria-current={contactActive ? "page" : undefined}
            className={cn(
              "group hidden h-10 items-center rounded-full px-5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors md:inline-flex",
              contactActive
                ? "bg-ink text-paper"
                : "bg-accent text-white hover:bg-accent-strong",
            )}
          >
            <RollLabel>Get in touch</RollLabel>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0.5 h-[1.5px] w-4 bg-ink transition-transform duration-300",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside the header: the header's hide-on-scroll transform
          would otherwise turn it into the containing block for this fixed
          overlay, shrinking the menu to the header's height. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-40 flex flex-col bg-paper px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+2rem)] md:hidden"
      >
        <p className="meta mb-6" data-menu-fade>
          [ Navigation ]
        </p>
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {[...navItems, contactNavItem].map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    data-menu-item
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-2 py-1 text-[clamp(2.75rem,13vw,4rem)] font-semibold leading-[1.05] tracking-[-0.055em]",
                      active ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <span className="meta text-sm tracking-normal">({item.count})</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-2" data-menu-fade>
          <a
            href={`mailto:${profile.email}`}
            tabIndex={open ? 0 : -1}
            className="text-lg tracking-[-0.02em] underline decoration-line-strong underline-offset-4"
          >
            {profile.email}
          </a>
          <span className="meta">[ {profile.location} ]</span>
        </div>
      </div>
    </>
  );
}
