# 🛠️ TECH_SPEC.md — Spesifikasi Teknis (Landing Page Statis)

**Tanpa backend, tanpa database, tanpa router.** Satu halaman statis; hasil build berupa HTML/CSS/JS/gambar yang di-hosting gratis.

## 1. Pilihan Stack

| Opsi | Cocok jika | Catatan |
|---|---|---|
| **Astro + Tailwind ⭐ (rekomendasi)** | Halaman dominan konten & foto, ingin ringan | HTML statis, JS minimal, optimasi gambar otomatis (`astro:assets`) |
| React + Vite + Tailwind | Sudah nyaman dengan React / ingin banyak state interaktif | Perlu kerja ekstra untuk optimasi gambar; bundle lebih besar |

**Kenapa Astro untuk web ini:** hampir semua bagian (hero, timeline, galeri, tim) adalah konten statis. Interaktivitas yang dibutuhkan kecil: ticker, animasi scroll, `<details>` untuk catatan hari, `<dialog>` untuk lightbox, tooltip kursi. Semuanya bisa dengan HTML native + sedikit JS, jadi tidak perlu framework di sisi klien.

## 2. Rekomendasi Animasi

**Pilihan utama: GSAP + ScrollTrigger** (+ CSS untuk efek kecil).

| Kebutuhan | Alat | Alasan |
|---|---|---|
| Bus bergerak mengikuti scroll (rel) | GSAP ScrollTrigger (`scrub`) | Kontrol progres scroll paling andal lintas browser |
| Rambu "dipasang", foto tirai (`clip-path`) | GSAP / ScrollTrigger `toggleActions` | Sinkron dengan scroll, mudah di-batch |
| Rambu sticky di rel | CSS `position: sticky` | Tanpa JS |
| LED ticker | CSS `@keyframes` + `translateX` | Ringan, tanpa JS |
| Odometer angka | GSAP tween angka | Singkat |
| Hover tombol/kursi | CSS `transition` | Cukup |

Kenapa tidak yang lain: **Framer Motion** berguna kalau pakai React, tapi untuk efek scrub terikat scroll kurang nyaman. **CSS scroll-driven animations** (`animation-timeline`) sudah bagus, tetapi dukungan antar-browser belum sepenuhnya merata, jadi cek caniuse sebelum jadi satu-satunya andalan. **Lenis** (smooth scroll) boleh ditambah belakangan, tetapi bukan keharusan dan bisa terasa berat di HP.

Pakai `gsap.matchMedia()` agar animasi hanya aktif jika `prefers-reduced-motion: no-preference`:

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Bus di rel mengikuti progres scroll bagian #rute
  gsap.to("#bus", {
    y: () => document.querySelector("#rail").offsetHeight - 56,
    ease: "none",
    scrollTrigger: { trigger: "#rute", start: "top top", end: "bottom bottom", scrub: true },
  });

  // Rambu dipasang saat masuk viewport
  gsap.utils.toArray(".rambu").forEach((el) =>
    gsap.from(el, { yPercent: -120, rotate: -4, duration: .7, ease: "back.out(1.6)",
      scrollTrigger: { trigger: el, start: "top 80%", once: true } })
  );

  // Foto terbuka seperti tirai
  gsap.utils.toArray(".reveal-tirai").forEach((el) =>
    gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: .9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true } })
  );
});
```

## 3. Setup Cepat (Astro)
```bash
npm create astro@latest kkl-bali   # pilih: Empty, TypeScript opsional
cd kkl-bali
npx astro add tailwind
npm i gsap
npm i @fontsource-variable/archivo @fontsource-variable/instrument-sans \
      @fontsource/doto @fontsource/dm-mono @fontsource/caveat
```
Font di-*self-host* lewat Fontsource, jadi tidak ada request ke Google Fonts dan lebih cepat.

## 4. Design Token (Tailwind v4, di `src/styles/global.css`)
```css
@import "tailwindcss";

