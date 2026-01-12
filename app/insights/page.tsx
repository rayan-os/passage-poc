import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const insights = [
  {
    title: "The case for infrastructure in regulated workflows",
    description: "Why organizations need purpose-built infrastructure for application processing systems where compliance and auditability are non-negotiable.",
    date: "2024-03-15",
    category: "Platform",
  },
  {
    title: "Audit trails as a design constraint",
    description: "How immutable audit logs change system architecture and enable new approaches to compliance and transparency.",
    date: "2024-02-28",
    category: "Trust",
  },
  {
    title: "Controlled automation in decision-making",
    description: "Balancing speed and oversight in automated application processing systems.",
    date: "2024-02-10",
    category: "Platform",
  },
];

export default function InsightsPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Insights</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Perspectives on regulated workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Analysis and commentary on application processing, compliance infrastructure, and system design for regulated environments.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div className="space-y-8">
              {insights.map((insight, index) => (
                <Link
                  key={index}
                  href="#"
                  className="block border-b border-border pb-8 hover:opacity-70 transition-opacity group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2">
                        {insight.category}
                      </p>
                      <h2 className="font-display text-2xl font-bold group-hover:text-foreground transition-colors mb-2">
                        {insight.title}
                      </h2>
                      <p className="text-muted-foreground">{insight.description}</p>
                    </div>
                    <p className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                      {insight.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
