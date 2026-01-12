import SectionHeader from "@/components/SectionHeader";
import SolutionBlock from "@/components/SolutionBlock";

export default function GovernmentPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Solutions</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Government
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage supports public sector application programs where compliance, transparency, and auditability are essential requirements.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Government Applications"
              title="Processing pathways for public programs"
            />
            <p className="text-muted-foreground mt-6 mb-10">
              Government agencies process applications for benefits, permits, licenses, and program enrollment. These workflows require strict adherence to regulations, comprehensive audit trails, and fair process guarantees.
            </p>
            <SolutionBlock
              outcomes={[
                "Reduced processing time while maintaining compliance",
                "Complete audit trails for regulatory reviews",
                "Consistent application of eligibility rules",
              ]}
              capabilities={[
                "Federal and state regulation mapping",
                "Fairness and bias monitoring tools",
                "Public records and transparency features",
                "Integration with government identity systems",
                "Disaster recovery and continuity planning",
                "Security standards alignment",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
