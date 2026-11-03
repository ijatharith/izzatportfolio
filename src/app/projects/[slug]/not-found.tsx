import { ButtonLink, Container, Meta } from "@/components/ui/primitives";

export default function ProjectNotFound() {
  return (
    <Container className="py-28 md:py-40">
      <Meta>404</Meta>
      <h1 className="mt-6 max-w-[16ch] text-page font-semibold">This project doesn&apos;t exist.</h1>
      <p className="mt-6 max-w-[48ch] text-lead text-muted">
        The link may be out of date. Browse the full list instead.
      </p>
      <div className="mt-10">
        <ButtonLink href="/projects">See all projects</ButtonLink>
      </div>
    </Container>
  );
}
