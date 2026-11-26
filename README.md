# Veci Landing

Veci Landing is the public Next.js web client for discovering Latin American businesses, events and communities in Europe. It is maintained separately from the [Backend and Mobile monorepo](https://github.com/NRDS92/VECI---Latin-Community-Hub-) and the [Admin application](https://github.com/NRDS92/Veci---Admin).

## Application structure

- Next.js App Router pages live under src/app/[locale].
- Locale routing is configured by next-intl for Spanish (default), English and German.
- Domain API clients and helpers live under src/features; reusable UI lives under src/components.
- Public Business, Event and Community content is fetched through src/lib/api/public-content.ts and checked with schemas from @ndrs92/contracts.
- Authenticated JSON requests use the Axios client at src/lib/api.ts, which reads auth_token from browser sessionStorage and adds a Bearer header.
- Forms validate at their service boundaries where shared request schemas are integrated.

## Routes in source

Localized routes include home, events list/detail, Business list/detail/edit, Community list/detail, create chooser and Event/Business/Community create pages, login/register, profile, favorites, My Events/My Businesses, verification, forgot/reset password and Change Password. Dynamic route files are under src/app/[locale]. These source routes do not by themselves confirm production deployment.

## Implemented capabilities

- Discovery and public content for Businesses, Events and Communities.
- Business create/edit, owner list, public detail, follow controls and owner aggregate engagement stats.
- Event browsing/detail/create and owner event page flows.
- Community creation and public discovery/detail.
- Registration/login, Google sign-in, email verification, forgot/reset/change password.
- Spanish, English and German message catalogs under src/messages.

Business tracking calls include public detail views and menu-download attempts; this is attempt tracking, not confirmed file downloads. Google Analytics is conditional on NEXT_PUBLIC_GA_MEASUREMENT_ID. See [Feature status](docs/FEATURE-STATUS.md).

## Technology

Manifest declarations: Node.js 26.x (.nvmrc and engines), Next.js 16.4.6, React/React DOM 19.3.1, TypeScript ^5, next-intl ^4.15.3, @ndrs92/contracts 0.6.0, Vitest ^5.1.1, React Testing Library ^16.3.3, ESLint ^9.39.5. See package.json and package-lock.json for declared and resolved dependency details.

## Local setup

~~~sh
npm ci
npm run dev
~~~

Then open http://localhost:3000. The default public API fallback is the configured Backend host in source; set NEXT_PUBLIC_API_URL to an intentional non-production API for local work. See [Development](docs/DEVELOPMENT.md).

Checks used by package scripts/CI:

~~~sh
npx next typegen
npx tsc --noEmit
npm run lint
npm test -- --run
npm run build
~~~

Vitest uses jsdom, React Testing Library and tests in src/test. The CI workflow runs install, Next type generation, TypeScript, Vitest, ESLint and production build.

## Delivery states: merged, staged, live

A merged PR means code is in GitHub main. It does not prove the provider built or serves that commit. Verify the preview/staging deployment and API configuration first; production promotion is a separate approval-controlled action. Provider project settings are not fully represented in this repository. See [Release](docs/RELEASE.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API integration](docs/API.md)
- [Development](docs/DEVELOPMENT.md)
- [Feature status](docs/FEATURE-STATUS.md)
- [Release](docs/RELEASE.md)
