import { SectionTitle } from "@/components/section-title";

const principles = [
  {
    title: "Made to order, not mass stocked",
    description:
      "We keep the story personal by producing after intent, which reduces dead inventory and leaves room for customization."
  },
  {
    title: "Gold pricing stays transparent",
    description:
      "The UI keeps gold rate, diamond value, and making charges understandable instead of hiding them behind generic luxury language."
  },
  {
    title: "Warm premium, not intimidating premium",
    description:
      "The visual system is intentionally closer to Indian fine jewellery browsing patterns than global fashion minimalism."
  }
];

export default function AboutPage() {
  return (
    <div className="shell px-2 py-10 pb-20">
      <SectionTitle
        eyebrow="About Rouhi Gems"
        title="A make-to-order fine jewellery brand built for trust-first digital buying."
        description="This first implementation leans into clarity, craftsmanship, and premium softness so the brand feels aspirational without feeling distant."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="font-serif text-4xl leading-tight text-ink">
            Lab grown diamonds, handcrafted gold, and guided customisation for
            India’s next generation of jewellery buyers.
          </p>
          <p className="mt-5 text-base leading-8 text-ink/70">
            The build plan is anchored in a strong commercial truth: metal price
            tracks the market, but margin and differentiation come from design,
            making, and high-trust diamond presentation. The site experience
            reflects that by helping customers configure pieces with confidence.
          </p>
        </div>

        <div className="grid gap-4">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-[1.6rem] border border-gold/15 bg-white/80 p-6 shadow-soft"
            >
              <p className="font-serif text-2xl text-ink">{principle.title}</p>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

