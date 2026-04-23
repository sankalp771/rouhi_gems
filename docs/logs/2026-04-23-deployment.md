# Deployment Log - 2026-04-23

## Summary

Today we attempted Vercel deployment for the frontend and identified that the current failure is an install/configuration issue, not a Metals.dev runtime env issue.

## Vercel Direction

- Vercel should deploy the frontend only.
- Render will be used later for the separate Express backend.
- The Vercel project should use the repository root because the current root-level `vercel.json` assumes monorepo root execution.

## Vercel Config Added

Added root `vercel.json` with:

```json
{
  "installCommand": "pnpm install --filter @aurum/web... --frozen-lockfile",
  "buildCommand": "pnpm --filter @aurum/web build",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next"
}
```

Added root package engine pin:

```json
"engines": {
  "node": "20.x"
}
```

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
- P2: Root-directory setup is easy to misconfigure. Current `vercel.json` assumes Vercel Root Directory is the repository root.

## Required Fixes Before Next Vercel Deploy

1. Remove `pnpm-lock.yaml` from `.gitignore`.
2. Commit `pnpm-lock.yaml`.
3. Keep Vercel Root Directory at repository root while using the current `vercel.json`.
4. Ensure Vercel uses Node 20, not Node 24.
5. Add frontend env vars in Vercel:
   - `GOLD_PRICE_PROVIDER=metalsdev`
   - `METALS_DEV_API_KEY`
   - `GOLD_PRICE_REFRESH_SECONDS=28800`
   - `NEXT_PUBLIC_API_BASE_URL`
6. Decide temporary behavior for order submit while Render backend is not deployed:
   - leave it failing with backend unavailable messaging, or
   - temporarily point to a deployed backend placeholder, or
   - temporarily hide/disable submit until Render is ready.

## Important Env Note

Missing Metals.dev env is not the cause of the Vercel install failure.

If `METALS_DEV_API_KEY` is missing after a successful deploy:

- the site should still build,
- live pricing will be unavailable,
- pricing UI will fall back to `Price on request` / unavailable live rate state.

## Next Deployment Step

The immediate blocker is to track the lockfile:

```powershell
git add .gitignore pnpm-lock.yaml package.json vercel.json
git commit -m "Fix Vercel frontend deployment config"
git push origin main
```

After that, redeploy from Vercel with the project root set to the repository root.
