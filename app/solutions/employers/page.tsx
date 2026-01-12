import SectionHeader from "@/components/SectionHeader";
import SolutionBlock from "@/components/SolutionBlock";

export default function EmployersPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Solutions</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Employers
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage streamlines hiring workflows with integrated verification and background check processes, ensuring compliance with employment regulations.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Hiring Workflows"
              title="Application processing for talent acquisition"
            />
            <p className="text-muted-foreground mt-6 mb-10">
              Employers process applications, verify credentials, conduct background checks, and make hiring decisions. These workflows must balance speed with thoroughness while complying with employment law.
            </p>
            <SolutionBlock
              outcomes={[
                "Faster time-to-hire with automated verification",
                "Consistent candidate evaluation processes",
                "Compliance with employment regulations",
              ]}
              capabilities={[
                "Resume and application intake",
                "Credential verification integration",
                "Background check orchestration",
                "Interview scheduling coordination",
                "Equal opportunity compliance tracking",
                "Candidate communication workflows",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
