# IZZAT — PERSONAL PORTFOLIO WEBSITE

## Master Product & Development Specification

| Detail | Specification |
|---|---|
| Project | Personal Portfolio Website |
| Brand | Izzat |
| Tagline | Ideas into reality. |
| Design Direction | Swiss Minimalist / Editorial |
| Theme | Light |
| Primary Accent | Electric Blue (`#2563EB`) |
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | GSAP |
| Icons | Lucide React |
| Deployment | Vercel |

---

# 1. PROJECT VISION

Build a modern, responsive personal portfolio website that represents Izzat as a multidisciplinary technologist, developer, designer, and entrepreneur.

The website will serve as a central platform for showcasing:

- Software engineering projects.
- Cybersecurity projects and research.
- Artificial intelligence and automation experiments.
- Web applications and digital products.
- Graphic design and branding work.
- Entrepreneurship and business initiatives.
- Technical experiments and prototypes.
- Professional experience, skills, and achievements.

The website should evolve continuously as new projects, experiences, and achievements are added.

This is not a conventional CV website. It is a personal digital portfolio that demonstrates the ability to turn ideas into practical projects and creative solutions.

## Primary objectives

1. Establish a strong and recognizable personal brand.
2. Showcase technical and creative capabilities.
3. Present projects professionally with detailed case studies.
4. Demonstrate experience across multiple disciplines.
5. Provide a central destination for professional opportunities and collaboration.
6. Make it easy to add new projects without restructuring the website.

---

# 2. BRAND IDENTITY

**Brand name:** Izzat

**Tagline:** Ideas into reality.

## Brand personality

- Minimalist.
- Professional.
- Technologically oriented.
- Creative.
- Confident.
- Curious.
- Modern.

## Visual direction

Follow a Swiss Minimalist and Editorial design approach.

Design characteristics:

- Strong typographic hierarchy.
- Structured grid layouts.
- Generous whitespace.
- Large editorial headlines.
- Asymmetric compositions where appropriate.
- Minimal decorative elements.
- Consistent alignment.
- Subtle interactive details.
- High-quality project imagery.

The website should feel like a combination of a designer's portfolio and a software developer's personal website.

Avoid generic portfolio templates and excessive gradients, glassmorphism, glowing effects, and unnecessary decorative elements.

---

# 3. DESIGN SYSTEM

## 3.1 Colour palette

| Purpose | Colour | Hex |
|---|---|---|
| Primary background | Warm White | `#FAFAF8` |
| Primary text | Near Black | `#171717` |
| Secondary text | Muted Grey | `#737373` |
| Primary accent | Electric Blue | `#2563EB` |
| Border | Light Grey | `#E5E7EB` |
| Accent background | Pale Blue | `#EFF6FF` |
| Success | Green | `#16A34A` |

Approximate visual distribution:

- 75% neutral backgrounds.
- 15% typography and dark elements.
- 10% accent colours.

Use electric blue selectively for interactive elements, links, active states, buttons, and important highlights.

## 3.2 Typography

Recommended fonts:

- **Geist Sans:** Headings and body text.
- **Geist Mono:** Code, technical labels, metadata, and small interface details.

Suggested desktop typography:

| Element | Font size |
|---|---:|
| Hero heading | 64–88px |
| Section heading | 40–56px |
| Page heading | 56–72px |
| Card heading | 22–28px |
| Body text | 16–18px |
| Captions | 12–14px |

Use fluid typography where appropriate.

## 3.3 Layout

- Maximum content width: 1280px.
- Desktop horizontal padding: 32px.
- Mobile horizontal padding: 20px.
- Desktop section spacing: 100–140px.
- Card radius: 12–16px.
- Consistent spacing tokens.
- Responsive grid layouts.

Maintain a clean editorial composition with sufficient whitespace.

---

# 4. WEBSITE ARCHITECTURE

Use Next.js App Router.

## 4.1 Required routes

```text
/
├── /about
├── /projects
│   └── /projects/[slug]
├── /lab
├── /uses
└── /contact
```

## 4.2 Navigation

Primary navigation:

- Home
- About
- Projects
- Lab
- Uses
- Contact

The navigation should remain simple and unobtrusive.

Requirements:

- Responsive desktop navigation.
- Mobile navigation menu.
- Active route indicator.
- Smooth navigation transitions.
- Contact CTA.
- Sticky navigation where appropriate.

Do not add a Journal, Blog, or Articles section.

---

