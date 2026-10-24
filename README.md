# Doces Mantiqueira — site

Site de uma página da Doces Mantiqueira, de Piquete (SP). Astro, saída estática, publicado no Netlify.

## Rodar no computador

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| Endereço, horário, CNPJ, redes, cidades atendidas, número e mensagens do WhatsApp | `src/config.ts` |
| Os 9 doces da vitrine (nome, artigo, descrição, foto, texto alternativo) | `src/data/doces.json` |
| Fotos | `src/assets/fotos/` |
| Logo | `src/assets/logo/` |
| Cores e tamanhos de letra | `src/styles/global.css` |

## Scripts de apoio

- `node scripts/gerar-og.mjs` — refaz `public/og.jpg`, a imagem da prévia do link no WhatsApp.
- `node scripts/gerar-icones.mjs` — refaz `favicon.ico` e `apple-touch-icon.png` a partir de `public/favicon.svg`.
- `node scripts/vetorizar-logo.mjs` — refaz o traço da logo a partir do PNG oficial em `design/logo/`.

## Indexação (quando o domínio próprio entrar)

No `.netlify.app` o site fica com `noindex` e sem sitemap. Quando o domínio entrar, troque `PUBLIC_INDEXAVEL` para `"true"` em `netlify.toml` (ou nas variáveis de ambiente do Netlify). Isso tira o `noindex`, coloca o endereço canônico e gera o sitemap e o `robots.txt` com ele.
