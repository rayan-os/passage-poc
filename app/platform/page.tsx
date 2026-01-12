import PlatformCards from "@/components/PlatformCards";
import SectionHeader from "@/components/SectionHeader";

export default function PlatformPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Platform</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Operating system for critical workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage provides the infrastructure layer that organizations use to build, deploy, and operate application processing systems at scale.
            </p>
          </div>
        </div>
      </section>
      <PlatformCards />
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Architecture"
              title="Designed for compliance and scale"
            />
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Traceable by design</h3>
                <p className="text-muted-foreground">
                  Every action within Passage generates an immutable record. Audit trails capture who accessed what data, when decisions were made, and how outcomes were determined.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Modular components</h3>
                <p className="text-muted-foreground">
                  Organizations configure Passage components to match their specific workflows. Components integrate through standardized interfaces while maintaining isolation and security boundaries.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Controlled automation</h3>
                <p className="text-muted-foreground">
                  Automated decision support reduces processing time while preserving human oversight. Rules are explicit, traceable, and configurable to meet regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
