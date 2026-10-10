# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — Bangladesh's daily essential-goods price tracker.

বাজার দর একটি দৈনিক বাজারদর ট্র্যাকার। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, আগের দিনের তুলনায় পরিবর্তন এবং বিভিন্ন বাজারের সর্বনিম্ন-সর্বাধিক-গড় দাম এক জায়গায় দেখা যায়।

BazarDor shows today's prices for everyday groceries, how much they moved since yesterday, and a per-market price breakdown. All numbers are shown in Bengali digits.

| | |
|---|---|
| **Live site** | https://bazar-dor-inky-nu.vercel.app |
| **Repository** | https://github.com/shamim-opl/assignment07_b14 |

---

## ✨ Features

1. **Live price ticker** – an infinitely scrolling strip under the navbar with emoji, name, price per unit and a ▲ / ▼ change badge (pauses on hover).
2. **Price movers** – the top 6 risers (`আজ দাম বেড়েছে ▲`) and top 6 fallers (`আজ দাম কমেছে ▼`) on the home page, plus an all-products grid.
3. **Category pages with sorting** – browse by category and sort by default, price low → high or high → low. Sorting uses the real numeric price, so Bengali digits never break the order.
4. **Protected product details** – sign in to see the min / max / average price and a market-by-market table (market, division, min, max, average).
5. **Authentication with BetterAuth** – email & password, Google and GitHub login, toast feedback, protected-route redirects, and a profile page where you can update your name.
6. **Fully responsive** – mobile, tablet and desktop layouts, skeleton loaders while data loads, and friendly 404 / empty states.

## 🧰 Tech stack

| Purpose | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Authentication | [BetterAuth](https://better-auth.com) |
| Database | PostgreSQL (`pg`) in production, SQLite file for local development |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Font | Hind Siliguri (Google Fonts) |
| Data | BazarDor REST API |

## 🗺️ Routes

| Route | Access | Description |
|---|---|---|
| `/` | public | Hero, price movers, all products |
| `/category/[slug]` | public | Products of one category with sorting |
| `/product/[slug]` | 🔒 login | Price summary and market-wise prices |
| `/signin`, `/signup` | public | Email / Google / GitHub authentication |
| `/profile` | 🔒 login | Account information and sign out |
| `/profile/update` | 🔒 login | Update your name |

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Random secret, 32+ characters |
| `BETTER_AUTH_URL` | Public URL of the site, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Same as above |
| `DATABASE_URL` | PostgreSQL connection string (Neon, Supabase, …). Leave empty locally to use a SQLite file |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials (optional) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials (optional) |

Database tables are created automatically on the first auth request, so no migration command is needed.

### OAuth callback URLs

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## ☁️ Deployment (Vercel)

1. Import the repository in Vercel.
2. Add the environment variables above (use a hosted PostgreSQL `DATABASE_URL`, since Vercel's filesystem is not persistent).
3. Deploy. Dynamic routes such as `/product/[slug]` and `/category/[slug]` are rendered on demand, so reloading any page works.

## 📁 Project structure

```
app/            Routes (home, category, product, auth, profile, API)
components/     UI components (navbar, ticker, cards, forms…)
lib/            API client, Bengali formatters, BetterAuth setup
public/         Images
proxy.ts        Redirects visitors without a session away from protected routes
```

## 🔌 API

Base URL: `https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`)

`/products` · `/products?category=chal` · `/products/:id` · `/categories` · `/categories/:slug`
