import SectionHeader from "@/components/SectionHeader";

export default function ContactPage() {
  return (
    <>
      <section className="container-grid py-24 md:py-32">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="section-label">Contact</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Request access
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Passage is available to organizations that process applications in regulated environments. Contact us to discuss your requirements and access options.
            </p>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Get in touch"
              title="Contact information"
            />
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">General inquiries</h3>
                <p className="text-muted-foreground mb-2">
                  For general questions about Passage, platform capabilities, and partnership opportunities.
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  contact@passage.com
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Security and compliance</h3>
                <p className="text-muted-foreground mb-2">
                  For security documentation, compliance information, and audit requests.
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  security@passage.com
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Sales and partnerships</h3>
                <p className="text-muted-foreground mb-2">
                  For pricing, implementation planning, and partnership discussions.
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  sales@passage.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-grid py-24 border-t border-border">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <SectionHeader
              label="Request Access"
              title="What to include"
            />
            <p className="text-muted-foreground mt-6 mb-8">
              When requesting access, please provide the following information to help us understand your requirements:
            </p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-start">
                <span className="font-mono text-muted-foreground mr-3">01</span>
                <span className="text-muted-foreground">Organization name and industry</span>
              </li>
              <li className="flex items-start">
                <span className="font-mono text-muted-foreground mr-3">02</span>
                <span className="text-muted-foreground">Use case and application volume</span>
              </li>
              <li className="flex items-start">
                <span className="font-mono text-muted-foreground mr-3">03</span>
                <span className="text-muted-foreground">Compliance and regulatory requirements</span>
              </li>
              <li className="flex items-start">
                <span className="font-mono text-muted-foreground mr-3">04</span>
                <span className="text-muted-foreground">Integration requirements and timeline</span>
              </li>
              <li className="flex items-start">
                <span className="font-mono text-muted-foreground mr-3">05</span>
                <span className="text-muted-foreground">Contact information and preferred communication method</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
