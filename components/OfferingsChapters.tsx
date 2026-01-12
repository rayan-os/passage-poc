const chapters = [
  {
    number: "0.1",
    label: "Intake",
    description: "Collect applications and documents across configured channels.",
  },
  {
    number: "0.2",
    label: "Verify",
    description: "Authenticate identities, verify documents, maintain integrity signals.",
  },
  {
    number: "0.3",
    label: "Decide",
    description: "Apply rules, automate evaluation, support human review, generate audit trail.",
  },
  {
    number: "0.4",
    label: "Deliver",
    description: "Communicate outcomes and trigger downstream partner actions and integrations.",
  },
];

export default function OfferingsChapters() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-grid">
        <div className="space-y-0">
          {chapters.map((chapter, index) => (
            <div key={index}>
              <div className="grid-12 py-16 md:py-24 border-b border-zinc-200 last:border-b-0">
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  <p className="font-mono text-sm text-zinc-500 mb-2">/{chapter.number}</p>
                  <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-9 flex items-center">
                  <h2 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-zinc-900 tracking-tight leading-none">
                    {chapter.label}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
