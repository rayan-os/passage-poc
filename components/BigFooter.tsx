import Link from "next/link";

export default function BigFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-grid py-12">
        <div aria-hidden="true" className="relative overflow-hidden">
          <div className="pointer-events-none select-none absolute -top-10 right-0 text-[96px] md:text-[140px] font-display font-bold tracking-tight text-foreground/[0.04]">
            Passage
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold text-foreground">Passage</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Infrastructure for admissions workflow and outcomes.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </Link>
            <Link href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Agents
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Book a demo
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Passage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
