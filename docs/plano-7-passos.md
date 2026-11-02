# Doces Mantiqueira — plano em 7 passos

Aplicado ao site que já está no ar (docesmantiqueira.netlify.app, versão v3). Tudo aqui parte dos fatos do CLAUDE.md e do que está publicado. Onde um passo pede algo que ainda não temos (concorrentes, depoimentos reais, palavras dos clientes, números de tráfego), está marcado como **lacuna**. Nada foi inventado para preencher.

**Atualização de 02/11/2026:** as três melhorias de maior impacto do passo 6 já estão construídas: a prova no hero, o bloco "Antes de pedir", só com respostas confirmadas, e a chamada final.

Regras do briefing que valem para todos os passos: sem preços, sem avaliações ou estrelas inventadas, sem "mais vendido", sem cookies nem Google Analytics, o Felipe só aparece nos botões de WhatsApp, página única em Astro estático, animações só em CSS.

---

## 1. A planta do site

### Marca, público e concorrência

**A marca.** Fábrica de família em Piquete (SP), no pé da Serra da Mantiqueira, desde 1985. Começou com Seu Pedro Sabão e Dona Mariazinha. São 9 doces de tacho, cada um no pacote de 350g. Tem duas provas públicas: a reportagem do g1 e a Rota Gastronômica do Vale do Paraíba & Mantiqueira.

**Uma ressalva sobre "luxo".** Quem compra é a mesa de casa, a quermesse de paróquia, o arraiá e a padaria do bairro. Um site com cara de joalheria afasta exatamente esse público. Por isso a direção certa é **"herança premium"**: acabamento de marca grande com alma de doce caseiro. É o que a v3 já faz, com o vermelho profundo, a serifa clássica e os filetes dourados. A sensação de luxo vem do cuidado, não do distanciamento.

**Público, em duas portas.**

| Porta | Quem é | O que procura |
|---|---|---|
| Varejo | Família do Vale, quem organiza festa, quermesse e arraiá | Doce de verdade, quantidade para a festa, pedido fácil |
| Revenda | Padaria, empório, mercado, quem quer renda extra | Margem, validade, entrega, marca que vende sozinha |

**Concorrência que dá para afirmar hoje.**
- O doce industrial de mercado, que é o concorrente que todo mundo conhece.
- O homônimo de Minas (@docesmantiqueira), que pode confundir quem busca o nome.

**Lacuna:** quais 2 ou 3 docerias ou fábricas do Vale você quer superar? Com os nomes, eu comparo os sites delas com o nosso.

**A sensação nos primeiros 3 segundos:** *"Isso é de verdade, é de família, e eu peço agora mesmo."* São três sinais, nessa ordem:
1. a foto da serra junto com os doces reais diz "de verdade";
2. "desde 1985" diz "de família";
3. o botão de WhatsApp à vista diz "agora mesmo".

### Identidade visual (já aplicada)

- **Cores:** vinho da foto da serra (`#4d0200` a `#ab0202`), vermelho Mantiqueira `#C10413`, creme `#FBF4E4`, café `#2B1A12`, mel `#F2C14E` como acento, e verde serra só na linha de montanha do rodapé.
- **Tipografia:** Fraunces com o eixo SOFT desligado, peso 600, nos títulos; DM Sans no texto corrido. As duas são servidas pelo próprio site.
- **Ornamento:** dois filetes dourados com a montanhinha da logo no meio.
- **Fotos:** os doces recortados, sem fundo, e a foto dos avós.

### Estrutura e narrativa durante a rolagem

| # | Seção | Papel na história | Estado |
|---|---|---|---|
| 1 | Hero | **Desejo**: a marca, os doces e a serra | no ar |
| 2 | Faixa de letreiro | Ritmo e lista rápida dos doces | no ar |
| 3 | Produtos (9 cards) | **Escolha**: cada card vira um pedido | no ar |
| 4 | Você sabia? | **Curiosidade**: os quatro dias de tacho | no ar |
| 5 | Nossa história | **Confiança**: família, 1987, g1, Rota | no ar |
| 6 | Festas | **Ocasião**: junho e julho, quermesse | no ar |
| 7 | Revenda | **Oportunidade**: segunda porta | no ar |
| 8 | Faixa 2 + Onde estamos | **Logística**: endereço, horário, cidades | no ar |
| 9 | **CTA final** | **Fechamento**: um último convite antes do rodapé | construído (02/11/2026) |

