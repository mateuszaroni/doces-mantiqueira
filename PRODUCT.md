# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primeiro: varejo.** Famílias do Vale do Paraíba e quem organiza mesa de festa, quermesse de paróquia, arraiá e aniversário caipira. Chegam quase sempre pelo celular, vindos do Instagram, do WhatsApp, de indicação ou da embalagem. Na maioria das vezes já conhecem os doces e às vezes a marca. O trabalho deles é escolher o doce e pedir sem atrito. Quando varejo e revenda pedirem coisas diferentes, o varejo vence (confirmado por Mateus em 02/11/2026).

**Segundo: revenda.** Padarias, empórios, mercados e pessoas que querem uma renda extra. O trabalho deles é avaliar se vale revender: margem, validade, entrega e marca.

Quem atende as conversas é o Felipe, pelo WhatsApp.

## Product Purpose

Site de uma página da Doces Mantiqueira, fábrica artesanal de doces caseiros em Piquete (SP), no pé da Serra da Mantiqueira, fundada em 1985 pelos avós de Mateus, o dono do projeto. O site mostra os 9 doces, conta a história da família e leva o visitante a chamar no WhatsApp por uma de duas portas: pedido ou orçamento para festa (varejo) e "quero revender" (atacado).

Sucesso é contato no WhatsApp. Não há carrinho, pagamento online, preços nem avaliações.

## Positioning

Fábrica de família em Piquete desde 1985. As receitas, aprendidas em 1987 com um doceiro de Guaratinguetá, são feitas no tacho do mesmo jeito há mais de 40 anos. O pedido é direto no WhatsApp, com entrega no Vale do Paraíba até Resende (RJ). Confirmado por Mateus em 02/11/2026.

Há um negócio homônimo em Minas (@docesmantiqueira). Por isso "Doces Mantiqueira" vem sempre amarrado a "Piquete" e "Serra da Mantiqueira".

**Em aberto:** os concorrentes do Vale que a marca quer superar ainda não foram nomeados.

## Operating Context

- **Pedido:** todo botão abre o WhatsApp do Felipe (`5512991947972`, exibido como (12) 99194-7972) com uma mensagem pronta. Toda mensagem começa com "Olá, Felipe! Vim pelo site e…", e o resto diz de qual botão veio. Essa abertura serve para medir sem cookies (etiquetas no WhatsApp Business).
- **Mensagens prontas:** a tabela fechada está no CLAUDE.md, seção 5. As mensagens são geradas por uma função única, `linkWhatsApp()`, em `src/config.ts`.
- **Hospedagem:** Netlify, com deploy automático a cada push no GitHub (`mateuszaroni/doces-mantiqueira`). Endereço provisório: docesmantiqueira.netlify.app, com `noindex` controlado por `PUBLIC_INDEXAVEL`.
- **Domínio próprio:** entra no Portão 2, junto com sitemap, Perfil de Empresa no Google, Search Console e contador de visitas sem cookies.
- **Revisão de conteúdo:** a família revisa o conteúdo; Mateus aprova e publica.
- **Época mais procurada:** junho e julho (festas juninas). O plano em `docs/plano-7-passos.md` congela mudanças nesse período.
- **Loja física:** Rua São Benedito, 8 — Centro, Piquete - SP, 12620-000. Aberta todos os dias, das 8h às 18h.

## Capabilities and Constraints

- **Página e tecnologia:** página única com âncoras; a revenda fica em `#revenda`. Astro com saída 100% estática, sem React, shadcn ou bibliotecas de componentes. Animações só em CSS e JavaScript mínimo. Não instalar shadcn/ui MCP nem Magic MCP.
- **Preço e avaliações:** sem preços, avaliações, estrelas ou notas. Preço se combina no WhatsApp. **Sem depoimentos** também: Mateus confirmou em 02/11/2026 que continua sem.
- **Formato:** um só, o pacote de 350g. Nada de pote, quilo, caixa ou formato de atacado no site.
- **Selos:** só os verdadeiros. Os doces vendem de forma parecida, então nunca "mais vendido" ou "mais pedido".
- **Nomes de pessoas:** só os avós (Seu Pedro Sabão e Dona Mariazinha) aparecem, e só na história. O Felipe aparece apenas nos botões de WhatsApp.
- **Terceiros:** sem cookies, banner de cookies, Google Analytics ou iframe do Google Maps (o botão "Como chegar" abre o Maps).
- **Fontes e dados:** fontes servidas pelo próprio site, sem chamada ao Google Fonts. Os dados do negócio ficam em `src/config.ts` e os 9 doces, em ordem, em `src/data/doces.json`.
- **Texto do g1:** a reportagem não é reproduzida; entra só como selo com link.
- **Desempenho no celular:** prioridade. A primeira dobra em 360×740 mostra a proposta e o botão de WhatsApp.
- **Fatos ainda não decididos (não inventar):**
  - cidades atendidas (lista provisória em `config.ts`);
  - descrições dos 9 doces (rascunho para a família revisar);
  - se há retirada na fábrica e entrega no varejo;
  - prazo e quantidade mínima para festa;
  - se a validade de 45 dias vale também no varejo;
  - tempo de resposta no WhatsApp.

