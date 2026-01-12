const steps = [
  { label: "CAPTURE", title: "Intake", description: "Collect applications and supporting documents through configured channels." },
  { label: "VERIFY", title: "Validation", description: "Authenticate identities and verify document integrity." },
  { label: "DECIDE", title: "Evaluation", description: "Apply rules and automated decision support to assess eligibility." },
  { label: "DELIVER", title: "Outcome", description: "Communicate results and trigger downstream actions." },
];

export default function HowItWorks() {
  return (
    <section className="container-grid py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
          <p className="section-label">How It Works</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            End-to-end processing pipeline
          </h2>
          <p className="text-muted-foreground">
            Passage orchestrates the complete application lifecycle, from initial intake through final outcome delivery.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="border border-border p-6 h-full">
                    <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2">
                      {step.label}
                    </p>
                    <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
