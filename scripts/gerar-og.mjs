// Gera public/og.jpg (1200×630), a prévia do link no WhatsApp e redes.
// Uso: node scripts/gerar-og.mjs. Rodar de novo se mudar logo, título ou recortes do hero.
import sharp from 'sharp';
import * as fontkit from 'fontkit';
import fs from 'node:fs';
import wawoff2 from 'wawoff2';

const W = 1200;
const H = 630;
const VERMELHO = '#C10413';
const CREME = '#FBF4E4';

const FRAUNCES = 'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2';
const DM_SANS = 'node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2';

// O fontkit não instancia fonte variável em WOFF2: descomprime para TTF antes.
const fontes = {};
for (const [nome, arquivo] of [['fraunces', FRAUNCES], ['dmSans', DM_SANS]]) {
  fontes[nome] = fontkit.create(Buffer.from(await wawoff2.decompress(fs.readFileSync(arquivo))));
}

// Texto vira contorno vetorial: a imagem não depende de fonte instalada na máquina.
function textoEmCaminho(base, eixos, texto, tamanho, x, linhaBase, cor, espacamento = 0) {
  const fonte = base.getVariation(eixos);
  const escala = tamanho / base.unitsPerEm;
  const { glyphs, positions } = fonte.layout(texto);
  let cursor = x;
  let d = '';
  glyphs.forEach((g, i) => {
    const p = positions[i];
    const caminho = g.path.scale(escala, -escala).translate(cursor + p.xOffset * escala, linhaBase - p.yOffset * escala);
    d += caminho.toSVG();
    cursor += p.xAdvance * escala + espacamento * tamanho;
  });
  return `<path fill="${cor}" d="${d}"/>`;
}

// Mesmos eixos do título do site.
const titulo = { wght: 850, opsz: 144, SOFT: 100, WONK: 0 };
const texto = { wght: 500 };

const xTexto = 60;
const camadaTexto = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
    textoEmCaminho(fontes.fraunces, titulo, 'Doces', 132, xTexto, 318, CREME, -0.045) +
    textoEmCaminho(fontes.fraunces, titulo, 'Mantiqueira', 132, xTexto, 430, CREME, -0.045) +
    textoEmCaminho(fontes.dmSans, texto, 'Doces caseiros de Piquete (SP),', 32, xTexto + 4, 510, CREME) +
    textoEmCaminho(fontes.dmSans, texto, 'na Serra da Mantiqueira, desde 1985.', 32, xTexto + 4, 552, CREME) +
    `</svg>`,
);

// Logo numa pílula creme, como no cabeçalho do site.
const logo = await sharp('src/assets/logo/logo.svg', { density: 300 }).resize({ width: 190 }).png().toBuffer();
const { height: alturaLogo } = await sharp(logo).metadata();
const pilula = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="${alturaLogo + 28}"><rect width="250" height="${alturaLogo + 28}" rx="${(alturaLogo + 28) / 2}" fill="${CREME}"/></svg>`,
);

// Recorte girado com sombra escura por baixo, como os recortes do hero.
async function recorte(arquivo, largura, giro) {
  const base = await sharp(arquivo).resize({ width: largura }).rotate(giro, { background: '#0000' }).png().toBuffer();
  const { width, height } = await sharp(base).metadata();
  const sombra = await sharp(base)
    .extractChannel('alpha')
    .toColourspace('b-w')
    .linear(0.5, 0)
    .blur(16)
    .toBuffer()
    .then((alfa) =>
      sharp({ create: { width, height, channels: 3, background: '#3c0006' } })
        .joinChannel(alfa)
        .png()
        .toBuffer(),
    );
  return sharp({ create: { width: width + 40, height: height + 40, channels: 4, background: '#0000' } })
    .composite([
      { input: sombra, left: 20, top: 40 },
      { input: base, left: 20, top: 10 },
    ])
    .png()
    .toBuffer();
}

const recortes = 'src/assets/recortes/';
const figo = await recorte(recortes + 'figo.webp', 470, 6);
const pacoca = await recorte(recortes + 'pacoca-tigela.webp', 360, -4);

// sharp não aceita colar fora da tela: corta antes o que passa da borda.
async function colar(imagem, left, top) {
  const { width, height } = await sharp(imagem).metadata();
  const x0 = Math.max(0, -left);
  const y0 = Math.max(0, -top);
  const w = Math.min(width - x0, W - Math.max(left, 0));
  const h = Math.min(height - y0, H - Math.max(top, 0));
  const parte = await sharp(imagem).extract({ left: x0, top: y0, width: w, height: h }).toBuffer();
  return { input: parte, left: Math.max(left, 0), top: Math.max(top, 0) };
}

await sharp({ create: { width: W, height: H, channels: 3, background: VERMELHO } })
  .composite([
    await colar(figo, 740, -70),
    await colar(pacoca, 820, 290),
    { input: pilula, left: xTexto - 4, top: 40 },
    { input: logo, left: xTexto + 26, top: 54 },
    { input: camadaTexto, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og.jpg');

console.log('public/og.jpg', fs.statSync('public/og.jpg').size, 'bytes');
