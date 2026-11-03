import type { Experiment } from "@/types";

/**
 * Lab entries. Both current entries are working demos built into this site.
 * Add your own experiments here — `demo` is optional; entries without one
 * render as a compact card.
 */
export const experiments: Experiment[] = [
  {
    slug: "cipher-bench",
    title: "Cipher bench",
    description:
      "Encrypt a message with AES-256-GCM in your browser, then tamper with a single byte of the ciphertext and watch authentication reject it. A small companion to the Secure Messaging project.",
    category: "Cryptography",
    status: "Completed",
    technologies: ["Web Crypto API", "AES-256-GCM", "PBKDF2-SHA256"],
    createdAt: "2026-11-03",
    demo: "cipher-bench",
  },
  {
    slug: "type-study",
    title: "Idea to reality, a type study",
    description:
      "The site's identity as a dial: drag from idea to reality and watch the tagline move from blueprint outline to solid ink.",
    category: "Creative Development",
    status: "Experimental",
    technologies: ["GSAP", "CSS text-stroke", "Geist variable font"],
    createdAt: "2026-11-03",
    demo: "type-study",
  },
];
