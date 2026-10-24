// Gera public/og.jpg (1200×630), a prévia do link no WhatsApp e redes.
// Uso: node scripts/gerar-og.mjs. Rodar de novo se mudar logo, título ou fotos do topo.
import sharp from 'sharp';
import * as fontkit from 'fontkit';
import fs from 'node:fs';

const W = 1200;
const H = 630;
const CREME = '#FBF7E6';
const TACHO = '#3A2417';
const MADEIRA = '#6B4429';

// Texto vira contorno vetorial: a imagem não depende de fonte instalada na máquina.
function textoEmCaminho(arquivoFonte, texto, tamanho, x, linhaBase, cor) {
  const fonte = fontkit.create(fs.readFileSync(arquivoFonte));
  const escala = tamanho / fonte.unitsPerEm;
  const { glyphs, positions } = fonte.layout(texto);
  let cursor = x;
  let d = '';
  glyphs.forEach((g, i) => {
    const p = positions[i];
    const caminho = g.path.scale(escala, -escala).translate(cursor + p.xOffset * escala, linhaBase - p.yOffset * escala);
    d += caminho.toSVG();
    cursor += p.xAdvance * escala;
  });
  return `<path fill="${cor}" d="${d}"/>`;
}

const CAPRASIMO = 'node_modules/@fontsource/caprasimo/files/caprasimo-latin-400-normal.woff2';
const ATKINSON = 'node_modules/@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2';

const xTexto = 64;
const titulo = ['Doces caseiros da', 'Serra da Mantiqueira,', 'desde 1985'];
const camadaTexto = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
    titulo.map((linha, i) => textoEmCaminho(CAPRASIMO, linha, 48, xTexto, 318 + i * 58, TACHO)).join('') +
    textoEmCaminho(ATKINSON, 'Feitos de forma artesanal em Piquete (SP)', 26, xTexto, 482, MADEIRA) +
    `</svg>`,
);

// Faixa de toalha xadrez no pé, como na vitrine.
const xadrez = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="28">
    <defs><pattern id="x" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="${CREME}"/>
      <rect width="7" height="14" fill="#C10413" fill-opacity=".5"/>
      <rect width="14" height="7" fill="#C10413" fill-opacity=".5"/>
    </pattern></defs>
    <rect width="${W}" height="28" fill="url(#x)"/>
  </svg>`,
);

const logo = await sharp('src/assets/logo/logo.svg', { density: 300 }).resize({ width: 300 }).png().toBuffer();

// Mosaico igual ao do topo: foto grande à esquerda, duas empilhadas à direita.
const area = { x: 652, y: 48, w: 500, h: 506 };
const gap = 12;
const larguraGrande = Math.round(((area.w - gap) * 2) / 3);
const larguraPequena = area.w - gap - larguraGrande;
const alturaPequena = Math.round((area.h - gap) / 2);
const foto = (arquivo, w, h) =>
  sharp(arquivo)
    .resize(w, h, { fit: 'cover' })
    .composite([{ input: Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="8"/></svg>`), blend: 'dest-in' }])
    .png()
    .toBuffer();

const fotos = 'src/assets/fotos/produtos/';
await sharp({ create: { width: W, height: H, channels: 3, background: CREME } })
  .composite([
    { input: logo, left: xTexto - 8, top: 52 },
    { input: camadaTexto, left: 0, top: 0 },
    { input: await foto(fotos + 'sortida-prato.jpg', larguraGrande, area.h), left: area.x, top: area.y },
    { input: await foto(fotos + 'figo-cortado.jpg', larguraPequena, alturaPequena), left: area.x + larguraGrande + gap, top: area.y },
    { input: await foto(fotos + 'pacoca.jpg', larguraPequena, alturaPequena), left: area.x + larguraGrande + gap, top: area.y + alturaPequena + gap },
    { input: xadrez, left: 0, top: H - 28 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og.jpg');

console.log('public/og.jpg', fs.statSync('public/og.jpg').size, 'bytes');
