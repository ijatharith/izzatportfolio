/**
 * Work listed beside an area. Use `slug` for a project in data/projects.ts
 * (rendered as a link), or `label` for work without a project page yet
 * (rendered as plain text).
 */
export type AreaWork = { slug: string } | { label: string };

/** Disciplines shown in "Areas of exploration" on the homepage. */
export const areas: { title: string; description: string; work: AreaWork[] }[] = [
  {
    title: "Software development",
    description: "Building applications, systems, and digital products.",
    work: [{ slug: "tasktrek" }, { slug: "bayarswift" }],
  },
  {
    title: "Cybersecurity",
    description:
      "Exploring security monitoring, threat detection, cryptography, and security engineering.",
    work: [{ slug: "vigilance" }, { slug: "secure-messaging" }],
  },
  {
    title: "Artificial intelligence",
    description:
      "Experimenting with AI agents, intelligent workflows, and AI-powered applications.",
    work: [{ slug: "vigilance" }],
  },
  {
    title: "Creative design",
    description:
      "Creating visual identities, graphics, sportswear designs, and digital experiences.",
    work: [{ slug: "palas-creative" }],
  },
  {
    title: "Entrepreneurship",
    description: "Building business initiatives, products, and practical solutions.",
    work: [{ slug: "palas-creative" }],
  },
];

/** "Currently exploring" — edit to keep the homepage current. */
export const currentlyExploring: { topic: string; context: string }[] = [
  { topic: "AI agent development", context: "Multi-agent workflows with LangGraph" },
  { topic: "SIEM and SOAR automation", context: "Wazuh, n8n and automated response" },
  { topic: "Full-stack web development", context: "Next.js, TypeScript and Supabase" },
  { topic: "Business systems", context: "Digital transformation for small businesses" },
  { topic: "UI/UX and creative development", context: "Interfaces, motion and identity" },
];

/** Professional interests for the About page. */
export const interests = [
  "Software engineering",
  "Cybersecurity",
  "Artificial intelligence",
  "Automation",
  "UI/UX design",
  "Digital products",
  "Entrepreneurship",
] as const;

/**
 * Technical capabilities grouped by discipline — the tools used in the
 * projects on this site.
 */
export const capabilities = [
  { discipline: "Web and software", items: ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "Express", "Python", "FastAPI", "PHP", "Laravel"] },
  { discipline: "Data", items: ["PostgreSQL", "Supabase", "MySQL", "MongoDB"] },
  { discipline: "Security", items: ["Wazuh", "Wireshark", "Ghidra", "Cryptography (AES-GCM, HMAC, HKDF)"] },
  { discipline: "AI and automation", items: ["OpenAI API", "LangGraph", "n8n"] },
  { discipline: "Design", items: ["Adobe Photoshop", "Adobe Illustrator", "Canva"] },
  {
    discipline: "Photo and video",
    items: ["DSLR and mobile photography", "Videography", "Adobe Premiere Pro", "CapCut"],
  },
] as const;
