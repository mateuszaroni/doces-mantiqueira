import serra from './serra.json';

/**
 * Recorte (clip-path) com o topo no perfil da serra da logo.
 * `altura` é quanto da altura da foto a serra ocupa, em %. O resto da foto fica inteiro.
 */
export function recorteSerra(altura = 16): string {
  const topo = serra.pontos.map(([x, y]) => `${(x * 100).toFixed(2)}% ${(y * altura).toFixed(2)}%`);
  return `polygon(${topo.join(', ')}, 100% 100%, 0% 100%)`;
}
