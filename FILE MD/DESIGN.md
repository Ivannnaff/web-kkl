# 🎨 DESIGN.md — Jejak Dewata (versi Bus)

## 1. Konsep Visual: "Papan Trayek"
Perjalanan ini naik **bus**, jadi seluruh halaman adalah **perjalanan di atas aspal**. Bahasa visualnya diambil dari hal nyata yang akrab bagi orang Indonesia:

| Elemen nyata | Dipakai sebagai |
|---|---|
| Papan tujuan LED bus (dot-matrix oranye) | Judul hero, ticker rute |
| Karcis / tiket bus | Info trip, label per bagian |
| Rambu jalan (bentuk, garis dalam, & tipografinya; **tanpa warna rambu**) | Penanda tiap hari |
| Marka jalan kuning putus-putus | Garis rute & pembatas seksi |
| Patok KM | Penanda jarak antar hari |
| Kaca jendela bus | Bingkai galeri |
| Denah kursi bus | Tampilan anggota tim |

Rasa yang dituju: **jujur, sedikit kasar-hangat seperti cetakan karcis**, bukan mulus ala template startup.

## 2. Aturan Anti "AI Slop" (wajib)
Hindari semua ini:
- ❌ Gradien ungu/biru, glassmorphism, glow, banyak warna aksen yang bersaing
- ❌ Semua serba tengah (centered) & hero "judul + subjudul + 2 tombol"
- ❌ Grid 3 kartu identik dengan `rounded-2xl` + shadow lembut
- ❌ Timeline zig-zag kiri-kanan simetris
- ❌ Emoji sebagai ikon, ikon Lucide di dalam lingkaran pastel
- ❌ Copy generik ("Explore the beauty of…", "Unforgettable memories")
- ❌ Font Inter/Poppins/Plus Jakarta + serif "elegan" yang sudah banyak dipakai

Lakukan ini:
- ✅ **Tata letak asimetris**: elemen sengaja menabrak margin, teks dan foto saling tumpuk
- ✅ **Tiap hari punya komposisi sendiri** (bukan satu template diulang 5×)
- ✅ Sudut tegas, border 2px tinta, **tanpa shadow lembut** (kalau perlu, bayangan keras offset)
- ✅ Detail "buatan manusia": coretan tulisan tangan, rotasi tidak rata, stiker, selotip, struk oleh-oleh
- ✅ Copy spesifik dan jujur, pakai nama anggota & kejadian nyata
- ✅ Satu elemen mencolok per layar, sisanya tenang
- ✅ **Palet netral + satu aksen kuning**; foto yang memberi warna (lihat §3)

## 3. Warna — Netral + Satu Aksen
Prinsip: **halaman netral, foto yang memberi warna.** Foto Bali (laut, pura, api Kecak, langit senja) sudah penuh warna; kalau UI ikut berwarna, keduanya berebut perhatian.

### Palet (hanya ini)
| Token | Hex | Peran | Porsi |
|---|---|---|---|
| `--kertas` | `#F2EFE9` | Latar utama (putih tulang netral) | ~60% |
| `--kertas-2` | `#E6E2DA` | Blok selang-seling, karcis | |
| `--garis` | `#CFCAC0` | Garis halus, pemisah | |
| `--tinta` | `#1A1917` | Teks utama & border 2px | ~30% |
| `--tinta-soft` | `#5E5A53` | Teks sekunder | |
| `--aspal` | `#1C1B19` | Latar gelap (hero, hari 5) | |
| `--aspal-2` | `#2A2825` | Permukaan di atas aspal | |
| `--marka` | `#F5B800` | **Satu-satunya aksen**: kuning marka jalan | ≤ 5% |
| `--led` | `#FF9F1C` | Oranye LED, **hanya di dalam komponen LED** (ticker hero, angka odometer) | kecil |

