import SectionHeader from "@/components/SectionHeader";
import SolutionBlock from "@/components/SolutionBlock";

export default function FinancingPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Solutions</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Financing
            </h1>
            <p className="text-xl text-zinc-600 mb-10 max-w-2xl">
              Passage processes loan and credit applications with risk assessment and compliance requirements.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-zinc-200">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Financing Applications"
              title="Loan and credit processing workflows"
            />
            <p className="text-zinc-600 mt-6 mb-10">
              Financial institutions process applications for loans, credit lines, and financing programs. These workflows require risk assessment, compliance with lending regulations, and comprehensive documentation.
            </p>
            <SolutionBlock
              outcomes={[
                "Faster application processing with automated risk assessment",
                "Compliance with lending regulations and fair lending requirements",
                "Complete audit trails for regulatory reviews",
              ]}
              capabilities={[
                "Application and document intake",
                "Credit check and risk assessment integration",
                "Automated underwriting workflows",
                "Regulatory compliance tracking",
                "Document management and retention",
                "Decision communication and loan servicing integration",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
