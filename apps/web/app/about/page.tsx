import { SectionTitle } from "@/components/section-title";

const principles = [
  {
    title: "Designed with feeling",
    description:
      "Every Rouhi Gems piece begins with a soft, feminine point of view and finishes with the brilliance of carefully chosen diamonds."
  },
  {
    title: "Crafted in warm gold",
    description:
      "Our collection is shaped in 14Kt and 18Kt gold so each design feels luminous, wearable, and lasting."
  },
  {
    title: "Made for meaningful moments",
    description:
      "From gifting and bridal celebrations to everyday keepsakes, our jewellery is created to stay close to the heart."
  }
];

export default function AboutPage() {
  return (
    <div className="shell px-2 py-10 pb-20">
      <SectionTitle
        eyebrow="About Rouhi Gems"
        title="Fine jewellery with warmth, softness, and a modern Indian spirit."
        description="Rouhi Gems is created for those who love graceful gold, light-filled diamonds, and pieces that feel personal from the very first glance."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="font-serif text-4xl leading-tight text-ink">
            Jewellery that feels gentle, radiant, and made to be remembered.
          </p>
          <p className="mt-5 text-base leading-8 text-ink/70">
            We believe luxury should feel inviting. That is why our pieces bring
            together warm gold tones, diamond brilliance, and silhouettes that
            move effortlessly between celebration, gifting, and everyday wear.
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
