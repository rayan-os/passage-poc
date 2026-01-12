interface SolutionBlockProps {
  outcomes: string[];
  capabilities: string[];
}

export default function SolutionBlock({ outcomes, capabilities }: SolutionBlockProps) {
  return (
    <div className="grid-12 mt-12">
      <div className="col-span-12 lg:col-span-6">
        <h3 className="font-display text-xl font-bold mb-6">Outcomes</h3>
        <ul className="space-y-4">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-zinc-600">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 lg:col-span-6 mt-12 lg:mt-0">
        <h3 className="font-display text-xl font-bold mb-6">Capabilities</h3>
        <ul className="space-y-4">
          {capabilities.map((capability, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-zinc-600">{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
