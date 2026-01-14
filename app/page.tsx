import HeroMedia from "@/components/HeroMedia";
import EditorialStatement from "@/components/EditorialStatement";
import OfferingsChapters from "@/components/OfferingsChapters";
import StoriesCarousel from "@/components/StoriesCarousel";
import SplitCTA from "@/components/SplitCTA";
import AdminSidebarProof from "@/components/AdminSidebarProof";

export default function Home() {
  return (
    <>
      <HeroMedia />
      <EditorialStatement />
      <OfferingsChapters />

      <section className="border-y border-zinc-200 bg-zinc-950">
        <div className="container-grid py-16 md:py-20">
          <div className="grid-12 items-start">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.18em] font-mono text-zinc-500 mb-3">
                Admin experience
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-50">
                A modern operator sidebar for high-stakes workflows
              </h2>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                Proof-of-concept UI: glassy dark theme, fast navigation, and compact lists for triage and processing.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7 mt-10 lg:mt-0 flex justify-center lg:justify-end">
              <AdminSidebarProof />
            </div>
          </div>
        </div>
      </section>

      <StoriesCarousel />
      <SplitCTA />
    </>
  );
}
