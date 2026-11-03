import { getProjectCategories, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Software, cybersecurity, AI, web, design and business projects by Izzat — from proposals and experiments to work in progress.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        count={projects.length}
        title="From idea to working thing."
        intro={
          <p>
            Each project shows where it stands — from proposal, through experiment and work in
            progress, to completed. Filter by discipline or search by tool.
          </p>
        }
      />
      <Container className="pb-24 md:pb-32">
        <ProjectExplorer projects={projects} categories={getProjectCategories()} />
      </Container>
    </>
  );
}
