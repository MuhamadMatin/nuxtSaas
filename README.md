<p align="center">
  <a href="https://nuxt.com" target="_blank">
    <img src="./app/assets/images/nuxt.png" width="200" alt="Nuxt Logo">
  </a>
</p>

<h1 align="center">NuxtSaaS</h1>
<p align="center">Platform SaaS berbasis Nuxt 4 dengan AI tools bertenaga Gemini, manajemen gambar Cloudinary, pembayaran Polar, autentikasi Better Auth, dan database Turso (LibSQL) via Prisma ORM.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt 4">
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/Nuxt%20UI-4.9-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt UI">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/Turso-LibSQL-4F46E5?logo=sqlite&logoColor=white" alt="Turso">
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?logo=google&logoColor=white" alt="Gemini AI">
  <img src="https://img.shields.io/badge/Cloudinary-Image%20AI-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary">
  <img src="https://img.shields.io/badge/Polar-Payments-6366F1?logoColor=white" alt="Polar">
  <img src="https://img.shields.io/badge/Better%20Auth-Auth-FF6B6B?logoColor=white" alt="Better Auth">
  <img src="https://img.shields.io/badge/TipTap-v3-6C63FF?logoColor=white" alt="TipTap">
</p>

---

## Tentang Projek

NuxtSaaS adalah boilerplate SaaS yang siap digunakan sebagai fondasi produk berbasis Nuxt 4. Projek ini mengemas berbagai fitur SaaS yang umum dibutuhkan:

- **AI Tools** — berbagai tool AI bertenaga Google Gemini (via OpenAI-compatible SDK) untuk generasi konten, kode, dan percakapan.
- **Image Processing** — penghapusan background dan objek lewat Cloudinary AI.
- **Pembayaran & Langganan** — integrasi Polar untuk checkout, portal pelanggan, dan webhook.
- **Autentikasi** — login email/password dan OAuth (GitHub, Google) lewat Better Auth.
- **Database Edge-Ready** — Turso (LibSQL) diakses via Prisma ORM dengan adapter LibSQL.
- **Rich Text Editor** — TipTap v3 dengan banyak ekstensi (kolaborasi, drag-and-drop, mention, markdown, dll).
- **Sistem Freemium** — pembatasan penggunaan (usage limit) untuk user free dengan upgrade ke Pro via Polar.

## Fitur

### AI Tools (Gemini)
- **Conversation** — chatbot AI untuk percakapan umum.
- **Code Generator** — generasi kode berdasarkan prompt.
- **Article Writer** — generasi artikel panjang.
- **Blog Writer** — generasi konten blog.
- **Resume Builder** — generasi dan format resume/CV.

### Image Processing (Cloudinary)
- **Remove Background** — hapus background gambar secara otomatis.
- **Remove Object** — hapus objek tertentu dari gambar.

### Autentikasi & User Management
- Login dengan **email/password**.
- OAuth social login: **GitHub** dan **Google**.
- Manajemen sesi dengan cookie cache (Better Auth).
- Account linking (gabungkan beberapa provider ke satu akun).

### Pembayaran & Langganan (Polar)
- Checkout untuk upgrade ke **Pro plan**.
- Customer portal untuk manajemen langganan.
- Webhook handler untuk sinkronisasi status pembayaran.
- Usage-based metering.

### Editor & Konten
- **Rich Text Editor** — TipTap v3 dengan ekstensi: kolaborasi real-time, drag-and-drop block, bubble menu, floating menu, mention (@), markdown, placeholder, code block, image, dan slash command.
- **Markdown Rendering** — `@nuxtjs/mdc` untuk render konten Markdown.
- **PDF Parsing** — `unpdf` untuk ekstraksi teks dari file PDF.

### UI & Developer Experience
- **Nuxt UI v4** sebagai design system di atas Tailwind CSS v4.
- **Nuxt Image** untuk optimasi, kompresi, dan lazy loading gambar.
- **VueUse** — koleksi composable Vue yang siap pakai (`@vueuse/nuxt`).
- **Zod** untuk validasi skema di sisi server maupun client.
- **ESLint v9** via `@nuxt/eslint` sudah terkonfigurasi.
- **TypeScript** penuh dengan shared types.

## Tech Stack

