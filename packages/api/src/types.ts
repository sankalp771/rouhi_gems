import type { DiamondGrade, GoldPurity } from "@aurum/shared";

export type CreateOrderRequest = {
  productId: string;
  goldPurity: GoldPurity;
  diamondGrade: DiamondGrade;
  customer: {
    name: string;
    phone: string;
    city: string;
  };
  specialInstructions?: string;
};

export type NotificationResult = {
  provider: string;
  status: "sent" | "skipped" | "failed";
  reason?: string;
};
