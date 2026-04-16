# Rouhi Gems — Custom Jewellery Marketplace Build Plan

**Model:** 100% Make-to-Order | **Products:** Rings, Bracelets, Pendants, Earrings  
**Materials:** 14k/18k Gold + Lab Grown Diamonds (IGI certified)  
**Target:** India, pan-city launch

---

## Business Logic (Read This First)

You earn in two ways:
- **Gold:** Making/labour charges only. Gold rate is market-linked, you don't earn on the metal itself. Typical making charge: ₹2,500–6,000 per piece depending on complexity.
- **Diamonds:** This is where you win. Lab grown diamond cost = ~25% of your sell price. On a 0.30ct EF/VS piece you charge ₹28,000 and your cost is ~₹7,000. That's your real margin.

**Price formula (server-side always):**
```
Total = (gold_weight_g × gold_price_per_gram[purity]) 
      + (diamond_carat × diamond_price_per_carat[grade]) 
      + labour_charge[category] 
      + GST (3% on gold+labour, ~1.5% on diamond — confirm with CA)
```

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR for SEO — jewellery is high-intent search |
| Styling | Tailwind CSS + shadcn/ui | Same as Bluestone. Fast, accessible, good looking |
| Backend | Node.js + Express | Simple to start. Migrate to NestJS when team grows |
| Database | PostgreSQL via Supabase | Orders/pricing are relational data. MongoDB is wrong here |
| Auth | Supabase Auth | Phone OTP — Indian users prefer this over email |
| Images | Cloudinary | Auto-optimization + CDN built in. Simpler than S3 |
| Payments | Razorpay | UPI + EMI support. Critical for ₹50k+ orders |
| SMS | MSG91 | OTP + order status updates |
| Email | Resend | Transactional emails |
| Frontend hosting | Vercel | Made for Next.js |
| Backend hosting | Railway | Cheap, simple |
| Analytics | PostHog | Replaces GA + Mixpanel. Has session recording + funnels |
| CMS | Sanity.io | Your brother can add designs without touching code |
| Caching | Redis | Add in Phase 3 only. Don't overengineer early |

---

## Database Schema (Core Tables)

```sql
users               — id, phone, email, name, address_json, created_at
products            — id, name, category, description, image_url, is_active
product_variants    — id, product_id, gold_purity, min_weight_g, base_labour_charge
orders              — id, user_id, product_id, gold_weight_g, diamond_grade, 
                      diamond_carat, gold_cost, diamond_cost, labour_charge, 
                      total_price, status, notes, created_at
order_status_log    — id, order_id, status, changed_at (every status change logged)
gold_prices         — id, purity, price_per_gram, valid_from (update daily)
```

**Order status flow:**
`enquiry_received` → `advance_paid` → `in_production` → `quality_check` → `dispatched` → `delivered`

---

## Phase 1 — Foundation (Weeks 1–4)

**Goal:** Live website, product catalogue, custom order form, manual fulfilment

### What to build
- Next.js app with Tailwind + shadcn/ui configured
- Supabase project — all core tables created
- Cloudinary — product images uploaded
- Pages: Home, Catalogue (category filter), Product Detail, Custom Order Form, About
- Custom Order Form:
  - Step 1: Category + base design selection
  - Step 2: Gold purity, weight (slider), diamond grade + carat
  - Step 3: Name, phone, city, special instructions
  - Live price calculator on the side (fetches gold price from DB)
- On submit: save to `orders` table → send SMS via MSG91 → email alert to you
- Deploy on Vercel with custom domain

### Do NOT add in Phase 1
- Payments (take UPI advance manually — saves 2 weeks)
- User login
- Anything else

### Phase 1 done when
- [ ] 8 designs live (2 per category), catalogue filterable
- [ ] Order form works end to end — fills DB, SMS fires, you get notified
- [ ] Mobile Lighthouse score > 85
- [ ] Domain live with SSL

---

## Phase 2 — Payments & Operations (Weeks 5–9)

**Goal:** Real transactions, order tracking, admin panel

### What to build
- **Razorpay integration** — collect 30–50% advance on order confirmation
- **Razorpay webhook** — validates HMAC signature, updates order status in DB
- **Customer order tracking page** — `/order/[id]/status` — shareable link, shows status timeline. No login required.
- **User auth** — Supabase phone OTP. Returning customers see order history.
- **Admin panel** (password-protected route or separate app):
  - Orders table: filter by status, search by order ID / phone
  - Order detail: full specs, price breakdown, status update dropdown, internal notes
  - Stats bar: orders this month, revenue, count by status
