export const ACCENT = {
  name: "violet",
  // Tailwind token choice: keep accent subtle, consistent.
  text: "text-violet-300",
  border: "border-violet-400/35",
  ring: "ring-violet-400/25",
  glow: "shadow-[0_0_0_1px_rgba(167,139,250,0.22),0_0_40px_rgba(139,92,246,0.10)]",
  bgSoft: "bg-violet-500/12",
  stroke: "rgba(167,139,250,0.95)",
};

export const COPY = {
  nav: {
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Agents", href: "#agents" },
      { label: "Integrations", href: "#integrations" },
      { label: "Console", href: "#console" },
    ],
    cta: { label: "Book a demo", href: "/contact" },
  },
  hero: {
    header: "The AI operating system for admissions",
    subhead: "AI agents handle the workflow, your team approves the outcomes.",
    primaryCta: "Book a demo",
    secondaryCta: "See how it works",
    diagram: {
      inputs: { title: "Inputs", items: "Documents, policy, systems" },
      passage: { title: "Passage", items: "Agents, workflow, control" },
      outputs: { title: "Outputs", items: "Decisions, LOAs, reporting" },
    },
  },
  platformClaim: {
    header: "Build an admissions control plane",
    body: "Passage turns admissions into a governed workflow. Every outcome is measurable.",
    stages: ["Ingest", "Verify", "Decide", "Follow up", "LOA", "Report"],
  },
  outcomeStrip: {
    header: "Move faster without losing control",
    body: "Speed up decisions and LOAs, reduce manual load, keep oversight.",
    tiles: ["More throughput", "Faster LOAs", "Less back and forth"],
  },
  agents: {
    header: "Our Agents",
    body: "Small AI systems, each does one job. Together they run the pipeline.",
    cards: [
      { index: "01", title: "Verify", body: "Checks documents, flags issues, pulls proof when needed." },
      { index: "02", title: "Decide", body: "Applies your rules and explains the outcome." },
      { index: "03", title: "Support", body: "Answers applicants fast and hands off edge cases to staff." },
      { index: "04", title: "Guide", body: "Helps applicants pick the right program, then moves them forward." },
      { index: "05", title: "Control", body: "Lets your team review, adjust, and track everything." },
    ],
  },
  proof: {
    header: "Proof, not promises",
    body: "Teams use Passage to move faster, stay consistent, and reduce manual load.",
    kpis: ["X institutions live", "Y applications processed", "Z percent faster decisions"],
    testimonials: [
      {
        quote: "We cut review time and finally made decisions consistent across the team.",
        name: "Head of Admissions",
        org: "Institution",
      },
      {
        quote: "Applicants get answers instantly, our staff stopped drowning in repetitive questions.",
        name: "Enrollment Ops Lead",
        org: "Institution",
      },
      {
        quote: "We went from chaos to a clean pipeline with clear next steps on every file.",
        name: "Director of Enrollment",
        org: "Institution",
      },
    ],
    logosCount: 10,
  },
  integrations: {
    header: "Works with what you already use",
    body: "Deploy without rebuilding your stack.",
    categories: [
      { title: "Student Systems", chips: ["Student system", "LMS", "Roster", "Directory", "Forms", "SFTP"] },
      { title: "CRM and Comms", chips: ["CRM", "Email", "SMS", "Call center", "Templates", "Webhooks"] },
      { title: "Document Sources", chips: ["Uploads", "Drive", "Email intake", "Scan", "S3", "Archive"] },
      { title: "Identity and Security", chips: ["SSO", "SAML", "OIDC", "SCIM", "RBAC", "Audit"] },
      { title: "Data and Reporting", chips: ["Warehouse", "BI", "Exports", "Events", "Logs", "APIs"] },
    ],
  },
  console: {
    header: "Turn questions into actions, not spreadsheets",
    subhead: "Type a question, or grab one floating below.",
    prompts: [
      "What is blocking LOAs today?",
      "Show throughput by intake.",
      "Which applicants are missing docs?",
      "Flag files that need review.",
      "Where are we losing applicants?",
      "List urgent follow ups.",
      "How long is each stage taking?",
      "Summarize this application.",
      "Generate a status update message.",
      "Export today’s funnel snapshot.",
    ],
  },
  team: {
    header: "Built by operators",
    body: "Placeholder founder details. Replace with verified info.",
    founder: {
      name: "Founder Name",
      title: "Title",
      bullets: ["Former operator in admissions workflows", "Built systems that run under policy constraints"],
    },
    finalCta: { header: "See Passage in action", cta: "Book a demo" },
  },
};

