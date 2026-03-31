#!/usr/bin/env node
/**
 * Converts all JPG images in public/images/ to optimized WebP.
 * - Max width 1200px (enough for desktop + retina mobile)
 * - Quality 80 (good balance of size vs quality)
 * - Keeps original JPGs as backup in public/images-original/
 * - Generates WebP files in-place (same names, .webp extension)
 */

import sharp from 'sharp';
import { readdir, mkdir, copyFile, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = join(process.cwd(), 'public/images');
const BACKUP_DIR = join(process.cwd(), 'public/images-original');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 80;

async function main() {
  // Create backup dir
  await mkdir(BACKUP_DIR, { recursive: true });

  const files = (await readdir(IMAGES_DIR))
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${files.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let skipped = 0;

  for (const file of files) {
    const srcPath = join(IMAGES_DIR, file);
    const backupPath = join(BACKUP_DIR, file);
    const webpName = basename(file, extname(file)) + '.webp';
    const webpPath = join(IMAGES_DIR, webpName);

    const originalStat = await stat(srcPath);
    const originalSize = originalStat.size;
    totalOriginal += originalSize;

    try {
      // Backup original
      await copyFile(srcPath, backupPath);

      // Convert to WebP
      const image = sharp(srcPath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

      const webpStat = await stat(webpPath);
      const webpSize = webpStat.size;
      totalOptimized += webpSize;

      // Remove original JPG (webp replaces it)
      await unlink(srcPath);

      const savings = ((1 - webpSize / originalSize) * 100).toFixed(0);
      const dims = metadata.width > MAX_WIDTH
        ? `${metadata.width}→${MAX_WIDTH}px`
        : `${metadata.width}px`;

      console.log(`✓ ${file} → ${webpName}  ${(originalSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB  (−${savings}%)  ${dims}`);
    } catch (err) {
      skipped++;
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total: ${(totalOriginal/1024/1024).toFixed(1)}MB → ${(totalOptimized/1024/1024).toFixed(1)}MB`);
  console.log(`Savings: ${((1 - totalOptimized/totalOriginal) * 100).toFixed(0)}%`);
  console.log(`Converted: ${files.length - skipped}, Skipped: ${skipped}`);
  console.log(`Originals backed up to: public/images-original/`);
}

main().catch(console.error);