# 5. HOMEPAGE

The homepage should immediately communicate who Izzat is, what he builds, and what visitors can explore.

## 5.1 Homepage structure

Implement sections in this order:

1. Navigation.
2. Hero introduction.
3. Featured projects.
4. Areas of exploration.
5. Currently exploring.
6. About preview.
7. Contact CTA.
8. Footer.

## 5.2 Hero section

Suggested headline:

> I BUILD THINGS AT THE INTERSECTION OF TECHNOLOGY AND CREATIVITY.

Suggested description:

> A multidisciplinary developer, designer, and technology enthusiast exploring ideas through software, cybersecurity, AI, and creative digital experiences.

Include:

- Explore my work CTA.
- Get in touch CTA.
- Location: Malaysia.
- Social media links.
- Current activity indicator.

Visual direction:

- Large editorial typography.
- Strong typographic composition.
- Minimalist layout.
- Subtle motion.
- Clear visual hierarchy.

Avoid making the hero section unnecessarily complicated.

## 5.3 Featured projects

Showcase selected projects directly on the homepage.

Each project preview should include:

- Project thumbnail or visual.
- Project name.
- Short description.
- Category.
- Technologies.
- Project status.
- Link to project details.

Display approximately 3–4 featured projects.

Include a link to explore all projects.

## 5.4 Areas of exploration

Present the main disciplines through which Izzat works.

**Software Development**

Building applications, systems, and digital products.

**Cybersecurity**

Exploring security monitoring, threat detection, cryptography, and security engineering.

**Artificial Intelligence**

Experimenting with AI agents, intelligent workflows, and AI-powered applications.

**Creative Design**

Creating visual identities, graphics, sportswear designs, and digital experiences.

**Entrepreneurship**

Building business initiatives, products, and practical solutions.

Use a minimal grid or editorial list.

## 5.5 Currently exploring

Create a small section highlighting current interests and activities.

Possible content:

- AI agent development.
- SIEM and SOAR automation.
- Full-stack web development.
- Business systems and digital transformation.
- UI/UX and creative development.

This section must be editable through a content configuration file.

## 5.6 About preview

Include:

- Short personal introduction.
- Professional interests.
- Brief background.
- Link to the full About page.

## 5.7 Contact CTA

Suggested heading:

> HAVE AN IDEA? LET'S BUILD SOMETHING.

Include a link to the Contact page and relevant social links.

---

# 6. PROJECTS

The Projects page is one of the most important parts of the website.

It should demonstrate the ability to plan, design, develop, and deliver different types of solutions.

## 6.1 Project categories

- Software Development.
- Cybersecurity.
- Artificial Intelligence.
- Automation.
- Web Development.
- Graphic Design.
- Branding.
- Entrepreneurship.
- Research and Experiments.

## 6.2 Project listing features

Implement:

- Responsive project grid.
- Category filtering.
- Search functionality.
- Featured projects.
- Project status labels.
- Project detail links.
- Empty search results state.

Each project card should contain:

- Thumbnail.
- Project title.
- Short description.
- Category.
- Technologies.
- Status.
- Year.
- Link to project details.

Project statuses:

- Completed.
- In Progress.
- Experimental.
- Proposal.
- Archived.

## 6.3 Project detail pages

Use dynamic routes:

```text
/projects/[slug]
```

Every project should have a dedicated detail page.

Recommended structure:

1. Project title.
2. Project overview.
3. Project hero image.
4. Problem statement.
5. Project objectives.
6. My role and contribution.
7. Technologies and tools.
8. System architecture or design process.
9. Development process.
10. Screenshots and visuals.
11. Challenges.
12. Results or current progress.
13. Lessons learned.
14. Related projects.
15. GitHub link, if available.
16. Live demo link, if available.

Only display sections when relevant information is available.

Do not fabricate results, achievements, metrics, or deployment links.

---

# 7. INITIAL PROJECT CONTENT

Create the following initial project entries.

These entries should be editable and should not require changes to the main project listing components.

## 7.1 Vigilance

**Category:** Cybersecurity / Artificial Intelligence

**Description:**

An AI-assisted SIEM and SOAR platform designed to support intelligent security incident investigation and automated response.

**Technologies:**

- Python.
- Wazuh.
- OpenAI API.
- LangGraph.
- n8n.

**Suggested project highlights:**

- Security event monitoring.
- Threat detection and investigation.
- AI-assisted incident analysis.
- Multi-agent architecture.
- Automated response workflows.

