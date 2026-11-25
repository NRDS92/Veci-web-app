# Landing development workflow

Use Node.js 26 LTS and npm. Vercel has supported Node 26 LTS for builds and Functions since October 29, 2026. Confirm the Vercel project's runtime setting before production release. Follow `.nvmrc` with `nvm use` or `fnm use` where available, otherwise install Node 26 and put it first on `PATH`. Create focused feature/fix branches from current `main`; keep local work and environment files separate. Install reproducibly with `npm ci`.

Before opening a PR, run:

```sh
npm ci
npx next typegen
npx tsc --noEmit
npm run lint
npm test -- --run
npm run build
```

The GitHub workflow runs these checks on PRs to `main` and pushes to `main`, `feat/**`, `feature/**`, `fix/**`, `testing/**`, and `codex/**`. CI builds the site; it does not prove a preview is connected to staging. Verify `NEXT_PUBLIC_API_URL` points to the isolated staging API before any preview write-flow testing. Keep secrets in the deployment environment, never in Git.

The cross-repository staging and release checklist is maintained in the [VECI development workflow](https://github.com/NRDS92/VECI---Latin-Community-Hub-/blob/main/DEVELOPMENT_WORKFLOW.md). A production release requires separate explicit approval and provider-side deployment controls; do not deploy from a local worktree.
