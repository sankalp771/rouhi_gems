import { OrderForm } from "@/components/order-form";
import { SectionTitle } from "@/components/section-title";

type CustomOrderPageProps = {
  searchParams?: {
    product?: string;
  };
};

export default function CustomOrderPage({
  searchParams
}: CustomOrderPageProps) {
  return (
    <div className="shell px-2 py-10 pb-20">
      <SectionTitle
        eyebrow="Custom Order"
        title="A Phase 1 multi-step enquiry flow with live price guidance."
        description="The calculator follows the pricing structure in the build plan. For now it uses seeded gold and diamond rates locally; later we can switch the same UI to real API and Supabase persistence."
      />
      <div className="mt-10">
        <OrderForm initialProductSlug={searchParams?.product} />
      </div>
    </div>
  );
}
