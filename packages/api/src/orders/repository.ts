import { config } from "../config";
import { HttpError } from "../utils/http-error";

type OrderRecord = {
  id: string;
  product_id: string;
  customer_name: string;
  phone: string;
  city: string;
  gold_purity: string;
  gold_weight_g: number;
  diamond_grade: string;
  diamond_carat: number;
  gold_cost: number;
  diamond_cost: number;
  labour_charge: number;
  gst: number;
  total_price: number;
  status: string;
  notes?: string;
};

export async function saveOrder(record: OrderRecord) {
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new HttpError(
      503,
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(record)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new HttpError(502, "Supabase order insert failed", errorBody);
  }

  const [saved] = (await response.json()) as OrderRecord[];
  return saved ?? record;
}
