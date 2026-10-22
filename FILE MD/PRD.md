# 📋 PRD — Jejak Dewata (Landing Page KKL Bali 2026 Tim 9)

**Versi:** 1.1 | **Tipe:** Landing page statis **one-page** | **Backend:** tidak ada

## 1. Latar Belakang
KKL adalah tugas kelompok yang menuntut dokumentasi perjalanan. Laporan PDF kurang menarik dan sulit dibagikan. Satu halaman web ringan memudahkan dibuka lewat link/QR, dan sekaligus menjadi portofolio frontend.

## 2. Tujuan
| # | Tujuan | Indikator |
|---|---|---|
| G1 | Mendokumentasikan 5 hari perjalanan bus secara naratif & visual | Tiap hari punya foto, cerita, dan catatan |
| G2 | Menampilkan hal yang dipelajari dari kunjungan industri | Ada "Catatan Lapangan" per hari |
| G3 | Memperkenalkan 11 anggota + dosen | Denah kursi lengkap |
| G4 | Tampil unik dan profesional | Tidak terlihat seperti template; Lighthouse ≥ 90 |
| G5 | Nyaman di HP | Layout rapi mulai 360px |

## 3. Target Pengguna
- **Dosen pembimbing:** menilai kelengkapan & kualitas. Butuh alur jelas.
- **Teman sekelas:** nostalgia, buka lewat HP dari grup.
- **Keluarga/umum:** gambaran singkat KKL.

## 4. Scope

### ✅ In Scope (MVP)
1. **Hero "Papan Tujuan"**: LED ticker rute, judul besar, karcis trip, foto bingkai kaca depan
2. **Manifest**: ringkasan satu kalimat editorial (5 hari, 11 penumpang, 1 bus) + odometer
3. **Rute (timeline)**: 5 hari, **tiap hari komposisi berbeda**, rambu hari sticky di rel, bus tampak atas bergerak mengikuti scroll
4. **Patok KM** antar hari: jeda singkat tentang perjalanan di bus
5. **Catatan Lapangan** per hari (`<details>`, di halaman yang sama): deskripsi, hal yang dipelajari, momen favorit
6. **Galeri "Dari Balik Jendela"**: strip horizontal berbingkai jendela, filter per hari, lightbox
7. **Denah Kursi (tim)**: 11 anggota + dosen di kursi 1A
8. **Penutup & footer**: terima kasih, kredit

### 🔜 Nice to Have
- Video highlight singkat
- Kutipan kesan per anggota di tag kursi
- Efek suara klakson/mesin (default **mati**)
- Stylesheet cetak

### ❌ Out of Scope
Backend, database, login, komentar, router multi-halaman, CMS, dark/light toggle.

## 5. User Stories
| ID | Sebagai | Ingin | Agar | Prioritas |
|---|---|---|---|---|
| US1 | Dosen | paham isi web dari layar pertama | tidak bingung | P0 |
| US2 | Dosen | membaca catatan tiap hari | menilai kedalaman | P0 |
| US3 | Teman | melihat foto per hari | bernostalgia | P0 |
| US4 | Pengguna HP | menjelajah tanpa geser sisi | nyaman | P0 |
| US5 | Dosen | tahu siapa saja anggota | mengenal tim | P1 |
| US6 | Teman | bagikan link ke bagian tertentu (`#hari-3`) | langsung ke sana | P1 |
| US7 | Pengguna | animasi bisa dimatikan | aksesibilitas | P1 |

## 6. Functional Requirements
- **FR-01** Navigasi anchor: Rute · Galeri · Tim (menu minimal; di mobile tombol kecil).
- **FR-02** Konten hari & anggota dibaca dari `days.json` / `team.json`.
- **FR-03** Palet netral + satu aksen (`--marka`); hari dibedakan lewat komposisi dan nomor, bukan warna.
- **FR-04** Deep link `#hari-1` … `#hari-5`.
- **FR-05** Lightbox native `<dialog>`: Esc menutup, panah kiri/kanan navigasi, swipe di HP.
- **FR-06** Foto dioptimasi (WebP/AVIF) dan lazy-load kecuali hero.
- **FR-07** Hormati `prefers-reduced-motion`.
- **FR-08** Ticker LED berhenti saat reduced motion.

## 7. Non-Functional
| Aspek | Target |
|---|---|
| Performa | LCP < 2,5 dtk di 4G; JS < 60 KB gzip |
| Aksesibilitas | Kontras AA; alt semua foto; bisa dipakai keyboard |
| Responsif | 360px – 1440px+ |
| Browser | Chrome, Safari, Firefox, Edge terbaru |
| Berbagi | Meta OG untuk preview WhatsApp |

## 8. Alur Halaman (One-Page)
```
#hero → #manifest → #rute (hari-1…hari-5) → #galeri → #tim → #penutup
```

## 9. Risiko
| Risiko | Mitigasi |
|---|---|
| Foto kurang/terlambat | Kumpulkan lebih awal; pakai blok warna sementara |
| Animasi berat di HP | Hanya `transform/opacity/clip-path`; uji di HP asli |
| Tampilan terlalu ramai | Satu elemen mencolok per layar; patuhi aturan anti-slop di `DESIGN.md` |
| Rute/jam bus tidak akurat | Verifikasi dengan anggota/jadwal asli |

## 10. Timeline (saran, pengerjaan sendiri)
- **Minggu 1:** Kumpulkan foto & tulisan, setup Astro + token, hero + manifest
- **Minggu 2:** Rute 5 hari, galeri, denah kursi
- **Minggu 3:** Animasi, polishing, uji HP, deploy
