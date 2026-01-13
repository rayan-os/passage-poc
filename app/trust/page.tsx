import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const trustSections = [
  {
    label: "AUDIT LOGS",
    title: "Comprehensive audit trails",
    description: "Every action within Passage generates an immutable record. Audit logs capture user actions, system events, data access, and decision points with timestamps and attribution.",
    details: [
      "Immutable event logging",
      "User action attribution",
      "Data access tracking",
      "Decision point recording",
      "Export capabilities for compliance reviews",
    ]
  },
  {
    label: "ACCESS CONTROL",
    title: "Granular permissions management",
    description: "Passage provides role-based access controls that allow organizations to define who can access what data and perform which actions. Permissions are enforced at every system boundary.",
    details: [
      "Role-based access control",
      "Data-level permissions",
      "Action-level authorization",
      "Session management",
      "Multi-factor authentication support",
    ]
  },
  {
    label: "DATA RETENTION",
    title: "Configurable retention policies",
    description: "Organizations configure data retention policies that align with regulatory requirements. Passage enforces these policies automatically, ensuring compliance with data lifecycle management obligations.",
    details: [
      "Policy-based retention rules",
      "Automated data lifecycle management",
      "Regulatory requirement mapping",
      "Secure data deletion",
      "Archive and retrieval capabilities",
    ]
  },
  {
    label: "PRIVACY BY DESIGN",
    title: "Privacy-first architecture",
    description: "Passage is designed with privacy principles embedded in its architecture. Data minimization, purpose limitation, and consent management capabilities support privacy compliance requirements.",
    details: [
      "Data minimization practices",
      "Purpose limitation enforcement",
      "Consent management",
      "Right to access and deletion",
      "Data portability support",
    ]
  },
  {
    label: "INTEGRATION POSTURE",
    title: "Standard protocols and APIs",
    description: "Passage integrates with existing systems through standardized APIs and protocols. Integration capabilities support secure data exchange while maintaining auditability and compliance boundaries.",
    details: [
      "REST and GraphQL APIs",
      "OAuth 2.0 and SAML support",
      "Webhook event notifications",
      "Encrypted data transmission",
      "API versioning and backward compatibility",
    ]
  },
];

export default function TrustPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Trust</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Security, compliance, and auditability
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage is designed to meet the security, compliance, and audit standards required by regulated industries and government contracts.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div className="space-y-24">
              {trustSections.map((section, index) => (
                <div key={index}>
                  <p className="section-label">{section.label}</p>
                  <h2 className="font-display text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground mb-6">{section.description}</p>
                  <ul className="space-y-3">
                    {section.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <svg className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Security & Compliance"
              title="Additional resources"
            />
            <div className="mt-10 space-y-6">
              <Link
                href="/contact"
                className="block border border-border p-6 hover:bg-accent transition-colors group"
              >
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-foreground transition-colors">
                  Security documentation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Request access to detailed security documentation, compliance certifications, and architecture diagrams.
                </p>
              </Link>
              <Link
                href="/contact"
                className="block border border-border p-6 hover:bg-accent transition-colors group"
              >
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-foreground transition-colors">
                  Compliance information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn about Passage&apos;s compliance posture and how it aligns with regulatory requirements in your industry.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
