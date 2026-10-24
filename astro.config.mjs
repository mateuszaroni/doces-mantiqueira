// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// No Netlify, URL é o endereço público do site (*.netlify.app agora, domínio próprio depois).
const site = process.env.URL ?? 'http://localhost:4321';

// Fontes servidas pelo próprio site, a partir dos arquivos dos pacotes npm:
// nada é buscado em tempo de execução. Só o subconjunto latino (cobre o português).
const local = fontProviders.local();

export default defineConfig({
  site,
  output: 'static',
  fonts: [
    {
      provider: local,
      name: 'Caprasimo',
      cssVariable: '--fonte-titulo',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['@fontsource/caprasimo/files/caprasimo-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: local,
      name: 'Atkinson Hyperlegible Next',
      cssVariable: '--fonte-texto',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2'],
            weight: '200 800',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
