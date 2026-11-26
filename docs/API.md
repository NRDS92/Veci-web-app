# Landing API integration

Landing consumes the Backend API; canonical route definitions and access rules are documented in the [monorepo API reference](https://github.com/NRDS92/VECI---Latin-Community-Hub-/blob/main/docs/API.md).

| Client module | Responsibility |
| --- | --- |
| src/lib/api.ts | Axios client; browser sessionStorage auth_token becomes Bearer authorization |
| src/lib/api/public-content.ts | Public Event, Business and Community adapters; shared schema parsing |
| src/features/auth/auth.service.ts | Login, registration, Google, forgot/reset/change password |
| src/features/business/business.service.ts | Owner Business create/list/read/update, follow/status, behavior tracking and owner stats |
| src/features/communities/community.service.ts | Community creation request/owner response validation |
| src/features/events/events.service.ts | Event-facing API operations |

Important consumed routes include public GET /public/events, /public/businesses, /public/content/:slug, /communities/discover; owner GET /business/me and /business/:id; Business POST/PUT, follow/status, behavior and stats; POST /communities; and auth /auth endpoints. These are mounted under /api/v1. Check current Backend route source before adding clients. Client-side TypeScript types do not replace Backend authorization.
