import { ButtonLink, Container, Meta } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-28 md:py-40">
      <Meta>404</Meta>
      <h1 className="mt-6 text-page font-semibold">
        <span className="type-idea">Still an idea.</span>
      </h1>
      <p className="mt-6 max-w-[48ch] text-lead text-muted">
        This page hasn&apos;t been built. Head back home or look through the projects.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary" icon={false}>
          See projects
        </ButtonLink>
      </div>
    </Container>
  );
}
