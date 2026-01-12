import Link from "next/link";

export default function SplitCTA() {
  return (
    <section className="bg-zinc-50 py-24 md:py-32">
      <div className="container-grid">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-6">
            <Link
              href="/contact"
              className="block border border-zinc-300 p-12 md:p-16 hover:border-zinc-400 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
                    Request Access
                  </h3>
                  <p className="text-sm text-zinc-600">Contact us to discuss your requirements</p>
                </div>
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 mt-6 md:mt-0">
            <Link
              href="/platform"
              className="block border border-zinc-300 p-12 md:p-16 hover:border-zinc-400 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
                    Start Building
                  </h3>
                  <p className="text-sm text-zinc-600">Explore platform capabilities and architecture</p>
                </div>
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
