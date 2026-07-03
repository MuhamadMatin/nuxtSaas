<p align="center">
  <a href="https://nuxt.com" target="_blank">
    <img src="./app/assets/images/nuxt.png" width="200" alt="Nuxt Logo">
  </a>
</p>

<h1 align="center">NuxtSaaS</h1>
<p align="center">Platform SaaS berbasis Nuxt 4 dengan rich text editor kolaboratif, autentikasi siap pakai, dan database Turso (LibSQL) via Prisma ORM.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt 4">
  <img src="https://img.shields.io/badge/Nuxt%20UI-4.9-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt UI">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/Turso-LibSQL-4F46E5?logo=sqlite&logoColor=white" alt="Turso">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/TipTap-v3-6C63FF?logoColor=white" alt="TipTap">
</p>

---

## Tentang Projek

NuxtSaaS adalah boilerplate SaaS yang siap digunakan sebagai fondasi produk berbasis Nuxt 4. Di dalamnya sudah tersedia autentikasi dengan Better Auth, database edge-ready lewat Turso (LibSQL) yang diakses via Prisma ORM, serta rich text editor bertenaga TipTap v3 dengan dukungan kolaborasi real-time, drag-and-drop block, mention, markdown, dan banyak ekstensi lainnya.

## Fitur

- **Autentikasi** - manajemen sesi dan user lewat Better Auth.
- **Database Edge-Ready** - Turso (LibSQL) sebagai database, diakses lewat Prisma ORM dengan adapter LibSQL.
- **Rich Text Editor** - TipTap v3 dengan ekstensi: kolaborasi real-time, drag-and-drop block, bubble menu, floating menu, mention (@), markdown, placeholder, code block, image, dan slash command.
- **UI Component** - Nuxt UI v4 sebagai design system siap pakai di atas Tailwind CSS v4.
- **Optimasi Gambar** - Nuxt Image untuk kompresi dan lazy loading otomatis.
- **Validasi Skema** - Zod untuk validasi input di sisi server maupun client.
- **Code Quality** - ESLint v9 via `@nuxt/eslint` sudah terkonfigurasi.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Nuxt 4 (Vue 3) |
| UI Component | Nuxt UI (`@nuxt/ui`) |
| Styling | Tailwind CSS v4 |
| Auth | Better Auth |
| Database | Turso - LibSQL (`@libsql/client`) |
| ORM | Prisma 7 (`@prisma/adapter-libsql`) |
| Rich Text Editor | TipTap v3 (`@tiptap/vue-3`) |
| Validasi | Zod |
| Image | Nuxt Image (`@nuxt/image`) |
| Linting | ESLint 9 (`@nuxt/eslint`) |

## Memulai

### Prasyarat

- Node.js 20 atau lebih baru
- Akun [Turso](https://turso.tech) beserta database yang sudah dibuat
- `turso` CLI (opsional, untuk manajemen database lokal)

### Instalasi

Clone repository dan masuk ke foldernya:

```bash
git clone https://github.com/username/nuxt-saas.git
cd nuxt-saas
```

Install dependensi - pilih package manager yang kamu pakai:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install

# deno
deno install
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

# deno
deno run -A npm:prisma migrate deploy
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

# deno
deno run -A npm:prisma db push
```

### Environment Variables

Isi `.env` dengan nilai berikut:

```env
# Turso Database (server-only)
NUXT_TURSO_DATABASE_URL=libsql://your-database.turso.io
NUXT_TURSO_AUTH_TOKEN=your_turso_auth_token

# App Environment (public, aman diakses dari client)
NUXT_PUBLIC_APP_ENV=development
```

| Variabel | Keterangan | Akses |
|---|---|---|
| `NUXT_TURSO_DATABASE_URL` | Connection URL database Turso | Server only |
| `NUXT_TURSO_AUTH_TOKEN` | Auth token Turso untuk koneksi aman | Server only |
| `NUXT_PUBLIC_APP_ENV` | Environment aplikasi (`development` / `production`) | Client & Server |

`NUXT_TURSO_DATABASE_URL` dan `NUXT_TURSO_AUTH_TOKEN` hanya terbaca di sisi server lewat `runtimeConfig`, jadi credential database tidak pernah sampai ke browser.

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

# deno
deno task dev
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

# deno
deno task build
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

# deno
deno task preview
```

**Generate static site**

```bash
# npm
npm run generate

# yarn
yarn generate

# pnpm
pnpm generate

# bun
bun run generate

# deno
deno task generate
```

Buka `http://localhost:3000` di browser.

## Alur Aplikasi

**Autentikasi**

```
Akses Halaman → Cek Session Better Auth
    ├── Belum login → Redirect ke /login
    └── Sudah login → Lanjut ke Dashboard
```

**Rich Text Editor (TipTap)**

```
Buka Dokumen
    └── Editor TipTap dimuat dengan ekstensi aktif
            ├── Kolaborasi real-time (WebSocket/Y.js)
            ├── Drag & drop block (DragHandle)
            ├── Slash command → FloatingMenu muncul
            ├── Seleksi teks → BubbleMenu muncul (format bold, italic, dll)
            ├── Mention (@user) → Suggestion dropdown
            └── Output disimpan ke Turso via Prisma
```

**Penyimpanan Data**

```
Aksi Pengguna
    └── API route di Nuxt server
            └── Prisma Client dengan adapter LibSQL
                    └── Turso (LibSQL) - edge database
```

## Catatan Konfigurasi

- Nuxt 4 dipakai, bukan Nuxt 3. Perhatikan perubahan struktur direktori (`app/`, `server/`) yang berbeda dari Nuxt 3.
- `@nuxt/ui` v4 sudah mengintegrasikan Tailwind CSS v4 secara internal. Tidak perlu install `@nuxtjs/tailwindcss` secara terpisah.
- `@prisma/adapter-libsql` memungkinkan Prisma terhubung ke Turso lewat protokol LibSQL, bukan koneksi database konvensional.
- Better Auth dikonfigurasi di sisi server. Pastikan secret key dan konfigurasi session diset dengan benar sebelum deploy.
- Semua ekstensi TipTap diimpor secara individual - aktifkan hanya yang dibutuhkan untuk menjaga bundle size tetap kecil.