import SectionHeader from "@/components/SectionHeader";
import SolutionBlock from "@/components/SolutionBlock";

export default function EducationPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Solutions</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Education
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage manages admissions and enrollment processes for educational institutions, ensuring regulatory compliance and auditability.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Admissions & Enrollment"
              title="Student application processing systems"
            />
            <p className="text-muted-foreground mt-6 mb-10">
              Educational institutions process student applications, verify transcripts, evaluate qualifications, and manage enrollment. These workflows require transparency, fairness, and compliance with educational regulations.
            </p>
            <SolutionBlock
              outcomes={[
                "Streamlined admissions processing",
                "Transparent and auditable decision processes",
                "Compliance with educational regulations",
              ]}
              capabilities={[
                "Application and transcript intake",
                "Academic credential verification",
                "Admission decision workflows",
                "Financial aid application processing",
                "Student information system integration",
                "FERPA compliance features",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