- **Notification pipeline** — SMS + email fires automatically on every status change

### Phase 2 done when
- [ ] Customer pays advance online, webhook updates DB correctly
- [ ] Customer can track their order without calling you
- [ ] You can manage all orders from admin panel without touching Supabase directly
- [ ] Notifications fire on status change automatically

---

## Phase 3 — Growth & SEO (Weeks 10–16)

**Goal:** Organic traffic, better conversion, marketing foundation

### What to build
- **SEO layer** — schema.org Product markup, dynamic sitemap, OG tags per product
- **Blog/guide section** — "How to choose lab grown diamonds", "18k vs 22k gold" etc. This is your organic traffic engine.
- **Wishlist** — save designs, email reminder after 7 days if not ordered
- **Product reviews** — SMS link after delivery, reviews shown on product pages
- **WhatsApp Business API** — enquiries + status updates via WhatsApp
- **Referral system** — ₹500 store credit for referring a friend who orders
- **Redis caching** — gold price API cached (1h TTL), product listing pages cached
- **PostHog funnels** — see exactly where users drop off in your order flow
- **EMI via Razorpay** — show EMI options for orders above ₹30,000

### Phase 3 done when
- [ ] Google Search Console shows impressions for jewellery keywords
- [ ] PostHog funnel set up — you know your conversion rate
- [ ] Wishlist working — you can see demand data in admin
- [ ] At least 5 real reviews live on product pages

---

## Phase 4 — Moat Features (Weeks 17–26)

**Goal:** Features competitors don't have, or do badly

### What to build
- **AR Try-On via mirrAR SDK** — Tanishq uses this. It's an Indian startup, easy to integrate. Single biggest conversion driver for jewellery. Start with rings (most searched).
- **3D product viewer** — Three.js or `<model-viewer>`. Ring rotating in 3D. CaratLane is just starting this.
- **Corporate gifting portal** — B2B bulk orders (weddings, office gifts). Separate landing page, quote request flow, bulk pricing. High AOV, low CAC.
- **Ring size guide** — printable PDF + interactive slider. Reduces wrong-size orders significantly.
- **Loyalty programme** — points per order, redeemable on future purchases
- **Personalisation** — rule-based (not ML yet). If user browses rings 3x, show ring recommendations on homepage.

### Phase 4 done when
- [ ] mirrAR live on at least 3 ring designs, try-on → order conversion tracked
- [ ] One B2B corporate client onboarded end to end
- [ ] EMI showing conversion lift in PostHog

---

## API Endpoints

```
GET    /api/v1/products                  — list products, ?category=ring&sort=popular
GET    /api/v1/products/:id              — single product with variants + reviews
GET    /api/v1/gold-price/current        — current price per gram by purity (cached)
POST   /api/v1/orders                    — create order, validates + calculates server-side
GET    /api/v1/orders/:id/status         — customer-facing tracking (no auth needed)
PATCH  /api/v1/orders/:id/status         — admin only, triggers SMS notification
POST   /api/v1/webhooks/razorpay         — payment webhook, validates HMAC signature
POST   /api/v1/auth/otp/send             — send OTP to phone
POST   /api/v1/auth/otp/verify           — verify OTP, return session
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # backend only, never expose to client

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# MSG91
MSG91_AUTH_KEY=
MSG91_SENDER_ID=
MSG91_TEMPLATE_ORDER_CONFIRM=
MSG91_TEMPLATE_STATUS_UPDATE=

# Resend
RESEND_API_KEY=
FROM_EMAIL=orders@yourdomain.com

# Admin
ADMIN_SECRET=                     # simple password for admin panel Phase 1
```

---

## Folder Structure

```
aurum/
  apps/
    web/                  ← Next.js customer frontend
    admin/                ← Internal order management panel
  packages/
    api/                  ← Express backend
    db/                   ← Supabase schema + seed data
    shared/               ← TypeScript types shared across apps
  .env.example
  package.json            ← pnpm workspaces
```

---

## Monthly Infrastructure Cost

| Service | Free Tier | Notes |
|---|---|---|
| Vercel | 100GB bandwidth | Fine for Phase 1-2 |
| Supabase | 500MB DB | Lasts ~5000+ orders easily |
| Cloudinary | 25GB storage | Compress images to WebP before uploading |
| Railway | $5 credit/mo | ~₹400/mo after free tier |
| MSG91 | Pay per SMS | ~₹0.20/SMS, pre-pay ₹500 |
| Resend | 3000 emails/mo free | Fine for Phase 1-2 |
| **Phase 1 total** | **~₹0–400/mo** | Add domain ~₹800/yr |

