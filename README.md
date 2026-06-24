# MeetMind — AI Meeting Intelligence

> Every meeting, turned into action.

MeetMind is an AI-powered meeting assistant that transcribes calls in real time, extracts action items and decisions, and delivers structured summaries to your whole team — automatically.

**Live demo:** deployed via GitHub Pages (see below)

---

## Features

- 🎙️ Real-time transcription with speaker labels
- ✅ Automatic action item extraction with owners & deadlines
- 📋 Decision registry — searchable log of every key decision
- 📊 Meeting analytics dashboard
- 🔗 Integrations: Slack, Jira, Linear, Notion, HubSpot, Salesforce
- 🌍 50+ languages supported
- 🔒 SOC 2 Type II, GDPR compliant
- 📬 Waitlist form → stores signups in Postgres (Supabase)
- 🛡️ Password-protected admin dashboard with CSV export
- 🎬 Interactive product walkthrough (9-scene demo player)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Database | Supabase (Postgres) — with localStorage fallback |
| Deploy | GitHub Pages via GitHub Actions |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/meetmind.git
cd meetmind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values (see [Environment Variables](#environment-variables) below).  
The app works without any variables — it falls back to `localStorage` for the waitlist.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production

```bash
npm run build
```

Output goes to `dist/`. The build is a **single self-contained `index.html`** (all JS and CSS inlined) thanks to `vite-plugin-singlefile`.

---

## Deploying to GitHub Pages

### One-time setup

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/meetmind.git
git push -u origin main
```

2. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under *Source*, select **GitHub Actions**
   - Save

3. **Add your secrets** (optional — only needed for real Supabase integration)
   - Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Add each of these:

   | Secret name | Where to find it |
   |---|---|
   | `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
   | `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
   | `VITE_SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API |
   | `VITE_ADMIN_PASSWORD` | Choose any strong password |

4. **Push to `main`** — the workflow runs automatically

```bash
git push origin main
```

5. **Your site is live** at:
```
https://YOUR_USERNAME.github.io/meetmind/
```

The Actions tab shows build progress. First deploy takes ~1 minute.

---

## Environment Variables

All variables are prefixed `VITE_` so Vite exposes them to the browser bundle.

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | No | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No | Public anon key (safe to expose) |
| `VITE_SUPABASE_SERVICE_KEY` | No | Service role key — used only by admin dashboard for reads |
| `VITE_ADMIN_PASSWORD` | No | Password for `/#/admin`. Defaults to `meetmind-admin-2025` |

Without Supabase variables, all waitlist signups are stored in **browser localStorage** — great for testing, not for production.

---

## Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to the **SQL Editor** and run:

```sql
create table waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  company     text,
  role        text,
  created_at  timestamptz not null default now()
);

-- Allow anyone to insert (public waitlist form)
alter table waitlist enable row level security;

create policy "public insert"
  on waitlist for insert
  with check (true);

-- Reads use the service role key (admin only)
-- No read policy needed — service key bypasses RLS
```

3. Copy your **Project URL**, **anon key**, and **service role key** from  
   Project Settings → API → Project API keys

---

## Admin Dashboard

Navigate to `/#/admin` in your browser.

**Default password:** `meetmind-admin-2025`  
Set `VITE_ADMIN_PASSWORD` to change it.

Features:
- View all waitlist signups in a searchable table
- Filter by name, email, company, or role
- Export filtered or full list as CSV
- Delete individual entries
- Live stats: total signups, unique companies, last 7 days

---

## Project Structure

```
meetmind/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → GitHub Pages
├── public/
│   └── images/
├── src/
│   ├── agent/                  # Atlas AI agent (tools + loop)
│   ├── components/             # All page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Waitlist.tsx        # Email capture form
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── demo/                   # Interactive 9-scene product walkthrough
│   │   ├── DemoPlayer.tsx
│   │   ├── scenes.ts
│   │   └── Scene*.tsx
│   ├── lib/
│   │   └── db.ts               # Supabase + localStorage waitlist logic
│   ├── pages/
│   │   └── Admin.tsx           # Password-protected admin dashboard
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example                # Copy to .env, never commit .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Deploying Elsewhere

This is a **pure static site** — it runs entirely in the browser. It deploys to any static host:

| Platform | How |
|---|---|
| **Vercel** | `npm i -g vercel && vercel` — add env vars in dashboard |
| **Netlify** | Drag `dist/` folder to [app.netlify.com](https://app.netlify.com) or connect repo |
| **Cloudflare Pages** | Connect repo, set build command `npm run build`, output `dist` |
| **AWS S3 + CloudFront** | Upload `dist/index.html` to S3, enable static hosting |

---

## Local Development Tips

```bash
# Start dev server with hot reload
npm run dev

# Type-check without building
npx tsc --noEmit

# Preview the production build locally
npm run build && npm run preview
```

---

## License

MIT — free to use, modify, and deploy.
