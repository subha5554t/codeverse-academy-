# 🚀 CodeVerse Academy

> A premium, production-ready online software development education platform built with the MERN stack, TypeScript, Tailwind CSS, and Framer Motion.

![CodeVerse Academy](https://img.shields.io/badge/Stack-MERN-6366F1?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- **5 fully-built pages** — Home, Courses, Tech Domains, About, Contact
- **Dark / Light mode** with localStorage persistence
- **Framer Motion** animations throughout — hero reveals, scroll triggers, page transitions
- **Contact form** with React Hook Form validation + MongoDB persistence
- **Course enrollment** API with duplicate detection
- **7 tech domain** deep-dives with sidebar navigation
- **Responsive mobile-first** layout
- **Production-grade backend** — rate limiting, validation, error handling, Helmet security
- **Glassmorphism** UI with custom Syne + DM Sans + JetBrains Mono typography
- **Docker + docker-compose** for containerised deployment
- **Vercel-ready** frontend configuration
- **MongoDB seed script** to populate the database instantly

---

## 🗂 Project Structure

```
codeverse-academy/
├── client/                        # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       └── Layout.tsx     # Navbar + Footer + page transitions
│   │   ├── pages/
│   │   │   ├── HomePage.tsx       # Hero, courses, domains, testimonials, pricing, FAQ
│   │   │   ├── CoursesPage.tsx    # Filterable course catalogue with enroll CTA
│   │   │   ├── DomainsPage.tsx    # 7 tech domains with sidebar navigation
│   │   │   ├── AboutPage.tsx      # Mission, values, timeline, team
│   │   │   └── ContactPage.tsx    # React Hook Form → POST /api/contact
│   │   ├── hooks/
│   │   │   ├── useTheme.ts        # Dark/light theme context
│   │   │   └── useScrollReveal.ts # Framer Motion in-view hook
│   │   ├── utils/
│   │   │   └── data.ts            # All static data (courses, domains, testimonials…)
│   │   └── styles/
│   │       └── globals.css        # Tailwind + custom utilities + animations
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── server/                        # Node.js + Express backend
│   ├── config/
│   │   └── db.js                  # Mongoose connection with reconnect logic
│   ├── controllers/
│   │   ├── contact.controller.js  # Submit / list / update contact status
│   │   ├── course.controller.js   # CRUD for courses
│   │   ├── enroll.controller.js   # Enrollment with duplicate guard
│   │   └── domain.controller.js   # Static domain data served via API
│   ├── models/
│   │   ├── Course.model.js        # Mongoose schema with text index
│   │   ├── Student.model.js       # Contact form submissions
│   │   └── Enrollment.model.js    # Course enrollment records
│   ├── routes/
│   │   ├── contact.routes.js      # POST /api/contact, GET /api/contact
│   │   ├── course.routes.js       # GET/POST/PUT/DELETE /api/courses
│   │   ├── enroll.routes.js       # POST /api/enroll, GET /api/enroll/check
│   │   └── domain.routes.js       # GET /api/domains, GET /api/domains/:id
│   ├── middleware/
│   │   ├── error.middleware.js    # Global error handler + 404
│   │   └── rateLimit.middleware.js # express-rate-limit config
│   ├── scripts/
│   │   └── seed.js                # Seed MongoDB with course data
│   ├── server.js                  # Express app entry point
│   └── .env.example
│
├── Dockerfile                     # Multi-stage build (client + server)
├── docker-compose.yml             # MongoDB + server + client services
├── vercel.json                    # Vercel deployment config
└── package.json                   # Root scripts (concurrently)
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| npm | v9+ |
| MongoDB | v6+ (local) or Atlas URI |

---

### 1. Clone & Install

```bash
# Clone the repo
git clone https://github.com/yourname/codeverse-academy.git
cd codeverse-academy

# Install all dependencies (root + client + server)
npm run install:all
```

---

### 2. Configure Environment

```bash
# Copy the example env file
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codeverse_academy
CLIENT_URL=http://localhost:3000
```

---

### 3. Seed the Database

```bash
npm run seed
```

This populates MongoDB with all 6 courses.

---

### 4. Run in Development Mode

```bash
# Runs both client (port 3000) and server (port 5000) concurrently
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Health check | http://localhost:5000/api/health |

---

## 📡 API Reference

### Health
```
GET  /api/health              → { status: "OK", ... }
```

### Courses
```
GET  /api/courses             → List all published courses
GET  /api/courses/:id         → Single course detail
POST /api/courses             → Create course (admin)
PUT  /api/courses/:id         → Update course (admin)
DELETE /api/courses/:id       → Soft delete course (admin)
```

**Query params for GET /api/courses:**
- `level` — `Beginner` | `Intermediate` | `Advanced`
- `search` — full-text search
- `sort` — `createdAt` | `price_asc` | `price_desc` | `rating` | `popular`
- `page`, `limit` — pagination

---

### Contact
```
POST /api/contact             → Submit contact form
GET  /api/contact             → List all submissions (admin)
PATCH /api/contact/:id/status → Update lead status (admin)
```

**POST /api/contact body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "course": "MERN Stack Bootcamp",
  "message": "I'd love to know more about the mentorship programme."
}
```

---

### Enrollment
```
POST /api/enroll              → Enroll in a course
GET  /api/enroll              → List all enrollments (admin)
GET  /api/enroll/check        → Check if email is enrolled (?email=&course=)
```

**POST /api/enroll body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "course": "MERN Stack Bootcamp"
}
```