**Status:** In Progress.

## 7.2 JomSadaqah

**Category:** Web Development / Digital Products

**Description:**

A digital donation and fundraising platform designed to help organizations and communities manage fundraising campaigns and engage with donors.

**Technologies:**

- Next.js.
- TypeScript.
- Supabase.
- PostgreSQL.

**Suggested project highlights:**

- Campaign management.
- Donation progress tracking.
- Donation messages.
- Organization and club profiles.
- Payment workflow integration.

**Status:** In Progress / Experimental.

## 7.3 Palas Creative

**Category:** Graphic Design / Branding / Entrepreneurship

**Description:**

A creative brand focused on sportswear, jersey design, visual identity, and graphic design.

**Tools:**

- Adobe Photoshop.
- Canva.

**Suggested project highlights:**

- Custom jersey design.
- Sportswear branding.
- Graphic design.
- Visual identity.
- Product presentation.

**Status:** Ongoing.

## 7.4 Pokokkaktus Business OS

**Category:** Software Development / Business Systems

**Description:**

An integrated business administration and management platform designed to centralize company operations through a unified dashboard.

**Suggested project highlights:**

- Business administration.
- Inventory management.
- Basic financial management.
- Centralized operational dashboard.
- Business workflow management.

**Status:** In Progress.

## 7.5 iSadaqah Website Redesign Proposal

**Category:** UI/UX Design / Web Development / Business Proposal

**Description:**

A website redesign concept prepared as a proposal to improve the user experience, presentation, and digital interface of the iSadaqah platform.

**Suggested project highlights:**

- Website analysis.
- UI/UX redesign.
- Interface prototyping.
- Visual consistency.
- Digital product proposal.

**Status:** Proposal.

Important: Present this as a design and business proposal, not as an officially completed redesign or deployed product.

## 7.6 Secure Messaging Application

**Category:** Software Development / Cryptography

**Description:**

A secure messaging application exploring cryptographic techniques to protect communication between a client and server.

**Technologies:**

- Python.
- OpenSSL.
- AES-256-GCM.
- HMAC-SHA256.
- HKDF-SHA256.

**Suggested project highlights:**

- Client-server architecture.
- Secure key generation.
- Authenticated encryption.
- Message integrity verification.
- Cryptographic protocol implementation.

**Status:** Experimental / In Progress.

---

# 8. THE LAB

Create a dedicated page for experimental projects, prototypes, technical explorations, and unfinished ideas.

The Lab should be separate from the main Projects page.

It represents the process of experimenting, learning, and building ideas that may eventually become complete projects.

## 8.1 Experiment entries

Each experiment should contain:

- Title.
- Description.
- Category.
- Status.
- Technologies.
- Creation date.
- Optional images.
- Optional GitHub link.

## 8.2 Experiment statuses

- Experimental.
- In Progress.
- Completed.
- Archived.

## 8.3 Visual direction

The Lab can feel slightly more exploratory than the main Projects page.

Possible elements:

- Compact project cards.
- Interactive prototypes.
- Small visual experiments.
- Code snippets.
- Technical demonstrations.
- Experimental layouts.

Maintain the same core colour palette and typography.

---

# 9. ABOUT PAGE

The About page should provide a more complete introduction.

## 9.1 Sections

**Introduction**

Introduce Izzat as a multidisciplinary developer, designer, and technology enthusiast.

**Background and Education**

Include educational background and relevant academic information.

**Professional Interests**

Highlight interests in:

- Software engineering.
- Cybersecurity.
- Artificial intelligence.
- Automation.
- UI/UX design.
- Digital products.
- Entrepreneurship.

**Technical Capabilities**

Present technical skills grouped by discipline.

**Design Experience**

Showcase graphic design, branding, and visual communication experience.

**Leadership and Entrepreneurship**

Include relevant leadership roles, initiatives, and business experience.

**Experience Timeline**

Create a chronological timeline for education, experience, projects, and milestones.

**CV**

Include a Download CV button when a verified CV file is available.

## 9.2 Content management

Use editable content data instead of hardcoding all profile information into page components.

Do not invent personal achievements, employment history, qualifications, or dates.

---

# 10. USES PAGE

Create a page that showcases the tools, software, technologies, and hardware used.

## 10.1 Development

- Next.js.
- React.
- TypeScript.
- Python.
- FastAPI.
- PostgreSQL.
- Supabase.

## 10.2 Cybersecurity

