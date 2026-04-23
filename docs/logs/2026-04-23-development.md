# Development Log - 2026-04-23

## Summary

Today we moved the project direction back toward a scalable split-frontend/split-backend architecture and started wiring the order enquiry path around an Express backend.

## Architecture Decisions

- Confirmed that the customer frontend should stay in `apps/web`.
- Confirmed that the backend should live separately in `packages/api` as an Express service.
- Decided that the separate backend will be deployed later on Render instead of being deployed as Vercel functions.
- Kept Vercel focused on the frontend only.
- Moved reusable catalogue and pricing logic into `packages/shared` so both frontend and backend can use the same product data and price formula.

## Backend Work Started

- Added a new `@aurum/api` package under `packages/api`.
- Added Express app scaffolding with:
  - `/health`
  - `/api/v1/orders`
  - CORS configuration
  - JSON request parsing
  - central error handling
- Added order request validation for:
  - product ID
  - gold purity
  - diamond grade
  - customer name
  - Indian phone number
  - city
- Added server-side order pricing using shared product data and shared pricing utilities.
- Added Supabase REST insert adapter for the `orders` table.
- Added MSG91 order-confirmation SMS adapter.
- Added Resend email alert adapter.
- Added clear skipped/failed notification result statuses so missing provider env vars are visible instead of silent.

## Frontend Order Flow Update

- Updated the product request modal in `apps/web/components/product-configurator.tsx`.
- Removed client-only fake order reference generation from the submit flow.
- The modal now posts to:
  - `NEXT_PUBLIC_API_BASE_URL/api/v1/orders`
- Added submit loading state.
- Added backend error display.
- Added a `Special Instructions` field.
- Kept the existing product detail UI and configurator behavior intact.

## Shared Package Updates

- Added `packages/shared/src/catalogue.ts`.
- Added `packages/shared/src/pricing.ts`.
- Updated `packages/shared/src/index.ts` exports.
- Left compatibility wrappers in:
  - `apps/web/lib/site-data.ts`
  - `apps/web/lib/pricing.ts`
- This keeps existing web imports stable while making shared data available to the backend.

## Current Backend Status

- Backend code exists but is not yet deployed.
- Render deployment is planned later.
- Supabase schema/env setup is still required before live order saves work.
- MSG91 and Resend env setup is still required before notifications send.
- Production CORS will need deployed frontend domains in `CORS_ORIGINS`.

## Open Items

- Create and commit Supabase schema for `orders`.
- Decide final storage provider for product images, replacing Cloudinary if needed.
- Deploy `packages/api` to Render.
- Add Render env vars:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `FROM_EMAIL`
  - `ORDER_ALERT_EMAIL`
  - `MSG91_AUTH_KEY`
  - `MSG91_TEMPLATE_ORDER_CONFIRM`
  - `CORS_ORIGINS`
- Update Vercel `NEXT_PUBLIC_API_BASE_URL` after Render backend is live.
