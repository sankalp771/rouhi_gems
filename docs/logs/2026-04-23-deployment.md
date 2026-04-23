# Deployment Log - 2026-04-23

## Summary

Today we completed a fresh successful Vercel deployment for the frontend.

The working Vercel project is:

- Project Name: `rouhi-gems-web`
- Framework Preset: `Next.js`
- Root Directory: `apps/web`
- Build Command: `pnpm build`
- Output Directory: left blank, or `.next`
- Install Command: `pnpm install --filter @aurum/web... --frozen-lockfile`

## Vercel Direction

- Vercel should deploy the frontend only.
- Render will be used later for the separate Express backend.
- The successful fresh Vercel project uses `apps/web` as the Root Directory.
- Because the Root Directory is `apps/web`, the Output Directory must not be `apps/web/.next`.
- For this setup, leave Output Directory blank, or use `.next`.

## Successful Fresh Deployment

The previous failing project appeared to mix repository-root output settings with an `apps/web` Root Directory.

The failure happened after a successful Next.js build:

```txt
Error: The Next.js output directory "apps/web/.next" was not found at "/vercel/path0/apps/web/apps/web/.next".
```

Conclusion:

- Next.js compiled successfully.
- Vercel was looking for the build output in the wrong path.
- Since Root Directory was `apps/web`, Vercel resolved `apps/web/.next` relative to `apps/web`.
- That produced the incorrect duplicated path: `apps/web/apps/web/.next`.

Working configuration:

```txt
Project Name: rouhi-gems-web
Framework Preset: Next.js
Root Directory: apps/web
Build Command: pnpm build
Output Directory: leave blank, or .next
Install Command: pnpm install --filter @aurum/web... --frozen-lockfile
```

## Superseded Root Config

Earlier we added a root `vercel.json` with:

```json
{
  "installCommand": "pnpm install --filter @aurum/web... --frozen-lockfile",
  "buildCommand": "pnpm --filter @aurum/web build",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next"
}
```

This config assumes Vercel runs from the repository root.

For the current successful project, the Vercel dashboard settings are the source of truth instead:

- Root Directory: `apps/web`
- Output Directory: blank or `.next`

The root-level `vercel.json` should be treated carefully because it can conflict conceptually with an app-root Vercel project.

Root package engine pin:

```json
"engines": {
  "node": "20.x"
}
```

Vercel should use Node 20 for this project.

## Failed Deployment 1

The first Vercel deploy failed during `pnpm install`, before the Next.js build started.

Important log details:

```txt
ERR_PNPM_META_FETCH_FAIL
GET https://registry.npmjs.org/typescript: Value of "this" must be of type URLSearchParams
Command "pnpm install" exited with 1
```

Conclusion:

- This was not caused by missing `METALS_DEV_API_KEY`.
- The failure happened during dependency installation.
- The deploy did not reach the app runtime/build stage where Metals.dev env would matter.

## Failed Deployment 2

After adding filtered install config, Vercel failed again:

```txt
Running "install" command: pnpm install --filter @aurum/web... --frozen-lockfile
Unsupported engine: wanted node 20.x, current node v24.14.1, pnpm 6.35.1
ERROR Headless installation requires a pnpm-lock.yaml file
```

Conclusion:

- `pnpm-lock.yaml` exists locally but is ignored by git.
- `.gitignore` currently contains `pnpm-lock.yaml`.
- Vercel checkout does not receive the lockfile.
- Because `--frozen-lockfile` requires the lockfile, install fails immediately.

## Vercel Plugin Audit Findings

The Vercel deployment + Next.js audit found:

- P1: `pnpm-lock.yaml` is ignored and untracked, causing frozen installs to fail.
- P1: Order submission depends on a separate API that Vercel is not deploying.
- P1: Production API CORS defaults only allow localhost unless `CORS_ORIGINS` is configured.
- P2: `next@14.2.33` should be upgraded to at least `14.2.35` for the December 2025 security patch line.
- P2: Root-directory setup is easy to misconfigure. The failed deploy used an `apps/web` Root Directory with a repository-root style Output Directory.

## Remaining Deployment Follow-Ups

1. Ensure Vercel uses Node 20, not Node 24.
2. Add frontend env vars in Vercel:
   - `GOLD_PRICE_PROVIDER=metalsdev`
   - `METALS_DEV_API_KEY`
   - `GOLD_PRICE_REFRESH_SECONDS=28800`
   - `NEXT_PUBLIC_API_BASE_URL`
3. Decide temporary behavior for order submit while Render backend is not deployed:
   - leave it failing with backend unavailable messaging, or
   - temporarily point to a deployed backend placeholder, or
   - temporarily hide/disable submit until Render is ready.
4. Upgrade `next` from `14.2.33` to at least `14.2.35`.
5. Keep the Vercel project settings aligned with the chosen Root Directory:
   - if Root Directory is `apps/web`, Output Directory is blank or `.next`
   - if Root Directory is repo root, Output Directory is `apps/web/.next`

## Important Env Note

Missing Metals.dev env is not the cause of the Vercel install failure.

If `METALS_DEV_API_KEY` is missing after a successful deploy:

- the site should still build,
- live pricing will be unavailable,
- pricing UI will fall back to `Price on request` / unavailable live rate state.

## Next Deployment Step

The frontend deployment is now successful.

Next deployment work should focus on the backend/API path:

1. Deploy `packages/api` to Render.
2. Add Render environment variables for Supabase, Resend, MSG91, and CORS.
3. Update Vercel `NEXT_PUBLIC_API_BASE_URL` to the Render backend URL.
