# SRI SAI GANESH JEWELLERY — Gold & Silver Ornament Shop

A premium, production-ready web application for a gold and silver ornament shop. Built with React, Tailwind CSS, and Supabase.

## ✨ Features

- **Public Catalog** — Browse gold & silver ornaments with filters (category, material, purity, weight)
- **Live Metal Rates** — Real-time gold & silver prices via metals.live API
- **Multi-language (i18n)** — English, Telugu, Hindi support
- **WhatsApp Integration** — Dynamic inquiry links for each product
- **Google Maps** — Embedded shop location
- **EmailJS Contact Form** — Free email notifications
- **Admin Dashboard** — Product CRUD, category management, analytics, inquiry viewer
- **Supabase Backend** — PostgreSQL, Auth, Storage, RLS security
- **Mobile-first** — Fully responsive design with animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- A free [Supabase](https://supabase.com/) account

### 1. Install Dependencies

```bash
cd shop
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com/)
2. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. Go to **Storage** → Create bucket `product-images` → Set as **Public**
4. Go to **Authentication** → **Users** → Create an admin user (email + password)
5. Copy your project URL and anon key from **Settings** → **API**

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SHOP_PHONE=919876543210
VITE_SHOP_EMAIL=your@email.com
VITE_SHOP_NAME=Your Shop Name
VITE_SHOP_ADDRESS=Your shop address
VITE_SHOP_MAP_EMBED=your-google-maps-embed-url
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. (Optional) Set Up EmailJS

1. Create free account at [emailjs.com](https://www.emailjs.com/)
2. Create a service + template
3. Add credentials to `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com/) → Import project
3. Add environment variables in project settings
4. Deploy!

SPA routing is handled by `vercel.json`.

## 📁 Project Structure

```
shop/
├── src/
│   ├── components/       # Shared UI components
│   ├── context/          # Auth context
│   ├── data/             # Mock/demo data
│   ├── hooks/            # React Query hooks
│   ├── i18n/             # Translations (en, te, hi)
│   ├── lib/              # Supabase, WhatsApp, EmailJS
│   ├── pages/            # Route pages
│   │   ├── admin/        # Admin panel pages
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql        # Database schema + RLS
├── .env.example
├── vercel.json
└── README.md
```

## 🔒 Security

- **RLS** — Row Level Security on all tables (public read-only, admin write)
- **Auth** — Supabase Auth with protected admin routes
- **Environment variables** — All secrets in `.env`, never committed

## 📊 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| State | TanStack React Query |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| i18n | react-i18next |
| Icons | Lucide React |
| Email | EmailJS |

## 📝 License

MIT
