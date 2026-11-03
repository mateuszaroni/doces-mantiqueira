---
target: página inicial (index.astro)
total_score: 26
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\mateus.silva\\Desktop\\pessoal\\doces-mantiqueira\\src\\pages\\index.astro"
target_fingerprint: "sha256:435e72c1925a4038cfd8b7711fe4dd76edc0bd830e4249f396a324fa90ec1ae8"
target_path: "C:\\Users\\mateus.silva\\Desktop\\pessoal\\doces-mantiqueira\\src\\pages\\index.astro"
timestamp: 2026-11-03T02-59-01Z
slug: src-pages-index-astro
closed: true
---
Método: dois agentes isolados (A: revisão de design · B: detector do Impeccable + navegador)

# Critique: página inicial (src/pages/index.astro)

## Nota de saúde do design

| # | Heurística | Nota | Principal problema |
|---|---|---|---|
| 1 | Status do sistema | 3 | Nenhum link do menu mostra a seção atual; no celular, o carrossel perde a noção de posição quando a dica "Deslize" sai da tela. |
| 2 | Linguagem do mundo real | 4 | Vocabulário certo; o mesmo doce se chama "BANANADA" na faixa e "Doce de banana" no card. |
| 3 | Controle e liberdade | 3 | Menu fecha com Esc, "Fechar" e ao tocar num link; os botões saem para o WhatsApp sem mostrar a mensagem antes. |
| 4 | Consistência | 2 | Três visuais diferentes para WhatsApp; "Como chegar" usa a mesma pílula vermelha do WhatsApp. |
| 5 | Prevenção de erros | 3 | Mensagem pronta evita erro; "Entre em contato conosco" não diz que abre o WhatsApp. |
| 6 | Reconhecer em vez de lembrar | 3 | Cada card leva o nome do doce na mensagem; cidades e endereço aparecem duas vezes. |
| 7 | Flexibilidade | n/a | Página de um objetivo só, sem caminho para usuário experiente. |
| 8 | Estética e minimalismo | 3 | 9 botões vermelhos iguais viram uma parede de vermelho; "350g" duas vezes no card da paçoca. |
| 9 | Recuperação de erros | 3 | Se o WhatsApp não abrir, o número não aparece em lugar nenhum. |
| 10 | Ajuda | 2 | "Antes de pedir" sem prazo, quantidade e retirada (aguardam a família). |
| **Total** | | **26/36** | **Bom (72%)** |

## Veredito de especificidade
- Avaliação de design: específico nas pontas (hero, história, revenda, chamada final), genérico no meio ("Antes de pedir", "Você sabia?", "Onde estamos"); a grade 3×3 de cards idênticos fica abaixo do "cardápio com personalidade" do briefing.
- Detector: 13 avisos consultivos, sem bloqueio, nada em index.astro. 3 cores fora do DESIGN.md: rgb(92 6 13 / .97) no cabeçalho rolado (vinho antigo #5c060d em vez de #5a0201, inconsistência real) e #640201 em Hero.astro:91 e Cabecalho.astro:227 (não documentado). 10 tamanhos fora da escala, a maioria lacuna de documentação; os reais são 14–15px em Historia.astro:103, :140 e Rodape.astro:95 (o briefing pede mínimo de 16px). Falsos positivos: fundo creme e faixa em laço (exigências do briefing; a faixa para com reduced motion). O Chrome avisa "4 imagens lazy sem dimensões", sem identificação.
- Sobreposições: o detector rodou na aba [Human]; o servidor dele foi parado.

## O que funciona
1. Hero nos dois tamanhos: pratos recortados com sombra quente; em 360×740 título, apoio, pratos e os dois botões cabem sem rolar.
2. Confiança sem depoimento: avós, manifesto e pacote de 350g com rótulo.
3. Pedir custa zero: 16 links de uma função só, 13 mensagens prontas, rótulo de leitor de tela por doce.

## Problemas prioritários
1. [P1] O botão principal do hero é o mais fraco da página (contorno fino, não diz WhatsApp). Correção: manter o texto e usar o botão creme cheio; opcional "Abre o WhatsApp com a mensagem pronta"; deixar o botão do cabeçalho discreto enquanto o hero está na tela. Comando: bolder.
2. [P1] O cardápio repete a mesma coisa 9 vezes; a cabeça da seção deixa a metade direita vazia. Correção: ritmo variado, um ou dois doces maiores, "350g" uma vez na introdução, botão mais leve "Pedir {doce}", contador "n de 9" no celular. Comando: layout.
3. [P2] O fim da página não fecha com doce e se mistura com o rodapé vermelho. Correção: recorte na chamada final, rodapé em outro tom, linha de tranquilidade ao lado do botão. Comando: delight.
4. [P2] O miolo repete informação e perde embalo ("Antes de pedir" repete cidades e endereço; "Você sabia?" repete o fato dos cards e usa foto de figo; cerca de 1.100px sem ação no celular). Correção: enxugar o "Antes de pedir", dar um fato novo e uma foto coerente ao "Você sabia?". Comando: distill.
5. [P3] A cor dos botões não tem um significado só ("Como chegar" em vermelho de WhatsApp; vinho do cabeçalho fora da paleta). Correção: vermelho e creme só para WhatsApp, "Como chegar" como link com seta, trocar rgb(92 6 13) por #5a0201 e documentar #640201. Comando: polish.

## Sinais de alerta por persona
- Jordan: "Entre em contato conosco" não diz como nem onde; preço só depois dos 9 cards; três nomes para a bananada.
- Riley: sem WhatsApp não há número visível; a faixa fica meio escondida sob o cabeçalho ao pular para #produtos; texto de 14–15px.
- Casey: o botão verde fica sobre a borda do carrossel (toque acidental); sem contador de posição; página de cerca de 7.900px; único botão na zona do polegar manda a mensagem genérica.

## Observações menores
- "350g" duas vezes no card da paçoca.
- Recorte do cajuzinho com corte reto em cima e à esquerda (confirmar).
- História sem título visível.
- Fundo da foto do figo briga com o verde do painel.
- Chamada final diz "Escolha o doce", mas manda a mensagem genérica.

## Perguntas para pensar
1. Por que os 9 doces têm o mesmo card, o mesmo botão e o mesmo peso? Uma lista editorial em forma de cardápio venderia mais?
2. O que muda se o hero disser, na voz da família, quem atende e quando, sem nomear o Felipe?
3. O "Antes de pedir" merece os 670px do celular agora, ou deveria esperar prazo, quantidade e retirada?
