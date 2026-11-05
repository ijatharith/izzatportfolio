import { Hero } from "@/components/home/Hero";
import { ScrollToTopOnLoad } from "@/components/home/ScrollToTopOnLoad";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AreasOfExploration } from "@/components/home/AreasOfExploration";
import { CurrentlyExploring } from "@/components/home/CurrentlyExploring";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <ScrollToTopOnLoad />
      <Hero />
      <FeaturedProjects />
      <AreasOfExploration />
      <CurrentlyExploring />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