## Brand Commitments

- **Nome:** Doces Mantiqueira. Razão social: Doces Mantiqueira Piquete Ltda. CNPJ: 01.569.365/0001-02.
- **Logo:** a oficial é `design/logo/logo-doces-mantiqueira.png`, vetorizada em `src/assets/logo/logo.svg`, com variante para fundo escuro e favicon. A aprovação da família está pendente.
- **Texto da história:** aprovado (CLAUDE.md, seção 7.6). Abre com o manifesto "Receita de família. Feito no tacho. Desde 1985."
- **Paleta e fontes:** as do CLAUDE.md, seção 6.2, valem como compromisso. Fraunces nos títulos, DM Sans no texto e cursiva só na logo.
- **Clima de festa junina:** sem bandeirinha, chita ou festa caricata no layout. Esse clima fica nas fotos.
- **Redes:** Instagram https://www.instagram.com/doces.mantiqueira/ (um "a") e Facebook https://www.facebook.com/doces.mantiqueiraa/ (dois "a", está certo).

## Evidence on Hand

- **Reportagem do g1 (2023):** https://g1.globo.com/sp/vale-do-paraiba-regiao/noticia/2023/06/27/festas-juninas-aquecem-mercado-de-doces-tradicionais-no-vale-do-paraiba.ghtml
- **Rota Gastronômica:** integra a Rota Gastronômica do Vale do Paraíba & Mantiqueira (Secretaria de Turismo de SP).
- **Fotos dos produtos:** `src/assets/fotos/produtos/`, com os recortes sem fundo em `src/assets/recortes/` (script `scripts/recortar-fotos.py`). O direito de uso ainda precisa ser confirmado com o fotógrafo.
- **Foto dos fundadores:** `src/assets/fotos/historia/avos-pedro-e-mariazinha.png`.
- **Foto da serra no fundo do site:** `src/assets/fundo/serra-foto.webp`. Foi gerada por IA e enviada por Mateus; os termos de uso comercial ainda precisam ser conferidos.
- **Embalagem real de 350g:** `src/assets/fotos/produtos/pacoca-pacote.jpg`.
- **Sem dados:**
  - não há depoimentos, avaliações nem números de vendas, e eles não devem ser inventados;
  - não há dados de tráfego, porque o contador sem cookies ainda não existe.

## Product Principles

1. **Pedir é uma mensagem.** Cada caminho termina no WhatsApp com o pedido já escrito, sem formulário e sem digitação.
2. **Varejo primeiro.** Em conflito de prioridade, a família que vai comprar para a mesa ou para a festa vence. A revenda tem sua porta própria, sem disputar o primeiro plano.
3. **Só o que é verdade.** Nada de selo, número, depoimento ou promessa que a família não tenha confirmado. Fato pendente fica fora até ser confirmado.
4. **Família, tacho e região.** A diferença está na história real, no jeito de fazer e em Piquete na Serra da Mantiqueira, sempre ditos com o nome da cidade.
5. **Rápido no celular de quem está no Vale.** A experiência é pensada para o celular, inclusive com rede fraca.

## Accessibility & Inclusion

- Texto do corpo com no mínimo 16px e contraste de pelo menos 4,5:1 (pares da paleta conferidos no CLAUDE.md).
- Alvos de toque com 48px ou mais.
- Foco visível, alt descritivo em todas as fotos, `lang="pt-BR"`, um único h1 e link "pular para o conteúdo".
- `prefers-reduced-motion` desliga todas as animações.
- Rótulos de botão claros, que dizem o que acontece ("Pedir no WhatsApp", "Quero revender").