### Aturan pemakaian warna
- **Tidak ada warna per hari.** Hari dibedakan lewat **komposisi, nomor besar, dan terang/gelapnya latar**, bukan lewat warna.
- `--marka` dipakai hemat: garis rel, bus di rel, garis bawah judul, state hover/fokus, satu pita atau stiker kecil. Jangan jadi latar blok besar.
- `--marka` **bukan warna teks** di atas `--kertas` (kontras rendah). Teks di atas blok marka selalu `--tinta`.
- `--led` tidak keluar dari komponen LED.
- Variasi suasana didapat dari **tingkat terang**: kertas → kertas-2 → aspal-2 → aspal.
- Foto diberi satu preset grading seragam; warna terkuat di halaman = foto.

### Rambu hari (monokrom)
Semua rambu hari sama: blok `--tinta`, teks `--kertas`, garis dalam tipis `--kertas`. Pada bagian gelap (hari 5) dibalik: blok `--kertas`, teks `--tinta`. Bentuk rambu (persegi panjang, garis dalam, tipografi tegas) cukup untuk membawa nuansa jalan raya tanpa warna rambu asli.

## 4. Tipografi
| Peran | Font | Catatan |
|---|---|---|
| Display | **Archivo** (variabel, sumbu *width* dikondensasi/diperlebar) | Tebal, seperti tulisan di bodi bus & rambu. Pakai `font-stretch` untuk variasi |
| LED | **Doto** (dot-matrix) atau `DotGothic16` | Hanya untuk papan LED & angka KM |
| Body | **Instrument Sans** | Rapi, terbaca di HP |
| Catatan tangan | **Caveat** | Maks 1–2 baris per bagian, rotasi -2° s/d 3° |
| Label | **DM Mono** | Karcis, tanggal, nomor kursi |

Skala: Display `clamp(3.5rem, 13vw, 11rem)` (boleh terpotong tepi layar), H2 `clamp(2rem,5vw,3.5rem)`, body `1rem/1.65`, label `0.75rem` uppercase tracking `.1em`.

## 5. Grid & Spasi
- Dasar 12 kolom, tapi **konten sengaja ditempatkan tidak rata**: mulai dari kolom 2, 3, atau 5; foto boleh `-mx` keluar container.
- **Rel kiri (desktop):** kolom sempit 72px dengan marka kuning vertikal + bus tampak atas yang bergerak turun (lihat §7).
- Spasi: 4, 8, 12, 16, 24, 40, 64, 96, 160px. Jarak antar bagian besar (≥ 128px) supaya ritmenya lega.
- Radius: kecil (`4px`) untuk karcis & foto; rambu pakai `10px` + garis dalam putih; jendela pakai radius atas besar.
- Tekstur: noise kertas 4%. Foto diberi border tipis krem seperti hasil cetak.

## 6. Tata Letak Per Bagian

### 6.1 Hero — Papan Tujuan
Latar `--aspal`, penuh 1 layar.
```
┌──────────────────────────────────────────────────────┐
│ ▓ SEMARANG ● SURABAYA ● KETAPANG ● GILIMANUK ● BALI ▓ │ ← LED ticker (oranye, jalan)
│                                                      │
│ JEJAK                    ┌────────────────┐          │
│  DEWATA  ←(sangat besar, │  foto bus/grup │ ←(bingkai│
│  terpotong tepi)         │  dalam bingkai │  kaca    │
│                          │  kaca depan    │  depan)  │
│  ┌ karcis (miring -3°) ┐ └────────────────┘          │
│  │ TIM 9 · 18–22 AGU   │                             │
│  │ 11 PENUMPANG · KURSI│  [Naik Bus ↓]               │
│  └─ - - - - - - - - - ┘                              │
│ - - - - - - - - marka kuning putus-putus - - - - - - │
└──────────────────────────────────────────────────────┘
```
Judul menimpa tepi foto; karcis dengan garis sobekan (perforasi) menumpuk di antara teks dan foto. Tombol berbentuk **tombol "stop" bus** (bulat kuning, label STOP kecil) hanya bila cocok; kalau tidak cukup panah teks biasa.

