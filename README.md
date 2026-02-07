# SEO Audit Project

This project automates **on-page SEO audit** for a list of URLs using **Playwright** and **TypeScript**.

## Project Structure

```
src/
  core/           ← Main audit logic (runAudit)
  checks/         ← Individual SEO checks: title, H1, H2, meta, canonical
  models/         ← TypeScript interfaces (AuditResult)
  utils/          ← Helper functions: loadUrls, logger
  config/         ← SEO settings (limits, thresholds)

tests/
  seo/            ← Playwright test for batch SEO audit

data/
  urls.example.txt ← Example file with URLs to audit (one per line)

reports/
  .gitkeep         ← Placeholder for reports (audit.json, audit.csv generated on runtime)

.gitignore
README.md
package.json
playwright.config.ts
```

## Installation

```bash
npm install
```

## Adding URLs

- Place the URLs you want to audit in `data/urls.txt`, one URL per line.
- **Do not commit `urls.txt`** — it's ignored in `.gitignore`.
- You can copy `urls.example.txt` as a template:

```bash
cp data/urls.example.txt data/urls.txt
```

## Running the Audit

```bash
npx playwright test tests/seo/seo.spec.ts --headed
```

- After execution, the `reports/` folder will contain:
  - `audit.json`
  - `audit.csv`
- The folder itself is included in the repo as a placeholder.

## SEO Checks Included

- Title (`title.check.ts`)
- H1 (`h1.check.ts`)
- H2 (`h2.check.ts`)
- Meta Description (`meta.check.ts`)
- Canonical (`canonical.check.ts`)

> You can add new checks in `checks/` and import them into `auditor.ts`.

## Playwright Configuration

- Tests run in parallel across 3 browsers: Chromium, Firefox, WebKit
- HTML reporter enabled
- Configurable via `playwright.config.ts`

## Notes

- The audit **does not modify** `data/urls.txt`
- All results are stored locally in `reports/`
- You can extend this project by adding more checks in the `checks/` folder and updating `auditor.ts`

