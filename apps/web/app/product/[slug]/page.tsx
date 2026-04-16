import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductConfigurator } from "@/components/product-configurator";
import { SectionTitle } from "@/components/section-title";
import { getCurrentGoldSnapshot } from "@/lib/gold-price";
import { formatStartingPrice, getStartingPrice } from "@/lib/pricing";
import { products } from "@/lib/site-data";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const goldSnapshot = await getCurrentGoldSnapshot();

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 2);

  return (
    <div className="shell px-2 py-10 pb-20">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] p-5">
          <div
            className="aspect-[4/5] rounded-[1.6rem] border border-white/60"
            style={{ background: product.palette }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose">
              {product.categoryLabel}
            </p>
            <h1 className="mt-3 font-serif text-5xl text-ink">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-ink/70">
              {product.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-gold/15 bg-white/80 p-5">
              <p className="text-sm text-ink/50">Price</p>
              <p className="mt-2 font-serif text-3xl text-ink">
                {goldSnapshot.rates
                  ? formatStartingPrice(getStartingPrice(product, goldSnapshot.rates))
                  : "Price on request"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-gold/15 bg-white/80 p-5">
              <p className="text-sm text-ink/50">Gold Weight</p>
              <p className="mt-2 text-lg text-ink">{product.goldWeightG.toFixed(1)}g</p>
            </div>
            <div className="rounded-[1.5rem] border border-gold/15 bg-white/80 p-5">
              <p className="text-sm text-ink/50">Diamond Weight</p>
              <p className="mt-2 text-lg text-ink">{product.diamondWeightCt.toFixed(3)}ct</p>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">
              Design Notes
            </p>
            <ul className="mt-5 space-y-3 text-base leading-8 text-ink/72">
              {product.highlights.map((highlight) => (
                <li key={highlight}>- {highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductConfigurator
          product={product}
          initialGoldRates={goldSnapshot.rates}
          initialFetchedAt={goldSnapshot.fetchedAt}
          initialStale={goldSnapshot.stale}
          initialSourceLabel={goldSnapshot.sourceLabel}
          initialAvailable={goldSnapshot.available}
        />
      </div>

      <div className="mt-16">
        <SectionTitle
          eyebrow="You May Also Like"
          title="More pieces from the same family."
          description="Discover more silhouettes with the same sense of softness, light, and detail."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              goldRates={goldSnapshot.rates ?? undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