### 6.2 Manifest (ringkasan)
Bukan kartu statistik. Satu kalimat besar editorial dengan angka disisipkan di dalam teks:
> **Lima** hari. **Sebelas** penumpang. **Satu** bus. Dan satu dosen yang duduk paling depan.

Angka memakai font LED oranye di atas blok tinta. Di bawahnya, odometer kecil: `TOTAL JARAK ____ KM` (isi sendiri).

### 6.3 Perjalanan — "Rute" (inti)
Rel marka kuning di kiri; **tanda hari berbentuk rambu jalan** bersifat *sticky* di rel selama bagian hari itu berlangsung. Setiap hari **berbeda komposisinya**:

| Hari | Komposisi | Ide |
|---|---|---|
| 1 Industri | **Teks di depan**: kutipan besar memenuhi lebar, tiga foto kecil ditumpuk seperti ditempel selotip | Nuansa dokumen / lembar kerja |
| 2 Pura & Devdan | **Dua babak vertikal "PAGI / MALAM"**: kiri terang (`--kertas`, Beratan), kanan gelap (`--aspal`, Devdan). Foto panorama keluar dari tepi kanan | Kontras siang-malam |
| 3 Balai Diklat, Kuta, Kecak | **Tiga potongan tinggi tak sama**: SIANG → SORE → SENJA, latar bergradasi netral `--kertas` → abu → `--aspal` mengikuti matahari turun; kesan hangat datang dari foto, bukan UI | Matahari bergerak |
| 4 Bebas | **Kolase longgar**: foto berserakan, coretan Caveat, stiker; latar `--kertas-2`, hanya satu pita/stiker `--marka` | Paling santai & berantakan sengaja |
| 5 Pulang | **Gelap, hening**: latar aspal, teks LED oranye, foto kecil, hitung mundur "SEMARANG 0 KM" | Perjalanan malam di bus |

**Patok KM antar hari** (jeda tipis 1 baris): `KM 0 · BERANGKAT` … `± 12 JAM DI JALAN`. Isi dengan fakta kecil nyata dari perjalanan di bus (lagu yang diputar, jajanan, siapa yang tidur duluan).

Setiap hari memuat: tanda rambu (nomor + tanggal), judul, deskripsi, chip kategori, kutipan, dan **"Catatan Lapangan"** yang bisa dibuka (`<details>`, tanpa modal) berisi "yang kami pelajari".

### 6.4 Galeri — "Dari Balik Jendela"
Strip horizontal *scroll-snap*; tiap foto dibingkai **jendela bus** (karet hitam tebal, sudut atas membulat, sedikit pantulan). Filter berupa chip nama pemberhentian. Klik foto → lightbox `<dialog>`.

### 6.5 Tim — "Denah Kursi"
Denah bus tampak atas, susunan 2-2:
```
 [SOPIR]            [PINTU]
 1A DOSEN  ·  1B
 2A Gizza  ·  2B Ivan     ...
```
- **Kursi 1A:** Mega Novita, Ph.D (lencana emas "Dosen Pembimbing").
- 11 anggota duduk di kursi lain; arahkan kursor/ketuk kursi → muncul **tag nama** (panggilan besar, nama lengkap, kelas) dan foto kecil.
- Mobile: denah diputar jadi vertikal ringkas, atau daftar kursi bergulir.
Susunan duduk bebas ditentukan sendiri (boleh sesuai duduk asli!).

### 6.6 Penutup — "Turun di Terminal"
Latar karcis-2, satu kalimat besar: **"Turun di Semarang. Hati masih di Bali."** (contoh; tulis versi tim sendiri). Disusul ucapan terima kasih untuk dosen dan footer kecil: kampus, tahun, "dibuat oleh Tim 9".

