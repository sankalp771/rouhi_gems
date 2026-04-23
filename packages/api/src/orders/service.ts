import { calculateOrderPrice, products } from "@aurum/shared";
import { sendOrderEmail } from "../notifications/email";
import { sendOrderSms } from "../notifications/sms";
import type { CreateOrderRequest } from "../types";
import { HttpError } from "../utils/http-error";
import { createOrderReference } from "../utils/reference";
import { saveOrder } from "./repository";

export async function createOrder(input: CreateOrderRequest) {
  const product = products.find((item) => item.id === input.productId);

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  if (!product.availableGoldPurities.includes(input.goldPurity)) {
    throw new HttpError(400, "Gold purity is not available for this product");
  }

  if (!product.availableDiamondGrades.includes(input.diamondGrade)) {
    throw new HttpError(400, "Diamond grade is not available for this product");
  }

  const reference = createOrderReference();
  const pricing = calculateOrderPrice({
    category: product.category,
    goldPurity: input.goldPurity,
    weight: product.goldWeightG,
    diamondGrade: input.diamondGrade,
    diamondCarat: product.diamondWeightCt
  });

  const savedOrder = await saveOrder({
    id: reference,
    product_id: product.id,
    customer_name: input.customer.name,
    phone: input.customer.phone,
    city: input.customer.city,
    gold_purity: input.goldPurity,
    gold_weight_g: product.goldWeightG,
    diamond_grade: input.diamondGrade,
    diamond_carat: product.diamondWeightCt,
    gold_cost: Math.round(pricing.goldCost),
    diamond_cost: Math.round(pricing.diamondCost),
    labour_charge: Math.round(pricing.labourCharge),
    gst: Math.round(pricing.gst),
    total_price: Math.round(pricing.total),
    status: "enquiry_received",
    notes: input.specialInstructions
  });

  const [sms, email] = await Promise.all([
    sendOrderSms({
      orderId: reference,
      customerName: input.customer.name,
      phone: input.customer.phone,
      productName: product.name
    }),
    sendOrderEmail({
      orderId: reference,
      productName: product.name,
      customerName: input.customer.name,
      phone: input.customer.phone,
      city: input.customer.city,
      totalPrice: pricing.total
    })
  ]);

  return {
    order: savedOrder,
    product,
    pricing,
    notifications: {
      sms,
      email
    }
  };
}
