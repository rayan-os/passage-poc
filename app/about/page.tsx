import SectionHeader from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">About</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Infrastructure for regulated workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage provides the foundational infrastructure that organizations use to build and operate application processing systems where compliance, auditability, and speed matter.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Mission"
              title="Enabling compliant application processing"
            />
            <p className="text-muted-foreground mt-6 mb-10">
              Organizations that process applications in regulated environments face a fundamental challenge: they must balance speed, fairness, and compliance. Legacy systems often force compromises between these objectives.
            </p>
            <p className="text-muted-foreground mb-10">
              Passage is designed to eliminate these compromises. By providing infrastructure that is compliant, auditable, and fast by default, Passage enables organizations to process applications at scale while meeting regulatory requirements.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Principles"
              title="Design philosophy"
            />
            <div className="mt-10 space-y-10">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Traceability over convenience</h3>
                <p className="text-muted-foreground">
                  Every decision must be traceable. Every action must be auditable. These requirements are not optional features—they are fundamental design constraints.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Control over automation</h3>
                <p className="text-muted-foreground">
                  Automation accelerates processing, but human oversight remains essential. Passage provides tools for controlled automation where rules are explicit and decisions are reviewable.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Resilience over speed</h3>
                <p className="text-muted-foreground">
                  System reliability is more important than peak performance. Passage is designed to operate consistently under load and recover gracefully from failures.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Clarity over cleverness</h3>
                <p className="text-muted-foreground">
                  Complex systems require clear interfaces. Passage prioritizes clarity in its APIs, configuration, and user interfaces, reducing the cognitive load required to operate and maintain the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
