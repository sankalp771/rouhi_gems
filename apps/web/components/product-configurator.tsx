"use client";

import { useMemo, useState } from "react";
import type { DiamondGrade, GoldPurity, Product } from "@aurum/shared";
import { formatCurrency, getProductPrice } from "@/lib/pricing";

type RequestForm = {
  name: string;
  phone: string;
  city: string;
};

export function ProductConfigurator({ product }: { product: Product }) {
  const [goldPurity, setGoldPurity] = useState<GoldPurity>(
    product.availableGoldPurities[1] ?? product.availableGoldPurities[0]
  );
  const [diamondGrade, setDiamondGrade] = useState<DiamondGrade>(
    product.availableDiamondGrades[2] ?? product.availableDiamondGrades[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [form, setForm] = useState<RequestForm>({
    name: "",
    phone: "",
    city: ""
  });

  const pricing = useMemo(
    () => getProductPrice(product, { goldPurity, diamondGrade }),
    [diamondGrade, goldPurity, product]
  );

  const submitRequest = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    setRequestId(`RG-${random}`);
  };

  return (
    <>
      <div className="glass-panel rounded-[2rem] p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-3">
          <SpecCard label="Gold Weight" value={`${product.goldWeightG.toFixed(1)}g`} />
          <SpecCard
            label="Diamond Weight"
            value={`${product.diamondWeightCt.toFixed(3)}ct`}
          />
          <SpecCard label="Diamond Style" value={product.diamondFocus} />
        </div>

        <div className="mt-8 space-y-7">
          <SelectorGroup
            label="Gold"
            options={product.availableGoldPurities}
            value={goldPurity}
            onChange={(value) => setGoldPurity(value as GoldPurity)}
          />
          <SelectorGroup
            label="Diamond Grade"
            options={product.availableDiamondGrades}
            value={diamondGrade}
            onChange={(value) => setDiamondGrade(value as DiamondGrade)}
          />
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-gold/12 bg-white/80 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink/55">Estimated price</p>
              <p className="mt-2 font-serif text-4xl text-ink">
                {formatCurrency(pricing.total)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setRequestId(null);
              }}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Request This Piece
            </button>
          </div>
          <div className="mt-5 space-y-3 border-t border-gold/10 pt-4 text-sm text-ink/62">
            <PriceRow label="Gold value" value={pricing.goldCost} />
            <PriceRow label="Diamond value" value={pricing.diamondCost} />
            <PriceRow label="Making charges" value={pricing.labourCharge} />
            <PriceRow label="GST" value={pricing.gst} />
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2a1f1b]/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-gold/15 bg-[#fffaf5] p-7 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose">
                  Request This Piece
                </p>
                <p className="mt-3 font-serif text-4xl text-ink">{product.name}</p>
                <p className="mt-3 text-sm leading-7 text-ink/62">
                  Share your details and we&apos;ll reach out with pricing,
                  availability, and everything you need for your piece.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-gold/20 px-3 py-1 text-sm text-ink/70"
              >
                Close
              </button>
            </div>

            {requestId ? (
              <div className="mt-8 rounded-[1.5rem] border border-gold/15 bg-white/85 p-6">
                <p className="text-sm text-ink/55">Your reference</p>
                <p className="mt-2 font-serif text-4xl text-ink">{requestId}</p>
                <p className="mt-3 text-sm leading-7 text-ink/62">
                  Our team will confirm details for your selected gold and diamond
                  options shortly.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-4">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                  placeholder="Your full name"
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
                  placeholder="Your phone number"
                />
                <Field
                  label="City"
                  value={form.city}
                  onChange={(value) => setForm((current) => ({ ...current, city: value }))}
                  placeholder="Your city"
                />
                <button
                  type="button"
                  onClick={submitRequest}
                  className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
                >
                  Send Request
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

function SelectorGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink/74">{label}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              option === value
                ? "bg-ink text-white"
                : "border border-gold/20 bg-white/80 text-ink/72"
            }`}
          >
            {option === "14k" ? "14Kt" : option === "18k" ? "18Kt" : option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-gold/12 bg-white/80 p-5">
      <p className="text-sm text-ink/50">{label}</p>
      <p className="mt-2 font-serif text-2xl text-ink">{value}</p>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="text-ink/78">{formatCurrency(value)}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink/74">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[1rem] border border-gold/15 bg-white/90 px-4 py-3 text-sm font-normal text-ink outline-none"
        placeholder={placeholder}
      />
    </label>
  );
}
