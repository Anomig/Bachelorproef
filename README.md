# Bachelorproef

cd Sensus
npm install
npm run dev

PWA and vue-router zijn geïnstalleerd.

Strapi (CMS): start in watch mode from `sensus-cms`:

```bash
cd sensus-cms
npm install
npm run develop
```

Build admin panel:

```bash
npm run build
```

Quick frontend + env setup:

1. Copy the example environment file:

```bash
cd Sensus
cp .env.example .env
# edit .env and fill values
```

2. Run the frontend:

```bash
npm install
npm run dev
```

Set `VITE_STRAPI_URL` to your Strapi base URL (e.g. `http://localhost:1337`) and fill Supabase vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in `Sensus/.env`.