A narrativa leva o visitante da vontade à escolha, da escolha à confiança e da confiança ao clique. Hoje falta a última etapa: a página termina no endereço e no rodapé, sem um convite final (ver passo 6).

### Animações, tecnologia e ordem de construção

- **Animações:** o detalhe está no passo 3. Em resumo, um só momento orquestrado na abertura, três movimentos contínuos (doces, selo, letreiro) e nada mais.
- **Tecnologia:** manter o que está no ar. Astro estático no Netlify com deploy pelo GitHub, CSS puro e JavaScript só no menu e no cabeçalho. Não vale trocar por React, GSAP ou um construtor de sites: nada disso melhora a conversão e todos pioram o celular.
- **Ordem de construção daqui em diante:**
  1. pendências da família (cidades, descrições, logo);
  2. CTA final;
  3. prova no hero;
  4. bloco "Antes de pedir";
  5. domínio próprio (Portão 2);
  6. contador de visitas sem cookies;
  7. experimentos (passo 6).

---

## 2. A primeira coisa que o visitante vê

### O que ele estava fazendo antes

Quase todo o tráfego será **morno e no celular**: a bio do Instagram, o status ou a conversa do WhatsApp, a indicação de alguém, o QR code na embalagem. Depois do domínio próprio, também a busca "doces caseiros Piquete". Na maioria das vezes ele já conhece paçoca e doce de leite. Às vezes já conhece a marca. Ele não precisa ser convencido de que doce é bom. Precisa sentir que **este** é o de verdade e que pedir é fácil.

### Promessa, prova e ação

- **A promessa que importa:** doce caseiro de família, de tacho, que chega na sua cidade do Vale e que você pede numa mensagem.
- **A prova mais forte sem rolar:** "desde 1985", que já está no selo e no subtítulo. A segunda mais forte, "Saiu no g1", está escondida na seção Nossa história. Proposta: uma linha pequena logo abaixo dos botões, *"Saiu no g1 · Integra a Rota Gastronômica do Vale do Paraíba & Mantiqueira"*, com o g1 como link.
- **A ação em menos de 10 segundos:** tocar no WhatsApp. O botão redondo já aparece em todas as telas, e o botão principal fica acima da dobra em 360×740.

### O hero proposto

| Elemento | Proposta |
|---|---|
| Título (h1) | **Doces Mantiqueira** (fica como está: é marca, ajuda a busca e o tráfego morno reconhece) |
| Subtítulo | Doces caseiros da Serra da Mantiqueira, desde 1985. |
| Imagem de apoio | A foto da serra no vermelho e os três recortes (paçoca, figo, bandeja sortida), que mostram três doces diferentes e o capricho da apresentação |
| Botão primário | Entre em contato conosco (sua escolha atual; ver teste B) |
| Botão secundário | Quero revender (leva até a seção Revenda) |
| Microprova | Saiu no g1 · Integra a Rota Gastronômica do Vale do Paraíba & Mantiqueira |

### Três versões para teste A/B

| | Subtítulo | Botão primário | O que testa |
|---|---|---|---|
| **A, a atual (controle)** | Doces caseiros da Serra da Mantiqueira, desde 1985. | Entre em contato conosco | — |
| **B, ação clara** | Doces caseiros da Serra da Mantiqueira, desde 1985. | Pedir no WhatsApp | Se dizer onde o clique leva faz mais gente clicar |
| **C, ocasião** | Paçoca, cajuzinho, doce de leite e mais, feitos no tacho em Piquete desde 1985. Para a sua mesa e a sua festa. | Pedir no WhatsApp | Se nomear os doces e a ocasião supera a frase de marca |

Com pouco tráfego, o teste não pode ser simultâneo. A forma de medir está no passo 6.

---

## 3. Como o site se mexe

### Personalidade e orçamento no celular

**Personalidade:** calma, de cozinha e de tacho. O movimento é lento e orgânico, como vapor subindo da panela. Nada que quique, pisque ou corra.

**Onde o movimento agrega**
- Os doces flutuando no hero: dão vida aos recortes e mostram que são objetos reais.
- O selo girando devagar: funciona como carimbo de origem e chama o olho para o "desde 1985".
- A faixa de letreiro: energia de feira e lista rápida dos doces, que para quando o mouse passa por cima.
- A dica "Deslize para ver os 9 doces" no carrossel do celular: mostra que há mais cards.