---

### Domains
```
GET  /api/domains             → All 7 tech domains
GET  /api/domains/:id         → Single domain (e.g. /api/domains/frontend)
```

---

## 🗄 Database Schemas

### Course
| Field | Type | Notes |
|-------|------|-------|
| title | String | required, max 120 chars |
| description | String | required |
| duration | String | e.g. "16 weeks" |
| level | String | Beginner / Intermediate / Advanced |
| skills | [String] | array of skill tags |
| price | Number | in USD |
| image | String | emoji icon |
| badge | String | e.g. "Bestseller" |
| rating | Number | 0–5 |
| studentsCount | Number | auto-increments on enroll |
| isPublished | Boolean | soft-delete flag |
| createdAt | Date | auto |

### Student (Contact Submissions)
| Field | Type | Notes |
|-------|------|-------|
| name | String | required, 2–80 chars |
| email | String | required, validated |
| course | String | optional course interest |
| message | String | required, 10–2000 chars |
| status | String | new / contacted / enrolled / closed |
| ipAddress | String | stored for rate limit tracking |
| createdAt | Date | auto |

### Enrollment
| Field | Type | Notes |
|-------|------|-------|
| name | String | student name |
| email | String | required, indexed |
| course | String | course title |
| courseRef | ObjectId | ref → Course |
| status | String | pending / active / completed / cancelled |
| paymentStatus | String | unpaid / paid / refunded |
| enrolledAt | Date | default: now |

---

## 🐳 Docker Deployment

```bash
# Build and start all services (MongoDB + server + client)
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

Services:
| Container | Port | Description |
|-----------|------|-------------|
| codeverse_mongo | 27017 | MongoDB 7 |
| codeverse_server | 5000 | Express API |
| codeverse_client | 3000 | Vite dev server |

---

## ☁️ Deployment Guide

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# From the client directory
cd client
vercel --prod
```

Or connect your GitHub repo to Vercel and set:
- **Root directory:** `client`
- **Build command:** `npm run build`
- **Output directory:** `dist`

---

### Backend → Railway / Render

**Railway:**
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

Set environment variables in Railway dashboard:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CLIENT_URL=https://your-vercel-app.vercel.app
PORT=5000
```

**Render:**
1. New Web Service → connect GitHub repo
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env vars in dashboard

---

### Database → MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist IP (0.0.0.0/0 for production)
4. Get connection string:
```
mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codeverse_academy
```
5. Set as `MONGODB_URI` env var

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Routing | React Router 6 |
| Form Handling | React Hook Form 7 |
| Icons | Lucide React |
| Backend | Node.js 20 + Express 4 |
| Database | MongoDB 7 + Mongoose 8 |
| Validation | express-validator |
| Security | Helmet + CORS + rate-limit |
| Logging | Morgan |
| Fonts | Syne + DM Sans + JetBrains Mono |
| Container | Docker + docker-compose |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies |
| `npm run dev` | Run client + server concurrently |
| `npm run dev:client` | Run only the Vite dev server |
| `npm run dev:server` | Run only the Express server |
| `npm run build` | Build the React client for production |
| `npm start` | Start the production server |
| `npm run seed` | Seed MongoDB with course data |

---

## 🎨 Design System

**Fonts**
- `Syne` — Display / headings (bold, distinctive)
- `DM Sans` — Body text (clean, readable)
- `JetBrains Mono` — Code badges, labels, monospace

**Colors**
- `void` `#050508` — Page background
- `surface` `#0D0D14` — Card / section background
- `primary` `#6366F1` — Indigo accent
- `accent-cyan` `#22D3EE` — Secondary accent
- `accent-violet` `#A78BFA` — Tertiary accent

**Key Components**
- `.glass` — Frosted glass card effect
- `.btn-primary` — Indigo gradient CTA button
- `.btn-ghost` — Outlined secondary button
- `.card` — Elevated rounded-2xl card
- `.section-label` — Small uppercase pill badge
- `.gradient-text` — Animated indigo→cyan text gradient
- `.code-badge` — Monospace skill tag

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add awesome feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT © 2025 CodeVerse Academy

---

<p align="center">Built with ❤️ by developers, for developers.</p>
