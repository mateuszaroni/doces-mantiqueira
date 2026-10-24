import type { APIRoute } from 'astro';
import { indexavel } from '../config';

// Sem domínio próprio, os buscadores podem visitar mas encontram o noindex em cada página
// (bloquear aqui impediria que vissem o noindex). Com o domínio, entra o sitemap.
export const GET: APIRoute = ({ site }) => {
  const linhas = ['User-agent: *', 'Allow: /'];
  if (indexavel) linhas.push('', `Sitemap: ${new URL('sitemap-index.xml', site)}`);
  return new Response(linhas.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