**Onde só distrai ou trava**
- Animar a entrada de cada seção conforme a rolagem: atrasa a leitura e faz a página parecer de modelo pronto.
- Parallax pesado na foto da serra, principalmente no celular.
- Sequestrar a rolagem.
- Animar os cards ao passar o mouse.
- Carrossel que avança sozinho.

**Limite no celular**
- Animar só `transform` e `opacity`.
- No máximo três movimentos contínuos por tela.
- Nenhuma animação com JavaScript quadro a quadro.
- Nenhuma animação que atrase o elemento principal da primeira dobra (hoje, a foto de fundo).
- Com `prefers-reduced-motion`, tudo desliga. Isso já está implementado e testado.

### O sistema de movimento

| Tipo | Regra | Estado |
|---|---|---|
| Entrada | **Um** momento só: os três recortes sobem e aparecem em 500 ms, com 80 ms entre um e outro. O título e os botões aparecem já parados, sem animação. | **proposto** |
| Rolagem | Nenhum efeito de rolagem. O cabeçalho só ganha fundo vinho e fica compacto depois de 24 px. | no ar |
| Hover e foco | Botões: preenchimento de 200 ms. Links: sublinhado mel que cresce. Botão redondo: aumenta 6%. Foco visível em mel em tudo que é clicável. | no ar |
| Clique | Todo botão diminui para 98% no toque, como resposta imediata. | no ar |
| Transição entre páginas | A página é única. Só a ida da 404 para o início pode ganhar um cross-fade nativo (`@view-transition`), em CSS e sem custo. | opcional |
| Menu do celular | Abrir com fade de 150 ms. | **proposto** |

### O que nunca se mexe

- Texto: títulos, descrições, endereço, horário e "350g".
- Botões e links, além da resposta ao toque.
- A logo.
- A foto dos avós: pessoas reais não se animam.
- A foto de fundo da serra.
- Os cards de produto e o carrossel, que só andam pela mão do usuário.
- O botão redondo do WhatsApp: ele não pula nem pulsa para chamar atenção.

---

## 4. O texto

### Nível de consciência e objeções

**Nível de consciência na chegada:** ele já conhece o produto. Na maior parte das vezes também conhece a marca ou foi indicado. O texto não explica o que é paçoca: confirma que esta é a de verdade e mostra o caminho do pedido.

**Objeções que aparecem conforme ele rola, e onde responder**

| Objeção | Onde responder | Resposta com fatos que temos |
|---|---|---|
| "Quanto custa?" | Perto dos produtos | "O preço você combina direto no WhatsApp." O briefing não permite preço no site. |
| "Entrega na minha cidade?" | Perto dos produtos e em Onde estamos | Lista de cidades do Vale do Paraíba até Resende (RJ). **Lacuna:** a família confirmar. |
| "É caseiro mesmo?" | História | Receita de família, feita no tacho desde 1985, com doce de abóbora e de batata que levam até quatro dias. |
| "Dá para uma festa grande?" | Festas | "Diga a data e quantas pessoas na mensagem." **Lacuna:** existe quantidade mínima ou prazo de antecedência? |
| "Quanto tempo dura?" | Revenda, talvez também em Produtos | Validade de 45 dias. **Lacuna:** vale para todos os doces e para o varejo? |
| "Retiro na fábrica ou recebo em casa?" | Bloco novo "Antes de pedir" | **Lacuna:** confirmar retirada e entrega. |

**Depoimentos e palavras dos clientes — lacuna.** Ainda não temos depoimentos reais nem as palavras exatas que os clientes usam. O briefing proíbe avaliação e estrela, e por isso nenhum depoimento entrou no site. Para decidir:
1. Se você quiser frases reais (nome e cidade, com autorização), o briefing precisa ser revisto. Não são avaliações com nota, mas o CLAUDE.md hoje veta.
2. Para descobrir as palavras dos clientes, o Felipe exporta as primeiras mensagens de 20 conversas recentes. As expressões que se repetem viram texto do site.

### Hierarquia de títulos e texto de cada bloco

O texto da história é o aprovado e não muda. As descrições dos doces seguem como rascunho para a família revisar.

