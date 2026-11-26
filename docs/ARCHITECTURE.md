# Landing architecture

~~~mermaid
flowchart LR
  Browser[Browser] --> Next[Next.js App Router]
  Next -->|public fetch and revalidation| API[Veci Backend /api/v1]
  Next -->|Axios JSON and Bearer token| API
  Next --> Contracts[@ndrs92/contracts 0.6.0]
  API --> DB[(MongoDB)]
~~~

Landing is a separate repository from Backend and Admin. This diagram is a code boundary, not deployment evidence.

## Routing

src/app/[locale] contains localized App Router pages. src/i18n/routing.ts defines es, en and de with es as default; src/proxy.ts applies next-intl middleware. Dynamic routes include Event, Business and Community details, plus Business edit. Create routes cover Event, Business and Community. Account routes include authentication, profile, favorites, owner lists and password management.

## Data flow

- Public adapters in src/lib/api/public-content.ts fetch public Events, Businesses and Communities and parse shared DTO schemas.
- src/lib/api.ts creates the Axios client for authenticated operations using NEXT_PUBLIC_API_URL. In a browser it reads auth_token from sessionStorage and adds a Bearer header.
- Public content requests use NEXT_PUBLIC_API_URL or a Backend URL fallback in source.
- Domain services live under src/features; reusable interface components live under src/components.
- Shared transport schemas/types come from @ndrs92/contracts 0.6.0.

Source integrations include the Backend REST API, Geoapify, Google OAuth, optional Google Analytics and Cloudinary-hosted imagery. Provider availability is not implied.
