import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { products } from "@/lib/site-data";

const featuredProducts = products.slice(0, 4);

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="shell grid gap-10 px-2 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-14">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-gold/20 bg-white/60 px-4 py-2 text-sm text-ink/75 shadow-soft">
            Made to order in India | 14Kt & 18Kt gold | Diamond-set designs
          </div>
          <div className="space-y-5">
            <p className="font-serif text-5xl leading-none text-ink md:text-7xl">
              Pieces that hold
              <span className="gold-text"> light, love, and memory.</span>
            </p>
            <p className="max-w-xl text-lg leading-8 text-ink/72">
              Rouhi Gems brings together warm gold, luminous diamonds, and
              graceful silhouettes for the moments you want to keep close.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
              href="/catalogue"
            >
              Explore Catalogue
            </Link>
            <Link
              className="rounded-full border border-gold/30 bg-white/80 px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold/60"
              href="/catalogue"
            >
              Create Your Piece
            </Link>
          </div>
        </div>

        <div className="glass-panel relative rounded-[2rem] bg-shimmer p-4">
          <div className="rounded-[1.8rem] bg-white/72 p-5">
            <div className="aspect-[4/5] rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(247,240,223,0.94)_40%,_rgba(206,141,152,0.28)_78%)] p-5">
              <div className="flex h-full items-end rounded-[1.2rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.3),_rgba(255,250,247,0.92))] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-rose">
                    Signature Ring
                  </p>
                  <p className="mt-3 font-serif text-5xl text-ink">
                    Aurora Bloom
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-ink/65">
                    A delicate floral ring with soft rose warmth and a diamond
                    cluster designed to glow from every angle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell px-2 py-10">
        <SectionTitle
          eyebrow="Featured Designs"
          title="A collection of diamond-set pieces for gifting, celebration, and everyday beauty."
          description="Explore rings, bracelets, pendants, and earrings designed in warm gold tones and finished with light-catching diamonds."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="shell px-2 py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-rose">
              Crafted for You
            </p>
            <p className="mt-3 font-serif text-4xl text-ink">
              Choose the piece you love, then refine it beautifully.
            </p>
            <p className="mt-4 text-base leading-8 text-ink/70">
              Every product page lets you explore gold purity, diamond grade,
              and price in one calm, guided view before sending your request.
            </p>
            <Link
              href="/catalogue"
              className="mt-6 inline-flex rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white/70"
            >
              Explore Catalogue
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Diamond-set pieces across rings, bracelets, pendants, and earrings",
              "Product pages with fixed gold and diamond weights for clarity",
              "Simple request flow for the exact piece you want"
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-gold/15 bg-white/75 p-6 shadow-soft"
              >
                <div className="h-12 w-12 rounded-full bg-champagne" />
                <p className="mt-8 text-lg leading-7 text-ink/78">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