| Nível | Texto |
|---|---|
| **h1** | Doces Mantiqueira |
| apoio | Doces caseiros da Serra da Mantiqueira, desde 1985. |
| microprova (novo) | Saiu no g1 · Integra a Rota Gastronômica do Vale do Paraíba & Mantiqueira |
| **h2** | Conheça nossos produtos |
| apoio | Escolha o doce e peça pelo WhatsApp: a mensagem já vai com o nome dele. |
| linha nova | O preço você combina direto no WhatsApp. Todos no pacote de 350g. |
| **h3** (×9) | Nome do doce, descrição de uma linha, "350g" |
| **h2** | Você sabia? |
| frase | O doce de abóbora e o de batata levam até quatro dias para ficar prontos. |
| manifesto | Receita de família. Feito no tacho. Desde 1985. |
| **h2** (oculto) | Nossa história (texto aprovado) |
| **h2** | Festas, quermesses e arraiás |
| apoio | Para mesa de festa, quermesse de paróquia, arraiá e aniversário caipira. |
| linha nova | Na mensagem, diga a data e quantas pessoas. Assim o orçamento sai mais rápido. |
| **h2** | Quer revender? |
| apoio | Para padarias, empórios, mercados e para quem quer uma renda extra. |
| argumentos | Ótima margem · Validade de 45 dias · Entrega em todo o Vale do Paraíba, até Resende (RJ) · Mais de 40 anos de tradição |
| **h2** | Onde estamos |
| **h2** (novo) | **Antes de pedir** (3 perguntas: preço, entrega, retirada; só com as respostas confirmadas) |
| **h2** (novo, CTA final) | **Do tacho para a sua mesa.** |
| apoio | Escolha o doce e mande uma mensagem. Aberto todos os dias, das 8h às 18h. |

### Microtexto dos botões

| Onde | Botão | Mensagem que já vai escrita |
|---|---|---|
| Hero | Entre em contato conosco | pedido / orçamento para festa |
| Hero | Quero revender | (leva até a seção Revenda) |
| Cards | Pedir no WhatsApp | quero o(a) {doce} |
| Festas | Pedir orçamento para festa | orçamento para festa / quermesse |
| Revenda | Quero revender — falar com o Felipe | interesse em revender |
| Cabeçalho, menu e botão redondo | Pedir no WhatsApp | queria fazer um pedido |
| CTA final (novo) | Pedir no WhatsApp | queria fazer um pedido |

O site não tem formulário: o "formulário" é a mensagem que já vai escrita no WhatsApp. Uma proposta, que precisa do seu OK porque muda a tabela fechada do briefing: na mensagem de festas, acrescentar "Data: · Quantidade de pessoas:", para o cliente só completar.

---

## 5. O plano de construção

### Componentes

| Componente | Repetição | Observação |
|---|---|---|
| `BotaoWhatsApp` | 15 links na página | Gerador único: `linkWhatsApp()` em `config.ts` |
| `WhatsAppFlutuante` | página inicial e 404 | Verde `#1da851`, com contraste do ícone ≥ 3:1 |
| `Letreiro` | 2 faixas | Para ao passar o mouse; desliga com `prefers-reduced-motion` |
| `Filete` | hero e 4 títulos de seção | Versões clara e escura |
| Card de doce | 9 cards | Dados vêm de `src/data/doces.json` |
| `Cabecalho` (+ menu) | página inicial e 404 | Menu é popover nativo, sem biblioteca |
| Seções | 1 de cada | Hero, Produtos, VoceSabia, Historia, Festas, Revenda, OndeEstamos, Rodape |
| **Novos** | `AntesDePedir`, `ChamadaFinal` | Depois das respostas da família |

**Conteúdo dinâmico:** nenhum em tempo real. Os doces vêm de `doces.json`, e os dados do negócio, de `config.ts`. Para mudar um texto, basta editar e fazer push: o Netlify publica em cerca de 20 segundos.

### Estrutura de pastas

```
src/
  config.ts            dados do negócio e gerador do WhatsApp
  data/doces.json      os 9 doces (ordem = ordem da vitrine)
  assets/recortes/     fotos sem fundo (saída do rembg)
  assets/fundo/        foto da serra
  assets/fotos/        fotos originais e foto dos avós
  components/          um arquivo por seção ou peça
  layouts/Base.astro   head, SEO, OG, fontes
  pages/               index, 404, robots.txt
scripts/               recortar-fotos.py, gerar-og.mjs, vetorizar-logo.mjs
docs/                  este plano
```

