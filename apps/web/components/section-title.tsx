type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.35em] text-rose">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-ink/68">{description}</p>
    </div>
  );
}
