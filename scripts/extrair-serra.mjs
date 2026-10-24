// Extrai da logo oficial o perfil da serra (contorno de cima do traço preto das montanhas)
// e grava src/lib/serra.json: pontos normalizados (0–1) para recortes e desenhos.
// Uso: node scripts/extrair-serra.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const { data, info } = await sharp('design/logo/logo-doces-mantiqueira.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const preto = (x, y) => {
  const i = (y * W + x) * 4;
  return data[i + 3] > 128 && data[i] < 90 && data[i + 1] < 90 && data[i + 2] < 90;
};

// Topo do traço preto em cada coluna, só na faixa das montanhas (acima da faixa vermelha).
const LIMITE = 600;
const topo = [];
for (let x = 0; x < W; x++) {
  for (let y = 0; y < LIMITE; y++) if (preto(x, y)) { topo.push([x, y]); break; }
}
// Suaviza ruído de 1–2 px e simplifica (Ramer–Douglas–Peucker).
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const d = Math.abs((b[1] - a[1]) * x - (b[0] - a[0]) * y + b[0] * a[1] - b[1] * a[0]) / Math.hypot(b[1] - a[1], b[0] - a[0]);
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)];
}
const pontos = rdp(topo, 6);
const xs = pontos.map((p) => p[0]), ys = pontos.map((p) => p[1]);
const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
const norm = pontos.map(([x, y]) => [+((x - x0) / (x1 - x0)).toFixed(4), +((y - y0) / (y1 - y0)).toFixed(4)]);
fs.mkdirSync('src/lib', { recursive: true });
fs.writeFileSync('src/lib/serra.json', JSON.stringify({ origem: 'logo-doces-mantiqueira.png', proporcao: +((x1 - x0) / (y1 - y0)).toFixed(3), pontos: norm }) + '\n');
console.log(norm.length, 'pontos · proporção', ((x1 - x0) / (y1 - y0)).toFixed(2), '· caixa', x0, y0, x1, y1);
