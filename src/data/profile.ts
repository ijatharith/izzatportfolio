import type { SocialLink, TimelineEntry } from "@/types";

/**
 * Personal profile content. Edit freely — every component reads from here.
 * Empty arrays / undefined values are hidden on the site, so nothing is ever
 * shown that hasn't been verified.
 */
export const profile = {
  name: "Izzat",
  fullName: "Izzat Rosli",
  tagline: "Ideas into reality.",
  /** Hero greeting, shown above the full name. */
  greeting: "Hello there, my name is",
  /** Shown at the bottom of the hero. */
  roles: ["Graphic Designer", "Software Developer", "UI/UX Designer"],
  role: "Developer, designer and builder",
  location: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  email: "izzat@pokokkaktus.my",

  headline: "I build things at the intersection of technology and creativity.",
  description:
    "A multidisciplinary developer, designer, and technology enthusiast exploring ideas through software, cybersecurity, AI, and creative digital experiences.",

  /** Shown in the hero as the current activity. Set to undefined to hide. */
  currentActivity: {
    label: "Currently building",
    value: "Vigilance AI",
    href: "/projects/vigilance",
  } as { label: string; value: string; href?: string } | undefined,

  /** Add your profile URLs here; links without an href are not rendered. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ijat-rosli/", handle: "ijat-rosli" },
    { label: "Instagram", href: "https://www.instagram.com/ejugharith/", handle: "@ejugharith" },
  ] as SocialLink[],

  /** Place a verified CV at /public/documents/ and set the path, e.g. "/documents/izzat-cv.pdf". */
  cvUrl: undefined as string | undefined,

  /** Optional portrait under /public/images/profile/. */
  portrait: undefined as { src: string; alt: string } | undefined,

  about: {
    intro: [
      "I'm Izzat, a multidisciplinary developer and designer based in Malaysia.",
      "I work across software, cybersecurity, artificial intelligence and visual design — taking an idea from a rough sketch to something people can actually use. Some of that work is engineering: security platforms, web products and business systems. Some of it is craft: jerseys, brand identities and interfaces.",
    ],
    preview:
      "I like starting with a question — how could this work better? — and following it through design and code until there's a real answer on screen. That might be an AI-assisted security workflow, a fundraising platform, or a custom jersey.",
    designExperience:
      "Design runs alongside the engineering. I'm self-taught in graphic design, photography and videography, and since 2023 I've designed jerseys, banners, posters, social media content and print materials for employers and clients — including through Palas Creative, where I work freelance. I apply the same eye to the interfaces I build.",
    leadership:
      "Alongside software I build business initiatives. Palas Creative is a creative brand for sportswear and visual identity, and BayarSwift is a centralised payment system that lets a company invoice clients and collect payment through shareable payment links.",
  },

  /** Education, newest first. From the CV; add verified entries only. */
  education: [
    {
      period: "2024 – Present",
      title: "Bachelor in Computer Science",
      organisation: "International Islamic University Malaysia (IIUM)",
      kind: "Education",
    },
    {
      period: "2023 – 2024",
      title: "Foundation in Engineering and Computer Science",
      organisation: "International Islamic University Malaysia (IIUM)",
      kind: "Education",
    },
    {
      period: "2023",
      title: "Sijil Pelajaran Malaysia (SPM)",
      organisation: "SMK Ismail Petra",
      kind: "Education",
    },
  ] as TimelineEntry[],

  /** Work experience, from the CV. Order here is the order shown. */
  timeline: [
    {
      period: "Dec 2024 – Present",
      title: "Freelance Graphic Designer",
      organisation: "Palas Creative",
      kind: "Experience",
      description:
        "Design custom jerseys, banners, lanyards and more in Adobe Photoshop and Illustrator, delivering print-ready files and mockups.",
    },
    {
      period: "Apr 2025 – Present",
      title: "Part-Time Graphic Designer",
      organisation: "Berans' Trading",
      kind: "Experience",
      description:
        "Design monthly social media content and marketing visuals for the company's online presence and brand engagement.",
    },
    {
      period: "Jul 2025 – Mar 2026",
      title: "Part-Time Graphic Designer",
      organisation: "ALF Advertising",
      kind: "Experience",
      description:
        "Created posters and videos for clients' social media, and supported the design of signboards, menu books, uniforms and other marketing materials.",
    },
    {
      period: "Jul 2024 – Aug 2024",
      title: "Part-Time Graphic Designer",
      organisation: "ADAMIA Print",
      kind: "Experience",
      description:
        "Designed custom jerseys and event banners in Adobe Photoshop, retraced logos into vector format in Adobe Illustrator, and helped package client orders.",
    },
    {
      period: "Mar 2023 – Apr 2023",
      title: "Part-Time Marketing and Retail Assistant",
      organisation: "ARAMADA Supplies & Trading",
      kind: "Experience",
      description:
        "Managed stock and quality control, maintained the online catalogue, designed promotional posters and supported daily store operations.",
    },
  ] as TimelineEntry[],

  /**
   * Creative tools with a self-rated level (0–100), as shown on the CV.
   * `mark` is the short label drawn in the tile; `shape` matches the CV.
   */
  creativeTools: [
    { name: "Adobe Premiere Pro", mark: "Pr", shape: "tile", level: 60 },
    { name: "Adobe Photoshop", mark: "Ps", shape: "tile", level: 75 },
    { name: "Adobe Illustrator", mark: "Ai", shape: "tile", level: 65 },
    { name: "Canva", mark: "Canva", shape: "round", level: 72 },
  ] as { name: string; mark: string; shape: "tile" | "round"; level: number }[],

  /** Languages, from the CV. */
  languages: [
    { name: "Malay", level: "Fluent" },
    { name: "English", level: "Conversant" },
  ],
  languagesNote: "Comfortable writing in both.",
} as const;

export type Profile = typeof profile;
