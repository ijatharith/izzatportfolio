import { toolGroups } from "@/data/tools";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialRow } from "@/components/ui/EditorialRow";
import { slugify } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Uses",
  description:
    "The software, security tools, AI and automation platforms, and creative apps Izzat uses.",
  path: "/uses",
});

export default function UsesPage() {
  const total = toolGroups.reduce((n, g) => n + g.tools.length, 0);
  return (
    <>
      <PageHeader
        label="Uses"
        count={total}
        title="The toolkit."
        intro={
          <p>
            The software and tools I build with. It&apos;s a list of what I use and am
            learning, not a claim of mastery in each.
          </p>
        }
      />
      <Container className="pb-24">
        {toolGroups.map((group) => {
          const id = `uses-${slugify(group.title)}`;
          return (
            <EditorialRow
              key={group.title}
              label={group.title}
              count={group.tools.length}
              id={id}
              title={group.title}
            >
              <ul>
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="grid gap-1 border-b border-line py-4 first:pt-0 sm:grid-cols-2 sm:items-baseline sm:gap-6"
                  >
                    <span className="text-[1.25rem] font-medium tracking-[-0.025em]">
                      {tool.name}
                    </span>
                    <span className="text-muted sm:text-right">{tool.note}</span>
                  </li>
                ))}
              </ul>
            </EditorialRow>
          );
        })}
      </Container>
    </>
  );
}
