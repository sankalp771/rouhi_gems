"use client";

import { useMemo, useState } from "react";
import type { DiamondGrade, ProductCategory } from "@aurum/shared";
import {
  calculateOrderPrice,
  diamondPricePerCarat,
  formatCurrency,
  goldPriceByPurity
} from "@/lib/pricing";
import { categories, products } from "@/lib/site-data";

type FormState = {
  category: ProductCategory;
  baseDesignSlug: string;
  goldPurity: "14k" | "18k";
  weight: number;
  diamondGrade: DiamondGrade;
  diamondCarat: number;
  name: string;
  phone: string;
  city: string;
  instructions: string;
};

const defaultState: FormState = {
  category: "ring",
  baseDesignSlug: "aurora-bloom-ring",
  goldPurity: "18k",
  weight: 6.5,
  diamondGrade: "EF/VS",
  diamondCarat: 0.5,
  name: "",
  phone: "",
  city: "",
  instructions: ""
};

const steps = ["Design", "Customisation", "Contact"] as const;

export function OrderForm({
  initialProductSlug
}: {
  initialProductSlug?: string;
}) {
  const [step, setStep] = useState(0);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const initialProduct =
    products.find((product) => product.slug === initialProductSlug) ?? products[0];

  const [form, setForm] = useState<FormState>({
    ...defaultState,
    category: initialProduct.category,
    baseDesignSlug: initialProduct.slug
  });

  const filteredDesigns = useMemo(
    () => products.filter((product) => product.category === form.category),
    [form.category]
  );

  const selectedProduct =
    products.find((product) => product.slug === form.baseDesignSlug) ??
    filteredDesigns[0];

  const pricing = calculateOrderPrice({
    category: form.category,
    goldPurity: form.goldPurity,
    weight: form.weight,
    diamondGrade: form.diamondGrade,
    diamondCarat: form.diamondGrade === "None" ? 0 : form.diamondCarat
  });

  const updateForm = <Key extends keyof FormState>(
    key: Key,
    value: FormState[Key]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const isFinalStep = step === steps.length - 1;

  const submit = () => {
    const timestamp = new Date().getTime().toString().slice(-6);
    setSubmittedId(`RG-${timestamp}`);
  };

  if (submittedId) {
    return (
      <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-rose">
          Enquiry saved locally
        </p>
        <h2 className="mt-4 font-serif text-5xl text-ink">Order request received</h2>
        <p className="mt-4 text-base leading-8 text-ink/68">
          This Phase 1 UI generates a confirmation state and order ID so the
          flow is fully designed. The next backend pass will persist this into
          Supabase, trigger SMS, and send email alerts.
        </p>
        <div className="mt-8 rounded-[1.6rem] border border-gold/15 bg-white/80 p-6">
          <p className="text-sm text-ink/55">Reference ID</p>
          <p className="mt-2 font-serif text-4xl text-ink">{submittedId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="glass-panel rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-wrap gap-3">
          {steps.map((label, index) => {
            const active = index === step;
            const complete = index < step;

            return (
              <div
                key={label}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  active
                    ? "bg-ink text-white"
                    : complete
                      ? "bg-champagne text-ink"
                      : "border border-gold/20 bg-white/70 text-ink/55"
                }`}
              >
                {index + 1}. {label}
              </div>
            );
          })}
        </div>

        {step === 0 ? (
          <div className="mt-8 space-y-8">
            <div>
              <label className="text-sm font-semibold text-ink/72">Category</label>
              <div className="mt-3 flex flex-wrap gap-3">
                {categories
                  .filter((category) => category.value !== "all")
                  .map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        const nextDesign = products.find(
                          (product) => product.category === category.value
                        );
                        updateForm("category", category.value as ProductCategory);
                        updateForm("baseDesignSlug", nextDesign?.slug ?? "");
                      }}
                      className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                        form.category === category.value
                          ? "bg-ink text-white"
                          : "border border-gold/20 bg-white/80 text-ink/70"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-ink/72">
                Base design
              </label>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {filteredDesigns.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => updateForm("baseDesignSlug", product.slug)}
                    className={`rounded-[1.5rem] border p-4 text-left transition ${
                      form.baseDesignSlug === product.slug
                        ? "border-gold/40 bg-champagne/70"
                        : "border-gold/10 bg-white/78"
                    }`}
                  >
                    <div
                      className="aspect-[4/3] rounded-[1.2rem]"
                      style={{ background: product.palette }}
                    />
                    <p className="mt-4 font-serif text-2xl text-ink">
                      {product.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/62">
                      {product.shortDescription}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-ink/72">
                  Gold purity
                </label>
                <div className="mt-3 flex gap-3">
                  {(["14k", "18k"] as const).map((purity) => (
                    <button
                      key={purity}
                      type="button"
                      onClick={() => updateForm("goldPurity", purity)}
                      className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                        form.goldPurity === purity
                          ? "bg-ink text-white"
                          : "border border-gold/20 bg-white/80 text-ink/70"
                      }`}
                    >
                      {purity}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink/50">
                  Current rate: {formatCurrency(goldPriceByPurity[form.goldPurity])}/g
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink/72">
                  Diamond grade
                </label>
                <select
                  value={form.diamondGrade}
                  onChange={(event) =>
                    updateForm("diamondGrade", event.target.value as DiamondGrade)
                  }
                  className="mt-3 w-full rounded-[1rem] border border-gold/15 bg-white/80 px-4 py-3 text-sm text-ink outline-none"
                >
                  {(["EF/VS", "GH/VS", "GH/SI", "None"] as const).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-ink/72">
                  Estimated gold weight
                </label>
                <span className="text-sm text-ink/55">{form.weight.toFixed(1)}g</span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                step={0.5}
                value={form.weight}
                onChange={(event) =>
                  updateForm("weight", Number(event.target.value))
                }
                className="mt-4 w-full accent-[#b58c57]"
              />
            </div>

            {form.diamondGrade !== "None" ? (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-ink/72">
                    Diamond carat
                  </label>
                  <span className="text-sm text-ink/55">
                    {form.diamondCarat.toFixed(2)}ct
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={3}
                  step={0.05}
                  value={form.diamondCarat}
                  onChange={(event) =>
                    updateForm("diamondCarat", Number(event.target.value))
                  }
                  className="mt-4 w-full accent-[#ce8d98]"
                />
                <p className="mt-3 text-sm text-ink/50">
                  Rate: {formatCurrency(diamondPricePerCarat[form.diamondGrade])}/ct
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-ink/72">
                Name
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  className="rounded-[1rem] border border-gold/15 bg-white/80 px-4 py-3 text-sm font-normal text-ink outline-none"
                  placeholder="Your full name"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-ink/72">
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  className="rounded-[1rem] border border-gold/15 bg-white/80 px-4 py-3 text-sm font-normal text-ink outline-none"
                  placeholder="Indian mobile number"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-ink/72">
              City
              <input
                value={form.city}
                onChange={(event) => updateForm("city", event.target.value)}
                className="rounded-[1rem] border border-gold/15 bg-white/80 px-4 py-3 text-sm font-normal text-ink outline-none"
                placeholder="Mumbai, Delhi, Bangalore..."
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-ink/72">
              Special instructions
              <textarea
                value={form.instructions}
                onChange={(event) =>
                  updateForm("instructions", event.target.value)
                }
                className="min-h-32 rounded-[1rem] border border-gold/15 bg-white/80 px-4 py-3 text-sm font-normal text-ink outline-none"
                placeholder="Sizing, engraving, timeline, or any design notes"
              />
            </label>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className="rounded-full border border-gold/20 bg-white/75 px-5 py-3 text-sm font-semibold text-ink/75 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={step === 0}
          >
            Back
          </button>

          {isFinalStep ? (
            <button
              type="button"
              onClick={submit}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Submit Enquiry
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setStep((current) => Math.min(current + 1, steps.length - 1))
              }
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Continue
            </button>
          )}
        </div>
      </div>

      <aside className="space-y-5">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            Live Price Preview
          </p>
          <p className="mt-3 font-serif text-3xl text-ink">
            {selectedProduct?.name ?? "Selected design"}
          </p>
          <p className="mt-2 text-sm leading-7 text-ink/60">
            Built from the business logic in the build plan: gold value + diamond
            value + labour + GST.
          </p>

          <div className="mt-6 space-y-4 rounded-[1.6rem] border border-gold/12 bg-white/80 p-5">
            <PriceRow
              label={`Gold (${form.weight.toFixed(1)}g x ${formatCurrency(goldPriceByPurity[form.goldPurity])})`}
              value={pricing.goldCost}
            />
            <PriceRow
              label={`Diamond (${form.diamondGrade})`}
              value={pricing.diamondCost}
            />
            <PriceRow label="Labour" value={pricing.labourCharge} />
            <PriceRow label="GST" value={pricing.gst} />
            <div className="border-t border-gold/10 pt-4">
              <PriceRow label="Estimated total" value={pricing.total} strong />
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-gold/12 bg-white/75 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-rose">
            Current assumptions
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink/62">
            <li>- Gold and diamond prices are locally seeded for now.</li>
            <li>- Submit currently simulates an enquiry ID on the client.</li>
            <li>- Backend persistence and notifications come in the next pass.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function PriceRow({
  label,
  value,
  strong = false
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className={`text-sm ${strong ? "font-semibold text-ink" : "text-ink/58"}`}>
        {label}
      </p>
      <p className={`text-sm ${strong ? "font-semibold text-ink" : "text-ink/78"}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}