| Layer | Teknologi | Package |
|---|---|---|
| Framework | Nuxt 4 (Vue 3) | `nuxt` |
| UI Component | Nuxt UI v4 | `@nuxt/ui` |
| Styling | Tailwind CSS v4 | `tailwindcss` |
| Auth | Better Auth (Email, GitHub, Google) | `better-auth` |
| Database | Turso — LibSQL | `@libsql/client` |
| ORM | Prisma 7 | `@prisma/client`, `@prisma/adapter-libsql` |
| AI | Google Gemini (via OpenAI SDK) | `openai` |
| Image Processing | Cloudinary | `cloudinary` |
| Payments | Polar | `@polar-sh/sdk`, `@polar-sh/better-auth` |
| Rich Text Editor | TipTap v3 | `@tiptap/vue-3` + ekstensi |
| Markdown | Nuxt MDC | `@nuxtjs/mdc` |
| PDF | unpdf | `unpdf` |
| Utilities | VueUse | `@vueuse/nuxt` |
| Validasi | Zod | `zod` |
| Image Optimization | Nuxt Image | `@nuxt/image` |
| Linting | ESLint 9 | `@nuxt/eslint` |

## Memulai

### Prasyarat

- Node.js 20 atau lebih baru
- Akun [Turso](https://turso.tech) beserta database yang sudah dibuat
- API key [Google Gemini](https://ai.google.dev/) untuk fitur AI
- Akun [Cloudinary](https://cloudinary.com) untuk fitur image processing
- Akun [Polar](https://polar.sh) untuk fitur pembayaran (opsional di development)
- OAuth credentials dari [GitHub](https://github.com/settings/developers) dan [Google Cloud Console](https://console.cloud.google.com/) (opsional)

### Instalasi

Clone repository dan masuk ke foldernya:

```bash
git clone https://github.com/username/nuxt-saas.git
cd nuxt-saas
```

Install dependensi — pilih package manager yang kamu pakai:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

Salin file environment:

```bash
cp .env.example .env
```

Jalankan migrasi Prisma:

```bash
# npm
npx prisma migrate deploy

# yarn
yarn prisma migrate deploy

# pnpm
pnpm prisma migrate deploy

# bun
bunx prisma migrate deploy
```

Atau untuk development dengan push langsung ke schema:

```bash
# npm
npx prisma db push

# yarn
yarn prisma db push

# pnpm
pnpm prisma db push

# bun
bunx prisma db push
```

### Environment Variables

Isi `.env` dengan nilai berikut:

```env
# App
NUXT_PUBLIC_APP_ENV=development

# Better Auth
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Turso Database
NUXT_TURSO_DATABASE_URL=libsql://your-database.turso.io
NUXT_TURSO_AUTH_TOKEN=your_turso_auth_token

# OAuth - Google
NUXT_GOOGLE_CLIENT_ID=your_google_client_id
NUXT_GOOGLE_CLIENT_SECRET=your_google_client_secret

# OAuth - GitHub
NUXT_GITHUB_CLIENT_ID=your_github_client_id
NUXT_GITHUB_CLIENT_SECRET=your_github_client_secret

# Gemini AI
NUXT_GEMINI_API=your_gemini_api_key
NUXT_GEMINI_MODEL=gemini-2.0-flash

# Cloudinary
NUXT_CLOUDINARY_CLOUD_URL=your_cloud_name
NUXT_CLOUDINARY_API_KEY=your_api_key
NUXT_CLOUDINARY_API_SECRET=your_api_secret

# Polar Payments
NUXT_POLAR_ACCESS_TOKEN=your_polar_access_token
NUXT_POLAR_SERVER=sandbox
NUXT_POLAR_WEBHOOK_SECRET=your_webhook_secret
NUXT_POLAR_PRODUCT_ID=your_product_id
```

| Variabel | Keterangan | Akses |
|---|---|---|
| `NUXT_PUBLIC_APP_ENV` | Environment aplikasi (`development` / `production`) | Client & Server |
| `BETTER_AUTH_SECRET` | Secret key untuk enkripsi sesi Better Auth | Server only |
| `BETTER_AUTH_URL` | Base URL aplikasi untuk Better Auth | Server only |
| `NUXT_TURSO_DATABASE_URL` | Connection URL database Turso | Server only |
| `NUXT_TURSO_AUTH_TOKEN` | Auth token Turso untuk koneksi aman | Server only |
| `NUXT_GOOGLE_CLIENT_ID` | OAuth client ID dari Google Cloud Console | Server only |
| `NUXT_GOOGLE_CLIENT_SECRET` | OAuth client secret dari Google | Server only |
| `NUXT_GITHUB_CLIENT_ID` | OAuth client ID dari GitHub Developer Settings | Server only |
| `NUXT_GITHUB_CLIENT_SECRET` | OAuth client secret dari GitHub | Server only |
| `NUXT_GEMINI_API` | API key Google Gemini untuk fitur AI | Server only |
| `NUXT_GEMINI_MODEL` | Model Gemini yang digunakan | Server only |
| `NUXT_CLOUDINARY_CLOUD_URL` | Cloud name akun Cloudinary | Server only |
| `NUXT_CLOUDINARY_API_KEY` | API key Cloudinary | Server only |
| `NUXT_CLOUDINARY_API_SECRET` | API secret Cloudinary | Server only |
| `NUXT_POLAR_ACCESS_TOKEN` | Access token dari Polar dashboard | Server only |
| `NUXT_POLAR_SERVER` | Polar environment (`sandbox` / `production`) | Server only |
| `NUXT_POLAR_WEBHOOK_SECRET` | Webhook secret untuk verifikasi event Polar | Server only |
| `NUXT_POLAR_PRODUCT_ID` | Product ID untuk Pro plan di Polar | Server only |

> Semua variabel `NUXT_*` (kecuali `NUXT_PUBLIC_*`) hanya terbaca di sisi server lewat `runtimeConfig`, jadi credential tidak pernah sampai ke browser.

### Menjalankan Aplikasi

**Development**

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

**Build production**

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build

# bun
bun run build
```

**Preview hasil build**

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview

# bun
bun run preview
```

Buka `http://localhost:3000` di browser.

## Alur Aplikasi

**Autentikasi**

```
Akses Halaman → Cek Session Better Auth
    ├── Belum login → Redirect ke /auth/login
    │       ├── Login email/password
    │       ├── Login via GitHub OAuth
    │       └── Login via Google OAuth
    └── Sudah login → Lanjut ke Dashboard
```

**AI Tools (Gemini)**

```
User membuka AI tool di Dashboard
    └── Input prompt / upload file (PDF untuk resume)
            └── Request ke /api/ai-tools/*
                    └── Server: validasi user + cek usage limit
                            ├── Limit tercapai (free) → Tampilkan Pro modal
                            └── Limit OK → Kirim ke Gemini API
                                    └── Response di-stream / dikembalikan ke client
                                            └── Increment usage count di database
```

**Image Processing (Cloudinary)**

```
User upload gambar
    └── Request ke /api/cloudinary-tools/*
            └── Server: validasi user + cek usage limit
                    └── Upload ke Cloudinary dengan transformasi AI
                            └── Return URL gambar hasil proses
```

**Pembayaran (Polar)**

```
User klik upgrade Pro
    └── Redirect ke Polar checkout
            └── Pembayaran berhasil
                    └── Webhook dari Polar → Update status di database
                            └── User mendapat akses tanpa limit
```

**Penyimpanan Data**

```
Aksi Pengguna
    └── API route di Nuxt server
            └── Prisma Client dengan adapter LibSQL
                    └── Turso (LibSQL) - edge database
```

## Catatan Konfigurasi

- **Nuxt 4** dipakai, bukan Nuxt 3. Perhatikan perubahan struktur direktori (`app/`, `server/`) yang berbeda dari Nuxt 3.
- **`@nuxt/ui` v4** sudah mengintegrasikan Tailwind CSS v4 secara internal. Tidak perlu install `@nuxtjs/tailwindcss` secara terpisah.
- **`@prisma/adapter-libsql`** memungkinkan Prisma terhubung ke Turso lewat protokol LibSQL, bukan koneksi database konvensional.
- **Gemini AI** diakses via OpenAI-compatible SDK (`openai` package) dengan base URL `generativelanguage.googleapis.com`. Ini memudahkan migrasi antar provider AI.
- **Cloudinary** digunakan untuk image processing AI (remove background, remove object), bukan sekadar hosting gambar.
- **Polar** terintegrasi langsung dengan Better Auth via plugin `@polar-sh/better-auth`. Customer otomatis dibuat saat user sign up.
- **Better Auth** dikonfigurasi di sisi server dengan Prisma adapter. Pastikan `BETTER_AUTH_SECRET` dan konfigurasi OAuth diset dengan benar sebelum deploy.
- **Usage Limit** — user free dibatasi jumlah penggunaan AI tools. Setiap request yang berhasil akan increment counter di tabel `UserLimit`.
- Semua ekstensi TipTap diimpor secara individual — aktifkan hanya yang dibutuhkan untuk menjaga bundle size tetap kecil.