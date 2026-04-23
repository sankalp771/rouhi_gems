import type { CreateOrderRequest } from "../types";
import { HttpError } from "../utils/http-error";

const goldPurities = ["14k", "18k"];
const diamondGrades = ["EF/VS", "GH/VS", "GH/SI", "None"];

export function validateCreateOrderRequest(body: unknown): CreateOrderRequest {
  if (!body || typeof body !== "object") {
    throw new HttpError(400, "Request body is required");
  }

  const value = body as Partial<CreateOrderRequest>;
  const customer = value.customer;

  if (!value.productId || typeof value.productId !== "string") {
    throw new HttpError(400, "productId is required");
  }

  if (!value.goldPurity || !goldPurities.includes(value.goldPurity)) {
    throw new HttpError(400, "Valid goldPurity is required");
  }

  if (!value.diamondGrade || !diamondGrades.includes(value.diamondGrade)) {
    throw new HttpError(400, "Valid diamondGrade is required");
  }

  if (!customer || typeof customer !== "object") {
    throw new HttpError(400, "Customer details are required");
  }

  if (!customer.name?.trim()) {
    throw new HttpError(400, "Customer name is required");
  }

  if (!isIndianPhone(customer.phone)) {
    throw new HttpError(400, "Valid Indian phone number is required");
  }

  if (!customer.city?.trim()) {
    throw new HttpError(400, "Customer city is required");
  }

  return {
    productId: value.productId.trim(),
    goldPurity: value.goldPurity,
    diamondGrade: value.diamondGrade,
    customer: {
      name: customer.name.trim(),
      phone: normalizePhone(customer.phone),
      city: customer.city.trim()
    },
    specialInstructions: value.specialInstructions?.trim()
  };
}

function isIndianPhone(value: string | undefined) {
  if (!value) {
    return false;
  }

  return /^(?:\+91|91)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
}

function normalizePhone(value: string) {
  const compact = value.replace(/[\s-]/g, "");
  const withoutCountry = compact.replace(/^\+?91/, "");
  return `+91${withoutCountry}`;
}
