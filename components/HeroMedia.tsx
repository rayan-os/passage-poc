import Link from "next/link";

export default function HeroMedia() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image/video placeholder */}
      <div className="absolute inset-0 bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        {/* Placeholder for video/image - using a gradient pattern as placeholder */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-grid w-full">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
            Infrastructure for regulated application decisions
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 mb-10 max-w-3xl leading-relaxed">
            Passage supports intake, verification, decisioning, and outcome delivery for programs like admissions, financing, job matching, and licensing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Request Access
            </Link>
            <Link
              href="/platform"
              className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
