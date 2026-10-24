// Recorta só as montanhas da logo vetorizada: src/assets/logo/serra.svg (traço preto)
// e serra-fundo-escuro.svg (traço branco). Mantém a sombra vermelha, tira faixa e letras.
// Uso: node scripts/gerar-serra.mjs
import fs from 'node:fs';

// Coordenadas do traço (2× o PNG original): montanhas entre y 520 e 1080, x 200 a 2640.
const VIEWBOX = '200 520 2440 560';

for (const [origem, destino] of [
  ['src/assets/logo/logo.svg', 'src/assets/logo/serra.svg'],
  ['src/assets/logo/logo-fundo-escuro.svg', 'src/assets/logo/serra-fundo-escuro.svg'],
]) {
  const svg = fs.readFileSync(origem, 'utf8');
  const caminhos = [...svg.matchAll(/<path[^>]*\/>/g)].map((m) => m[0]);
  // Ordem da logo: vermelho (silhueta), vermelho escuro (dobras), traço, branco (letras).
  const [vermelho, , traco] = caminhos;
  fs.writeFileSync(destino, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">${vermelho}${traco}</svg>\n`);
  console.log(destino, fs.statSync(destino).size, 'bytes');
}
