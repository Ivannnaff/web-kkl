import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMG_DIR = './public/img';
const MAX_WIDTH = 1400; // max lebar gambar galeri
const WEBP_QUALITY = 75; // kualitas webp (75 = bagus, jauh lebih kecil)
const JPEG_QUALITY = 80;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function compressImage(filePath) {
  const { size: originalSize } = await stat(filePath);
  const ext = extname(filePath).toLowerCase();
  const isWebP = ext === '.webp';
  const isJpeg = ext === '.jpg' || ext === '.jpeg';

  // Skip file yang sudah kecil (< 100 KB)
  if (originalSize < 100 * 1024) {
    console.log(`  SKIP  ${filePath.replace('./public/img/', '')} (${(originalSize/1024).toFixed(0)} KB — sudah kecil)`);
    return { skipped: true, saved: 0 };
  }

  const tmpPath = filePath + '.tmp';
  let img = sharp(filePath).rotate(); // auto-rotate berdasarkan EXIF

  // Resize jika lebih lebar dari MAX_WIDTH
  const meta = await sharp(filePath).metadata();
  if (meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (isWebP) {
    await img.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(tmpPath);
  } else if (isJpeg) {
    await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath);
  } else if (ext === '.png') {
    // Convert PNG ke webp untuk efisiensi lebih baik
    const outPath = filePath.replace('.png', '.webp');
    await img.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outPath + '.tmp');
    const { size: newSize } = await stat(outPath + '.tmp');
    if (newSize < originalSize) {
      await rename(outPath + '.tmp', outPath);
      const saved = originalSize - newSize;
      console.log(`  ✓ PNG→WEBP  ${basename(filePath)} — ${(originalSize/1024).toFixed(0)} KB → ${(newSize/1024).toFixed(0)} KB (hemat ${(saved/1024).toFixed(0)} KB)`);
      return { skipped: false, saved };
    } else {
      const { unlink } = await import('fs/promises');
      await unlink(outPath + '.tmp');
      console.log(`  SKIP  ${basename(filePath)} — konversi PNG tidak menguntungkan`);
      return { skipped: true, saved: 0 };
    }
  }

  if (ext !== '.png') {
    const { size: newSize } = await stat(tmpPath);
    if (newSize < originalSize) {
      await rename(tmpPath, filePath);
      const saved = originalSize - newSize;
      console.log(`  ✓  ${filePath.replace('./public/img/', '')} — ${(originalSize/1024).toFixed(0)} KB → ${(newSize/1024).toFixed(0)} KB (hemat ${(saved/1024).toFixed(0)} KB)`);
      return { skipped: false, saved };
    } else {
      const { unlink } = await import('fs/promises');
      await unlink(tmpPath);
      console.log(`  SKIP  ${filePath.replace('./public/img/', '')} — sudah optimal`);
      return { skipped: true, saved: 0 };
    }
  }

  return { skipped: true, saved: 0 };
}

async function main() {
  console.log('🗜️  Kompres gambar dimulai...\n');
  const images = await getAllImages(IMG_DIR);
  console.log(`Ditemukan ${images.length} gambar\n`);

  let totalSaved = 0;
  let compressed = 0;

  for (const img of images) {
    try {
      const result = await compressImage(img);
      if (!result.skipped) {
        totalSaved += result.saved;
        compressed++;
      }
    } catch (err) {
      console.error(`  ERROR  ${img}: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Selesai! ${compressed} file dikompres`);
  console.log(`💾 Total hemat: ${(totalSaved / 1024).toFixed(0)} KB (${(totalSaved / 1024 / 1024).toFixed(2)} MB)`);
}

main();
