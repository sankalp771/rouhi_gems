import { config } from "../config";
import type { NotificationResult } from "../types";

type OrderEmailInput = {
  orderId: string;
  productName: string;
  customerName: string;
  phone: string;
  city: string;
  totalPrice: number;
};

export async function sendOrderEmail(input: OrderEmailInput): Promise<NotificationResult> {
  if (!config.resendApiKey || !config.orderAlertEmail) {
    return {
      provider: "resend",
      status: "skipped",
      reason: "RESEND_API_KEY or ORDER_ALERT_EMAIL missing"
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.orderAlertEmail],
      subject: `New Rouhi Gems request ${input.orderId}`,
      html: buildOrderEmailHtml(input)
    })
  });

  if (!response.ok) {
    return {
      provider: "resend",
      status: "failed",
      reason: await response.text()
    };
  }

  return {
    provider: "resend",
    status: "sent"
  };
}

function buildOrderEmailHtml(input: OrderEmailInput) {
  return `
    <h1>New jewellery request</h1>
    <p><strong>Reference:</strong> ${input.orderId}</p>
    <p><strong>Product:</strong> ${input.productName}</p>
    <p><strong>Customer:</strong> ${input.customerName}</p>
    <p><strong>Phone:</strong> ${input.phone}</p>
    <p><strong>City:</strong> ${input.city}</p>
    <p><strong>Estimated total:</strong> INR ${Math.round(input.totalPrice).toLocaleString("en-IN")}</p>
  `;
}