## 7. Komponen & Detail

| Komponen | Spesifikasi |
|---|---|
| **LED sign** | Latar `#0A0A09`, teks `--led` Doto, `text-shadow: 0 0 6px rgba(255,159,28,.6)` (satu-satunya "glow" yang boleh), marquee `linear` |
| **Karcis** | Latar `--karcis`, border 2px tinta, takik setengah lingkaran di dua sisi, garis perforasi `dashed`, label DM Mono, rotasi -3° |
| **Rambu hari** | Persegi panjang `10px`, blok `--tinta`, garis dalam `--kertas` 2px, angka hari Archivo ekstra tebal, tanggal DM Mono |
| **Patok KM** | Tiang ramping `--kertas-2` dengan kepala `--tinta`, angka kecil |
| **Bus tampak atas** | SVG siluet sederhana 24×56px bergerak di rel kiri sebagai indikator progres scroll |
| **Bingkai jendela** | Border 14px `#111`, radius atas `28px`, highlight diagonal 6% putih |
| **Kursi** | Persegi membulat dengan sandaran, nomor mono, semua netral; kelas hanya label teks |
| **Tombol** | Kotak tegas, border 2px tinta, hover: isi berubah jadi `--marka` + geser 2px (bayangan keras `4px 4px 0 tinta`) |
| **Fokus keyboard** | Outline 3px `--marka` offset 3px |

## 8. Motion (maksimal 5 momen utama)
| # | Momen | Efek |
|---|---|---|
| 1 | **LED ticker** | Teks rute berjalan terus, kecepatan konstan |
| 2 | **Bus di rel** | Bus tampak atas turun mengikuti progres scroll, sekaligus penunjuk hari aktif |
| 3 | **Rambu dipasang** | Tanda hari "dipasang" dari atas (translateY + sedikit goyang) saat masuk layar |
| 4 | **Foto tirai** | Foto terbuka dengan `clip-path` seperti tirai jendela bus digeser |
| 5 | **Odometer** | Angka KM / jam berputar naik saat pertama terlihat |

Pendukung kecil: hover kursi, hover tombol. Semua animasi hanya memakai `transform`, `opacity`, `clip-path`. Dengan `prefers-reduced-motion`: ticker diam (statis), bus langsung di posisi sesuai scroll tanpa easing, reveal diganti tampil langsung.

## 9. Foto & Aset
- Satu preset warna untuk semua foto (hangat, kontras sedang, sedikit grain).
- Rasio bebas per komposisi (panorama 21:9, potret 3:4, kotak 1:1): variasi itu yang membuat tata letak hidup.
- Aset "ephemera" yang sangat disarankan: foto **tiket asli, struk oleh-oleh, name tag KKL, jadwal yang ditempel di bus, stiker**. Pindai/foto lalu pakai sebagai dekorasi.
- Alt text deskriptif untuk semua foto.

## 10. Responsif
| Lebar | Perilaku |
|---|---|
| < 640px | Satu kolom; rel jadi garis tipis di tepi kiri; hero menumpuk (LED → judul → foto → karcis); denah kursi vertikal |
| 640–1023px | Komposisi hari disederhanakan jadi dua kolom |
| ≥ 1024px | Komposisi penuh, rel kiri, tumpang tindih aktif |

Target sentuh ≥ 44px. Judul display boleh terpotong tepi di desktop, tetapi di mobile pastikan terbaca penuh.

## 11. Aksesibilitas
- [ ] Kontras ≥ 4.5:1 (khusus teks LED oranye di aspal: cek)
- [ ] Alt text semua foto; dekoratif `alt=""`
- [ ] Heading berurutan; satu `h1`
- [ ] `<details>` & `<dialog>` native (fokus otomatis benar)
- [ ] Ticker punya tombol jeda atau berhenti pada `prefers-reduced-motion`
- [ ] Info tidak hanya lewat warna (nomor hari tetap tertulis)