- Wazuh.
- Wireshark.
- Ghidra.
- VirusTotal.
- Sysinternals.
- PEStudio.

## 10.3 AI and Automation

- OpenAI API.
- LangGraph.
- n8n.

## 10.4 Creative

- Adobe Photoshop.
- Canva.
- Adobe Premiere Pro.
- CapCut.

## 10.5 Hardware

- Intel Core Ultra 7 258V laptop.
- 32GB RAM.

Present tools using a clean grid or grouped editorial list.

The content must be editable.

Do not imply professional-level expertise with every listed technology.

---

# 11. CONTACT PAGE

Create a dedicated Contact page for professional communication and collaboration.

## 11.1 Content

Include:

- Professional introduction.
- Email contact.
- LinkedIn.
- GitHub.
- Instagram.
- Contact form.

## 11.2 Contact form

Fields:

- Name.
- Email.
- Subject.
- Message.

Requirements:

- Client-side validation.
- Server-side validation.
- Clear success and error messages.
- Spam protection.
- Rate limiting.
- Accessible form labels.
- Mobile-friendly layout.

Use an appropriate email delivery service if a functional contact form is implemented.

Do not expose private API keys or credentials.

If email delivery is not configured, clearly indicate that the form is not yet operational rather than displaying a fake success message.

---

# 12. ANIMATIONS AND INTERACTIONS — GSAP

Use **GSAP (GreenSock Animation Platform)** as the primary animation library.

Use GSAP to create polished, dynamic, and intentional interactions throughout the website.

The animation style should complement the Swiss Minimalist / Editorial design direction.

Avoid excessive animation that distracts from content or negatively affects usability.

## 12.1 Required GSAP features

**Hero animations**

- Staggered headline text reveal.
- Description fade and slide entrance.
- CTA entrance animation.
- Subtle image or visual reveal.
- Coordinated page-load sequence.

**Scroll-triggered animations**

- Section entrance animations.
- Staggered project card reveals.
- Text reveals.
- Image reveals.
- Subtle parallax effects where appropriate.

**Project interactions**

- Project card hover effects.
- Image scale transitions.
- Smooth visual transitions between project sections.
- Interactive project previews.

**Navigation**

- Mobile menu opening and closing animation.
- Navigation indicator transitions.
- Smooth interaction feedback.

**Page transitions**

- Smooth transitions between routes.
- Optional transition overlays.
- Consistent entrance and exit behaviour.

**Other interactions**

- Scroll progress indicator.
- Button hover animations.
- Subtle cursor interactions where appropriate.
- Interactive elements in The Lab.

## 12.2 GSAP technology requirements

Use:

- `gsap`
- `@gsap/react`
- `ScrollTrigger`

Use GSAP timelines to coordinate multi-step animations.

Use `useGSAP()` for React component integration.

Use `ScrollTrigger` for scroll-based animations.

Use scoped GSAP contexts and proper cleanup to prevent duplicate animations or memory leaks.

## 12.3 Implementation principles

- Prefer transform and opacity animations for performance.
- Avoid unnecessary layout recalculations.
- Use `gsap.matchMedia()` for responsive animation behaviour.
- Respect `prefers-reduced-motion`.
- Clean up animations and ScrollTriggers when components unmount.
- Avoid animating every element.
- Keep animations short and purposeful.
- Ensure content remains accessible when JavaScript or animations are unavailable.
- Test animations on mobile and desktop.
- Avoid excessive scroll hijacking.
- Do not make essential content dependent on animation completion.

## 12.4 Animation performance

Target smooth animations at 60 FPS where practical.

Avoid:

- Excessive simultaneous ScrollTriggers.
- Heavy continuous animations.
- Unnecessary blur and filter effects.
- Large-scale parallax on mobile.
- Animations that delay access to important content.

GSAP should enhance the experience without compromising performance.

---

# 13. TECHNICAL STACK

## 13.1 Required technologies

| Technology | Purpose |
|---|---|
| Next.js App Router | Application framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| GSAP | Animation |
| GSAP ScrollTrigger | Scroll-based animation |
| @gsap/react | React integration |
| Lucide React | Icons |
| MDX | Optional project content |
| Vercel | Hosting and deployment |

## 13.2 Optional technologies

- shadcn/ui for selected interface components.
- Vercel Analytics.
- Zod for validation.
- React Hook Form.
- An email delivery service for the contact form.

## 13.3 Infrastructure principles

Do not introduce unnecessary infrastructure.

