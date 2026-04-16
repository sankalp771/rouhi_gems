import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { categories, products } from "@/lib/site-data";

type CataloguePageProps = {
  searchParams?: {
    category?: string;
  };
};

export default function CataloguePage({ searchParams }: CataloguePageProps) {
  const activeCategory = searchParams?.category ?? "all";
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="shell px-2 py-10 pb-20">
      <SectionTitle
        eyebrow="Catalogue"
        title="Explore diamond-set designs across every signature category."
        description="Browse rings, bracelets, pendants, and earrings shaped in warm gold tones and finished with luminous diamonds."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = category.value === activeCategory;

          return (
            <a
              key={category.value}
              href={
                category.value === "all"
                  ? "/catalogue"
                  : `/catalogue?category=${category.value}`
              }
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-ink text-white"
                  : "border border-gold/20 bg-white/80 text-ink hover:border-gold/50"
              }`}
            >
              {category.label}
            </a>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
