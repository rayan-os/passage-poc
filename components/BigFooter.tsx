import Link from "next/link";

export default function BigFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-grid py-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-5xl md:text-6xl font-display font-bold tracking-tight leading-none text-foreground">
                Passage
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl">
                Admissions workflow and decisions. Governed. Auditable.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </Link>
              <Link href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Agents
              </Link>
              <Link href="#console" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Console
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Book a demo
              </Link>
            </div>
          </div>

          <div className="divider" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-muted-foreground font-mono">
              MADE IN TORONTO · ON → YYZ
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              © {new Date().getFullYear()} Passage
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
