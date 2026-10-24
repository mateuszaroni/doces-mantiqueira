// Vetoriza a logo oficial (PNG) em camadas de cor com potrace.
// Uso único: node scripts/vetorizar-logo.mjs → design/logo/trace-{claro,escuro}.svg;
// depois: npx svgo --precision 0 design/logo/trace-claro.svg -o src/assets/logo/logo.svg (idem escuro → logo-fundo-escuro.svg)
// Cada camada vem de um canal contínuo do PNG (não de cor quantizada),
// para a borda cair no meio do antisserrilhado e o traço ficar com a espessura do original.
import sharp from 'sharp';
import potrace from 'potrace';
import fs from 'node:fs';

const SRC = 'design/logo/logo-doces-mantiqueira.png';
const ESCALA = 2;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Cada função devolve 0 (dentro da forma) a 255 (fora) para um pixel RGBA.
const CAMADAS = {
  // silhueta inteira: tudo que é opaco
  vermelho: (r, g, b, a) => 255 - a,
  // dobras da faixa: vermelho escuro (R ~110, G ~0)
  escuro: (r, g, b, a) => (a > 128 && g < 40 && r > 50 && r < 150 ? 0 : 255),
  // traço das montanhas: preto, separado do vermelho pelo canal R
  preto: (r, g, b, a) => (a < 128 ? 255 : Math.min(255, Math.max(r, g, b) * 2.2)),
  // letras e filetes: branco, separado do vermelho pelo canal G
  branco: (r, g, b, a) => (a < 128 ? 255 : 255 - g),
};

let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let p = 0; p < W * H; p++) {
  if (data[p * 4 + 3] < 128) continue;
  const x = p % W, y = (p / W) | 0;
  if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
}

function mascara(fn) {
  const buf = Buffer.alloc(W * H);
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    buf[p] = fn(data[i], data[i + 1], data[i + 2], data[i + 3]);
  }
  return sharp(buf, { raw: { width: W, height: H, channels: 1 } })
    .resize(W * ESCALA, H * ESCALA, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
}

function tracar(buf, cor, turdSize) {
  return new Promise((ok, erro) => {
    const t = new potrace.Potrace({ threshold: 128, turdSize, optTolerance: 0.6, alphaMax: 1 });
    t.loadImage(buf, (e) => (e ? erro(e) : ok(t.getPathTag(cor))));
  });
}

const vermelho = await tracar(await mascara(CAMADAS.vermelho), '#C10413', 80);
const escuro = await tracar(await mascara(CAMADAS.escuro), '#6E0008', 150);
const preto = await tracar(await mascara(CAMADAS.preto), '#000', 80);
const branco = await tracar(await mascara(CAMADAS.branco), '#FFF', 40);

const m = 6;
const vb = [(x0 - m) * ESCALA, (y0 - m) * ESCALA, (x1 - x0 + 2 * m) * ESCALA, (y1 - y0 + 2 * m) * ESCALA];
const svg = (corMontanha) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}">` +
  vermelho + escuro + preto.replace('fill="#000"', `fill="${corMontanha}"`) + branco +
  `</svg>`;
fs.writeFileSync('design/logo/trace-claro.svg', svg('#000'));
fs.writeFileSync('design/logo/trace-escuro.svg', svg('#FFF'));
console.log('viewBox', vb.join(' '));
