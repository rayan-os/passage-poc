import Link from "next/link";

const trustPoints = [
  "Audit logs for all system actions",
  "Granular access controls",
  "Configurable data retention policies",
  "Privacy by design architecture",
  "Standard integration protocols",
];

export default function TrustPreview() {
  return (
    <section className="container-grid py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <p className="section-label">Trust & Compliance</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Built for institutional requirements
          </h2>
          <p className="text-muted-foreground mb-8">
            Passage is designed to meet the security, compliance, and audit standards required by regulated industries and government contracts.
          </p>
          <ul className="space-y-3 mb-8">
            {trustPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/trust"
            className="inline-flex items-center text-sm font-medium hover:text-foreground text-muted-foreground transition-colors group"
          >
            View trust documentation
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
