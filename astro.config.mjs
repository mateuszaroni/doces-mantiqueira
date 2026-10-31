// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// No Netlify, URL é o endereço público do site (*.netlify.app agora, domínio próprio depois).
const site = process.env.URL ?? 'http://localhost:4321';

// Portão 2: PUBLIC_INDEXAVEL=true tira o noindex e liga o sitemap. Com false, nada de sitemap.
const { PUBLIC_INDEXAVEL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const indexavel = PUBLIC_INDEXAVEL === 'true';

// Fontes servidas pelo próprio site, a partir dos arquivos dos pacotes npm:
// nada é buscado em tempo de execução. Só o subconjunto latino (cobre o português).
const local = fontProviders.local();

export default defineConfig({
  site,
  output: 'static',
  integrations: indexavel ? [sitemap({ filter: (pagina) => !pagina.includes('/404') })] : [],
  fonts: [
    {
      // Títulos. Arquivo "full": traz os eixos de peso, tamanho óptico e SOFT (letra arredondada).
      provider: local,
      name: 'Fraunces',
      cssVariable: '--fonte-titulo',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: local,
      name: 'DM Sans',
      cssVariable: '--fonte-texto',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2'],
            weight: '100 1000',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
