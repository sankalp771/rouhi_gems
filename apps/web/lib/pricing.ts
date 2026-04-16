import type { DiamondGrade, Product, ProductCategory } from "@aurum/shared";

export const goldPriceByPurity = {
  "14k": 4450,
  "18k": 5600,
} as const;

export const diamondPricePerCarat: Record<DiamondGrade, number> = {
  "SI IJ": 42000,
  "SI GH": 56000,
  "VS GH": 71000,
  "VVS EF": 88000
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
  diamondCarat
}: {
  category: ProductCategory;
  goldPurity: keyof typeof goldPriceByPurity;
  weight: number;
  diamondGrade: DiamondGrade;
  diamondCarat: number;
}) {
  const goldCost = weight * goldPriceByPurity[goldPurity];
  const diamondCost = diamondCarat * diamondPricePerCarat[diamondGrade];
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

export function getStartingPrice(product: Product) {
  return calculateOrderPrice({
    category: product.category,
    goldPurity: product.availableGoldPurities[0],
    weight: product.goldWeightG,
    diamondGrade: product.availableDiamondGrades[0],
    diamondCarat: product.diamondWeightCt
  }).total;
}

export function getProductPrice(product: Product, options?: {
  goldPurity?: keyof typeof goldPriceByPurity;
  diamondGrade?: DiamondGrade;
}) {
  return calculateOrderPrice({
    category: product.category,
    goldPurity: options?.goldPurity ?? product.availableGoldPurities[0],
    weight: product.goldWeightG,
    diamondGrade: options?.diamondGrade ?? product.availableDiamondGrades[0],
    diamondCarat: product.diamondWeightCt
  });
}

export function formatStartingPrice(value: number) {
  const rounded = Math.round(value / 1000) * 1000;
  return `Starting ${formatCurrency(rounded)}`;
}
