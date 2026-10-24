import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Os 9 doces da vitrine, na ordem do arquivo. Descrições são rascunho para a família revisar.
const doces = defineCollection({
  loader: file('src/data/doces.json'),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      descricao: z.string(),
      foto: image(),
      alt: z.string(),
    }),
});

export const collections = { doces };