The initial portfolio does not require:

- PostgreSQL.
- Supabase.
- User authentication.
- An administrative dashboard.
- A dedicated backend.

Use static generation wherever possible.

Only introduce additional services when a genuine functional requirement emerges.

---

# 14. PROJECT CONTENT ARCHITECTURE

Keep project data separate from presentation components.

Use structured TypeScript data or MDX content files.

## 14.1 Suggested project data structure

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;
  overview?: string;

  category: string[];
  status:
    | "Completed"
    | "In Progress"
    | "Experimental"
    | "Proposal"
    | "Archived";

  featured: boolean;
  year: number;

  thumbnail: string;
  gallery?: string[];

  technologies: string[];

  problem?: string;
  objectives?: string[];
  solution?: string;
  role?: string;
  architecture?: string;
  process?: string;
  challenges?: string[];
  results?: string;
  learnings?: string[];

  githubUrl?: string;
  liveUrl?: string;
}
```

## 14.2 Suggested folder structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── lab/
│   │   └── page.tsx
│   ├── uses/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── AreasOfExploration.tsx
│   │   ├── CurrentlyExploring.tsx
│   │   ├── AboutPreview.tsx
│   │   └── ContactCTA.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectFilter.tsx
│   │   └── ProjectDetails.tsx
│   │
│   ├── lab/
│   ├── about/
│   ├── uses/
│   ├── contact/
│   ├── animations/
│   │   ├── GSAPProvider.tsx
│   │   ├── PageTransition.tsx
│   │   └── ScrollProgress.tsx
│   └── ui/
│
├── data/
│   ├── projects.ts
│   ├── experiments.ts
│   ├── skills.ts
│   ├── tools.ts
│   └── profile.ts
│
├── lib/
│   ├── utils.ts
│   └── metadata.ts
│
├── types/
│   └── index.ts
│
└── public/
    ├── images/
    │   ├── projects/
    │   ├── profile/
    │   └── experiments/
    ├── icons/
    └── documents/
```

This is a suggested structure. Adjust it when necessary without introducing unnecessary complexity.

## 14.3 Content management rules

- Keep project content independent of UI components.
- Use reusable components.
- Generate project detail pages dynamically.
- Validate project slugs.
- Handle missing images gracefully.
- Support optional project information.
- Make it easy to add new projects through data files.

Adding a new project should not require modifying the project listing page or manually creating a new page component.

---

# 15. RESPONSIVENESS

The website must work across desktop, tablet, and mobile devices.

## Desktop

- Wide editorial layout.
- Multi-column project grids.
- Large typography.
- Spacious sections.
- Subtle interactions.

## Tablet

- Reduced typography.
- Two-column project grids where appropriate.
- Adapted navigation.
- Adjusted section spacing.

## Mobile

- Single-column content.
- Mobile navigation.
- Touch-friendly interactions.
- Reduced animation complexity.
- Proper image scaling.
- No horizontal overflow.
- Readable typography.

Use responsive GSAP behaviour. Disable or simplify resource-intensive animations on smaller devices when appropriate.

Test common viewport sizes.

---

# 16. SEO AND PERFORMANCE

Implement:

- Unique page titles.
- Meta descriptions.
- Open Graph metadata.
- Twitter metadata.
- `sitemap.xml`.
- `robots.txt`.
- Canonical URLs.
- Semantic HTML.
- Optimized images.
- Lazy loading where appropriate.
- Appropriate heading hierarchy.
- Descriptive image alt text.

## Performance target

Aim for Lighthouse scores of 90+ where practical across:

- Performance.
- Accessibility.
- Best Practices.
- SEO.

Avoid unnecessary client-side JavaScript.

Use Server Components by default and Client Components only when interactivity or GSAP requires them.

Lazy-load animation-heavy components when appropriate.

---

# 17. ACCESSIBILITY

Ensure the website is usable by visitors with different accessibility needs.

Requirements:

- Semantic HTML.
- Keyboard-accessible navigation.
- Visible focus states.
- Accessible form labels.
- Sufficient colour contrast.
- Descriptive links.
- Appropriate image alt text.
- Reduced-motion support.
- Logical heading hierarchy.

Do not rely on colour alone to communicate project status or interface states.

GSAP animations must respect reduced-motion preferences and must not hide essential information from users.

---

# 18. DEVELOPMENT PHASES

Develop the website in manageable phases.

## Phase 1 — Foundation

