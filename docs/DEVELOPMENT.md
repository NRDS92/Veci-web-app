# Landing development

Use Node.js 26.x, declared in .nvmrc and package.json. Install and start from the repository root:

~~~sh
npm ci
npm run dev
~~~

Open http://localhost:3000. The scripts are defined in package.json.

## Checks

~~~sh
npx next typegen
npx tsc --noEmit
npm run lint
npm test -- --run
npm run build
~~~

Vitest configuration is vitest.config.mts. It uses jsdom, React Testing Library setup in tests/setup.ts and tests under src/test.

## Environment variable names

Names referenced in source (no values are documented):

| Name | Use |
| --- | --- |
| NEXT_PUBLIC_API_URL | API base for Axios and public-content fetches |
| NEXT_PUBLIC_GEOAPIFY_API_KEY | Location lookup |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | Google sign-in |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | Optional Google Analytics |

No .env.example exists in this baseline. Public content code has an API host fallback; set and verify the intended non-production API before local writes. Use an isolated Backend and database. Never include credentials, tokens or reset links in logs/docs.
