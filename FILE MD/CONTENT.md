# ✍️ CONTENT.md — Struktur & Copywriting

## 1. Prinsip Penulisan
- **Bahasa:** Indonesia santai-sopan (bukan terlalu formal, bukan slang berat).
- **Sudut pandang:** "kami" (Tim 9).
- **Panjang:** deskripsi hari 2–3 kalimat; detail hari maks ±150 kata.
- **Nada:** hangat, jujur, ada detail indrawi (bau, suara, suhu), bukan sekadar daftar kegiatan.
- Setiap hari wajib punya **satu hal yang dipelajari** (relevan dengan Informatika).

## 2. Copy Per Bagian

### Hero
- Eyebrow: `KKL BALI 2026 · TIM 9 · INFORMATIKA`
- Judul: **Jejak Dewata**
- Subjudul: *Lima hari, satu bus, sebelas penumpang. Catatan perjalanan kami dari Semarang ke Pulau Dewata.*
- Ticker LED (contoh, sesuaikan rute asli): `SEMARANG ● SURABAYA ● KETAPANG ● GILIMANUK ● BALI`
- Karcis: `TIM 9 · 18–22 AGU 2025 · 11 PENUMPANG · DOSPEM: MEGA NOVITA, Ph.D`
- CTA: `Naik Bus ↓`

### Manifest (satu kalimat editorial)
> **Lima** hari. **Sebelas** penumpang. **Satu** bus. Dan satu dosen yang duduk paling depan.

Odometer: `TOTAL JARAK ___ KM · ___ JAM DI JALAN` (isi sesuai data asli).

### Patok KM antar hari (jeda singkat, isi sendiri)
- Hari 1 → 2: `MALAM DI JALAN · ___` (contoh: lagu yang diputar, siapa yang tidur duluan)
- Hari 2 → 3, 3 → 4: satu baris kejadian lucu atau jajanan
- Hari 4 → 5: `KM 0 SEMARANG DALAM ___ JAM`

### Penutup
- Judul: **Turun di Semarang. Hati masih di Bali.** (contoh, tulis versi tim sendiri)
- Isi: *Kami pulang membawa lebih dari oleh-oleh: ilmu dari industri, pelajaran dari budaya, dan kenangan dari sesama teman seperjuangan. Terima kasih kepada Ibu Mega Novita, Ph.D, atas bimbingannya, serta semua pihak yang membuat perjalanan ini mungkin.*

## 3. Data Hari (sumber: timeline Tim 9)

| Hari | Tanggal | Judul | Kategori | Latar |
|---|---|---|---|---|
| 1 | 18 Agu 2025 | Kunjungan Industri PT. Victoria Care Indonesia | Industrial | kertas |
| 2 | 19 Agu 2025 | Ulun Danu Beratan & Devdan Show | Culture & Art | kertas + aspal (pagi/malam) |
| 3 | 20 Agu 2025 | Balai Diklat Industri Bali, Pantai Kuta & Tari Kecak Pandawa | Education & Show | gradasi kertas → aspal |
| 4 | 21 Agu 2025 | Eksplorasi Bebas di Bali Journey | Exploration | kertas-2 |
| 5 | 22 Agu 2025 | Kepulangan ke Semarang | Return | aspal |

Deskripsi & quote lengkap diambil dari `TIMELINE_PERJALANAN.md`.

## 4. Template "Detail Hari" (diisi tim)
Setiap hari diisi dengan format berikut:

```
Jam & Lokasi   : (mis. 08.00 – PT. Victoria Care, Semarang)
Cerita singkat : 2–3 paragraf pendek, pengalaman pribadi
Yang kami pelajari :
  - Poin 1 (relevan Informatika: otomasi, sistem informasi, QC, dst.)
  - Poin 2
Momen favorit  : 1 kalimat dari 1 anggota (sebut nama)
Foto           : minimal 4, maksimal 8
```