### Breakpoints

- **≤ 760px (celular):** carrossel de produtos, menu em tela cheia, botão redondo de 56px.
- **≤ 900px:** hero em uma coluna (título, fotos, botões).
- **≤ 1020px:** menu de celular no lugar dos links do cabeçalho.
- **≤ 1100px:** produtos em 2 colunas.
- **Acima disso:** desktop com 3 colunas e largura máxima de 1280px.

### Imagens e fontes

**Imagens**
- Todas passam pelo `astro:assets`: WebP em várias larguras, com `sizes` certo e `width` e `height` sempre preenchidos.
- A foto da serra e os recortes do hero carregam com `eager`; a foto da serra com `fetchpriority="high"`. O resto carrega com `lazy`.
- A foto da serra otimizada pesa de 13 a 21 KB.

**Fontes**
- Só a fonte dos títulos é pré-carregada, todas com `font-display: swap`.
- **Ganho possível:** reduzir a Fraunces só aos eixos usados, de cerca de 120 KB para perto de 60 KB.

### Metas de velocidade e acessibilidade

| Meta | Alvo | Medido (Slow 4G, CPU 4×, 360px) |
|---|---|---|
| LCP | < 2,5 s | 1,6 s |
| CLS | < 0,1 | 0,07 |
| INP | < 200 ms | não medido em campo (pouco JavaScript) |
| Acessibilidade (Lighthouse) | ≥ 90 | 100 |
| Boas práticas (Lighthouse) | ≥ 90 | 100 |

**Acessibilidade**
- Contraste AA em todos os pares e foco visível.
- Alvo de toque ≥ 48px.
- Um único h1, link "pular para o conteúdo" e alt em todas as fotos.
- Animações desligadas com `prefers-reduced-motion`.
- Botões de WhatsApp avisam aos leitores de tela que abrem em nova aba.

### Checklist antes do lançamento (Portão 1)

- [x] Links de WhatsApp com o número e a mensagem certos (conferidos no código e no site no ar)
- [ ] Tocar em cada botão no celular do Felipe e ver a conversa abrir
- [x] Prévia OG gerada, servida e conferida
- [ ] Prévia conferida colando o link numa conversa real do WhatsApp
- [x] Testado em 360px e com rede lenta simulada
- [x] Lighthouse mobile ≥ 90 em acessibilidade e boas práticas, com LCP e CLS dentro da meta
- [x] `prefers-reduced-motion` desliga as animações
- [x] Favicon presente
- [ ] Logo SVG aprovada pela família
- [x] Endereço e horário certos
- [ ] Cidades confirmadas
- [ ] Descrições dos 9 doces revisadas pela família
- [x] Links do Instagram e do Facebook conferidos no código
- [ ] Abrir os dois links no celular
- [x] `noindex` ativo
- [ ] Revisão Web Design Guidelines refeita na v3 (a última foi na v2)
- [x] Publicado no Netlify via GitHub
- [ ] Direito de uso das fotos confirmado com o fotógrafo
- [ ] Termos de uso comercial da foto da serra (gerada por IA) conferidos
- [ ] CLAUDE.md atualizado: botão redondo no lugar da barra, texto do hero e visual v3

---

## 6. Auditoria de conversão

### Caminho do usuário e atrito

| Etapa | O que acontece | Atrito encontrado |
|---|---|---|
| 1. Chegada | Hero com foto da serra, doces e botão | A prova mais forte (g1, Rota) não aparece sem rolar. O botão "Entre em contato conosco" não diz para onde leva. |
| 2. Escolha | 9 cards, carrossel no celular | No celular só se vê um card por vez, e a decisão fica cega para quem não deslizar. Não há resposta para "quanto custa?" nem para "entrega aqui?". |
| 3. Confiança | História, g1, Rota | Boa, mas aparece só depois dos produtos, quando parte das pessoas já saiu. Não há foto da fábrica nem do tacho. |
| 4. Ocasião | Festas, revenda | Não diz o que mandar na mensagem (data, quantidade) nem se há prazo mínimo. |
| 5. Logística | Endereço, horário, cidades | As cidades ficam no fim da página, longe do momento da escolha. |
| 6. Fim da página | Rodapé | Não há convite final: quem leu tudo precisa voltar ao botão redondo. |
| 7. Pós-clique | Conversa no WhatsApp | Ninguém sabe em quanto tempo o Felipe responde. **Lacuna:** um tempo de resposta real seria um ótimo sinal de confiança. |

