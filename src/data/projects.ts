import type { Project } from "@/types";

/**
 * Project content. Add a new object to this array to publish a project —
 * the listing, filters, detail page, sitemap and related links update
 * automatically. Only fill optional fields with verified information.
 */
export const projects: Project[] = [
  {
    slug: "tasktrek",
    title: "TaskTrek",
    description:
      "A web-based academic task management platform that helps university students organise coursework, track assignments and manage deadlines from one dashboard.",
    overview:
      "TaskTrek is an academic task management system built by a university development team. Students sign in with their Student ID or email and manage coursework from a personalised dashboard — task statistics, deadlines for the next seven days, and every assignment in list or calendar view.",
    category: ["Web Development"],
    status: "Completed",
    context: "Academic team project",
    featured: true,
    featuredOrder: 4,
    cover: "tasktrek",
    thumbnail: "/images/projects/tasktrek.png",
    thumbnailAlt:
      "TaskTrek graphic: the TaskTrek logo with the line \"A simple task and assignment manager for students\" and the labels Track Tasks, Manage Deadlines and Stay Organized, beside screens of the dashboard with pending, high-priority and completed counts and upcoming deadlines, the My Assignments table, and the Edit Assignment form.",
    // Keep the logo and tagline in frame when the 16:9 image is cropped.
    thumbnailPosition: "left center",
    technologies: ["PHP", "Laravel", "MySQL", "Blade", "Tailwind CSS", "Eloquent ORM"],
    scope: [
      "Registration and authentication with Student ID or email",
      "Personalised dashboard with task statistics and seven-day deadlines",
      "Create, view, update and delete tasks",
      "Priorities, course categories, deadlines and completion status",
      "Search, filtering and sorting",
      "List and calendar views",
      "Per-user data access and authorisation",
    ],
    role:
      "TaskTrek was built by a development team. My contribution was system analysis, use-case design and UI design.",
    architecture:
      "Model–View–Controller (MVC) on Laravel, organised as a four-tier structure: client, frontend, backend and database.",
  },
  {
    slug: "vigilance",
    title: "Vigilance AI",
    description:
      "An AI-assisted SIEM and SOAR platform designed to support intelligent security incident investigation and automated response.",
    overview:
      "Vigilance AI explores how AI can support the work of investigating security incidents. It combines security event monitoring from Wazuh with AI-assisted analysis and automated response workflows, organised as a multi-agent system.",
    category: ["Cybersecurity", "Artificial Intelligence"],
    status: "In Progress",
    context: "Final year project",
    featured: true,
    featuredOrder: 3,
    cover: "vigilance",
    thumbnail: "/images/projects/vigilance-ai.png",
    thumbnailAlt:
      "Vigilance AI promotional graphic: a Security Operations Center dashboard with alerts and events, an AI agent analysis card, and a SOAR automation flow from alert to AI analysis to automated response.",
    // Keep the logo and tagline in frame when the 16:9 image is cropped.
    thumbnailPosition: "left center",
    thumbnailTall: { src: "/images/projects/vigilance-ai-tall.png", width: 971, height: 1619 },
    technologies: ["Python", "Wazuh", "OpenAI API", "LangGraph", "n8n"],
    scope: [
      "Security event monitoring",
      "Threat detection and investigation",
      "AI-assisted incident analysis",
      "Multi-agent architecture",
      "Automated response workflows",
    ],
  },
  {
    slug: "jomsadaqah",
    title: "JomSadaqah",
    description:
      "A digital donation and fundraising platform designed to help organisations and communities manage fundraising campaigns and engage with donors.",
    category: ["Web Development", "Digital Products"],
    status: "On Hold",
    featured: false,
    cover: "jomsadaqah",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    scope: [
      "Campaign management",
      "Donation progress tracking",
      "Donation messages",
      "Organisation and club profiles",
      "Payment workflow integration",
    ],
  },
  {
    slug: "palas-creative",
    title: "Palas Creative",
    description:
      "A creative brand focused on sportswear, jersey design, visual identity, and graphic design.",
    overview:
      "Palas Creative is where I work as a freelance graphic designer, since December 2024. I design custom jerseys, banners, lanyards and other merchandise in Adobe Photoshop and Illustrator, and deliver print-ready files and mockups.",
    category: ["Graphic Design", "Branding", "Entrepreneurship"],
    status: "In Progress",
    statusNote: "Ongoing since Dec 2024",
    context: "Freelance",
    year: 2024,
    featured: true,
    featuredOrder: 2,
    cover: "palas",
    thumbnail: "/images/projects/palas-creative.png",
    thumbnailTall: { src: "/images/projects/palas-creative-tall.png", width: 971, height: 1619 },
    thumbnailAlt:
      "Palas Creative brand graphic: the Palas Creative logo with the line \"Sportswear Design & Creative Studio\", beside front and back mockups of a black and red jersey with the Palas logo and the number 10, plus close-ups of the fabric, collar and pattern.",
    thumbnailPosition: "left center",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    liveUrl: "https://palas.pokokkaktus.my",
    scope: [
      "Custom jersey design",
      "Banners, lanyards and other merchandise",
      "Sportswear branding and visual identity",
      "Print-ready files",
      "Mockups and product presentation",
    ],
  },
  {
    slug: "bayarswift",
    title: "BayarSwift",
    description:
      "A centralised payment system for companies — admins create invoices, collect payment against them, and share payment links that take clients straight to a payment page.",
    overview:
      "BayarSwift brings a company's payments into one place. From the admin side, staff create invoices and take payment against them. They can also generate payment links to send to clients; each link opens a payment website where the client completes the payment.",
    category: ["Software Development", "Business Systems"],
    status: "In Progress",
    context: "Built for Pokokkaktus",
    featured: true,
    featuredOrder: 1,
    cover: "bayarswift",
    thumbnail: "/images/projects/bayarswift.png",
    thumbnailAlt:
      "BayarSwift admin screens: a payments dashboard showing verified revenue, successful, pending and failed payments, daily revenue and payment methods (FPX online banking, credit/debit card), flanked by an invoice form and an all-transactions list, above the line \"Pokokkaktus BayarSwift — A centralized payment system for the company.\"",
    technologies: [
      "JavaScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "BayarCash (FPX)",
      "Resend",
    ],
    architecture:
      "A React 19 single-page app (built with Vite, routed with React Router, styled with Tailwind CSS) talks to a Node.js and Express API backed by MongoDB Atlas through Mongoose. Payments run through BayarCash (FPX online banking): the server verifies BayarCash's payment notifications, and a background job re-checks pending payments so a payment is still confirmed if a notification never arrives. Admins sign in with hashed passwords and JWT tokens, and the API is protected with helmet, CORS rules and rate limiting. Receipts are emailed through Resend, and invoice PDFs are generated on the server. It is self-hosted, and every push to main is automatically tested (Vitest and Node's test runner) and deployed.",
    scope: [
      "Centralised payments for a company",
      "Invoice creation by admins",
      "Payment against an invoice",
      "Shareable payment links",
      "Client-facing payment website",
    ],
  },
  {
    slug: "secure-messaging",
    title: "Secure Messaging Application",
    description:
      "A secure messaging application exploring cryptographic techniques to protect communication between a client and server.",
    category: ["Software Development", "Cryptography"],
    status: "Experimental",
    statusNote: "Experimental, in progress",
    featured: false,
    cover: "secure-messaging",
    technologies: ["Python", "OpenSSL", "AES-256-GCM", "HMAC-SHA256", "HKDF-SHA256"],
    scope: [
      "Client-server architecture",
      "Secure key generation",
      "Authenticated encryption",
      "Message integrity verification",
      "Cryptographic protocol implementation",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Sort key for featured projects: explicit featuredOrder first, then data order. */
export function featuredRank(p: Project): number {
  return p.featured ? (p.featuredOrder ?? 99) : Number.POSITIVE_INFINITY;
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => featuredRank(a) - featuredRank(b))
    .slice(0, limit);
}

/** Projects sharing the most categories with the given one. */
export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score: p.category.filter((c) => project.category.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Unique categories ordered by how many projects use them. */
export function getProjectCategories(): string[] {
  const counts = new Map<string, number>();
  for (const p of projects) for (const c of p.category) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
}
