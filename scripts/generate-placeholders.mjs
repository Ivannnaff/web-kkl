import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('public/img');

const PAPER = '#E6E2DA';
const INK = '#1A1917';
const SOFT = '#5E5A53';
const MARKA = '#F5B800';

const dayPalettes = {
  1: ['#3A3733', '#5E5A53', '#8A8378'],
  2: ['#7A6A55', '#A89A80', '#C8BCA4'],
  3: ['#5C4A3A', '#8C7460', '#B8A08A'],
  4: ['#4A5A4A', '#7A8A72', '#AAB4A0'],
  5: ['#2A2825', '#43403A', '#6A665E'],
};

function svg(w, h, bg, label, sub, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="0" y="0" width="${w}" height="${Math.round(h * 0.12)}" fill="${INK}"/>
  <rect x="0" y="${h - Math.round(h * 0.05)}" width="${w}" height="${Math.round(h * 0.05)}" fill="${accent}" opacity="0.85"/>
  <text x="${Math.round(w * 0.05)}" y="${Math.round(h * 0.5)}" font-family="monospace" font-size="${Math.round(Math.min(w, h) * 0.075)}" fill="${PAPER}" letter-spacing="4">${label}</text>
  <text x="${Math.round(w * 0.05)}" y="${Math.round(h * 0.5) + Math.round(Math.min(w, h) * 0.09)}" font-family="monospace" font-size="${Math.round(Math.min(w, h) * 0.038)}" fill="${SOFT}" letter-spacing="2">${sub}</text>
</svg>`;
}

async function write(rel, buf) {
  const target = path.join(OUT, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(buf).webp({ quality: 78 }).toFile(target);
  console.log('wrote', rel);
}

const days = [
  {
    n: 1,
    files: [
      ['01-lini-produksi.webp', 1600, 900, 'LINI PRODUKSI OTOMATIS', 'PT VICTORIA CARE SEMARANG'],
      ['02-briefing-pabrik.webp', 1200, 1200, 'BRIEFING OPERASI', 'RUANG KENDALI PUSAT'],
      ['03-catatan-lini.webp', 900, 1200, 'CATATAN DI LAPANGAN', 'TIM 9 MENDOKUMENTASIKAN'],
    ],
  },
  {
    n: 2,
    files: [
      ['01-pura-beratan-pagi.webp', 1600, 900, 'PURA ULUN DANU BERATAN', 'BEDUGUL PAGI'],
      ['02-danau-beratan.webp', 1200, 1200, 'DANAU BERATAN', 'KABUT PAGI'],
      ['03-devdan-show.webp', 900, 1200, 'DEVDAN SHOW', 'BALI NUSA DUA THEATRE'],
    ],
  },
  {
    n: 3,
    files: [
      ['01-balai-diklat.webp', 1600, 900, 'BALAI DIKLAT INDUSTRI', 'DENPASAR SIANG'],
      ['02-pantai-kuta.webp', 1200, 1200, 'PANTAI KUTA', 'SENJA'],
      ['03-tari-kecak.webp', 900, 1200, 'TARI KECAK PANDAWA', 'SUNSET ULUWATU'],
    ],
  },
  {
    n: 4,
    files: [
      ['01-pasar-seni.webp', 1600, 900, 'PASAR SENI KERAJINAN', 'GIANYAR BALI'],
      ['02-kuliner-bali.webp', 1200, 1200, 'KULINER BALI', 'AYAM BETUTU'],
      ['03-kebersamaan.webp', 900, 1200, 'BESERTA TIM 9', 'SORE DI BALI'],
    ],
  },
  {
    n: 5,
    files: [
      ['01-bus-malam.webp', 1600, 900, 'BUS MALAM', 'GILIMANUK SELAT BALI'],
      ['02-trans-jawa.webp', 1200, 1200, 'JALAN TRANS JAWA', 'MENUJU SEMARANG'],
      ['03-oleh-oleh.webp', 900, 1200, 'OLEH OLEH KOPER', 'PULANG KE KOTA'],
    ],
  },
];

for (const day of days) {
  const pal = dayPalettes[day.n];
  for (let i = 0; i < day.files.length; i++) {
    const [file, w, h, label, sub] = day.files[i];
    await write(
      `day${day.n}/${file}`,
      Buffer.from(svg(w, h, pal[i % pal.length], label, sub, MARKA)),
    );
  }
}

const team = [
  ['mega-novita', 'MEGA NOVITA', 'DOSEN PEMBIMBING'],
  ['gizza', 'GIZZA', '5A 2A'],
  ['ivan', 'IVAN', '5A 2B'],
  ['zawa', 'ZAWA', '5D 3A'],
  ['khaizun', 'KHAIZUN', '5A 3B'],
  ['ditsa', 'DITSA', '5B 4A'],
  ['dipo', 'DIPO', '5B 4B'],
  ['rendi', 'RENDI', '5D 5A'],
  ['carendra', 'CARENDRA', '5D 5B'],
  ['aziz', 'AZIZ', '5E 6A'],
  ['heru', 'HERU', '5E 6B'],
  ['ikhsan', 'IKHSAN', '5E 7A'],
];

let i = 0;
for (const [slug, name, sub] of team) {
  const pal = dayPalettes[(i % 5) + 1];
  await write(
    `tim/${slug}.webp`,
    Buffer.from(svg(400, 400, pal[2], name, sub, MARKA)),
  );
  i++;
}

const ephemera = [
  ['tiket-bus', 'TIKET BUS', 'SEMARANG BALI'],
  ['struk-oleh-oleh', 'STRUK BELANJA', 'OLEH OLEH'],
  ['name-tag-kkl', 'NAME TAG', 'KKL 2025'],
  ['jadwal-bus', 'JADWAL', 'DITEMPEL DI BUS'],
];
for (const [slug, label, sub] of ephemera) {
  await write(`ephemera/${slug}.webp`, Buffer.from(svg(900, 600, '#D8D2C6', label, sub, MARKA)));
}

await write('hero/bus-kaca-depan.webp', Buffer.from(svg(1200, 1500, '#1C1B19', 'KACA DEPAN BUS', 'TIM 9 SEMARANG BALI', MARKA)));
await write('hero/grup-bus.webp', Buffer.from(svg(1200, 800, '#2A2825', 'SEBELUM BERANGKAT', '11 PENUMPANG 1 DOSEN', MARKA)));
await write('hero/terminal.png', Buffer.from(svg(1200, 630, '#1C1B19', 'TURUN DI SEMARANG', 'HATI MASIH DI BALI', MARKA)));

console.log('done all placeholders');