@theme {
  --color-kertas: #F2EFE9;
  --color-kertas-2: #E6E2DA;
  --color-garis: #CFCAC0;
  --color-tinta: #1A1917;
  --color-tinta-soft: #5E5A53;
  --color-aspal: #1C1B19;
  --color-aspal-2: #2A2825;
  --color-marka: #F5B800;   /* satu-satunya aksen */
  --color-led: #FF9F1C;     /* hanya di komponen LED */

  --font-display: "Archivo Variable", sans-serif;
  --font-body: "Instrument Sans Variable", system-ui, sans-serif;
  --font-led: "Doto", monospace;
  --font-mono: "DM Mono", ui-monospace, monospace;
  --font-hand: "Caveat", cursive;
}
```
Nilai persisnya mengikuti `DESIGN.md`. Jika versi Tailwind di proyekmu berbeda, pindahkan token ke `tailwind.config`.

## 5. Struktur Folder
```
kkl-bali/
├── public/
│   ├── og-image.jpg
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── hari1/ … hari5/        # foto (diproses astro:assets → WebP/AVIF)
│   │   ├── tim/
│   │   └── ephemera/              # tiket, struk, stiker
│   ├── data/
│   │   ├── days.json
│   │   └── team.json
│   ├── components/
│   │   ├── LedSign.astro
│   │   ├── Karcis.astro
│   │   ├── Rambu.astro
│   │   ├── PatokKm.astro
│   │   ├── DayHari1.astro … DayHari5.astro   # komposisi berbeda tiap hari
│   │   ├── WindowFrame.astro
│   │   ├── Gallery.astro
│   │   ├── SeatMap.astro
│   │   └── Footer.astro
│   ├── scripts/
│   │   ├── animations.ts          # GSAP
│   │   └── lightbox.ts            # <dialog>
│   ├── styles/global.css
│   └── pages/index.astro          # satu-satunya halaman
├── astro.config.mjs
└── package.json
```
Karena tiap hari punya komposisi sendiri, jangan paksa satu komponen generik. Boleh memakai `Rambu` dan `PatokKm` bersama, tetapi layout tiap hari ditulis terpisah.

## 6. Performa
- Gambar lewat `<Image />` / `<Picture />` Astro (format modern, ukuran responsif, `width/height` otomatis).
- Hero: gambar utama `loading="eager"` + `fetchpriority="high"`; sisanya `lazy`.
- Total JS target < 60 KB gzip (GSAP + ScrollTrigger ± 45 KB; impor hanya plugin yang dipakai).
- Pindahkan inisialisasi animasi ke `requestIdleCallback` bila perlu.
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- Hindari video autoplay berat; jika ada, pakai poster + `preload="none"`.

## 7. Interaksi Native (tanpa library)
- **Catatan hari:** `<details><summary>Catatan Lapangan</summary>…</details>`
- **Lightbox:** `<dialog>` + `showModal()`; Esc menutup otomatis, fokus dikelola browser.
- **Kursi tim:** tombol `<button>` dengan `aria-describedby` ke tag nama (muncul saat hover/fokus/tap).
- **Navigasi:** anchor `#rute`, `#galeri`, `#tim` + `html { scroll-behavior: smooth }` (nonaktif pada reduced motion).

## 8. SEO & Berbagi
```html
<title>Jejak Dewata — KKL Bali 2026 Tim 9</title>
<meta name="description" content="Catatan perjalanan bus Tim 9 Informatika ke Bali, 18–22 Agustus 2025.">
<meta property="og:title" content="Jejak Dewata — KKL Bali 2026">
<meta property="og:description" content="Lima hari, satu bus, sebelas penumpang.">
<meta property="og:image" content="/og-image.jpg">
<meta name="theme-color" content="#F2EFE9">
```
Buat OG image 1200×630 (papan LED + judul) agar preview link di WhatsApp menarik.

## 9. Deploy (statis)
Pilih salah satu: **Vercel**, **Netlify**, **Cloudflare Pages**, atau **GitHub Pages**. Build: `npm run build`, output: `dist/`. Tidak perlu server. Tambahkan `site` di `astro.config.mjs` jika memakai GitHub Pages (plus `base` bila di subpath).

## 10. Checklist Sebelum Rilis
- [ ] Uji di HP Android/iOS asli (animasi mulus, ticker tidak patah)
- [ ] Hero terbaca penuh di 360px
- [ ] Semua foto ber-`alt`; ukuran file wajar
- [ ] `prefers-reduced-motion` diuji (aktifkan di OS/DevTools)
- [ ] Tidak ada error di console
- [ ] Lighthouse sesuai target
- [ ] Preview link WhatsApp tampil benar
- [ ] Ejaan nama 11 anggota & dosen benar
- [ ] Rute/jarak/jam perjalanan sudah sesuai kenyataan