**Dúvidas sem resposta antes do clique:** preço (por regra do briefing), entrega na minha cidade, retirada, prazo para festa, quantidade mínima, validade, tempo de resposta.

**Sinais de confiança**

| Sinal | Situação |
|---|---|
| CNPJ e razão social | presente |
| Endereço físico | presente |
| Fotos reais | presente |
| Família fundadora | presente |
| Embalagem com rótulo (revenda) | presente |
| g1 | escondido |
| Rota Gastronômica | escondido |
| Depoimentos | ausente (vetado pelo briefing) |
| Foto do tacho ou da produção | ausente |
| Tempo de resposta | ausente |

### Melhorias por prioridade

1. **Prova no hero:** a linha com "Saiu no g1 · Rota Gastronômica" abaixo dos botões. Custo baixo, impacto alto.
2. **CTA final antes do rodapé:** "Do tacho para a sua mesa", horário e o botão. Custo baixo, impacto alto.
3. **Bloco "Antes de pedir":** três perguntas (preço, entrega, retirada), com respostas confirmadas pela família. Custo baixo, depende delas.
4. Linha "O preço você combina direto no WhatsApp. Todos no pacote de 350g." em Produtos.
5. Instrução de festa: "Na mensagem, diga a data e quantas pessoas."
6. Cidades atendidas resumidas também perto dos produtos.
7. Foto real do tacho ou da produção na história (pedir ao fotógrafo).
8. Tempo de resposta, se for verdadeiro e estável (ex.: "Respondemos no mesmo dia").
9. Indicador de posição no carrossel do celular (ex.: "1 de 9").

### As três mudanças com maior impacto esperado

1. **Prova no hero.** Ataca a dúvida "é de confiança?" no momento em que ela surge, sem custo de velocidade.
2. **CTA final.** Recupera quem leu até o fim, que é o visitante mais quente da página.
3. **"Antes de pedir".** Tira as dúvidas que hoje fazem a pessoa adiar o clique.

### Como medir sem cookies

O site não tem e não vai ter Google Analytics. A medição usa duas coisas:

1. **As mensagens que já vão escritas.** Toda conversa vinda do site começa com "Vim pelo site e…", e o resto da frase diz de qual botão veio. O Felipe marca cada conversa com uma etiqueta no WhatsApp Business: varejo, festa, revenda ou produto, mais "virou pedido". **Esse é o painel.**
2. **Contador de visitas sem cookies** (Portão 2), para transformar conversas em taxa. Até lá, vale o número absoluto por semana.

**A métrica que prova que funcionou:** conversas iniciadas pelo site por semana e, com o contador ligado, **conversas por 100 visitas**. Como métrica de apoio, a porcentagem dessas conversas que vira pedido.

### Experimentos, em ordem

Com pouco tráfego, um A/B simultâneo não chega a uma conclusão. Cada experimento roda em blocos de tempo: **2 semanas com a versão atual, depois 2 semanas com a nova**. Só compara semanas sem feriado nem campanha diferente.

| # | Experimento | Variante | Vence se |
|---|---|---|---|
| 1 | Prova no hero | Microprova g1 e Rota abaixo dos botões | +30% em conversas por semana, ou por 100 visitas |
| 2 | Texto do botão do hero | "Pedir no WhatsApp" contra "Entre em contato conosco" (versão B do passo 2) | +30% nas conversas do botão do hero |
| 3 | CTA final | Seção "Do tacho para a sua mesa" | +20% nas conversas "queria fazer um pedido" |

Para saber de qual versão veio cada conversa, a variante muda uma palavra da mensagem sem mudar o sentido. Por exemplo, "Vim pelo site e…" contra "Vi o site e…". O Felipe registra qual chegou.

---

## 7. O plano de lançamento (30 dias)

O site já está no ar, mas com `noindex` e sem divulgação. O lançamento é o dia em que ele passa a ser divulgado. O ideal é com o domínio próprio, mas dá para começar no `.netlify.app`.

### Fontes de tráfego que você controla

