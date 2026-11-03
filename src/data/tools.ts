import type { ToolGroup } from "@/types";

/**
 * The Uses page. Notes describe what each tool is, not a claim of expertise.
 */
export const toolGroups: ToolGroup[] = [
  {
    title: "Development",
    tools: [
      { name: "Next.js", note: "React framework for web apps" },
      { name: "React", note: "UI library" },
      { name: "TypeScript", note: "Typed JavaScript" },
      { name: "Python", note: "Scripting, tooling and back ends" },
      { name: "Node.js", note: "JavaScript runtime for servers" },
      { name: "Express", note: "Node.js web framework" },
      { name: "Vite", note: "Frontend build tool" },
      { name: "FastAPI", note: "Python web APIs" },
      { name: "PostgreSQL", note: "Relational database" },
      { name: "Supabase", note: "Postgres-based backend platform" },
      { name: "PHP", note: "Server-side scripting" },
      { name: "Laravel", note: "PHP web framework" },
      { name: "MySQL", note: "Relational database" },
      { name: "MongoDB", note: "Document database" },
      { name: "Tailwind CSS", note: "Utility-first CSS framework" },
    ],
  },
  {
    title: "Cybersecurity",
    tools: [
      { name: "Wazuh", note: "Open-source SIEM and XDR" },
      { name: "Wireshark", note: "Network protocol analyser" },
      { name: "Ghidra", note: "Reverse-engineering suite" },
      { name: "VirusTotal", note: "File and URL threat intelligence" },
      { name: "Sysinternals", note: "Windows diagnostics utilities" },
      { name: "PEStudio", note: "Static analysis of Windows executables" },
    ],
  },
  {
    title: "AI and automation",
    tools: [
      { name: "OpenAI API", note: "Language models in applications" },
      { name: "LangGraph", note: "Stateful multi-agent workflows" },
      { name: "n8n", note: "Workflow automation" },
    ],
  },
  {
    title: "Creative",
    tools: [
      { name: "Adobe Photoshop", note: "Image editing and jersey design" },
      { name: "Adobe Illustrator", note: "Vector graphics and logo tracing" },
      { name: "Canva", note: "Quick layouts and social graphics" },
      { name: "Adobe Premiere Pro", note: "Video editing" },
      { name: "CapCut", note: "Short-form video" },
    ],
  },
];
