import sharp from 'sharp';
import fs from 'node:fs';
const CREME = '#FBF7E6', TACHO = '#3A2417';
const W = 1840, COL = 560, GAP = 40, PAD = 40;
const rot = (t, w, cor = TACHO, size = 26) => Buffer.from(
  `<svg width="${w}" height="44"><text x="0" y="30" font-family="Arial" font-size="${size}" fill="${cor}">${t}</text></svg>`);
const caixa = async (input, bg, w, h, opts = {}) => {
  const img = await sharp(input, opts).resize(w - 40, h - 40, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: w, height: h, channels: 4, background: bg } }).composite([{ input: img, left: 20, top: 20 }]).png().toBuffer();
};
const H1 = 470;
const a = await caixa('design/logo/logo-original-rotulo-referencia.png', '#FDF9C9', COL, H1);
const b = await caixa('design/logo/logo-doces-mantiqueira.png', CREME, COL, H1);
const c = await caixa('src/assets/logo/logo.svg', CREME, COL, H1, { density: 200 });
const d = await caixa('src/assets/logo/logo-fundo-escuro.svg', TACHO, COL, H1, { density: 200 });
const fav = fs.readFileSync('public/favicon.svg');
const icones = [];
let x = 30;
for (const z of [16, 32, 64, 180]) {
  icones.push({ input: await sharp(fav, { density: (72 * z) / 32 }).resize(z).png().toBuffer(), left: x, top: 250 - z / 2 });
  icones.push({ input: rot(`${z}px`, 80, TACHO, 20), left: x, top: 260 + z / 2 });
  x += z + 50;
}
const e = await sharp({ create: { width: COL, height: H1, channels: 4, background: '#ECE6D2' } }).composite(icones).png().toBuffer();
const y1 = PAD + 50, y2 = y1 + H1 + 90;
const xs = [PAD, PAD + COL + GAP, PAD + 2 * (COL + GAP)];
await sharp({ create: { width: W, height: y2 + H1 + PAD, channels: 3, background: '#FFFFFF' } })
  .composite([
    { input: rot('1. Rótulo (referência)', COL), left: xs[0], top: PAD },
    { input: a, left: xs[0], top: y1 },
    { input: rot('2. PNG oficial (atual)', COL), left: xs[1], top: PAD },
    { input: b, left: xs[1], top: y1 },
    { input: rot('3. SVG novo — para aprovar', COL, '#C10413'), left: xs[2], top: PAD },
    { input: c, left: xs[2], top: y1 },
    { input: rot('4. SVG novo — fundo escuro (rodapé)', COL), left: xs[0], top: y2 - 50 },
    { input: d, left: xs[0], top: y2 },
    { input: rot('5. Favicon (ícone da aba)', COL), left: xs[1], top: y2 - 50 },
    { input: e, left: xs[1], top: y2 },
  ])
  .png().toFile('design/logo/aprovacao-logo.png');
console.log('ok');
