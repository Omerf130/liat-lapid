# ליאת לפיד — Law Firm Website

Premium Hebrew RTL website for **ליאת לפיד**, a labor law firm. Includes a public marketing site and a content-managed admin dashboard.

**Live:** [liat-lapid.vercel.app](https://liat-lapid.vercel.app)

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **SCSS Modules** with a custom design system (RTL, gold/navy palette)
- **MongoDB Atlas** + Mongoose
- **JWT auth** (httpOnly cookie via `jose`) + bcrypt passwords
- **TipTap** WYSIWYG editor in admin
- **Vercel Blob** for image uploads
- **sanitize-html** for safe rich-text rendering

## Prerequisites

- Node.js 20+
- MongoDB Atlas cluster (or local MongoDB)
- Vercel account (for deployment and Blob storage)

## Local Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/Omerf130/liat-lapid.git
   cd liat-lapid
   npm install
   ```

2. **Environment variables**

   Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |----------|-------------|
   | `MONGODB_URI` | MongoDB connection string |
   | `JWT_SECRET` | Long random string for signing admin JWTs |
   | `ADMIN_EMAIL` | Admin login email (used by seed script) |
   | `ADMIN_PASSWORD` | Admin login password (used by seed script) |
   | `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (optional locally; required for uploads) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for Open Graph metadata (optional) |

3. **Seed the database**

   Creates the admin user and default site content:

   ```bash
   npm run seed
   ```

4. **Run the dev server**

   Webpack is required because Turbopack fails with Hebrew characters in the project path on Windows:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) for the public site.

## Admin Panel

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Credentials:** values from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`

The dashboard lets you edit:

- Hero, About, Employers, Employee Guidance, Lectures
- Contact details and SEO metadata
- Practice areas and advantages (full CRUD)
- Contact form submissions

Changes are saved to MongoDB and revalidated on the public site automatically.

## Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/about` | About the firm |
| `/employers` | Employer legal guidance |
| `/practice-areas` | Practice areas listing |
| `/practice-areas/[slug]` | Individual practice area |
| `/contact` | Contact page with form |

## Deploy to Vercel

1. Push the repo to GitHub and import it in [Vercel](https://vercel.com/new).
2. Add all environment variables from `.env.example` in **Project Settings → Environment Variables**.
3. Create a **Blob** store in the Vercel project and connect it — this sets `BLOB_READ_WRITE_TOKEN`.
4. Deploy. Vercel runs `npm run build` automatically.
5. After first deploy, run the seed script locally against production MongoDB (or use a one-off script) to create the admin user and initial content:

   ```bash
   npm run seed
   ```

   Ensure your local `.env` points to the production `MONGODB_URI` when seeding production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (webpack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed MongoDB with admin + default content |

## Project Structure

```
app/
  (site)/          Public pages + layout
  admin/           Login + dashboard
  api/             Public and admin API routes
components/
  layout/          Header, Footer, FloatingButtons
  shared/          Reusable UI (forms, cards, RichText)
  admin/           Dashboard components (TipTap, uploads)
  home/            Home page sections
lib/               Auth, DB, content fetching, validators
models/            Mongoose schemas
scripts/seed.ts    Database seeding
styles/            SCSS tokens and mixins
middleware.ts      Protects /admin/dashboard/*
```

## Notes

- Admin routes are protected by middleware and excluded from search indexing.
- Image uploads require `BLOB_READ_WRITE_TOKEN`; without it, paste image URLs manually in the admin panel.
- The contact form saves submissions to MongoDB and displays them in **Admin → פניות**.
