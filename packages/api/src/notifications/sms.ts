import { config } from "../config";
import type { NotificationResult } from "../types";

type OrderSmsInput = {
  orderId: string;
  customerName: string;
  phone: string;
  productName: string;
};

export async function sendOrderSms(input: OrderSmsInput): Promise<NotificationResult> {
  if (!config.msg91AuthKey || !config.msg91OrderTemplateId) {
    return {
      provider: "msg91",
      status: "skipped",
      reason: "MSG91_AUTH_KEY or MSG91_TEMPLATE_ORDER_CONFIRM missing"
    };
  }

  const response = await fetch("https://control.msg91.com/api/v5/flow", {
    method: "POST",
    headers: {
      authkey: config.msg91AuthKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      template_id: config.msg91OrderTemplateId,
      short_url: "0",
      recipients: [
        {
          mobiles: input.phone.replace(/^\+/, ""),
          name: input.customerName,
          order_id: input.orderId,
          product_name: input.productName
        }
      ]
    })
  });

  if (!response.ok) {
    return {
      provider: "msg91",
      status: "failed",
      reason: await response.text()
    };
  }

  return {
    provider: "msg91",
    status: "sent"
  };
}
