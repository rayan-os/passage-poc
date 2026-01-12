import Link from "next/link";

const modules = [
  { label: "COMPONENT", title: "Nexus", description: "Unified intake orchestration across multiple channels and formats." },
  { label: "COMPONENT", title: "Vault", description: "Secure storage and management of application data and documents." },
  { label: "COMPONENT", title: "Shield", description: "Fraud detection and risk assessment capabilities." },
  { label: "COMPONENT", title: "Atlas", description: "Identity verification and document authentication services." },
  { label: "COMPONENT", title: "Ledger", description: "Immutable audit trail and compliance record keeping." },
  { label: "COMPONENT", title: "Control", description: "Policy enforcement and workflow routing configuration." },
  { label: "COMPONENT", title: "Underwrite", description: "Decision support and automated evaluation frameworks." },
  { label: "COMPONENT", title: "Exchange", description: "Integration layer for external systems and data sources." },
];

export default function PlatformOverview() {
  return (
    <section className="container-grid py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
          <p className="section-label">Platform Components</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Modular architecture for critical workflows
          </h2>
          <p className="text-muted-foreground mb-8">
            Passage operates as an integrated system of components, each designed to handle specific aspects of application processing while maintaining auditability and compliance.
          </p>
          <Link
            href="/platform"
            className="inline-flex items-center text-sm font-medium hover:text-foreground text-muted-foreground transition-colors group"
          >
            View all components
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="border border-border p-6 hover:bg-accent transition-colors"
              >
                <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2">
                  {module.label}
                </p>
                <h3 className="font-display text-xl font-bold mb-3">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
