import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const rootDir = process.cwd();
const input = process.argv[2] || "src/assets/brand/sfs-logo.png";
const inputPath = path.resolve(rootDir, input);
const outDir = path.resolve(rootDir, "public");

const ICON_SPECS = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function renderSquareIconBuffer(sourceBuffer, size) {
  const insetRatio = size <= 32 ? 0.72 : 0.82;
  const targetSide = Math.max(1, Math.floor(size * insetRatio));
  const resizedSource = await sharp(sourceBuffer)
    .resize({
      width: targetSide,
      height: targetSide,
      fit: "contain",
      withoutEnlargement: false,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resizedSource,
        gravity: "center",
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toBuffer();
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const src = await fs.readFile(inputPath);
  const generated = [];

  for (const spec of ICON_SPECS) {
    const outPath = path.join(outDir, spec.name);
    const pngBuffer = await renderSquareIconBuffer(src, spec.size);
    await fs.writeFile(outPath, pngBuffer);
    generated.push({ ...spec, outPath, pngBuffer });
  }

  const icoInputs = generated
    .filter((i) => [16, 32].includes(i.size))
    .map((i) => i.outPath);

  const icon48 = await renderSquareIconBuffer(src, 48);
  const temp48 = path.join(outDir, ".tmp-favicon-48x48.png");
  await fs.writeFile(temp48, icon48);
  icoInputs.push(temp48);

  const icoBuffer = await pngToIco(icoInputs);
  await fs.writeFile(path.join(outDir, "favicon.ico"), icoBuffer);
  await fs.unlink(temp48);

  console.log(`Generated ${generated.length + 1} icon files from ${inputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
