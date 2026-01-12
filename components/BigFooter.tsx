import Link from "next/link";

const footerColumns = [
  {
    title: "Offerings",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Components", href: "/platform" },
      { label: "Integrations", href: "/platform" },
      { label: "API", href: "/platform" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Government", href: "/solutions/government" },
      { label: "Employers", href: "/solutions/employers" },
      { label: "Education", href: "/solutions/education" },
      { label: "Financing", href: "/solutions/financing" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Intake", href: "/platform" },
      { label: "Verification", href: "/platform" },
      { label: "Decisioning", href: "/platform" },
      { label: "Delivery", href: "/platform" },
    ],
  },
  {
    title: "Documents",
    links: [
      { label: "Security", href: "/trust" },
      { label: "Compliance", href: "/trust" },
      { label: "Architecture", href: "/platform" },
      { label: "API Docs", href: "/platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/trust" },
      { label: "Terms", href: "/trust" },
      { label: "Security", href: "/trust" },
      { label: "Compliance", href: "/trust" },
    ],
  },
];

export default function BigFooter() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="container-grid py-16 md:py-24">
        <div className="grid-12 mb-12">
          <div className="col-span-12 md:col-span-3 mb-8 md:mb-0">
            <h3 className="font-display text-xl font-bold text-white mb-4">Passage</h3>
            <p className="text-sm text-zinc-400">
              Infrastructure for regulated application processing workflows.
            </p>
          </div>
          {footerColumns.map((column, index) => (
            <div key={index} className="col-span-6 md:col-span-3 mb-8 md:mb-0">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">
            © {new Date().getFullYear()} Passage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
