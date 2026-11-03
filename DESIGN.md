---
name: Doces Mantiqueira
description: Doces caseiros de Piquete, no pé da Serra da Mantiqueira, desde 1985 — site de uma página que leva ao WhatsApp.
colors:
  vermelho-mantiqueira: "#c10413"
  vermelho-tacho: "#7a0a12"
  vinho-serra: "#5a0201"
  creme: "#fbf4e4"
  marrom-cafe: "#2b1a12"
  caramelo: "#8a5a1f"
  mel: "#f2c14e"
  verde-serra: "#3e5a3a"
  verde-whatsapp: "#1da851"
  branco: "#ffffff"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.3rem, 7.4vw, 8rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.015em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 7vw, 6.25rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  lead:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.1vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.3
    fontVariation: "'opsz' 36, 'SOFT' 0"
  title-featured:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  title-small:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 0"
  body-large:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  foco: "4px"
  selo: "1.25rem"
  card: "2rem"
  painel: "2.5rem"
  pilula: "999px"
  circulo: "50%"
spacing:
  margem: "clamp(1rem, 4vw, 3rem)"
  respiro: "clamp(4.5rem, 10vw, 9rem)"
  largura: "1280px"
  cabecalho: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.vermelho-mantiqueira}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.vermelho-tacho}"
  button-creme:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.vermelho-mantiqueira}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  button-creme-hover:
    backgroundColor: "{colors.branco}"
  button-linha:
    textColor: "{colors.creme}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0.75rem 1.25rem 0.75rem 1.5rem"
    height: "3.25rem"
  button-linha-hover:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.vermelho-mantiqueira}"
  button-mel:
    backgroundColor: "{colors.mel}"
    textColor: "{colors.marrom-cafe}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0.75rem 1.6rem"
    height: "3.25rem"
  whatsapp-flutuante:
    backgroundColor: "{colors.verde-whatsapp}"
    textColor: "{colors.branco}"
    rounded: "{rounded.circulo}"
    size: "4rem"
  button-card:
    textColor: "{colors.vermelho-tacho}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "0.75rem 1rem"
    height: "3.25rem"
  button-card-hover:
    backgroundColor: "{colors.vermelho-mantiqueira}"
    textColor: "{colors.branco}"
  card-doce:
    textColor: "{colors.marrom-cafe}"
    rounded: "{rounded.card}"
    padding: "1rem 1.75rem 0"
  painel-voce-sabia:
    backgroundColor: "{colors.verde-serra}"
    textColor: "{colors.creme}"
    rounded: "{rounded.painel}"
    padding: "clamp(2rem, 5vw, 4.5rem)"
  cabecalho-rolado:
    backgroundColor: "{colors.vinho-serra}"
    textColor: "{colors.creme}"
---

# Design System: Doces Mantiqueira

## Overview

**Creative North Star: "A Mesa da Mantiqueira"**

Os doces são os protagonistas, servidos sobre uma toalha vermelha profunda, com a Serra da Mantiqueira ao fundo. O sistema monta uma mesa posta. Atrás fica a foto da serra no vinho, com o brilho do pico. Na frente ficam a tigela de paçoca, o prato de figos e a bandeja sortida, recortados e com sombra, como objetos de verdade. Entre uma seção e outra, o creme funciona como toalha clara: é onde se escolhe, se lê a história e se encontra o endereço.

A tradição está na tipografia e nas cores: Fraunces em serifa clássica de alto contraste, o vermelho da marca e os filetes dourados com a montanhinha da logo. A modernidade está na escala e no movimento: títulos muito grandes, faixas de letreiro inclinadas que passam rolando, doces que balançam devagar e um selo que gira. A densidade é baixa, com muito respiro entre as seções e um assunto por bloco.

A festa junina entra pelas fotos, nunca pelo layout: nada de bandeirinha, chita ou estampa caricata.

