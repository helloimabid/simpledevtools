const sharp = require("sharp");
const path = require("path");

async function optimizeImages() {
  const inputPath = path.join(__dirname, "logo.png");

  // Create WebP version (much smaller)
  await sharp(inputPath)
    .resize(64, 64) // 2x for retina displays
    .webp({ quality: 85 })
    .toFile(path.join(__dirname, "logo.webp"));

  // Create optimized PNG fallback
  await sharp(inputPath)
    .resize(64, 64)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(__dirname, "logo-small.png"));

  console.log("Images optimized successfully!");

  // Show file sizes
  const fs = require("fs");
  const original = fs.statSync(inputPath).size;
  const webp = fs.statSync(path.join(__dirname, "logo.webp")).size;
  const smallPng = fs.statSync(path.join(__dirname, "logo-small.png")).size;

  console.log(`Original: ${(original / 1024).toFixed(1)} KB`);
  console.log(`WebP: ${(webp / 1024).toFixed(1)} KB`);
  console.log(`Small PNG: ${(smallPng / 1024).toFixed(1)} KB`);
}

optimizeImages().catch(console.error);
