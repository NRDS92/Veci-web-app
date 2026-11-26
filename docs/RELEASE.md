# Landing release process

.github/workflows/frontend-ci.yml runs on configured pushes and PRs targeting main. It installs with npm ci, generates Next types, runs TypeScript, Vitest, ESLint and a Next production build.

## Merged -> staged -> live

- Merged: approved code is in GitHub main.
- Staged: provider preview/staging has built a specific commit and passed manual checks.
- Live: production promotion was approved and the resulting deployment verified.

These are separate states. The workflow validates code; it does not prove Vercel project settings, preview routing, production protection or the current live commit.

## Controlled procedure

1. Branch from current origin/main and keep changes scoped.
2. Run local checks and review CI.
3. Merge only after review/approval.
4. Verify provider preview commit and effective API base URL.
5. Use an isolated Backend/database for write checks.
6. Obtain explicit approval before production promotion.
7. Verify live commit and public routes after promotion.
8. Keep provider rollback instructions and check data compatibility before reverting.

Verify provider settings in its console without exposing values. Backend and Admin have independent deployment settings.
