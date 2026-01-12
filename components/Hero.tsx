import Link from "next/link";

export default function Hero() {
  return (
    <section className="container-grid py-24 md:py-32">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Infrastructure for regulated application processing workflows
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl">
            Passage supports intake, verification, decisioning, and outcome delivery across pathways that connect people to opportunities and partners.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/platform"
              className="px-6 py-3 bg-foreground text-background font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
            >
              Explore Platform
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-border font-medium hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
            >
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
