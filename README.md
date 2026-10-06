# 🌎 Veci Web

> **Discover your community. Find your people. 🇪🇺**

Veci is a community platform built to connect Latin Americans living in Europe with **local businesses, events, and their community**.

The web application provides a discovery experience where users can explore businesses and events based on their location and interests.

🔗 **Live:** https://www.veci-latin.com/

---

## 📌 About Veci

Moving to another country can make it difficult to find your community, discover local businesses, and know what is happening around you.

**Veci** aims to solve this problem by creating a digital space where Latin Americans in Europe can:

- 🔎 Discover local businesses
- 🎉 Find community events
- 🌎 Connect with Latin American culture
- 📍 Explore content based on their city
- ❤️ Save interesting places and events
- 🏪 Promote their own businesses
- 📅 Publish and manage events

The initial focus is **Germany**, starting with cities such as Cologne and Düsseldorf.

---

## ✨ Features

### 🔎 Discovery

The main discovery experience allows users to browse:

- All content
- Events
- Businesses

Content is presented using a responsive **Bento-style layout** designed to make discovery more visual and engaging.

### 🎉 Events

Users can discover community events including:

- Food & gastronomy
- Parties
- Culture
- Sports
- Meetups
- Concerts

Events can include:

- Title and description
- Images
- Date and time
- Location
- Business association
- Website
- Instagram
- WhatsApp
- "Good to know" information
- Attendance statistics

### 🏪 Businesses

Businesses can create a presence on Veci and provide information such as:

- Business name
- Description
- Category
- Location
- Country of origin
- Contact information
- Images
- Events
- Followers
- Ratings

### 🔐 Authentication

Veci includes an authentication system supporting:

- User registration
- Login
- Email verification
- Password recovery
- Password reset
- Protected routes
- JWT-based authentication

### 📱 Responsive Experience

The web application is designed with a mobile-first approach while providing a responsive desktop experience.

---

# 🏗️ Architecture

The project follows a feature-oriented architecture designed to keep the application maintainable as Veci grows.

```text
Veci
│
├── Frontend
│   ├── Next.js
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── next-intl
│
├── Backend
│   ├── Node.js
│   ├── Express
│   ├── TypeScript
│   ├── MongoDB
│   └── JWT
│
└── Infrastructure
    ├── Vercel
    ├── Render
    ├── Cloudinary
    └── Resend
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Static typing |
| Tailwind CSS | Styling |
| next-intl | Internationalization |
| React Query | Server-state management |
| Axios | API communication |
| Framer Motion | Animations |
| Lucide React | Icons |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | REST API |
| TypeScript | Static typing |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File uploads |
| Cloudinary | Image storage |
| Resend | Transactional email |

---

# 🌐 Internationalization

Veci is designed to support multiple languages.

Current application structure includes localized routes such as:

```text
/es
/en
```

Example:

```text
https://www.veci-latin.com/es
https://www.veci-latin.com/en
```

Internationalization is handled using `next-intl`.

The architecture allows additional languages to be introduced without restructuring the application.

---

# 📂 Project Structure

A simplified version of the project structure:

```text
src/
│
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── events/
│   │   ├── businesses/
│   │   ├── create/
│   │   └── reset-password/
│   │
│   └── admin/
│       └── ...
│
├── components/
│   ├── Discovery/
│   ├── EventCard/
│   ├── BusinessCard/
│   ├── EventBento/
│   ├── BusinessBento/
│   └── ...
│
├── features/
│   ├── auth/
│   ├── events/
│   ├── business/
│   └── ...
│
├── services/
│
├── hooks/
│
├── lib/
│
└── types/
```

The project separates reusable UI components from domain-specific functionality to make future development easier.

---

# 🔌 API

The frontend communicates with a separate REST API.

Main API resources include:

```text
/api/v1/auth
/api/v1/events
/api/v1/discover
/api/v1/users
/api/v1/business
/api/v1/upload
```

Example:

```text
GET /api/v1/events
GET /api/v1/events/:id
GET /api/v1/events/nearby
POST /api/v1/events
POST /api/v1/events/:id/view
POST /api/v1/events/:id/attend
```

Authentication-protected operations use JWT-based authorization.

---

# 📍 Location-Based Discovery

Events contain geographic information using GeoJSON:

```json
{
  "type": "Point",
  "coordinates": [
    6.9603,
    50.9375
  ]
}
```

MongoDB uses a `2dsphere` index to support geographic queries:

```javascript
EventSchema.index({
  location: "2dsphere"
});
```

This allows Veci to retrieve events based on geographic proximity.

---

# 🎨 Design System

Veci uses a simple visual identity centered around three main colors:

```text
Ebony       #111827
Cream       #F2C94C
Cornflower  #4C76F2
```

The interface focuses on:

- Strong visual hierarchy
- Rounded components
- Bento layouts
- Mobile-first design
- Community-oriented imagery
- Clear calls to action

---

# 🚀 Getting Started

## Requirements

Before running the project, make sure you have:

- Node.js 20+
- npm
- Git

---

## Installation

Clone the repository:

```bash
git clone https://github.com/NRDS92/Veci-web-app.git
```

Navigate into the project:

```bash
cd Veci-web-app
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env.local
```

Configure the required environment variables.

---

## Environment Variables

Example:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
```