**Key Characteristics:**
- Vermelho profundo com a foto da serra na abertura, no menu, na revenda e na chamada final. Creme nas seções de leitura e escolha.
- Doces recortados, sem fundo, sempre com sombra quente embaixo.
- Serifa clássica grande nos títulos e sans limpa no texto.
- Filetes dourados com a montanhinha da logo como único ornamento.
- Três movimentos contínuos (doces balançando, selo girando, letreiro rolando) e nada mais.
- Toda ação termina no WhatsApp.

## Colors

Paleta quente de cozinha e serra. O vermelho manda, o creme acolhe e o mel e o verde aparecem pouco.

### Primary
- **Vermelho Mantiqueira** (`vermelho-mantiqueira`): a cor da marca. Usada nos botões de ação sobre o creme, na faixa de letreiro principal e no brilho atrás do pico da serra. Com texto branco, o contraste é 6,4:1.
- **Vermelho Tacho** (`vermelho-tacho`): o fundo do rodapé (como pede o briefing), o hover dos botões vermelhos, o contorno e o texto do botão dos cards, o link "Como chegar" e os títulos de manifesto e endereço sobre o creme.

### Secondary
- **Vinho da Serra** (`vinho-serra`): o tom escuro tirado da foto da serra. Usado no cabeçalho depois de rolar (a 97%) e como cor de fundo de todo bloco com a foto (hero, menu, revenda, chamada final) enquanto ela carrega. O degradê de apoio vai da névoa (#ab0202) ao canto escuro (#4d0200), passando por #7f0201.

### Tertiary
- **Mel** (`mel`): destaque sobre fundo escuro. Aparece nos argumentos da revenda, nos losangos da faixa, no sublinhado dos links, no anel de foco, no selo "Desde 1985" e no filete de 3px que separa o rodapé da chamada final. Os filetes com montanhinha usam o mel a 65%.
- **Verde Serra** (`verde-serra`): acento discreto, só no card "Você sabia?" e na linha de montanha de "Onde estamos".
- **Verde WhatsApp** (`verde-whatsapp`): exclusivo do botão redondo flutuante. É um tom mais escuro que o verde oficial, para o ícone branco passar de 3:1.

### Neutral
- **Creme** (`creme`): o fundo das seções de leitura e escolha, o texto sobre o vermelho e o botão claro sobre o vermelho.
- **Marrom Café** (`marrom-cafe`): o texto principal sobre o creme (15,2:1) e sobre os fundos pastéis dos cards.
- **Caramelo** (`caramelo`): rótulos secundários (dt, legendas, dicas), filetes sobre o creme e a borda dos selos de texto (5,4:1 no creme).

### Named Rules
**The Pastel do Doce Rule.** O fundo de cada card de produto é um pastel tirado da cor do próprio doce (paçoca #F3DDBF, abóbora #FAD9BF, batata roxa #E4D8EC…). Ele mora nos dados de `src/data/doces.json`, não na paleta. O texto sobre o pastel é sempre Marrom Café.

**The Verde Só no WhatsApp Rule.** O verde do WhatsApp aparece em um único lugar: o botão redondo. Todos os outros botões de WhatsApp usam a paleta da marca.

**The Botão Cheio É WhatsApp Rule.** Botão cheio (vermelho, creme ou mel) é sempre uma ação de WhatsApp. Ações que não são pedido, como "Como chegar" e o "Quero revender" do hero, são links de texto com seta.

## Typography

**Display Font:** Fraunces (com Georgia, serif)
**Body Font:** DM Sans (com system-ui, sans-serif)

**Character:** Fraunces com o eixo SOFT desligado e tamanho óptico máximo dá uma serifa clássica de alto contraste, de rótulo antigo bem impresso. A DM Sans fica neutra e legível embaixo dela. A cursiva só existe na logo.

### Hierarchy
- **Display** (600, clamp 3.3–8rem, 0.92): só o nome "Doces Mantiqueira" no hero, em duas linhas, com sombra de texto suave.
- **Headline** (600, clamp 2.6–6.25rem, 0.9): o título de cada seção, alinhado à esquerda, com no máximo 12ch de largura. O manifesto da história (clamp 2.4–5.25rem) e o "Do tacho para a sua mesa." seguem o mesmo peso.
- **Title** (600, clamp 1.75–2.25rem): o nome do doce nos cards. **Title featured** (clamp 2.25–3.5rem) é o nome do doce em destaque, e **Title small** (clamp 1.5–2rem) é o "Você sabia?". Os argumentos da revenda seguem o mesmo peso.
- **Lead** (400, clamp 1.25–1.875rem, 1.3, opsz 36): os textos de apoio em serifa (subtítulo do hero, chamada final) e os links do cabeçalho (400, 1.125rem).
- **Body** (400, 1.0625rem, 1.6): todo texto corrido, com linhas de 34 a 58ch. **Body large** (1.125rem) é o texto da história e das informações de "Onde estamos".
- **Meta** (400, 1rem, 1.5): legendas, rótulos dos selos, a dica sob o botão do hero, a linha do número do WhatsApp e os dados do rodapé. É o menor tamanho de texto do site.
- **Label** (600, 1.0625rem, 1.2): botões. O selo girando usa DM Sans 700 de 10,5px, em caixa alta, com espaçamento de 0,14em.

### Named Rules
**The Peso 600 Rule.** Os títulos em Fraunces usam peso 600 (400 nos textos de apoio), nunca 800 ou 900. O contraste vem do tamanho, não do peso.

**The Piso de 16px Rule.** Nenhum texto lido fica abaixo de 16px (`meta`). A única exceção é o texto do selo girando, que é decorativo e fica oculto para leitores de tela.

**The Caixa Alta Só na Faixa Rule.** A caixa alta aparece só nas faixas de letreiro e no texto do selo. Títulos, rótulos e botões ficam em caixa normal.

## Layout

Página única em coluna, com seções de largura total. O conteúdo fica num envelope de até 1280px com margem lateral fluida (clamp de 1rem a 3rem), e as seções se separam por um respiro grande (clamp de 4.5rem a 9rem).

- **Hero:** duas colunas no desktop (texto centralizado à esquerda e o grupo de doces à direita), com altura de no mínimo 100svh. Até 900px vira uma coluna: título, filete, apoio, doces e botões, tudo visível em 360×740.
- **Produtos:** a cabeça da seção tem duas colunas: o título à esquerda e, à direita, a introdução, que diz "350g" e explica o preço uma vez só para todos os doces. A grade tem 3 colunas, e o primeiro doce abre em destaque, ocupando 2 colunas e 2 linhas. Até 1100px são 2 colunas, com o destaque na largura toda. Até 760px é um carrossel horizontal com scroll-snap: cada card ocupa 82% da largura, para o próximo aparecer pela metade, e um contador "n de 9" mostra a posição.
- **Faixas de letreiro:** atravessam a divisa entre duas seções, com altura zero, deslocadas 50% e giradas ±2°.
- **Cabeçalho:** fixo. Em 1020px os links dão lugar ao botão "Menu", que abre um menu em tela cheia.
- **Pontos de quebra:** 600px, 760px, 900px, 1020px e 1100px.

## Elevation & Depth

Objetos sobre a mesa. As superfícies (seções, cards, painéis) são planas e não têm sombra. A profundidade fica com o que seria um objeto real: os doces recortados, as fotos, as faixas de letreiro, o cabeçalho depois de rolar e o botão flutuante. A sombra é sempre quente (vinho ou café) e difusa, projetada para baixo, nunca cinza neutra.

### Shadow Vocabulary
- **Doce no hero** (`drop-shadow(0 22px 26px rgb(40 0 4 / 0.55))`): os recortes sobre a foto da serra, no hero e na chamada final.
- **Botão do hero** (`0 14px 30px -14px rgb(40 0 4 / 0.7)`): o botão creme principal, a única sombra em botão.
- **Doce no card** (`drop-shadow(0 16px 18px rgb(43 26 18 / 0.25))`): os recortes sobre os pastéis.
- **Doce em destaque** (`drop-shadow(0 26px 28px rgb(43 26 18 / 0.3))` sobre o mel; `drop-shadow(0 30px 30px rgb(0 0 0 / 0.45))` sobre o vinho): bandeja de festas e pacote da revenda.
- **Foto** (`0 24px 40px -24px rgb(43 26 18 / 0.55)`): a foto dos avós.
- **Faixa** (`0 14px 30px -18px rgb(43 26 18 / 0.6)`): as faixas de letreiro.
- **Cabeçalho rolado** (`0 10px 30px -14px rgb(0 0 0 / 0.6)`).
- **Título sobre a foto** (`text-shadow: 0 6px 30px rgb(40 0 4 / 0.45)`).

### Named Rules
**The Sombra É de Objeto Rule.** Só recebe sombra o que existe fisicamente na mesa (doce, foto, faixa) ou o que flutua sobre a página (cabeçalho, botão do WhatsApp). Card, painel e botão de seção ficam planos.

## Shapes

As formas são macias e generosas, como louça e pacote. Botões e etiquetas são pílulas (999px). Os cards de doce têm canto largo (2rem), e o painel "Você sabia?" um pouco mais (2.5rem). Os selos de texto da história usam 1.25rem. O botão do WhatsApp é um círculo.

Há duas formas orgânicas:
- a foto do figo cortado entra numa máscara irregular (58% 42% 52% 48% / 46% 54% 46% 54%);
- os recortes de doce seguem o contorno do prato ou da tigela.

Quando o prato está cortado no enquadramento original, o recorte passa das bordas do card e o lado reto some.

## Components

### Buttons
Acolhedores e diretos: pílulas generosas com rótulo que diz o que acontece.
- **Shape:** pílula (999px), altura mínima de 3.25rem e ícone do WhatsApp à esquerda.
- **Primary (vermelho):** fundo Vermelho Mantiqueira e texto branco, na seção Festas. No hover, vai para Vermelho Tacho.
- **Creme:** fundo creme e texto vermelho, sobre o vermelho e o vinho. É o botão principal do hero (com seta, 3.5rem de altura e sombra quente), o do menu e o da chamada final. No hover, fica branco.
- **Card:** contorno de 2px e texto em Vermelho Tacho. No hover, preenche de Vermelho Mantiqueira com texto branco. É de contorno de propósito: nove botões cheios virariam uma parede vermelha.
- **Linha:** contorno creme de 1.5px sobre a foto da serra, no cabeçalho. Só aparece depois de rolar, porque no topo a ação é o botão do hero. No hover, preenche de creme e o texto fica vermelho.
- **Mel:** fundo mel e texto café, só na revenda.
- **Hover / Focus:** transição de cor em 0.2s. No toque, o botão encolhe para 0.98. O foco é um anel mel de 3px com afastamento de 3px.
- **Links com seta:** "Quero revender ›" e "Como chegar ›" são links de texto com seta e 3rem de altura de toque. No vermelho, o sublinhado mel aparece no hover. Em "Onde estamos", o "Como chegar" vem em Vermelho Tacho, com o pino de mapa e sublinhado.

### Cards / Containers
- **Card de doce:** canto de 2rem, fundo pastel do doce, sem sombra e sem borda. A foto fica no topo (de 15 a 19rem de altura, inclinada ±3°), seguida do nome, da descrição e do botão de contorno na base. O peso não se repete no card: está na introdução da seção.
- **Card em destaque:** o primeiro doce ocupa 2 colunas e 2 linhas, com a foto crescendo até preencher o card, o nome em `title-featured`, a descrição em tamanho grande e o botão alinhado à esquerda. No celular volta a ser um card comum do carrossel.
- **Painel "Você sabia?":** Verde Serra, canto de 2.5rem, título em mel e frase grande em Fraunces creme.
- **Selos de texto (história):** borda caramelo de 2px, canto de 1.25rem, rótulo pequeno em caramelo e título em Fraunces.

### Navigation
- **Cabeçalho:** transparente sobre o hero, com a logo clara de 170px e links em Fraunces 400 creme. O sublinhado mel cresce no hover ou no foco, e o botão "Pedir no WhatsApp" fica em linha à direita. Depois de rolar 24px, ganha fundo Vinho da Serra a 97%, sombra, e fica compacto (logo de 124px).
- **Celular:** logo e botão "☰ Menu". O menu é um popover nativo em tela cheia, com a foto da serra no fundo, links grandes em Fraunces 600, botão creme do WhatsApp, horário e redes sociais.

### Signature: faixa de letreiro
Faixa vermelha (ou creme) com borda de 3px na cor oposta, girada ±2°. A lista de doces em Fraunces 600, caixa alta, passa num laço de 45s com losangos mel entre os itens. Ela para quando o mouse passa por cima, e para de vez com `prefers-reduced-motion`.

### Signature: selo "Desde 1985"
Disco mel com o texto "DESDE 1985 · PIQUETE-SP · DOCES CASEIROS" em círculo e a montanha vermelha no centro. Gira uma volta a cada 24s, encostado no grupo de doces do hero.

### Signature: filete com montanhinha
Dois filetes de 1px (mel a 65% sobre o escuro, caramelo a 55% sobre o creme) com a montanhinha da logo em traço no meio, com até 26rem de largura. Fica logo abaixo dos títulos do hero e das seções.

### Signature: chamada final
"Do tacho para a sua mesa." sobre a foto da serra, com dois recortes parados (doce de abóbora no prato e doce de banana na bandeja) saindo pelas bordas. Embaixo dos botões vem a linha "A gente responde pelo WhatsApp: (12) 99194-7972". O número também aparece em "Onde estamos", para quem não consegue abrir o WhatsApp pelo botão. Assim, a última lembrança da página é doce, não só o vermelho.

### Signature: botão flutuante do WhatsApp
Círculo Verde WhatsApp de 4rem (3.5rem no celular), fixo no canto inferior direito, com aro branco de 3px e sombra. Aumenta 6% no hover. Aparece em todas as telas.

## Do's and Don'ts

### Do:
- **Do** colocar a foto da serra (`src/assets/fundo/serra-foto.webp`) atrás de todo bloco vermelho grande: hero, menu, revenda e chamada final.
- **Do** recortar os doces sem fundo e dar a eles a sombra quente do vocabulário acima.
- **Do** usar Fraunces 600 nos títulos, com `'SOFT' 0` e `opsz` alto, e DM Sans no texto corrido.
- **Do** colocar o filete com a montanhinha logo abaixo dos títulos de seção.
- **Do** manter os movimentos lentos e contínuos (balanço de 7s, selo de 24s, faixa de 45s) e desligar todos com `prefers-reduced-motion`.
- **Do** reservar o botão cheio para o WhatsApp e usar link com seta para as outras ações.
- **Do** manter o texto do corpo com no mínimo 16px e os alvos de toque com 48px ou mais.

### Don't:
- **Don't** usar bandeirinha, chita ou estampa de festa junina no layout: esse clima fica nas fotos.
- **Don't** dar sombra a card, painel ou seção. Sombra é de objeto. O botão principal do hero é a exceção: a sombra marca a ação mais importante da página.
- **Don't** usar texto lido abaixo de 16px.
- **Don't** usar o verde do WhatsApp fora do botão redondo.
- **Don't** usar Fraunces arredondada (`'SOFT' 100`) nem pesos 800 e 900 nos títulos. A versão mais pesada e arredondada foi trocada pela serifa clássica no rebrand v3.
- **Don't** desenhar a serra em vetor no lugar da foto. A versão desenhada foi recusada no rebrand v3.
- **Don't** animar texto, botões, logo, foto dos avós ou o fundo da serra, nem criar entrada animada em cada seção.
