// Gera src/assets/fundo/serra-fundo.svg: a Serra da Mantiqueira sombreada atrás do hero.
// Uso: node scripts/gerar-serra-fundo.mjs. Semente fixa: o desenho sai sempre igual.
//
// Três cordilheiras em camadas (a do fundo mais clara, a da frente mais escura), cada uma
// sumindo para baixo num degradê que zera antes da borda (serve de fundo sem máscara), com um filete claro na crista, como luz no fim da tarde.
// O pico mais alto lembra o Pico dos Marins, vizinho de Piquete.
import fs from 'node:fs';

const W = 1600;
const H = 640;

function aleatorio(semente) {
  // mulberry32
  return () => {
    semente |= 0;
    semente = (semente + 0x6d2b79f5) | 0;
    let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deslocamento do ponto médio: crista com detalhe em várias escalas.
function crista({ semente, base, amplitude, aspereza, picos, passos = 9 }) {
  const rnd = aleatorio(semente);
  const n = 2 ** passos;
  const y = new Array(n + 1).fill(0);
  let escala = 1;
  for (let tam = n; tam > 1; tam /= 2) {
    for (let i = tam / 2; i < n; i += tam) {
      y[i] = (y[i - tam / 2] + y[i + tam / 2]) / 2 + (rnd() - 0.5) * escala;
    }
    escala *= aspereza;
  }
  // Envelope com os picos principais (x de 0 a 1, altura relativa, largura): pontudo, não arredondado.
  const envelope = (x) => Math.max(0.12, ...picos.map(([cx, alt, larg]) => alt * Math.exp(-Math.abs(x - cx) / larg)));
  return y.map((v, i) => {
    const x = i / n;
    return [x * W, base - amplitude * (envelope(x) + v * 1.1)];
  });
}

const f = (n) => Math.round(n * 10) / 10;
const caminhoFechado = (pts) => `M0 ${H}L${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}L${W} ${H}Z`;
const caminhoAberto = (pts) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}`;

const camadas = [
  {
    // Fundo: a serra mais distante, alta e clara.
    pts: crista({ semente: 1985, base: 340, amplitude: 225, aspereza: 0.68, picos: [[0.3, 0.6, 0.08], [0.56, 1, 0.06], [0.82, 0.7, 0.09]] }),
    cor: '#a50d19',
    luz: 0.26,
  },
  {
    pts: crista({ semente: 12620, base: 430, amplitude: 190, aspereza: 0.66, picos: [[0.12, 0.75, 0.08], [0.44, 0.65, 0.1], [0.72, 0.9, 0.07], [0.95, 0.55, 0.07]] }),
    cor: '#850a14',
    luz: 0.18,
  },
  {
    // Frente: morros baixos e escuros.
    pts: crista({ semente: 8, base: 520, amplitude: 120, aspereza: 0.64, picos: [[0.2, 0.6, 0.12], [0.6, 0.5, 0.14], [0.9, 0.7, 0.09]] }),
    cor: '#63060e',
    luz: 0.1,
  },
];

const defs = camadas
  .map(
    (c, i) => `<linearGradient id="g${i}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${c.cor}"/>
  <stop offset="0.4" stop-color="${c.cor}" stop-opacity="0.8"/>
  <stop offset="0.85" stop-color="${c.cor}" stop-opacity="0"/>
</linearGradient>`,
  )
  .join('\n');

const corpo = camadas
  .map(
    (c, i) =>
      `<path fill="url(#g${i})" d="${caminhoFechado(c.pts)}"/>\n` +
      `<path fill="none" stroke="#ffd9cf" stroke-opacity="${c.luz}" stroke-width="1.6" stroke-linejoin="round" d="${caminhoAberto(c.pts)}"/>`,
  )
  .join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">
<defs>
${defs}
</defs>
${corpo}
</svg>
`;

fs.mkdirSync('src/assets/fundo', { recursive: true });
fs.writeFileSync('src/assets/fundo/serra-fundo.svg', svg);
console.log('src/assets/fundo/serra-fundo.svg', Buffer.byteLength(svg), 'bytes');
