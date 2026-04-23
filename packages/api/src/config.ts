import "dotenv/config";

function readCsv(value: string | undefined) {
  return value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  webOrigin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
  corsOrigins: readCsv(process.env.CORS_ORIGINS) ?? [
    process.env.WEB_ORIGIN ?? "http://localhost:3000"
  ],
  supabaseUrl: process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.FROM_EMAIL ?? "orders@rouhigems.com",
  orderAlertEmail: process.env.ORDER_ALERT_EMAIL,
  msg91AuthKey: process.env.MSG91_AUTH_KEY,
  msg91OrderTemplateId: process.env.MSG91_TEMPLATE_ORDER_CONFIRM
};