| Fonte | Ação |
|---|---|
| Instagram (@doces.mantiqueira) | Link na bio, post e stories de lançamento, link nos destaques |
| Facebook (doces.mantiqueiraa) | Botão do site na página |
| WhatsApp Business | Link no perfil e no catálogo, mensagem para a lista de clientes antigos |
| Embalagem e balcão | QR code com o endereço do site no rótulo, nas sacolas e no balcão da fábrica |
| Revendedores atuais | Mensagem com o link e uma arte para eles divulgarem |
| Google (depois do domínio) | Perfil de Empresa com o site, Search Console |
| Rota Gastronômica | Pedir que o link do site entre na página da Rota |

As páginas que pedem atenção imediata são o hero, os cards de produtos e Festas: é por onde chega a maior parte das conversas. Revenda vem em seguida.

### Checklist de lançamento

- [ ] Pendências da família resolvidas (cidades, descrições, logo)
- [ ] Felipe testa os 15 botões no celular dele
- [ ] Etiquetas criadas no WhatsApp Business (varejo, festa, revenda, produto, virou pedido)
- [ ] Felipe pergunta "como conheceu a gente?" em toda conversa nova durante 30 dias
- [ ] Prévia conferida colando o link no WhatsApp
- [ ] Link na bio do Instagram e na página do Facebook
- [ ] Mensagem para a lista de clientes (enviada por você ou pelo Felipe)
- [ ] QR code impresso
- [ ] Se o domínio entrar: `PUBLIC_INDEXAVEL=true`, Perfil de Empresa e Search Console (Portão 2)

### Feedback que custa pouco

- **Teste do corredor:** 5 clientes reais, no celular deles, na fábrica. Tarefa: "peça um doce para uma festa". Observe sem ajudar, 5 minutos cada. O que travar vira prioridade.
- **As perguntas que se repetem no WhatsApp:** toda pergunta que aparecer 3 vezes vira texto no site.
- **A pergunta "como conheceu a gente?"**, para saber qual fonte traz conversa de verdade.

### Métricas com pouco tráfego

1. Conversas pelo site por semana, por tipo (etiquetas).
2. Porcentagem dessas conversas que vira pedido.
3. Origem declarada ("como conheceu").
4. As 3 perguntas mais repetidas da semana.
5. Visitas, quando o contador sem cookies entrar.

### Calendário de revisão semanal

Toda segunda, 30 minutos, você e o Felipe. Regra: **no máximo uma mudança no site por semana.**

| Semana | Foco |
|---|---|
| 1 (dias 1–7) | Divulgação nas fontes acima. Corrigir só erros. Registrar a base de conversas. |
| 2 (dias 8–14) | Teste do corredor. Ajustar textos com as perguntas repetidas. Publicar o CTA final. |
| 3 (dias 15–21) | Experimento 1, prova no hero. A base são as semanas 1 e 2. |
| 4 (dias 22–30) | Fechar o experimento 1, decidir e começar o experimento 2. Revisão dos 30 dias: o que trouxe conversa e o que não trouxe. |

### Três experimentos prioritários

Os mesmos do passo 6, na mesma ordem:
1. Prova no hero.
2. Texto do botão do hero.
3. CTA final.

### Quando parar de mexer

Pare de mexer no site e passe a investir em tráfego (Instagram, revendedores, QR code) quando **duas destas** forem verdade:
- dois experimentos seguidos não mudaram as conversas em mais de 20%;
- as conversas por semana ficaram estáveis, dentro de ±20%, por 4 semanas;
- 3 semanas seguidas sem uma pergunta nova repetida no WhatsApp.

**Congelamento de temporada:** de 1º de junho a 31 de julho (festas juninas, a época mais procurada), nada muda no site além de correção de erro. Os experimentos precisam terminar até abril de 2027.

---

## O que preciso de você

1. Os 2 ou 3 concorrentes do Vale que você quer superar.
2. Se depoimentos reais (com nome, cidade e autorização) podem entrar. Hoje o briefing veta.
3. As respostas da família para o "Antes de pedir": retirada e entrega, prazo e quantidade para festa, validade no varejo, tempo de resposta.
4. Se posso mudar a mensagem de festas para incluir "Data:" e "Quantidade de pessoas:".
5. Quais melhorias do passo 6 eu já construo. Recomendo começar pelas três primeiras.
