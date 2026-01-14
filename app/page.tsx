import HeroMedia from "@/components/HeroMedia";
import EditorialStatement from "@/components/EditorialStatement";
import OfferingsChapters from "@/components/OfferingsChapters";
import StoriesCarousel from "@/components/StoriesCarousel";
import SplitCTA from "@/components/SplitCTA";

export default function Home() {
  return (
    <>
      <HeroMedia />
      <EditorialStatement />
      <OfferingsChapters />
      <StoriesCarousel />
      <SplitCTA />
    </>
  );
}
