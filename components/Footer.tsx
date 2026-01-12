import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-grid py-16">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-3">
            <h3 className="font-display text-lg font-bold mb-4">Passage</h3>
            <p className="text-sm text-muted-foreground">
              Infrastructure for regulated application processing workflows.
            </p>
          </div>
          <div className="col-span-6 md:col-span-2 mt-8 md:mt-0">
            <h4 className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2 mt-8 md:mt-0">
            <h4 className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions/government" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Government
                </Link>
              </li>
              <li>
                <Link href="/solutions/employers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Employers
                </Link>
              </li>
              <li>
                <Link href="/solutions/education" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2 mt-8 md:mt-0">
            <h4 className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <h4 className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Passage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
