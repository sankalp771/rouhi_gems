import type { Route } from "next";
import Link from "next/link";
import type { Product } from "@aurum/shared";
import {
  formatStartingPrice,
  getStartingPrice,
  type GoldRateMap
} from "@/lib/pricing";

export function ProductCard({
  product,
  goldRates
}: {
  product: Product;
  goldRates?: GoldRateMap;
}) {
  return (
    <Link
      href={`/product/${product.slug}` as Route}
      className="group rounded-[1.8rem] border border-gold/12 bg-white/78 p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/30"
    >
      <div
        className="aspect-[4/5] rounded-[1.5rem] border border-white/60 transition duration-300 group-hover:scale-[1.01]"
        style={{ background: product.palette }}
      />
      <div className="px-1 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.25em] text-rose">
            {product.categoryLabel}
          </p>
          <p className="text-sm text-ink/50">From</p>
        </div>
        <p className="mt-3 font-serif text-3xl text-ink">{product.name}</p>
        <p className="mt-3 text-sm leading-7 text-ink/63">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between">
          <p className="font-serif text-2xl text-ink">
            {goldRates
              ? formatStartingPrice(getStartingPrice(product, goldRates))
              : "Price on request"}
          </p>
          <span className="text-sm font-semibold text-ink/70">View design</span>
        </div>
      </div>
    </Link>
  );
}
