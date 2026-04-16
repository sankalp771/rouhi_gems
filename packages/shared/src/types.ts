export type ProductCategory = "ring" | "bracelet" | "pendant" | "earring";

export type DiamondGrade = "EF/VS" | "GH/VS" | "GH/SI" | "None";

export type OrderStatus =
  | "enquiry_received"
  | "advance_paid"
  | "in_production"
  | "quality_check"
  | "dispatched"
  | "delivered";

export type GoldPurity = "14k" | "18k";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  palette: string;
  highlights: string[];
  availableGoldPurities: GoldPurity[];
  availableDiamondGrades: DiamondGrade[];
  goldWeightG: number;
  diamondWeightCt: number;
  labourCharge: number;
  diamondFocus: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  goldPurity: GoldPurity;
  minWeightG: number;
  baseLabourCharge: number;
}

export interface Order {
  id: string;
  productId: string;
  customerName: string;
  phone: string;
  city: string;
  goldPurity: GoldPurity;
  goldWeightG: number;
  diamondGrade: DiamondGrade;
  diamondCarat: number;
  labourCharge: number;
  totalPrice: number;
  status: OrderStatus;
  notes?: string;
}

export interface GoldPrice {
  purity: GoldPurity;
  pricePerGram: number;
  validFrom: string;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  city?: string;
}
