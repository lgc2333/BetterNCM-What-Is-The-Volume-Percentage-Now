# What-Is-The-Volume-Percentage-Now AGENTS.md

Note: This package is intended to work within the `lgc2333/BetterNCM-Workspace` repository, as it relies on additional agent rules, configurations, and scripts contained therein. If you have not received any indication that you are operating under this repository, please stop now and notify the user.

## Project Structure

This is a BetterNCM plugin package with a custom TypeScript build script.

- `src/main.ts`: plugin entry.
- `src/main.css`: package CSS consumed by the custom build flow.
- `src/types.d.ts`: package-local declaration helpers.
- `scripts/build.ts`: custom esbuild pipeline for dev and production JS bundles.
- `scripts/tsconfig.json`: TypeScript config for package-local scripts.
- `tsconfig.project.json`: plugin source project reference.
- `manifest.json`: plugin metadata copied into `dist/` after builds.
- `preview.png`: plugin preview copied into `dist/` when present.
- `dist/`: generated build output; do not edit by hand.

## Commands

- `pnpm run build`: run the production custom JS build, then copy metadata/assets.
- `pnpm run build:dev`: run the custom JS build with `NODE_ENV=development`, then copy metadata/assets.
- `pnpm run build:js`: run only `scripts/build.ts`.
- `pnpm run check`: run TypeScript project checks.
- `pnpm run analyze`: inspect a direct esbuild bundle of `src/main.ts`.
- `pnpm run apply`: copy `dist/` into the BetterNCM dev plugin directory.

## Rules

To be added
