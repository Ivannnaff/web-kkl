# 🚌 Jejak Dewata — Website KKL Bali 2026 (Tim 9)

> **Tagline:** *"Lima hari, satu bus, sebelas penumpang."*

Paket perencanaan untuk **landing page statis one-page** (tanpa backend, tanpa router) dokumentasi KKL Tim 9 Informatika. Dosen Pembimbing: **Mega Novita, Ph.D**.

## 📁 Dokumen
| File | Isi |
|---|---|
| `README.md` | Konsep & indeks |
| `PRD.md` | Tujuan, fitur, scope, user story |
| `DESIGN.md` | Design system, tata letak per bagian, motion |
| `CONTENT.md` | Copywriting, skema data JSON, panduan foto |
| `TECH_SPEC.md` | Stack (Astro + Tailwind), animasi (GSAP), struktur, deploy |

## 💡 Konsep: "Papan Trayek"
Perjalanan dilakukan **naik bus**, jadi halaman ini adalah perjalanan di atas aspal. Bahasa visualnya diambil dari benda nyata yang akrab:

- **Papan tujuan LED** → hero dan ticker rute
- **Karcis bus** → info trip
- **Rambu jalan** (bentuk & tipografi, monokrom) → penanda tiap hari
- **Marka kuning & patok KM** → rel perjalanan dan jeda antar hari
- **Kaca jendela** → bingkai galeri "Dari Balik Jendela"
- **Denah kursi** → tampilan anggota tim (dosen di kursi 1A)

## 🎨 Warna
**Netral + satu aksen.** Putih tulang, tinta, aspal, dan satu kuning marka jalan. Warna LED oranye hanya di papan LED. Foto yang memberi warna; hari dibedakan lewat komposisi, bukan warna.

## 🧭 Struktur One-Page
```
Hero (papan LED + karcis)
 → Manifest (ringkasan satu kalimat editorial)
 → Rute (5 hari, tiap hari komposisi berbeda)
 → Dari Balik Jendela (galeri)
 → Denah Kursi (tim)
 → Turun di Terminal (penutup)
```

## ✨ Pembeda dari web "template AI"
1. Layout asimetris dan bertumpuk, bukan semua rata tengah
2. **Lima hari = lima komposisi berbeda**, bukan satu kartu diulang
3. Sedikit animasi tapi bermakna: ticker LED, bus di rel yang mengikuti scroll, rambu "dipasang", foto terbuka seperti tirai, odometer
4. Detail buatan manusia: tiket asli, struk oleh-oleh, coretan tangan, stiker
5. Copy spesifik dari kejadian nyata

## ⚠️ Perlu Dicek Tim
- **Tahun:** judul menulis 2026, tanggal timeline 2025 (18–22 Agustus). Dokumen memakai tanggal apa adanya.
- **Rute bus:** timeline tidak menyebut rute. Ticker di hero memakai contoh `Semarang · Surabaya · Ketapang · Gilimanuk · Bali`. **Sesuaikan dengan rute asli** (termasuk penyeberangan, kota transit, waktu berangkat malam).
- **Hari 1 → 2:** Day 1 di Semarang, Day 2 sudah di Bedugul (Ulun Danu Beratan), jadi kemungkinan ada **perjalanan malam di bus**. Bagian ini cocok dijadikan "jeda patok KM" di antara hari 1 dan 2.
- **Hari 4** datanya paling tipis: siapkan foto dan cerita dari anggota.
