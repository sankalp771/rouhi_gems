import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { featuredCollections, homepageMetrics, products } from "@/lib/site-data";

const featuredProducts = products.slice(0, 4);

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="shell grid gap-10 px-2 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-14">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-gold/20 bg-white/60 px-4 py-2 text-sm text-ink/75 shadow-soft">
            Made to order in India | 18k / 22k gold | IGI lab diamonds
          </div>
          <div className="space-y-5">
            <p className="font-serif text-5xl leading-none text-ink md:text-7xl">
              Jewellery crafted with
              <span className="gold-text"> softness, shine, and story.</span>
            </p>
            <p className="max-w-xl text-lg leading-8 text-ink/72">
              Phase 1 starts with a high-trust storefront inspired by premium
              Indian fine jewellery brands: calm ivory surfaces, blush accents,
              warm gold highlights, and a guided custom order flow.
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
              href="/custom-order"
            >
              Start Custom Order
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {homepageMetrics.map((metric) => (
              <div
                key={metric.label}
                className="glass-panel rounded-[1.75rem] p-5"
              >
                <p className="font-serif text-3xl text-ink">{metric.value}</p>
                <p className="mt-2 text-sm text-ink/60">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel relative rounded-[2rem] bg-shimmer p-4">
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.7rem] bg-white/75 p-4">
              <div className="aspect-[4/5] rounded-[1.4rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(247,240,223,0.95)_45%,_rgba(206,141,152,0.2))] p-5">
                <div className="flex h-full items-end rounded-[1.2rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.4),_rgba(255,250,247,0.95))] p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-rose">
                      Signature Edit
                    </p>
                    <p className="mt-3 font-serif text-4xl text-ink">
                      Aurora Bloom Ring
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-ink/65">
                      A softly sculpted rose-gold silhouette with lab diamond
                      brilliance and a handcrafted finish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {featuredCollections.map((collection) => (
                <div
                  key={collection.name}
                  className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">
                    {collection.tag}
                  </p>
                  <p className="mt-3 font-serif text-2xl text-ink">
                    {collection.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/62">
                    {collection.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell px-2 py-10">
        <SectionTitle
          eyebrow="Phase 1 Catalogue"
          title="Eight foundational designs across four jewellery categories."
          description="This first implementation ships with the minimum viable catalogue promised in the build plan, styled for premium browsing and ready to connect to real data later."
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
              Why this works
            </p>
            <p className="mt-3 font-serif text-4xl text-ink">
              Custom ordering without overwhelming the buyer.
            </p>
            <p className="mt-4 text-base leading-8 text-ink/70">
              The experience breaks decision-making into elegant steps: pick a
              design family, tune purity and stone details, and submit contact
              information while a live pricing panel keeps everything transparent.
            </p>
            <Link
              href="/custom-order"
              className="mt-6 inline-flex rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white/70"
            >
              Open Custom Form
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Browse by category with calm, editorial cards",
              "Inspect each piece on a dedicated product detail page",
              "Configure gold purity, weight, and diamond specs live"
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