Objectives:

- Initialize Next.js.
- Configure TypeScript.
- Configure Tailwind CSS.
- Install required dependencies.
- Install GSAP, ScrollTrigger, and @gsap/react.
- Establish design tokens.
- Configure fonts.
- Build shared layout.
- Build navigation.
- Build footer.
- Establish responsive container system.
- Establish a reusable GSAP animation setup.

Deliverable: A working application foundation with the established visual identity and animation infrastructure.

## Phase 2 — Homepage

Objectives:

- Build hero section.
- Build featured projects.
- Build areas of exploration.
- Build currently exploring section.
- Build About preview.
- Build Contact CTA.
- Implement GSAP entrance animations.
- Implement scroll-triggered animations.
- Ensure responsive behaviour.

Deliverable: A complete homepage with polished GSAP interactions.

## Phase 3 — Internal Pages

Objectives:

- Build About page.
- Build Projects listing page.
- Build dynamic project detail pages.
- Build Lab page.
- Build Uses page.
- Build Contact page.
- Implement consistent GSAP transitions and interactions.

Deliverable: All required routes and primary functionality.

## Phase 4 — Content and Optimization

Objectives:

- Add initial project content.
- Add project imagery.
- Add About information.
- Add tools and skills.
- Add social links.
- Implement SEO.
- Improve accessibility.
- Optimize performance.
- Review GSAP animations and ScrollTrigger behaviour.
- Test responsive layouts.

Deliverable: A complete and populated portfolio.

## Phase 5 — Deployment

Objectives:

- Connect GitHub repository.
- Configure Vercel.
- Configure domain.
- Set environment variables if required.
- Test production build.
- Test all routes.
- Verify metadata.
- Verify links and forms.
- Test animations in production.
- Perform final quality checks.

Deliverable: A publicly accessible production website.

---

# 19. DEVELOPMENT RULES

The AI coding agent must follow these rules throughout development.

1. Build reusable components.
2. Maintain a consistent design system.
3. Use TypeScript strictly.
4. Keep content separate from UI.
5. Avoid unnecessary dependencies.
6. Do not fabricate project information.
7. Never hardcode secrets.
8. Ensure all navigation and buttons work.
9. Ensure every page is responsive.
10. Test after each development phase.
11. Preserve existing functionality when making changes.
12. Prioritize visual quality and usability over unnecessary features.
13. Use Server Components by default.
14. Use Client Components only when necessary.
15. Follow accessibility best practices.
16. Do not create unnecessary backend infrastructure.
17. Keep the project structure clean and maintainable.
18. Do not add Journal, Blog, or Article functionality.
19. Use GSAP as the primary animation library.
20. Use `useGSAP()` and scoped GSAP contexts in React components.
21. Clean up ScrollTriggers and animations appropriately.
22. Respect reduced-motion preferences.
23. Avoid unnecessary animation dependencies.

---

# 20. DEFINITION OF DONE

The portfolio is considered complete when:

- [ ] All required routes work.
- [ ] Homepage is fully implemented.
- [ ] Navigation works on desktop and mobile.
- [ ] Featured projects are displayed correctly.
- [ ] Projects can be added through content files.
- [ ] Project detail pages are dynamically generated.
- [ ] Project filtering and search work.
- [ ] The Lab works.
- [ ] About page is complete.
- [ ] Uses page is complete.
- [ ] Contact page is implemented.
- [ ] Contact form is functional if email delivery is configured.
- [ ] GSAP animations work correctly.
- [ ] ScrollTrigger animations work correctly.
- [ ] Animations are responsive.
- [ ] Reduced-motion preferences are respected.
- [ ] No duplicate or leaking animations occur during navigation.
- [ ] Responsive layouts are tested.
- [ ] Accessibility requirements are addressed.
- [ ] SEO metadata is implemented.
- [ ] No broken links or non-functional buttons remain.
- [ ] No fabricated project details or results are displayed.
- [ ] Production build succeeds.
- [ ] Website is deployed successfully on Vercel.

---

# 21. FINAL PRODUCT GOAL

Create a professional, visually distinctive personal website that showcases Izzat's technical, creative, and entrepreneurial journey.

The website should communicate one central idea:

**Ideas into reality.**

It should demonstrate the ability to explore problems, develop solutions, build products, experiment with technology, and express ideas through design.

The final result should be more than a digital CV. It should be a scalable personal portfolio that grows alongside future projects, skills, experiments, and professional experiences.
