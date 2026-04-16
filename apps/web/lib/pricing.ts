import type { DiamondGrade, Product, ProductCategory } from "@aurum/shared";

export const goldPriceByPurity = {
  "14k": 4450,
  "18k": 5600,
} as const;

export type GoldRateMap = Record<keyof typeof goldPriceByPurity, number>;

export const diamondPricePerCarat: Record<DiamondGrade, number> = {
  "EF/VS": 88000,
  "GH/VS": 71000,
  "GH/SI": 56000,
  None: 0
};

const labourByCategory: Record<ProductCategory, number> = {
  ring: 3800,
  bracelet: 5200,
  pendant: 3400,
  earring: 4200
};

export function calculateOrderPrice({
  category,
  goldPurity,
  weight,
  diamondGrade,
  diamondCarat,
  goldRates = goldPriceByPurity
}: {
  category: ProductCategory;
  goldPurity: keyof typeof goldPriceByPurity;
  weight: number;
  diamondGrade: DiamondGrade;
  diamondCarat: number;
  goldRates?: GoldRateMap;
}) {
  const goldCost = weight * goldRates[goldPurity];
  const diamondCost =
    diamondGrade === "None" ? 0 : diamondCarat * diamondPricePerCarat[diamondGrade];
  const labourCharge = labourByCategory[category];
  const gst = (goldCost + labourCharge) * 0.03 + diamondCost * 0.015;
  const total = goldCost + diamondCost + labourCharge + gst;

  return {
    goldCost,
    diamondCost,
    labourCharge,
    gst,
    total
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getStartingPrice(product: Product, goldRates?: GoldRateMap) {
  return calculateOrderPrice({
    category: product.category,
    goldPurity: product.availableGoldPurities[0],
    weight: product.goldWeightG,
    diamondGrade: product.availableDiamondGrades[0],
    diamondCarat: product.diamondWeightCt,
    goldRates
  }).total;
}

export function getProductPrice(product: Product, options?: {
  goldPurity?: keyof typeof goldPriceByPurity;
  diamondGrade?: DiamondGrade;
  goldRates?: GoldRateMap;
}) {
  return calculateOrderPrice({
    category: product.category,
    goldPurity: options?.goldPurity ?? product.availableGoldPurities[0],
    weight: product.goldWeightG,
    diamondGrade: options?.diamondGrade ?? product.availableDiamondGrades[0],
    diamondCarat: product.diamondWeightCt,
    goldRates: options?.goldRates
  });
}

export function formatStartingPrice(value: number) {
  const rounded = Math.round(value / 1000) * 1000;
  return `Starting ${formatCurrency(rounded)}`;
}
