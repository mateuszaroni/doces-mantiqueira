// Gera os ícones PNG/ICO a partir de public/favicon.svg.
// Uso: node scripts/gerar-icones.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const svg = fs.readFileSync('public/favicon.svg');
const png = (size) => sharp(svg, { density: (72 * size) / 32 }).resize(size, size).png().toBuffer();

// favicon.ico com PNGs embutidos (16, 32, 48)
const tamanhos = [16, 32, 48];
const imagens = await Promise.all(tamanhos.map(png));
const cab = Buffer.alloc(6 + 16 * tamanhos.length);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(tamanhos.length, 4);
let off = cab.length;
tamanhos.forEach((s, i) => {
  const e = 6 + 16 * i;
  cab.writeUInt8(s, e); cab.writeUInt8(s, e + 1); cab.writeUInt16LE(1, e + 4); cab.writeUInt16LE(32, e + 6);
  cab.writeUInt32LE(imagens[i].length, e + 8); cab.writeUInt32LE(off, e + 12);
  off += imagens[i].length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([cab, ...imagens]));

// apple-touch-icon: sem cantos arredondados (o iOS arredonda sozinho)
const quadrado = svg.toString().replace('rx="7"', 'rx="0"');
await sharp(Buffer.from(quadrado), { density: (72 * 180) / 32 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('ícones gerados');
