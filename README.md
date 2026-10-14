# Karina Gallery

A Spanish-language photography portfolio for Karina Lauer. Stage 3 establishes the Next.js foundation; the photo catalog, Cloudinary integration, filters, viewer, and motion are intentionally deferred to later stages in [PLAN.md](PLAN.md).

## Run locally

Use Bun 1.4.3 (recorded in `packageManager`) and Node.js 20.9 or newer, as required by Next.js. Dependencies are installed with Bun, not npm.

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000. `/` is the gallery entry shell; `/info` contains the approved provisional biography and Instagram link. Neither route requires credentials. The landing page is not yet the photo gallery.

## Checks

```sh
bun run lint
bun run typecheck
bun run test:unit
bunx playwright install chromium
bun run test
```

`bun run test` builds production once, then runs browser tests against an automatically managed local production server on port 3100. Tests cover desktop, tablet, mobile emulation, and navigation with JavaScript disabled. Retries and server reuse are disabled. Chromium runs with its sandbox enabled.

To use an existing Chromium installation instead of downloading one:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium bun run test
```

`bun run test:e2e` runs the browser suite against an existing production build. For a focused development check, use `TEST_SERVER_MODE=dev bun run test:e2e --project=desktop` (with the browser executable environment variable if needed). Mobile emulation is not a substitute for a real-device check.

## Structure and conventions

| Path | Responsibility |
| --- | --- |
| `src/app/` | App Router routes, server-rendered layout, metadata, and global CSS tokens |
| `src/components/` | Server-rendered shell and component-scoped CSS Modules |
| `src/content/` | Approved author copy, separate from layout |
| `src/assets/` | Local Manrope font and its OFL license |
| `tests/` | Bun configuration checks and Playwright public-route tests |
| `design/` | Stage 2 static studies and evidence; not production assets or routes |

TypeScript uses `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`. There are no authored client components yet: add `"use client"` only at boundaries that need browser state or interactions. Next.js itself still supplies its routing runtime; server rendering does not mean that Next ships no JavaScript.

Colors, spacing, and typography are defined in `src/app/globals.css`. Component styles use CSS Modules, without Tailwind. Manrope is served through `next/font/local`, so no Google Fonts request is required. UI text remains Spanish. The header motto remains provisional, as noted in the plan; the optional portrait is omitted until a real photograph is provided.

GSAP will be integrated when motion is implemented. Lenis is not installed. Stage 3 does not implement photography, curated groups, filters, a viewer, or horizontal scrolling.

## Repository

Git is initialized within this project on `main`, independently of the parent Projects repository. No commits, remotes, publishing, or deployment were created as part of initialization. `bun.lock` is the dependency lockfile; local tool state, browser artifacts, environment files, and generated build files are ignored.

## Next step

Stage 4: introduce the explicit typed photo catalog and Cloudinary image delivery, preserving the confirmed composition and original image proportions. See [PLAN.md](PLAN.md) for the approved scope.