---

## Pre-Launch Checklist

**Legal**
- [ ] GST registration done
- [ ] BIS hallmarking certificate from manufacturer for every design
- [ ] IGI certification for all lab grown diamonds
- [ ] Privacy policy + T&C pages live
- [ ] Razorpay KYC completed (takes 2–5 days)

**Technical**
- [ ] Lighthouse mobile > 85 on all core pages
- [ ] All env variables in Vercel/Railway — not in codebase
- [ ] Razorpay webhook tested in test mode end to end
- [ ] Full order flow tested: form → DB → SMS → admin view
- [ ] Images compressed (WebP, under 200KB each)
- [ ] robots.txt and sitemap.xml live

**Business**
- [ ] Minimum 8 product designs photographed + uploaded
- [ ] Gold price update SOP written — who updates it, when, how
- [ ] Order fulfilment SOP — from enquiry received to dispatch
- [ ] Branded packaging sourced (box, tissue, care card)
- [ ] Return/exchange policy written and live on site

---

## OpenCode Prompts (Use These Per Phase)

### Prompt 1 — Project Setup
```
Initialise a Next.js 14 monorepo for a jewellery marketplace called Aurum.
Use pnpm workspaces with: apps/web (Next.js 14 App Router, TypeScript, 
Tailwind, shadcn/ui), apps/admin (same stack), packages/shared (TypeScript 
types), packages/api (Express + TypeScript).

Configure Supabase client in web app using environment variables.
Configure Cloudinary next-cloudinary in web app.

In packages/shared create TypeScript interfaces for:
Product, ProductVariant, Order, OrderStatus, GoldPrice, User
matching this schema: [paste schema from this doc]
```

### Prompt 2 — Custom Order Form
```
Build a 3-step custom order form for a jewellery marketplace (Next.js 14, 
Tailwind, shadcn/ui).

Step 1 — Design: category selector (ring/bracelet/pendant/earring), 
optional base design grid fetched from GET /api/v1/products?category=X

Step 2 — Customisation: gold purity select (18k/22k/14k), weight slider 
(2g–30g, step 0.5g), diamond grade select (EF/VS | GH/VS | GH/SI | None), 
diamond carat input (0.10–3.00, step 0.05, hidden if grade = None)

Step 3 — Contact: name, Indian phone number, city, special instructions textarea

Right panel: live price preview updating on every change.
Formula: (weight × gold_price) + (carat × diamond_price[grade]) + labour[category]
Fetch gold prices from GET /api/v1/gold-price/current on mount, cache in state.

On submit: POST /api/v1/orders → show confirmation with order ID.
```

### Prompt 3 — Admin Panel
```
Build a password-protected admin dashboard (Next.js 14, Tailwind, shadcn/ui, 
Supabase) for managing jewellery orders.

Features:
1. Stats bar: total orders this month, total revenue, count by status
2. Orders table: ID, customer name, phone, category, price, status, date.
   Filterable by status dropdown. Searchable by order ID or phone.
3. Order detail sheet (shadcn Sheet component): full specs, price breakdown,
   status history timeline, internal notes textarea, status update select + 
   confirm button.
4. Status update: PATCH /api/v1/orders/:id/status — on success, row updates 
   in place, toast notification shown.

Auth: Supabase email/password, single admin user, redirect to /admin/login 
if not authenticated.
```

### Prompt 4 — Razorpay Integration
```
Add Razorpay advance payment to the jewellery order confirmation flow.
Stack: Next.js 14, Express backend, Supabase.

Flow:
1. After order is created (POST /api/v1/orders), show payment button for 
   30% of order total (round to nearest rupee).
2. Frontend: load Razorpay checkout script, open payment modal with 
   order details prefilled.
3. Backend: POST /api/v1/payments/create-order — creates Razorpay order, 
   returns order_id and key_id.
4. On payment success: POST /api/v1/webhooks/razorpay — verify HMAC 
   signature using RAZORPAY_WEBHOOK_SECRET, update order status to 
   advance_paid in Supabase, trigger MSG91 SMS to customer.

Include test mode setup. Add webhook secret verification. Handle payment 
failure gracefully — show retry button, do not update DB on failure.
```

---

*Good luck bhai. CaratLane is a ₹1800cr company built on this exact thesis — lab grown + online-only + gold labour margin. You're just doing it 20 years later with better tools.*