Additional variables may be required depending on the enabled features and deployment environment.

**Never commit secrets or production credentials to the repository.**

---

## Development

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

# 🧪 Testing

Testing is part of the project's engineering roadmap.

The intended testing strategy includes:

- Unit tests
- Integration tests
- API testing
- Component testing
- End-to-end testing

Planned tooling includes:

- Vitest / Jest
- React Testing Library
- Supertest
- Playwright

The goal is to progressively introduce automated testing around critical business flows such as:

```text
Authentication
      ↓
Registration
      ↓
Email verification
      ↓
Login
      ↓
Protected resources
      ↓
Business/Event creation
```

---

# 🔐 Security

Security considerations include:

- JWT authentication
- Password hashing with bcrypt
- Environment-based secrets
- Protected API routes
- Authentication middleware
- Optional authentication for public resources
- Input validation
- CORS configuration
- Rate limiting
- Secure HTTP headers
- Cloudinary-controlled media uploads

Security hardening is an ongoing part of the project.

---

# 🚢 Deployment

The application is deployed using a modern cloud architecture.

```text
                    ┌──────────────┐
                    │    User      │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Vercel     │
                    │ Next.js Web  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Render     │
                    │ Node / API   │
                    └──────┬───────┘
                           │
                ┌──────────┼──────────┐
                ▼          ▼          ▼
           MongoDB    Cloudinary   Resend
```

---

# 🧠 Engineering Challenges

Veci is not only a portfolio application. It is a real product being developed and evolved through actual technical problems.

Some of the engineering challenges include:

### Rendering & Navigation

Managing localized routes, dynamic pages, authentication states, and server/client rendering in Next.js.

### Data Normalization

Handling different API response structures between frontend components and backend resources.

### Location Queries

Designing geographic queries using MongoDB GeoJSON and `2dsphere` indexes.

### Authentication

Building a complete authentication lifecycle including registration, verification, password recovery, and protected resources.

### Responsive Discovery

Designing a visual discovery system that works across mobile and desktop while handling heterogeneous content such as businesses and events.

### Product Evolution

Balancing technical architecture with real product requirements and feedback from actual users and businesses.

---

# 🗺️ Roadmap

## Phase 1 — Core Platform

- [x] Authentication
- [x] User registration
- [x] Email verification
- [x] Password recovery
- [x] Events
- [x] Businesses
- [x] Discovery
- [x] Multilingual routing
- [x] Responsive UI

## Phase 2 — User Accounts

- [ ] Profile management
- [ ] Account settings
- [ ] Favorites
- [ ] User preferences
- [ ] Account deletion

## Phase 3 — Community

- [ ] Social interactions
- [ ] Following businesses
- [ ] Improved event participation
- [ ] Community recommendations
- [ ] Notifications

## Phase 4 — Growth

- [ ] More European cities
- [ ] More languages
- [ ] Business analytics
- [ ] Business promotion tools
- [ ] Marketplace capabilities

---

# 📊 Product Vision

Veci is being developed with a broader vision than simply being an events directory.

The long-term goal is to create a **digital infrastructure for Latin American communities in Europe**, connecting:

```text
People
  ↕
Events
  ↕
Businesses
  ↕
Community
```

This creates opportunities for:

- Local discovery
- Community building
- Business visibility
- Event promotion
- Digital services
- Future marketplace functionality

---

# 👨‍💻 Author

**Andres Perdomo**

MSc Web Science · Full-Stack Developer

Building Veci as an independent product focused on connecting Latin American communities in Europe.

🌐 Portfolio: https://ndrsdeveloper.com/

💻 GitHub: https://github.com/NRDS92/NRDS92

🌎 Veci: https://www.veci-latin.com/

---

# 📄 License

This project is currently developed as a private product.

All rights reserved.
