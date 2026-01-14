interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div>
      <p className="section-label">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg">{description}</p>
      )}
    </div>
  );
}
