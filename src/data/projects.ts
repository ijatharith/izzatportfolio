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
    about: [
      "TaskTrek is an academic task and assignment management platform designed to help students organize their coursework and manage academic responsibilities more effectively. It provides a centralized dashboard where students can view their assignments, monitor upcoming deadlines, track pending tasks, and identify high-priority work. By organizing academic activities in one place, TaskTrek aims to make it easier for students to understand their workload and stay on top of important deadlines throughout the semester.",
      "The platform also provides tools for managing individual assignments, including creating and editing tasks, assigning priority levels, recording course information, and updating completion statuses. Features such as assignment searching, filtering, and calendar-based organization allow students to manage their academic schedules according to their needs. TaskTrek focuses on making assignment management more structured and accessible, helping students maintain better organization and awareness of their academic progress.",
    ],
    category: ["Web Development"],
    status: "Completed",
    context: "Academic team project",
    featured: true,
    featuredOrder: 4,
    cover: "tasktrek",
    thumbnail: "/images/projects/tasktrek-logo.png",
    thumbnailFit: "contain",
    thumbnailSize: { width: 1929, height: 425 },
    thumbnailAlt: "TaskTrek logo: a blue rounded square with a white check mark beside the word TaskTrek.",
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
    about: [
      "Vigilance AI is an AI-assisted Security Information and Event Management (SIEM) and Security Orchestration, Automation and Response (SOAR) platform designed to enhance cybersecurity monitoring and incident investigation. Built around Wazuh, the platform collects and monitors security events from connected endpoints to identify suspicious activities and potential threats. It aims to provide a centralized environment where security alerts can be monitored, investigated, and managed more efficiently.",
      "The platform integrates AI capabilities through the OpenAI API and LangGraph to support intelligent security analysis and investigation. Its multi-agent architecture is designed to assist in interpreting security alerts, correlating relevant information, and generating actionable recommendations for incident response. Additionally, n8n supports workflow automation, helping coordinate response processes and reduce repetitive manual tasks. Vigilance AI explores how artificial intelligence can complement traditional security monitoring and improve the overall incident response workflow.",
    ],
    category: ["Cybersecurity", "Artificial Intelligence"],
    status: "In Progress",
    context: "Final year project",
    featured: true,
    featuredOrder: 3,
    cover: "vigilance",
    thumbnail: "/images/projects/vigilance-ai-logo.png",
    thumbnailFit: "contain",
    thumbnailSize: { width: 1892, height: 506 },
    thumbnailAlt: "Vigilance AI logo: a black and red V mark beside the words Vigilance AI, with AI in red.",
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
    slug: "palas-creative",
    title: "Palas Creative",
    description:
      "A creative brand focused on sportswear, jersey design, visual identity, and graphic design.",
    about: [
      "Palas Creative is a creative design brand specializing in sportswear, custom jersey design, and visual branding. It focuses on transforming ideas into distinctive visual identities through thoughtful design, typography, colour combinations, and creative patterns. The brand works on apparel concepts for teams, organizations, events, and communities, ensuring that each design reflects the identity and personality of its intended audience.",
      "Beyond jersey design, Palas Creative explores the intersection of creativity, branding, and visual communication. Its work includes developing custom apparel concepts, refining logos, creating promotional graphics, and producing visual assets that help brands and organizations establish a recognizable identity. Through a combination of design experimentation and attention to detail, Palas Creative aims to turn creative concepts into meaningful visual experiences.",
    ],
    category: ["Graphic Design", "Branding", "Entrepreneurship"],
    status: "In Progress",
    statusNote: "Ongoing since Dec 2024",
    context: "Freelance",
    year: 2024,
    featured: true,
    featuredOrder: 2,
    cover: "palas",
    thumbnail: "/images/projects/palas-creative-logo.png",
    thumbnailFit: "contain",
    thumbnailSize: { width: 2252, height: 834 },
    thumbnailAlt: "Palas Creative logo: a black square P mark beside the words palas creative.",
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
    about: [
      "BayarSwift is a centralized payment management system designed to help companies streamline and simplify their payment operations. It provides administrators with a unified platform to manage essential financial activities, including generating payment links, creating invoices, monitoring transactions, and managing customer information. The system aims to reduce the complexity of handling payments across different channels by bringing everything together in one organized dashboard.",
      "Beyond basic payment management, BayarSwift focuses on improving financial visibility and administrative efficiency. Administrators can monitor payment statuses, track successful and unsuccessful transactions, manage outstanding invoices, and share payment links directly with customers. By centralizing these processes, BayarSwift aims to provide businesses with a more structured and convenient way to handle their payment operations.",
    ],
    category: ["Software Development", "Business Systems"],
    status: "In Progress",
    context: "Built for Pokokkaktus",
    featured: true,
    featuredOrder: 1,
    cover: "bayarswift",
    thumbnail: "/images/projects/bayarswift-logo.png",
    thumbnailFit: "contain",
    thumbnailSize: { width: 1931, height: 359 },
    thumbnailAlt: "BayarSwift logo: a blue B mark beside the word BayarSwift, with Swift in blue.",
    technologies: ["MERN Stack", "BayarCash"],
    gallery: [
      {
        src: "/images/projects/bayarswift-dashboard.png",
        alt: "BayarSwift admin dashboard: verified revenue, successful, pending and failed payment counts, a daily revenue bar chart, payment methods split between FPX online banking, card and e-wallet, recent transactions and an invoices summary, with a sidebar for payment links, transactions, invoices, pay invoice and customers.",
        width: 1672,
        height: 941,
      },
      {
        src: "/images/projects/bayarswift-invoices.png",
        alt: "BayarSwift invoices screen: a Create Invoice form with customer, invoice and due dates, terms, document number, document type and handler, beside a live preview of the printed Pokokkaktus invoice with line items, subtotal, SST and total, plus Save as Draft and Issue & Create Link buttons.",
        width: 1692,
        height: 930,
      },
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
