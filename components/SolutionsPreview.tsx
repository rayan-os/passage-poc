import Link from "next/link";

const solutions = [
  {
    title: "Government",
    description: "Supporting public sector application programs with compliance and audit requirements.",
    href: "/solutions/government",
  },
  {
    title: "Employers",
    description: "Streamlining hiring workflows with verification and background check integration.",
    href: "/solutions/employers",
  },
  {
    title: "Education",
    description: "Managing admissions and enrollment processes with regulatory adherence.",
    href: "/solutions/education",
  },
];

export default function SolutionsPreview() {
  return (
    <section className="container-grid py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4 mb-12 lg:mb-0">
          <p className="section-label">Solutions</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Built for regulated environments
          </h2>
          <p className="text-muted-foreground">
            Passage serves organizations that process applications where compliance, auditability, and security are non-negotiable.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                href={solution.href}
                className="border border-border p-6 hover:bg-accent transition-colors block group"
              >
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
