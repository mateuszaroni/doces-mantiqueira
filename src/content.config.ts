import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Os 9 doces da vitrine, na ordem do arquivo. Descrições: rascunho para a família revisar.
const doces = defineCollection({
  loader: file('src/data/doces.json'),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      // Artigo usado na mensagem do WhatsApp: "quero a paçoca", "quero o cajuzinho".
      artigo: z.enum(['o', 'a']),
      descricao: z.string(),
      // Foto recortada (sem fundo), saída de scripts/recortar-fotos.py.
      recorte: image(),
      alt: z.string(),
      // Tom pastel do card, derivado da cor do doce. Texto sempre em marrom café.
      fundo: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      // Recorte com lado reto (prato cortado no enquadramento): sai pelas bordas do card.
      sangra: z.boolean().default(false),
    }),
});

export const collections = { doces };
