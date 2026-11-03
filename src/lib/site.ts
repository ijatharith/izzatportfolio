import { projects } from "@/data/projects";
import { experiments } from "@/data/experiments";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export interface NavItem {
  href: string;
  label: string;
  count?: number;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects", count: projects.length },
  { href: "/lab", label: "Lab", count: experiments.length },
  { href: "/uses", label: "Uses" },
];

export const contactNavItem: NavItem = { href: "/contact", label: "Contact" };

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
