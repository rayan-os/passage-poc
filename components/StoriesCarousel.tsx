import Link from "next/link";

const stories = [
  {
    label: "SOLUTION",
    title: "Government",
    description: "Supporting public sector application programs with compliance and audit requirements.",
    href: "/solutions/government",
  },
  {
    label: "SOLUTION",
    title: "Employers",
    description: "Streamlining hiring workflows with verification and background check integration.",
    href: "/solutions/employers",
  },
  {
    label: "SOLUTION",
    title: "Education",
    description: "Managing admissions and enrollment processes with regulatory adherence.",
    href: "/solutions/education",
  },
  {
    label: "SOLUTION",
    title: "Financing",
    description: "Processing loan and credit applications with risk assessment and compliance.",
    href: "/solutions/financing",
  },
];

export default function StoriesCarousel() {
  return (
    <section className="bg-zinc-50 py-24 md:py-32">
      <div className="container-grid">
        <div className="overflow-x-auto pb-4 -mx-6 lg:-mx-8 px-6 lg:px-8">
          <div className="flex gap-6 min-w-max md:grid md:grid-cols-2 lg:grid-cols-4 md:min-w-0">
            {stories.map((story, index) => (
              <Link
                key={index}
                href={story.href}
                className="flex-shrink-0 w-80 md:w-auto bg-white border border-zinc-200 p-8 hover:border-zinc-400 transition-colors group"
              >
                <div className="aspect-video bg-zinc-100 mb-6 flex items-center justify-center">
                  <div className="text-zinc-400 text-sm">Image placeholder</div>
                </div>
                <p className="font-mono text-xs text-zinc-500 mb-2">{story.label}</p>
                <h3 className="font-display text-2xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{story.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
