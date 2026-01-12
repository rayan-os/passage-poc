const modules = [
  { 
    label: "COMPONENT", 
    title: "Nexus", 
    description: "Unified intake orchestration across multiple channels and formats. Nexus routes applications to appropriate processing workflows based on configurable rules.",
    capabilities: [
      "Multi-channel application collection",
      "Intake workflow routing",
      "Application format normalization",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Vault", 
    description: "Secure storage and management of application data and documents. Vault provides encrypted storage with granular access controls and retention policies.",
    capabilities: [
      "Encrypted data storage",
      "Document versioning",
      "Retention policy enforcement",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Shield", 
    description: "Fraud detection and risk assessment capabilities. Shield analyzes application patterns to identify anomalies and potential fraud indicators.",
    capabilities: [
      "Pattern anomaly detection",
      "Risk scoring",
      "Fraud indicator alerts",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Atlas", 
    description: "Identity verification and document authentication services. Atlas validates applicant identities and authenticates supporting documents against trusted sources.",
    capabilities: [
      "Identity verification",
      "Document authentication",
      "Biometric validation",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Ledger", 
    description: "Immutable audit trail and compliance record keeping. Ledger maintains chronological records of all system events and decision points.",
    capabilities: [
      "Immutable event logs",
      "Decision audit trails",
      "Compliance reporting",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Control", 
    description: "Policy enforcement and workflow routing configuration. Control allows administrators to define rules, policies, and routing logic for application processing.",
    capabilities: [
      "Policy configuration",
      "Workflow routing rules",
      "Access control management",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Underwrite", 
    description: "Decision support and automated evaluation frameworks. Underwrite applies configurable rules and models to assess application eligibility and generate recommendations.",
    capabilities: [
      "Rule-based evaluation",
      "Decision support models",
      "Recommendation generation",
    ]
  },
  { 
    label: "COMPONENT", 
    title: "Exchange", 
    description: "Integration layer for external systems and data sources. Exchange provides standardized APIs and connectors for integrating with third-party services and databases.",
    capabilities: [
      "REST and GraphQL APIs",
      "Third-party integrations",
      "Data synchronization",
    ]
  },
];

export default function PlatformCards() {
  return (
    <section className="container-grid py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
          <p className="section-label">Platform Components</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Integrated system architecture
          </h2>
          <p className="text-muted-foreground">
            These components work together as part of the Passage platform. Component names are placeholders and represent functional areas rather than product names.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="border border-border p-8 hover:bg-accent transition-colors"
              >
                <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2">
                  {module.label}
                </p>
                <h3 className="font-display text-2xl font-bold mb-4">{module.title}</h3>
                <p className="text-muted-foreground mb-6">{module.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {module.capabilities.map((capability, capIndex) => (
                    <div key={capIndex} className="text-sm">
                      <p className="text-muted-foreground">{capability}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
