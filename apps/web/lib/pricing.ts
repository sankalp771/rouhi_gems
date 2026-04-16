import type { DiamondGrade, Product, ProductCategory } from "@aurum/shared";

export const goldPriceByPurity = {
  "18k": 5600,
  "22k": 6850
} as const;

export const diamondPricePerCarat: Record<DiamondGrade, number> = {
  "EF/VS": 82000,
  "GH/VS": 69000,
  "GH/SI": 54000,
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
    goldPurity: product.goldPurities[0],
    weight: product.startingWeight,
    diamondGrade: product.startingDiamondGrade,
    diamondCarat: product.startingDiamondCarat
  }).total;
}

