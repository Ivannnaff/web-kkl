import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const UA = 'KKL-EduSite/1.0 (https://github.com/Ivannnaff/web-kkl; student project)';
const API = 'https://commons.wikimedia.org/w/api.php';

/** Daftar pilihan: [file target, judul file Commons] */
const picks = [
  ['day1/01.webp', '001 Car factory assembly line - Opel factory in Gliwice, Poland.jpg'],
  ['day1/02.webp', 'Factory Automation Robotics Palettizing Bread.jpg'],
  ['day1/03.webp', 'Chylice. Cegielnia w Chylicach. Wnętrze budynku cegielni. Widoczne maszyny (367-47).jpg'],
  ['day2/01.webp', 'Ulun Danu Beratan, Bali (1).jpg'],
  ['day2/02.webp', 'Pura Ulun Danu Beratan.jpg'],
  ['day2/03.webp', 'Ubud, Balinese dance, Bali, Indonesia.jpg'],
  ['day3/01.webp', 'De La Salle University – Dasmariñas (DLSU–D) Information and Communications Technology Center (ICTC) laboratory room 203 (ICT203) — normal view.jpg'],
  ['day3/02.webp', 'Sunset, Kuta, Bali, Indonesia, 20220825 1752 0877.jpg'],
  ['day3/03.webp', 'Kecak fire dance at sunset.jpg'],
  ['day4/01.webp', 'Pulang - Pasar Ubud Bali.jpg'],
  ['day4/02.webp', 'Nasi campur as art, Ubud, Indonesia.jpg'],
  ['day4/03.webp', 'Ubud Palace (16437913673).jpg'],
  ['day5/01.webp', 'Bali-Strait Indonesia KMP-Gilimanuk-01.jpg'],
  ['day5/02.webp', 'Mandara Toll Road, Kabupaten Badung, Bali, Indonesia - panoramio.jpg'],
];

const credits = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const applyFilter = (sh) =>
  sh
    .recomb([[1.05, 0.02, 0.02], [0.02, 1.0, 0.02], [0.02, 0.02, 0.95]])
    .modulate({ saturation: 0.92, brightness: 1.04 });

for (const [target, fileTitle] of picks) {
  const url = `${API}?action=query&titles=${encodeURIComponent('File:' + fileTitle)}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    const json = await res.json();
    const page = Object.values(json?.query?.pages ?? {})[0];
    const ii = page?.imageinfo?.[0];
    if (!ii) { console.log('MISS', fileTitle); continue; }

    const imgRes = await fetch(ii.thumburl || ii.url, { headers: { 'User-Agent': UA } });
    const buf = Buffer.from(await imgRes.arrayBuffer());

    const dest = path.join('public/img', target);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await applyFilter(sharp(buf).resize(1200, 800, { fit: 'cover' })).webp({ quality: 80 }).toFile(dest);

    const md = ii.extmetadata ?? {};
    credits.push({
      file: target,
      title: fileTitle,
      author: (md.Artist?.value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
      license: md.LicenseShortName?.value ?? '',
      source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileTitle)}`,
    });
    console.log('OK', target);
  } catch (e) {
    console.log('ERR', target, e.message);
  }
  await sleep(400);
}

await fs.writeFile('public/img/CREDITS.json', JSON.stringify(credits, null, 2));
console.log('credits written:', credits.length);
