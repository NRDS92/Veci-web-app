# Landing feature status

This inventory describes source implementation, not production reachability.

| Area | Status | Evidence and limit |
| --- | --- | --- |
| Authentication | Implemented | Registration, login, Google, verification, forgot/reset/change flows; auth/password Vitest tests. Email provider delivery not established by UI tests. |
| Discovery | Implemented | Business/Event discovery and public Community discovery/detail adapters/pages. |
| Business | Implemented | Public detail, create/edit, owner list, follow, behavior tracking and owner aggregate stats. Tracking includes views and menu-download attempts, not confirmed downloads. |
| Events | Implemented | List/detail/create and owner-event pages; public adapters use shared DTO validation. |
| Communities | Implemented | Create, public discovery and detail routes/services; moderation is performed by Admin/Backend. |
| User profile/favorites | Partial | Pages and components exist; not all lifecycle paths have complete test coverage. |
| Analytics | Partial | Business behavior requests and conditional Google Analytics code exist; no claim of contact-click reporting or time-series metrics. |
| Notifications | Partial | Notification components/provider exist; not all Community notification flows are covered in Landing tests. |
| Tests | Implemented infrastructure | Vitest/jsdom/Testing Library; tests in src/test are primarily component/service level unless explicitly stated otherwise. |
| Production state | Unknown here | GitHub CI does not prove which commit is live or the provider promotion policy. |