### Prompt Pemantik Cerita
- **Hari 1:** Teknologi/sistem apa yang kamu lihat di lini produksi? Bagaimana data dipakai di quality control? Apa yang terhubung dengan ilmu Informatika?
- **Hari 2:** Suasana pagi di Beratan? Bagian paling berkesan dari Devdan (teknologi panggung, multimedia)?
- **Hari 3:** Apa yang dipelajari di Balai Diklat? Bagaimana rasanya menonton Kecak saat matahari terbenam?
- **Hari 4:** Ke mana saja kelompok pergi? Makanan apa yang dicoba? Kejadian lucu apa?
- **Hari 5:** Oleh-oleh apa yang dibeli? Obrolan apa di bus? Kesan perjalanan?

## 5. Skema Data JSON (`src/data/days.json`)
```json
[
  {
    "id": "hari-1",
    "day": 1,
    "date": "2025-08-18",
    "title": "Kunjungan Industri PT. Victoria Care Indonesia",
    "location": "Semarang",
    "category": "Industrial",
    "colorToken": "d1",
    "description": "Studi lapangan dan pembelajaran langsung mengenai proses produksi, quality control, dan manajemen operasional.",
    "quote": "Standar operasional berstandar internasional yang menginspirasi mahasiswa Informatika.",
    "learnings": ["...", "..."],
    "favoriteMoment": { "by": "Gizza", "text": "..." },
    "photos": [
      { "src": "/img/day1/01.webp", "alt": "...", "caption": "..." }
    ]
  }
]
```

## 6. Skema Data Anggota (`src/data/team.json`)
```json
[
  {
    "nickname": "Gizza",
    "fullName": "Gizza Hanna Farhataini Hapsari",
    "class": "5A",
    "seat": "2A",
    "photo": "/img/team/gizza.webp",
    "role": "Mahasiswa Informatika (opsional)",
    "quote": "Satu kalimat kesan KKL (opsional)",
    "instagram": "@username (opsional)"
  }
]
```

### Daftar Anggota (dari timeline)
| # | Nama Lengkap | Panggilan | Kelas |
|---|---|---|---|
| 1 | Gizza Hanna Farhataini Hapsari | Gizza | 5A |
| 2 | Adinda Zahwa Aprilia | Zawa | 5D |
| 3 | Ivan Akbar Alfahrezi | Ivan | 5A |
| 4 | Achmad Khaizun Ni'am | Khaizun | 5A |
| 5 | Ditsa Ardiva Prananda Putra | Ditsa | 5B |
| 6 | Dipo Trista Elmunbaits | Dipo | 5B |
| 7 | Rendi Dwiki Hermawan | Rendi | 5D |
| 8 | Carendra Aldiansyah | Carendra | 5D |
| 9 | Aziz Wijayanto | Aziz | 5E |
| 10 | Heru Pamungkas Prasetyo Bayuaji | Heru | 5E |
| 11 | Ikhsan Gusti Hermawan | Ikhsan | 5E |

**Dosen Pembimbing:** Mega Novita, Ph.D (kursi **1A**). Susunan kursi anggota bebas, sebaiknya sesuai duduk aslinya di bus.

## 7. Panduan Foto & Penamaan File
- Format: **WebP**, sisi terpanjang maks **1600px**, ukuran ≤ **300 KB**.
- Penamaan: `day{N}/{nomor-2-digit}-{deskripsi-singkat}.webp`, contoh `day2/03-pura-beratan-pagi.webp`.
- Foto orang: pastikan semua yang tampil setuju. Hindari foto yang memalukan.
- Rasio foto bebas (panorama 21:9, potret 3:4, kotak 1:1) sesuai komposisi hari di `DESIGN.md`.
- Kumpulkan juga **ephemera**: foto tiket, struk oleh-oleh, name tag, jadwal di bus, stiker.
- Siapkan **OG image** 1200×630 untuk preview link WhatsApp.
