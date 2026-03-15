import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(
  __dirname,
  "../data/cards/linguagens-de-programacao.json",
);
const existing: object[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

const newCards = [
  // ─────────────────────────────────────────
  // HTML – Fácil
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__HTML__Fácil__1",
    tags: ["html", "fundamentos", "sigla", "web"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "O que significa a sigla HTML?",
    options: [
      "HyperText Markup Language (linguagem de marcação)",
      "High Text Management Language",
      "HyperText Machine Learning",
      "Hyper Transfer Markup Layer",
    ],
    correctIndex: 0,
    explanation:
      "HTML significa HyperText Markup Language — a linguagem de marcação padrão para criação de páginas web. 'HyperText' refere-se a links que conectam páginas; 'Markup' indica o uso de tags para estruturar o conteúdo.",
    example:
      "<!DOCTYPE html><html><head><title>Minha Página</title></head><body><h1>Olá!</h1></body></html>",
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__2",
    tags: ["html", "title", "head", "navegador"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Qual tag define o título da página exibido na aba do navegador?",
    options: [
      "<title>, dentro do elemento <head>",
      "<h1>, primeiro título dentro do <body>",
      "<header>, primeiro elemento da página",
      "<meta>, com atributo name='title'",
    ],
    correctIndex: 0,
    explanation:
      "A tag <title> define o título do documento exibido na aba do navegador e usado por mecanismos de busca. Deve ficar dentro de <head>. É diferente de <h1>, que marca o título visual principal dentro do <body>.",
    example:
      "<head><title>QuizMaster – Página Inicial</title></head> — aparece na aba do browser.",
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__3",
    tags: ["html", "ancora", "link", "href"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Qual tag HTML é usada para criar um hiperlink?",
    options: [
      "<a> (âncora), com atributo href para o destino",
      "<link>, com atributo rel para o destino",
      "<url>, com atributo src para o caminho",
      "<href>, com atributo target para a URL",
    ],
    correctIndex: 0,
    explanation:
      "A tag <a> (anchor/âncora) cria hiperlinks. O atributo href define o destino — pode ser uma URL absoluta, relativa, âncora interna (#id) ou protocolo como mailto:. A tag <link> serve para vincular recursos externos (CSS) no <head>, não para links clicáveis.",
    example:
      '<a href="https://example.com">Visite o site</a> — link externo. <a href="#inicio">Voltar ao topo</a> — âncora interna.',
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__4",
    tags: ["html", "img", "imagem", "src", "alt"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Qual tag é usada para inserir uma imagem em HTML?",
    options: [
      "<img>, elemento void com atributos src e alt",
      "<image>, elemento com atributos href e title",
      "<picture>, elemento com atributo source único",
      "<photo>, elemento com atributos path e alt",
    ],
    correctIndex: 0,
    explanation:
      "A tag <img> é um elemento void (sem tag de fechamento) que exibe imagens. O atributo src define o caminho da imagem e alt fornece texto alternativo para acessibilidade e SEO. Sem alt, leitores de tela não conseguem descrever a imagem.",
    example:
      '<img src="logo.png" alt="Logo da empresa"> — insere a imagem logo.png com texto alternativo descritivo.',
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__5",
    tags: ["html", "bloco", "inline", "display", "elementos"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question:
      "Qual é a diferença entre elementos de bloco e elementos inline em HTML?",
    options: [
      "Bloco ocupa a linha inteira; inline flui junto ao texto ao redor",
      "Bloco é visível na tela; inline é renderizado de forma oculta",
      "Bloco é usado para texto; inline é usado para imagens",
      "Não há diferença prática — são termos sinônimos em HTML5",
    ],
    correctIndex: 0,
    explanation:
      "Elementos de bloco (div, p, h1-h6, section…) ocupam toda a largura disponível e começam em nova linha. Elementos inline (span, a, strong, img…) fluem com o texto e ocupam apenas o espaço necessário. CSS pode mudar esse comportamento com display.",
    example:
      "<p>Este é um bloco.</p><p>Outro bloco em nova linha.</p> vs <span>inline</span> <strong>também inline</strong> na mesma linha.",
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__6",
    tags: ["html", "lista", "ul", "ol", "li"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Qual tag cria uma lista de itens sem numeração (pontos)?",
    options: [
      "<ul> (unordered list), com itens marcados por <li>",
      "<ol> (ordered list), com itens numerados por <li>",
      "<dl> (definition list), com termos em <dt> e definições em <dd>",
      "<list> (plain list), com itens marcados por <item>",
    ],
    correctIndex: 0,
    explanation:
      "A tag <ul> cria listas não ordenadas, exibindo marcadores (bullets) por padrão. Cada item é envolvido por <li>. A tag <ol> cria listas ordenadas (1, 2, 3…). O tipo de marcador do <ul> pode ser alterado com CSS (list-style-type).",
    example:
      "<ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul> — exibe três itens com bullets.",
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__7",
    tags: ["html", "heading", "h1", "semantica", "hierarquia"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question:
      "Qual tag define o cabeçalho de maior importância semântica em HTML?",
    options: [
      "<h1>, o nível mais alto na hierarquia de títulos",
      "<h6>, o nível mais alto na hierarquia de títulos",
      "<head>, que representa o cabeçalho do documento",
      "<title>, que exibe o título na aba do navegador",
    ],
    correctIndex: 0,
    explanation:
      "HTML oferece seis níveis de títulos: <h1> (maior importância) a <h6> (menor). O <h1> deve ser usado uma vez por página para o título principal. A hierarquia de headings é importante para SEO e acessibilidade — leitores de tela usam essa estrutura para navegar.",
    example:
      "<h1>Guia de HTML</h1><h2>Fundamentos</h2><h3>Tags Básicas</h3> — hierarquia correta de títulos.",
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__8",
    tags: ["html", "form", "formulario", "input", "submit"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Para que serve a tag <form> em HTML?",
    options: [
      "Agrupa campos de entrada para coleta e envio de dados ao servidor",
      "Exibe tabelas de dados formatados para o usuário final",
      "Define o layout estrutural principal de uma página web",
      "Cria seções de navegação com menus interativos",
    ],
    correctIndex: 0,
    explanation:
      "A tag <form> define um formulário HTML para coletar entrada do usuário. O atributo action define o URL para onde os dados são enviados e method define o método HTTP (GET ou POST). Sem <form>, os campos <input> não são enviados automaticamente ao servidor.",
    example:
      '<form action="/login" method="POST"><input type="email" name="email"><button type="submit">Entrar</button></form>',
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__9",
    tags: ["html", "input", "type", "formulario", "campo"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question:
      "Qual atributo da tag <input> define o tipo de campo de formulário exibido?",
    options: [
      "O atributo type (text, email, password, number, checkbox…)",
      "O atributo kind (text, email, password, number, checkbox…)",
      "O atributo mode (text, email, password, number, checkbox…)",
      "O atributo format (text, email, password, number, checkbox…)",
    ],
    correctIndex: 0,
    explanation:
      "O atributo type do <input> determina o comportamento e visual do campo. type='text' cria campo de texto simples; type='email' valida formato de e-mail; type='password' oculta os caracteres; type='checkbox' cria caixa de seleção; type='submit' cria botão de envio.",
    example:
      '<input type="email" placeholder="seu@email.com"> — campo com validação automática de formato de e-mail.',
  },
  {
    id: "linguagens-de-programacao__HTML__Fácil__10",
    tags: ["html", "comentario", "syntax", "codigo"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Fácil",
    question: "Qual é a sintaxe correta para inserir um comentário em HTML?",
    options: [
      "<!-- texto do comentário --> , ignorado pelo navegador",
      "// texto do comentário , como em JavaScript e C",
      "/* texto do comentário */ , como em CSS e Java",
      "# texto do comentário , como em Python e Shell",
    ],
    correctIndex: 0,
    explanation:
      "Comentários HTML usam a sintaxe <!-- comentário -->. São ignorados pelo navegador e não aparecem na página, mas ficam visíveis no código-fonte. Úteis para documentar o HTML ou desativar trechos temporariamente durante o desenvolvimento.",
    example:
      "<!-- Seção de cabeçalho --><header>...</header> <!-- TODO: adicionar logo -->",
  },

  // ─────────────────────────────────────────
  // HTML – Médio
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__HTML__Médio__1",
    tags: ["html", "alt", "acessibilidade", "img", "seo"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Para que serve o atributo alt na tag <img> e por que é importante?",
    options: [
      "Texto alternativo exibido se a imagem falhar e lido por leitores de tela",
      "Legenda exibida abaixo da imagem quando o usuário passa o mouse",
      "Título da imagem exibido na barra de status do navegador",
      "Descrição usada apenas por ferramentas de desenvolvedor no DevTools",
    ],
    correctIndex: 0,
    explanation:
      "O atributo alt fornece um texto descritivo da imagem. Ele é exibido quando a imagem não carrega, lido por leitores de tela para deficientes visuais e indexado por mecanismos de busca. Imagens decorativas devem ter alt='' (vazio) para serem ignoradas por assistive tech.",
    example:
      '<img src="grafico-vendas.png" alt="Gráfico de barras mostrando crescimento de 40% nas vendas"> — alt descritivo e útil.',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__2",
    tags: ["html", "div", "span", "bloco", "inline"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question: "Qual a diferença fundamental entre as tags <div> e <span>?",
    options: [
      "<div> é elemento de bloco; <span> é elemento inline sem semântica",
      "<div> é elemento inline; <span> é elemento de bloco genérico",
      "Ambas são idênticas funcionalmente, apenas com nomes diferentes",
      "<div> é para agrupamento de imagens; <span> é exclusivo para texto",
    ],
    correctIndex: 0,
    explanation:
      "<div> (division) é um contêiner de bloco genérico — ocupa toda a largura disponível e quebra a linha. <span> é um contêiner inline genérico — envolve parte do texto sem quebrar a linha. Ambos não têm semântica própria e são usados quando nenhum elemento semântico (article, section, strong) é adequado.",
    example:
      '<div class="card">...</div> — agrupa bloco de conteúdo. <p>Texto <span class="destaque">importante</span> aqui.</p> — marca trecho inline.',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__3",
    tags: ["html", "id", "class", "atributos", "seletores"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question: "Qual a diferença entre os atributos id e class em HTML?",
    options: [
      "id deve ser único na página; class pode ser reutilizada em vários elementos",
      "id pode se repetir livremente; class deve ser única por documento",
      "São equivalentes — apenas diferem na sintaxe de seleção CSS",
      "id é para ser estilizado em CSS; class é exclusiva para JavaScript",
    ],
    correctIndex: 0,
    explanation:
      "O atributo id identifica unicamente um elemento na página — não deve se repetir. É usado para links âncora (#id), manipulação direta com getElementById e seletores CSS de alta especificidade. O class pode ser aplicado a múltiplos elementos e um elemento pode ter múltiplas classes.",
    example:
      '<header id="topo">...</header> — único na página. <button class="btn btn-primary">Salvar</button> — múltiplas classes reutilizáveis.',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__4",
    tags: ["html", "main", "semantica", "html5", "acessibilidade"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Qual tag HTML5 representa a área de conteúdo principal e único do documento?",
    options: [
      "<main>, indica o conteúdo central único excluindo header, nav e footer",
      "<body>, que contém todo o conteúdo visível da página",
      "<section>, que delimita uma seção temática principal",
      "<content>, tag semân­tica para o conteúdo central da página",
    ],
    correctIndex: 0,
    explanation:
      "A tag <main> marca o conteúdo principal único da página — deve ocorrer apenas uma vez e não deve estar dentro de article, aside, footer, header ou nav. Leitores de tela usam <main> para pular diretamente ao conteúdo principal, melhorando a acessibilidade.",
    example:
      "<body><header>...</header><nav>...</nav><main><article>Conteúdo</article></main><footer>...</footer></body>",
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__5",
    tags: ["html", "doctype", "html5", "declaracao", "w3c"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "O que é a declaração <!DOCTYPE html> e por que ela é necessária?",
    options: [
      "Informa ao navegador que o documento usa a versão HTML5",
      "Define o tipo de servidor web que hospeda a página",
      "Especifica o charset padrão ISO ou UTF-8 do documento",
      "Indica a versão do CSS usada na folha de estilos vinculada",
    ],
    correctIndex: 0,
    explanation:
      "DOCTYPE não é uma tag HTML, mas uma instrução ao navegador sobre a versão do HTML usada. <!DOCTYPE html> ativa o modo padrão (standards mode) do HTML5. Sem ela, navegadores podem entrar em 'quirks mode', interpretando CSS e HTML de forma inconsistente.",
    example:
      "<!DOCTYPE html> é sempre a primeira linha do documento, antes de <html>, garantindo renderização previsível em todos os browsers.",
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__6",
    tags: ["html", "strong", "b", "semantica", "negrito"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Qual a diferença semântica entre as tags <strong> e <b> em HTML5?",
    options: [
      "<strong> indica importância semântica; <b> aplica negrito sem semântica",
      "São idênticas — ambas renderizam negrito com o mesmo significado",
      "<b> indica importância semântica; <strong> é apenas estilístico",
      "<strong> é HTML5 moderno; <b> é obsoleta e inválida no W3C",
    ],
    correctIndex: 0,
    explanation:
      "Em HTML5, <strong> carrega significado semântico: indica que o texto tem forte importância, urgência ou seriedade — leitores de tela podem enfatizá-lo. A tag <b> apenas instrui o browser a exibir negrito sem nenhum significado extra. Prefira <strong> quando o texto for genuinamente importante.",
    example:
      "<p><strong>Aviso:</strong> salve seu trabalho antes de continuar.</p> vs <p>Texto em <b>negrito</b> decorativo.</p>",
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__7",
    tags: ["html", "viewport", "meta", "responsivo", "mobile"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Para que serve a meta tag <meta name='viewport'> em páginas HTML?",
    options: [
      "Controla a escala e largura inicial para layouts responsivos em mobile",
      "Define o autor e descrição da página para indexação em SEO",
      "Especifica o idioma padrão do conteúdo para tradução automática",
      "Configura o tempo de cache do navegador para os recursos da página",
    ],
    correctIndex: 0,
    explanation:
      "Sem a meta viewport, navegadores mobile renderizam a página com a largura de um desktop (tipicamente 980px) e depois reduzem o zoom. Com <meta name='viewport' content='width=device-width, initial-scale=1'>, a página usa a largura real do dispositivo, essencial para design responsivo com media queries.",
    example:
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"> — tag essencial para sites responsivos.',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__8",
    tags: ["html", "data-", "atributos-customizados", "javascript", "dataset"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "O que são atributos data-* em HTML5 e como são acessados via JS?",
    options: [
      "Atributos customizados para armazenar dados extras, acessíveis via element.dataset",
      "Atributos que definem o tipo de dado aceito pelo campo de formulário",
      "Atributos reservados pelo W3C para uso interno dos navegadores",
      "Atributos que substituem id e class na identificação de elementos",
    ],
    correctIndex: 0,
    explanation:
      "Os atributos data-* permitem armazenar informações customizadas diretamente em elementos HTML sem precisar de atributos não-padrão. São acessados via JavaScript pela propriedade dataset. Por exemplo, data-user-id vira element.dataset.userId (camelCase automático).",
    example:
      '<button data-produto-id="42" data-acao="comprar">Comprar</button> — JS: btn.dataset.produtoId === "42".',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__9",
    tags: ["html", "video", "html5", "media", "controls"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Qual tag HTML5 incorpora vídeo nativamente na página sem precisar de plugins?",
    options: [
      "<video> com atributos src, controls, autoplay e muted",
      "<embed> com atributos src, controls, autoplay e muted",
      "<object> com atributos src, controls, autoplay e muted",
      "<media> com atributos src, controls, autoplay e muted",
    ],
    correctIndex: 0,
    explanation:
      "A tag <video> do HTML5 permite incorporar vídeos sem plugins como Flash. Suporta múltiplos formatos via <source> (MP4, WebM, Ogg). O atributo controls exibe os controles nativos do browser; autoplay inicia automaticamente; muted é necessário para autoplay funcionar na maioria dos browsers.",
    example:
      '<video controls width="640"><source src="video.mp4" type="video/mp4"><source src="video.webm" type="video/webm">Seu browser não suporta vídeo.</video>',
  },
  {
    id: "linguagens-de-programacao__HTML__Médio__10",
    tags: ["html", "tabela", "table", "thead", "tbody"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Médio",
    question:
      "Qual é a estrutura semântica correta de uma tabela HTML com cabeçalho?",
    options: [
      "<table> com <thead>/<th> para cabeçalho e <tbody>/<td> para dados",
      "<table> com <header>/<th> para cabeçalho e <body>/<td> para dados",
      "<grid> com <head>/<col> para cabeçalho e <rows>/<cell> para dados",
      "<table> com <tr> único contendo apenas <td> para todos os dados",
    ],
    correctIndex: 0,
    explanation:
      "Uma tabela semântica usa: <thead> para o grupo de linhas de cabeçalho (com <th>), <tbody> para os dados (com <td>) e opcionalmente <tfoot> para o rodapé. As tags <th> têm semântica extra — leitores de tela associam colunas/linhas ao cabeçalho correspondente.",
    example:
      "<table><thead><tr><th>Nome</th><th>Nota</th></tr></thead><tbody><tr><td>Ana</td><td>9.5</td></tr></tbody></table>",
  },

  // ─────────────────────────────────────────
  // HTML – Difícil
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__HTML__Difícil__1",
    tags: ["html", "dom", "arvore", "javascript", "browser"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "O que é o DOM (Document Object Model) e como ele se relaciona com o HTML?",
    options: [
      "Representação em árvore do documento HTML que JavaScript pode manipular",
      "Protocolo de comunicação entre a página HTML e o servidor web",
      "Modelo de dados que define quais tags são válidas no HTML5",
      "Sistema de cache que armazena o estado da página no navegador",
    ],
    correctIndex: 0,
    explanation:
      "O DOM é uma API que representa o documento HTML como uma árvore de nós (elementos, atributos, texto). O browser cria o DOM ao fazer o parse do HTML. JavaScript usa essa árvore para ler e modificar o conteúdo, estrutura e estilos da página dinamicamente sem recarregar.",
    example:
      "document.querySelector('h1').textContent = 'Novo título'; — modifica o DOM, refletindo imediatamente na página sem recarregar o HTML.",
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__2",
    tags: ["html", "script", "defer", "async", "performance"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "Qual a diferença entre os atributos defer e async na tag <script>?",
    options: [
      "defer executa após o HTML estar pronto; async executa assim que o arquivo baixar",
      "async executa após o HTML estar pronto; defer assim que o arquivo baixar",
      "Ambos bloqueiam igualmente o parsing do HTML até serem executados",
      "São equivalentes — apenas diferem em compatibilidade com browsers antigos",
    ],
    correctIndex: 0,
    explanation:
      "Sem atributos, <script> bloqueia o parsing. Com async, o script baixa em paralelo e executa imediatamente ao terminar (podendo interromper o parsing). Com defer, o script baixa em paralelo mas executa só após o HTML ser completamente parseado, na ordem de aparição. defer é ideal para scripts que dependem do DOM.",
    example:
      '<script src="analytics.js" async></script> — analytics independente. <script src="app.js" defer></script> — app que depende do DOM.',
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__3",
    tags: [
      "html",
      "web-components",
      "custom-elements",
      "shadow-dom",
      "template",
    ],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question: "O que são Web Components e quais três tecnologias os compõem?",
    options: [
      "Custom Elements, Shadow DOM e HTML Templates para componentes reutilizáveis",
      "Web Workers, Service Workers e Fetch API para apps offline-first",
      "IndexedDB, WebSockets e WebRTC para comunicação em tempo real",
      "Canvas API, SVG e WebGL para renderização gráfica no browser",
    ],
    correctIndex: 0,
    explanation:
      "Web Components são um conjunto de APIs nativas do browser para criar elementos HTML customizados e reutilizáveis. Custom Elements define novos elementos HTML (<meu-card>). Shadow DOM encapsula estilos e DOM. HTML Templates (<template>) define markup inativo clonável.",
    example:
      "class MeuBotao extends HTMLElement { connectedCallback() { this.innerHTML = '<button>Clique</button>'; } } customElements.define('meu-botao', MeuBotao);",
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__4",
    tags: ["html", "srcset", "imagens-responsivas", "resolucao", "picture"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "Como o atributo srcset na tag <img> permite imagens responsivas?",
    options: [
      "Lista imagens para diferentes resoluções/larguras e o browser escolhe a melhor",
      "Define múltiplos formatos de fallback para compatibilidade com browsers antigos",
      "Carrega múltiplas imagens em sequência criando um slideshow automático",
      "Especifica versões comprimidas da mesma imagem para economizar banda",
    ],
    correctIndex: 0,
    explanation:
      "O atributo srcset fornece ao browser um conjunto de imagens candidatas com suas larguras (w) ou densidades de pixel (x). O browser escolhe a mais adequada considerando: largura do viewport, densidade de pixels do dispositivo e condições de rede. Combinado com sizes, permite controle fino sobre qual imagem carregar.",
    example:
      '<img src="img-800.jpg" srcset="img-400.jpg 400w, img-800.jpg 800w, img-1600.jpg 1600w" sizes="(max-width: 600px) 400px, 800px" alt="Descrição">',
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__5",
    tags: ["html", "aria", "acessibilidade", "wai", "roles"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "O que é WAI-ARIA e qual sua função principal em documentos HTML?",
    options: [
      "Conjunto de atributos que tornam elementos acessíveis para tecnologias assistivas",
      "Regras do W3C para validar a estrutura semântica de documentos HTML",
      "Framework de animações interativas para interfaces web modernas",
      "Padrão de nomenclatura de classes e IDs para CSS e JavaScript",
    ],
    correctIndex: 0,
    explanation:
      "WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) define atributos como role, aria-label, aria-expanded, aria-live que comunicam às tecnologias assistivas (leitores de tela) o propósito e estado de elementos dinâmicos. É especialmente importante para widgets customizados que não usam HTML semântico nativo.",
    example:
      '<button aria-expanded="false" aria-controls="menu">Menu</button><ul id="menu" hidden>...</ul> — comunica estado do menu ao leitor de tela.',
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__6",
    tags: ["html", "section", "article", "aside", "semantica"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "Qual a diferença semântica entre <section>, <article> e <aside>?",
    options: [
      "<article> é conteúdo independente e redistribuível; <section> agrupa temas relacionados; <aside> é conteúdo complementar",
      "<section> é conteúdo independente; <article> agrupa seções temáticas; <aside> serve para a navegação principal",
      "São intercambiáveis — a diferença é apenas visual e depende do CSS aplicado",
      "<aside> é o conteúdo principal; <section> e <article> são sempre periféricos",
    ],
    correctIndex: 0,
    explanation:
      "<article> representa conteúdo autossuficiente que faz sentido sozinho (post, notícia, comentário). <section> agrupa conteúdo tematicamente relacionado dentro de um contexto maior. <aside> contém conteúdo tangencialmente relacionado ao principal (biografia do autor, publicidade, links relacionados).",
    example:
      "<main><article><h2>Post do Blog</h2><section><h3>Introdução</h3>...</section></article><aside><h3>Artigos Relacionados</h3></aside></main>",
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__7",
    tags: ["html", "seguranca", "noopener", "noreferrer", "target-blank"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "Por que usar rel='noopener noreferrer' em links com target='_blank'?",
    options: [
      "Impede acesso ao window.opener e omite o Referer header por segurança",
      "Melhora o SEO sinalizando ao Google que são links externos confiáveis",
      "Garante que o link abra em nova aba em todos os browsers modernos",
      "Permite que o link funcione mesmo com JavaScript desabilitado",
    ],
    correctIndex: 0,
    explanation:
      "target='_blank' sem proteção permite que a página aberta acesse window.opener, podendo redirecionar a aba original (tabnapping). noopener impede esse acesso. noreferrer additionally omite o cabeçalho HTTP Referer, não enviando a URL de origem para o destino. Browsers modernos aplicam noopener por padrão, mas é boa prática ser explícito.",
    example:
      '<a href="https://external.com" target="_blank" rel="noopener noreferrer">Site Externo</a> — prática segura para links externos.',
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__8",
    tags: ["html", "template", "html5", "clone", "javascript"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "Como funciona o elemento <template> e qual seu uso principal em HTML5?",
    options: [
      "Contém HTML inativo (não renderizado) que pode ser clonado via JavaScript",
      "Define folhas de estilos CSS modulares e reutilizáveis entre páginas",
      "Cria fragmentos de HTML que são renderizados imediatamente no DOM",
      "Substitui a tag <div> para agrupamento semântico no HTML5 moderno",
    ],
    correctIndex: 0,
    explanation:
      "O conteúdo de <template> não é renderizado pelo browser, não executa scripts nem carrega imagens. É acessado via JavaScript como um DocumentFragment através de template.content. É ideal para definir estruturas repetíveis (cartões, linhas de tabela) que serão clonadas dinamicamente.",
    example:
      "<template id='card-tpl'><div class='card'><h3></h3><p></p></div></template> — JS: const clone = document.getElementById('card-tpl').content.cloneNode(true);",
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__9",
    tags: ["html", "shadow-dom", "web-components", "encapsulamento", "css"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "O que é o Shadow DOM e qual problema de desenvolvimento ele resolve?",
    options: [
      "Encapsula uma subárvore DOM e CSS isolando-os do documento principal",
      "Cria uma cópia oculta do DOM para facilitar debugging no DevTools",
      "Otimiza o rendering ocultando elementos que estão fora da viewport",
      "Define a camada de sombra visual para criar efeitos 3D em elementos",
    ],
    correctIndex: 0,
    explanation:
      "O Shadow DOM cria um escopo encapsulado de DOM e CSS dentro de um elemento. Estilos definidos dentro do shadow root não 'vazam' para fora, e estilos globais da página não afetam o componente internamente. Isso resolve o problema de colisão de estilos em componentes reutilizáveis, como os usados em Web Components.",
    example:
      "const shadow = element.attachShadow({mode: 'open'}); shadow.innerHTML = '<style>p{color:red}</style><p>Só este parágrafo fica vermelho.</p>';",
  },
  {
    id: "linguagens-de-programacao__HTML__Difícil__10",
    tags: ["html", "contenteditable", "edicao", "richtext", "dom"],
    track: "linguagens-de-programacao",
    category: "HTML",
    difficulty: "Difícil",
    question:
      "O que é o atributo contenteditable e como ele funciona na prática?",
    options: [
      "Torna o conteúdo do elemento editável diretamente pelo usuário no browser",
      "Define se o conteúdo do elemento pode ser selecionado e copiado",
      "Permite que scripts e eventos modifiquem o conteúdo HTML do elemento",
      "Habilita animações de entrada e saída aplicadas ao conteúdo do elemento",
    ],
    correctIndex: 0,
    explanation:
      "Com contenteditable='true', o usuário pode clicar no elemento e editar seu conteúdo como em um editor de texto. É a base de editores rich-text no browser. As alterações ficam no DOM mas não são persistidas automaticamente — deve-se capturar o conteúdo com innerHTML ou innerText e salvá-lo via JavaScript.",
    example:
      '<div contenteditable="true" id="editor">Clique para editar este texto.</div> — JS: document.getElementById("editor").innerHTML para pegar o conteúdo.',
  },

  // ─────────────────────────────────────────
  // CSS – Fácil
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__CSS__Fácil__1",
    tags: ["css", "fundamentos", "sigla", "estilo"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "O que significa a sigla CSS?",
    options: [
      "Cascading Style Sheets (folhas de estilo em cascata)",
      "Computer Style and Scripting language",
      "Colorful Style and Spacing language",
      "Custom Script and Style notation",
    ],
    correctIndex: 0,
    explanation:
      "CSS significa Cascading Style Sheets. 'Cascading' refere-se à forma como regras conflitantes são resolvidas seguindo uma hierarquia de especificidade e ordem. 'Style Sheets' indica que é uma folha (arquivo) de instruções de estilo visual aplicados a documentos HTML.",
    example:
      "body { font-family: Arial, sans-serif; color: #333; } — regra CSS que aplica fonte e cor a todos os elementos do body.",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__2",
    tags: ["css", "seletores", "classe", "id", "especificidade"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question:
      "Qual a diferença entre seletores de classe (.) e de ID (#) em CSS?",
    options: [
      "Classe pode ser reutilizada em vários elementos; ID deve ser único na página",
      "ID pode se repetir livremente; classe deve ser única por documento HTML",
      "São equivalentes — apenas diferem na sintaxe de escrita no CSS",
      "Classe tem maior especificidade que ID, sobrescrevendo suas regras",
    ],
    correctIndex: 0,
    explanation:
      "O seletor de classe (.nome) aplica estilos a todos os elementos com aquela classe — pode existir em múltiplos elementos. O seletor de ID (#nome) aplica a um único elemento identificado por aquele ID. IDs têm maior especificidade (100 pontos vs 10 pontos das classes), tornando seus estilos mais difíceis de sobrescrever.",
    example:
      ".botao { color: blue; } — aplica a todos com class='botao'. #logo { width: 100px; } — aplica apenas ao elemento com id='logo'.",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__3",
    tags: ["css", "inline", "style", "atributo", "prioridade"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question:
      "Como aplicar estilos CSS diretamente em um elemento HTML (inline)?",
    options: [
      "Usando o atributo style='propriedade: valor' diretamente na tag HTML",
      "Usando a tag <style> com seletor diretamente dentro do elemento",
      "Importando um arquivo .css pelo atributo href na tag do elemento",
      "Adicionando o atributo css='propriedade: valor' na tag HTML",
    ],
    correctIndex: 0,
    explanation:
      "CSS inline é aplicado via atributo style diretamente na tag. Tem a maior especificidade dentre os métodos normais (supera classes, IDs e folhas externas), mas dificulta manutenção. Não use para estilização geral — prefira classes em arquivos .css externos ou <style> no <head>.",
    example:
      '<p style="color: red; font-size: 18px;">Texto vermelho inline.</p> — CSS aplicado somente a este parágrafo.',
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__4",
    tags: ["css", "color", "cor", "texto", "propriedade"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "Qual propriedade CSS define a cor do texto de um elemento?",
    options: [
      "color, aceita nomes, hex (#ff0000), rgb() ou hsl()",
      "text-color, aceita nomes, hex (#ff0000), rgb() ou hsl()",
      "font-color, aceita nomes, hex (#ff0000), rgb() ou hsl()",
      "foreground, aceita nomes, hex (#ff0000), rgb() ou hsl()",
    ],
    correctIndex: 0,
    explanation:
      "A propriedade color define a cor do texto e é herdada pelos elementos filhos. Aceita: nomes de cor (red, blue), hexadecimal (#FF5733), rgb(255, 87, 51), rgba(255, 87, 51, 0.5) com transparência, e hsl(9, 100%, 60%). É uma das propriedades mais básicas e amplamente utilizadas do CSS.",
    example:
      "h1 { color: #2563eb; } p { color: rgb(51, 51, 51); } a { color: hsl(220, 90%, 50%); }",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__5",
    tags: ["css", "box-model", "margin", "padding", "border"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "O que é o Box Model (modelo de caixa) no CSS?",
    options: [
      "Modelo que define content, padding, border e margin de cada elemento",
      "Modelo que define largura, altura, cor e fonte de cada elemento",
      "Sistema de grade para posicionar elementos em linhas e colunas",
      "Conjunto de propriedades específico para criar caixas de diálogo modais",
    ],
    correctIndex: 0,
    explanation:
      "Todo elemento HTML é representado como uma caixa retangular composta de: content (conteúdo), padding (espaço interno entre conteúdo e borda), border (borda ao redor do padding), e margin (espaço externo entre a caixa e outros elementos). Entender o box model é essencial para calcular tamanhos e espaçamentos precisos.",
    example:
      "div { width: 200px; padding: 20px; border: 2px solid black; margin: 10px; } — largura total visual: 200+20+20+2+2 = 244px (sem border-box).",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__6",
    tags: ["css", "padding", "espaco-interno", "box-model"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "Qual propriedade CSS controla o espaço interno de um elemento?",
    options: [
      "padding, define o espaço entre o conteúdo e a borda do elemento",
      "margin, define o espaço entre o conteúdo e a borda do elemento",
      "spacing, define o espaço entre o conteúdo e a borda do elemento",
      "gap, define o espaço entre o conteúdo e a borda do elemento",
    ],
    correctIndex: 0,
    explanation:
      "O padding é o espaço interno entre o conteúdo e a borda do elemento. Pode ser definido para todos os lados (padding: 20px), por eixos (padding: 10px 20px para vertical/horizontal) ou individualmente (padding-top, padding-right, padding-bottom, padding-left). O fundo do elemento se estende pelo padding area.",
    example:
      "button { padding: 12px 24px; } — 12px acima/abaixo e 24px esquerda/direita, criando um botão confortável de clicar.",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__7",
    tags: ["css", "text-align", "centralizar", "layout"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "Como centralizar um texto horizontalmente em CSS?",
    options: [
      "Usando text-align: center no elemento que contém o texto",
      "Usando align: center no elemento pai do texto",
      "Usando justify: center no elemento pai do texto",
      "Usando position: center no elemento que contém o texto",
    ],
    correctIndex: 0,
    explanation:
      "text-align: center centraliza o texto (e elementos inline) dentro de seu contêiner de bloco. Funciona para textos, imagens inline e outros elementos inline. Para centralizar um bloco em si (como um div), usa-se margin: 0 auto com largura definida. Para centralização vertical, usa-se flexbox ou grid.",
    example:
      "h1 { text-align: center; } .logo { text-align: center; } — centraliza titulo e imagem dentro de seus contêineres.",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__8",
    tags: ["css", "font-size", "tamanho", "fonte", "tipografia"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "Qual propriedade CSS define o tamanho da fonte de um texto?",
    options: [
      "font-size, aceita px, em, rem, %, vw, vh e outras unidades",
      "text-size, aceita px, em, rem, %, vw, vh e outras unidades",
      "font-scale, aceita px, em, rem, %, vw, vh e outras unidades",
      "letter-size, aceita px, em, rem, %, vw, vh e outras unidades",
    ],
    correctIndex: 0,
    explanation:
      "font-size define o tamanho da fonte. Pode usar: px (pixels absolutos), em (relativo ao font-size do elemento pai), rem (relativo ao font-size do elemento raiz <html>), % (porcentagem do pai), vw/vh (relativo à viewport). O padrão da maioria dos browsers é 16px para o body.",
    example:
      "body { font-size: 16px; } h1 { font-size: 2rem; } /* = 32px */ p { font-size: 1em; } /* = 16px, herdado */",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__9",
    tags: ["css", "display-none", "visibility", "ocultar", "layout"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "O que a declaração display: none faz com um elemento na página?",
    options: [
      "Remove o elemento completamente do fluxo visual e de acessibilidade",
      "Torna o elemento transparente mas mantém o espaço ocupado no layout",
      "Reduz a opacidade do elemento a zero sem removê-lo do fluxo",
      "Oculta o elemento visualmente mas preserva seu espaço no layout",
    ],
    correctIndex: 0,
    explanation:
      "display: none remove o elemento do fluxo do documento — ele não ocupa espaço, não é visível e é ignorado por leitores de tela. Difere de visibility: hidden (oculta mas mantém espaço) e opacity: 0 (invisível mas mantém espaço e é ainda clicável). É amplamente usado para mostrar/esconder elementos com JavaScript.",
    example:
      ".modal { display: none; } .modal.ativo { display: flex; } — esconde/mostra modal via toggle de classe com JavaScript.",
  },
  {
    id: "linguagens-de-programacao__CSS__Fácil__10",
    tags: ["css", "background-color", "fundo", "cor", "background"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Fácil",
    question: "Qual propriedade CSS define a cor de fundo de um elemento?",
    options: [
      "background-color, aceita nomes, hex, rgb(), rgba() ou hsl()",
      "bg-color, aceita nomes, hex, rgb(), rgba() ou hsl()",
      "background é exclusiva para cores sólidas no CSS puro",
      "fill-color, aceita nomes, hex, rgb(), rgba() ou hsl()",
    ],
    correctIndex: 0,
    explanation:
      "background-color define a cor sólida de fundo de um elemento. A shorthand background aceita cor, imagem, posição, tamanho e outras propriedades juntas. background-color fica atrás do conteúdo e cobre a área de content + padding. Usar transparent para herdar o fundo do pai.",
    example:
      "body { background-color: #f8fafc; } .card { background-color: white; } .alerta { background-color: rgba(239, 68, 68, 0.1); }",
  },

  // ─────────────────────────────────────────
  // CSS – Médio
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__CSS__Médio__1",
    tags: ["css", "position", "relative", "absolute", "layout"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question:
      "Qual a diferença entre position: relative e position: absolute em CSS?",
    options: [
      "relative desloca a si mesmo sem sair do fluxo; absolute remove do fluxo e posiciona relativo ao ancestral posicionado",
      "absolute desloca a si mesmo sem sair do fluxo; relative remove do fluxo e posiciona relativo ao ancestral",
      "São equivalentes visualmente — diferem apenas na referência de cálculo",
      "relative remove o elemento do fluxo; absolute o mantém no fluxo normal",
    ],
    correctIndex: 0,
    explanation:
      "position: relative move o elemento das coordenadas top/left/right/bottom em relação à sua posição original, mas mantém o espaço no fluxo. position: absolute remove o elemento do fluxo e o posiciona em relação ao ancestral mais próximo com position diferente de static (ou à viewport se não houver). Muito usado em conjunto: pai relative + filho absolute.",
    example:
      ".container { position: relative; } .badge { position: absolute; top: 0; right: 0; } — badge posicionado no canto do contêiner.",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__2",
    tags: ["css", "flexbox", "display-flex", "layout", "alinhamento"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question:
      "O que é Flexbox em CSS e qual propriedade principal o ativa num contêiner?",
    options: [
      "Modelo de layout unidimensional ativado com display: flex no contêiner",
      "Modelo de layout bidimensional ativado com display: flex no contêiner",
      "Sistema de grade multidimensional ativado com display: flex no contêiner",
      "Modelo de animação de itens sequenciais ativado com display: flex",
    ],
    correctIndex: 0,
    explanation:
      "Flexbox (Flexible Box Layout) é um modelo de layout unidimensional — trabalha em uma direção por vez (linha ou coluna). Ao definir display: flex no elemento pai, os filhos diretos tornam-se flex items. Propriedades do contêiner: justify-content (eixo principal), align-items (eixo cruzado), flex-direction, flex-wrap.",
    example:
      ".nav { display: flex; justify-content: space-between; align-items: center; } — distribui itens horizontalmente com alinhamento vertical.",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__3",
    tags: ["css", "margin", "padding", "espaco", "box-model"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question: "Qual a diferença entre as propriedades margin e padding em CSS?",
    options: [
      "margin é espaço externo fora da borda; padding é espaço interno entre conteúdo e borda",
      "padding é espaço externo fora da borda; margin é espaço interno de conteúdo",
      "São equivalentes — apenas refletem diferentes lados do Box Model",
      "margin afeta somente elementos de bloco; padding funciona em qualquer elemento",
    ],
    correctIndex: 0,
    explanation:
      "No Box Model: padding é o espaço entre o conteúdo e a borda — faz parte do elemento, herda o background-color. margin é o espaço externo entre a borda do elemento e os elementos vizinhos — é sempre transparente. Margens adjacentes de elementos em bloco podem colapsar (margin collapse).",
    example:
      ".cartao { padding: 24px; margin: 16px; border: 1px solid #ccc; } — padding dá espaço interno; margin separa os cartões entre si.",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__4",
    tags: ["css", "media-query", "responsivo", "breakpoint", "mobile"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question: "O que são media queries em CSS e para que são utilizadas?",
    options: [
      "Blocos de CSS condicionais aplicados baseados em características do dispositivo ou viewport",
      "Consultas ao servidor para buscar e carregar estilos CSS dinamicamente",
      "Regras CSS baseadas no estado atual do usuário (logado, idle, etc.)",
      "Mecanismo para importar arquivos CSS diferentes conforme o tema ativo",
    ],
    correctIndex: 0,
    explanation:
      "Media queries aplicam blocos de CSS somente quando determinadas condições são atendidas, como largura mínima/máxima da viewport, orientação (portrait/landscape) ou modo de cor. São a base do design responsivo, permitindo adaptar o layout para diferentes tamanhos de tela com os mesmos arquivos HTML/CSS.",
    example:
      "@media (max-width: 768px) { .sidebar { display: none; } .main { width: 100%; } } — esconde sidebar em telas pequenas.",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__5",
    tags: ["css", "unidades", "em", "rem", "px", "responsivo"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question: "Qual a diferença entre as unidades px, em e rem em CSS?",
    options: [
      "px é absoluto; em é relativo ao font-size do pai; rem é relativo ao elemento raiz <html>",
      "rem é absoluto; em é relativo ao elemento raiz; px é relativo ao elemento pai",
      "Todas são equivalentes e intercambiáveis em layouts modernos responsivos",
      "px depende da resolução do monitor; em e rem são valores fixos independentes",
    ],
    correctIndex: 0,
    explanation:
      "px é uma unidade absoluta (1px = 1 ponto na tela, ignorando configurações do usuário). em é relativa ao font-size do elemento pai — 1.5em em um elemento de 16px = 24px, mas pode acumular em contextos aninhados. rem é relativa ao font-size do <html> (normalmente 16px), sendo mais previsível para sistemas de design.",
    example:
      "html { font-size: 16px; } .titulo { font-size: 2rem; } /* sempre 32px */ .sub { font-size: 1.5em; } /* 1.5x do pai */",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__6",
    tags: ["css", "especificidade", "cascade", "conflito", "seletores"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question:
      "O que é especificidade (specificity) em CSS e como resolve conflitos?",
    options: [
      "Peso numérico de um seletor que determina qual regra prevalece em conflitos",
      "Número total de propriedades declaradas em um único bloco de regra CSS",
      "Ordem cronológica em que os estilos são aplicados pelo navegador",
      "Prioridade concedida a arquivos CSS externos em relação a estilos inline",
    ],
    correctIndex: 0,
    explanation:
      "Especificidade é calculada como um vetor (a, b, c): a = IDs, b = classes/atributos/pseudo-classes, c = elementos/pseudo-elementos. Inline style tem especificidade ainda maior. !important sobrescreve tudo (exceto outro !important mais específico). Quando há empate, a regra mais recente no código prevalece.",
    example:
      "#nav .link:hover { color: red; } /* (1,2,0) */ vs .link { color: blue; } /* (0,1,0) */ — a primeira vence por ser mais específica.",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__7",
    tags: ["css", "z-index", "empilhamento", "stacking", "posicionamento"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question: "Como a propriedade z-index funciona no CSS?",
    options: [
      "Controla a ordem de empilhamento de elementos posicionados na tela",
      "Define a profundidade visual da sombra (box-shadow) de um elemento",
      "Controla a transparência de elementos sobrepostos por porcentagem",
      "Define a camada de renderização exclusivamente em animações CSS",
    ],
    correctIndex: 0,
    explanation:
      "z-index funciona somente em elementos com position diferente de static (relative, absolute, fixed, sticky) ou em flex/grid items. Valores maiores ficam na frente. z-index cria ou participa de um stacking context. Elementos dentro do mesmo stacking context competem entre si, mas não com elementos de outros contextos.",
    example:
      ".modal-overlay { position: fixed; z-index: 100; } .modal { position: relative; z-index: 101; } .tooltip { position: absolute; z-index: 200; }",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__8",
    tags: ["css", "transition", "animacao", "hover", "smooth"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question:
      "Qual propriedade CSS cria transições suaves entre estados de um elemento?",
    options: [
      "transition, configurando propriedade, duração, easing e delay",
      "animation, configurando propriedade, duração, easing e delay",
      "motion, configurando propriedade, duração, easing e delay",
      "transform, configurando propriedade, duração, easing e delay",
    ],
    correctIndex: 0,
    explanation:
      "A propriedade transition anima a mudança de valores CSS entre estados (hover, focus, classe alterada por JS). Sintaxe: transition: propriedade duração easing delay. 'ease' acelera e desacelera suavemente. Para múltiplas propriedades, separe por vírgula. Use transition: all com cuidado — pode comprometer performance.",
    example:
      ".botao { background: blue; transition: background 0.3s ease, transform 0.2s; } .botao:hover { background: darkblue; transform: scale(1.05); }",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__9",
    tags: ["css", "pseudo-classe", "hover", "interatividade", "seletor"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question: "O que é a pseudo-classe :hover em CSS e quando ela se aplica?",
    options: [
      "Estilo aplicado ao elemento quando o cursor do mouse está sobre ele",
      "Estilo aplicado ao elemento quando ele é clicado pelo usuário",
      "Estilo aplicado ao elemento quando ele recebe foco via teclado",
      "Estilo aplicado ao elemento no momento em que é inserido no DOM",
    ],
    correctIndex: 0,
    explanation:
      "A pseudo-classe :hover aplica estilos quando o ponteiro do mouse posiciona sobre o elemento. Combinada com transition, cria efeitos suaves. Em dispositivos touch não existe hover real — use @media (hover: hover) para aplicar efeitos hover somente em dispositivos com mouse. Outras pseudo-classes comuns: :focus, :active, :visited.",
    example:
      ".card { transform: translateY(0); transition: transform 0.3s; } .card:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }",
  },
  {
    id: "linguagens-de-programacao__CSS__Médio__10",
    tags: ["css", "box-sizing", "border-box", "largura", "box-model"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Médio",
    question:
      "Como box-sizing: border-box altera o comportamento do Box Model?",
    options: [
      "Inclui padding e border no cálculo da largura/altura definida no CSS",
      "Exclui margin do cálculo da largura e altura total do elemento",
      "Inclui margin, padding e border no cálculo da largura/altura total",
      "Remove padding e border do Box Model, usando apenas o conteúdo",
    ],
    correctIndex: 0,
    explanation:
      "Por padrão (content-box), width define apenas o conteúdo — então um div de width: 200px com padding: 20px terá 240px de largura visual. Com border-box, width inclui padding e border — o mesmo div terá 200px visualmente, com o conteúdo reduzindo. Quase todos os projetos modernos usam * { box-sizing: border-box } globalmente.",
    example:
      "*, *::before, *::after { box-sizing: border-box; } /* reset universal recomendado */ .coluna { width: 50%; padding: 20px; } /* ocupa exatamente 50% */",
  },

  // ─────────────────────────────────────────
  // CSS – Difícil
  // ─────────────────────────────────────────
  {
    id: "linguagens-de-programacao__CSS__Difícil__1",
    tags: ["css", "grid", "flexbox", "layout", "bidimensional"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question: "Qual a principal diferença entre CSS Grid e Flexbox?",
    options: [
      "Grid é bidimensional (linhas e colunas simultâneas); Flexbox é unidimensional",
      "Flexbox é bidimensional (linhas e colunas); Grid é unidimensional",
      "Grid é exclusivo para layouts de impressão; Flexbox somente para telas",
      "São equivalentes em capacidade — apenas diferem na API de configuração",
    ],
    correctIndex: 0,
    explanation:
      "CSS Grid é projetado para layouts bidimensionais — controla posicionamento em linhas e colunas simultaneamente. Ideal para layouts de página completa. Flexbox é unidimensional — distribui itens em uma linha ou coluna. Na prática: use Grid para o layout macro da página e Flexbox para alinhar componentes menores internamente.",
    example:
      ".pagina { display: grid; grid-template-columns: 250px 1fr; grid-template-rows: auto 1fr auto; } — sidebar + main + footer em uma declaração.",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__2",
    tags: ["css", "custom-properties", "variaveis", "var", "design-token"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question:
      "O que são CSS Custom Properties (variáveis CSS) e como são declaradas e usadas?",
    options: [
      "Variáveis declaradas com --nome no escopo e consumidas com var(--nome)",
      "Propriedades nativas do CSS com valores padrão configuráveis pelo dev",
      "Constantes globais definidas pelo browser para uso em qualquer CSS",
      "Aliases de propriedades CSS para abreviações de escrita nas folhas",
    ],
    correctIndex: 0,
    explanation:
      "CSS Custom Properties são variáveis nativas do CSS definidas com dois hifens (--cor-primaria: #2563eb) e consumidas com var(--cor-primaria). São em cascata e herdam, podendo ser redefinidas em escopos menores. Podem ser alteradas via JavaScript com element.style.setProperty(). Essenciais para temas (dark mode) e sistemas de design.",
    example:
      ":root { --cor-primaria: #2563eb; --border-radius: 8px; } .botao { background: var(--cor-primaria); border-radius: var(--border-radius); }",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__3",
    tags: ["css", "calc", "funcao", "unidades-mistas", "calculo"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question:
      "Como a função calc() em CSS funciona e qual seu principal benefício?",
    options: [
      "Computa expressões matemáticas misturando unidades diferentes como px e %",
      "Calcula a especificidade total acumulada de um seletor CSS composto",
      "Converte automaticamente valores entre unidades absolutas e relativas",
      "Avalia expressões lógicas condicionais para decidir quais estilos aplicar",
    ],
    correctIndex: 0,
    explanation:
      "calc() permite operações matemáticas (+, -, *, /) misturando unidades incompatíveis (%, px, rem, vw). Isso seria impossível sem calc(). Suporta variáveis CSS: calc(var(--spacing) * 2). Usado extensivamente em layouts: subtrair a largura de um elemento fixo de 100% ou calcular alturas de viewport menos um header.",
    example:
      ".conteudo { width: calc(100% - 250px); height: calc(100vh - 64px); padding: calc(var(--spacing) * 1.5); } — combina % com px e variáveis.",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__4",
    tags: ["css", "pseudo-elementos", "before", "after", "conteudo-gerado"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question: "O que fazem os pseudo-elementos ::before e ::after em CSS?",
    options: [
      "Inserem conteúdo gerado virtualmente antes/depois do conteúdo do elemento",
      "Selecionam o primeiro/último elemento filho dentro do elemento pai",
      "Aplicam estilos de transição antes/depois da animação CSS completar",
      "Referenciam elementos irmãos anteriores/posteriores na estrutura do DOM",
    ],
    correctIndex: 0,
    explanation:
      "::before e ::after criam pseudo-elementos virtualmente dentro do elemento, antes e depois do conteúdo real. Requerem a propriedade content (pode ser vazio: ''). São renderizados como elementos inline por padrão e não existem no DOM real. Muito usados para decorações, ícones, clearfix e tooltips puramente em CSS.",
    example:
      '.titulo::before { content: "★ "; color: gold; } .clearfix::after { content: ""; display: table; clear: both; } — decoração e clearfix.',
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__5",
    tags: ["css", "stacking-context", "z-index", "empilhamento", "isolamento"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question: "O que é um stacking context (contexto de empilhamento) em CSS?",
    options: [
      "Agrupamento de elementos com hierarquia própria de z-index isolada do documento",
      "Região da página onde elementos podem se sobrepor livremente sem restrição",
      "Grupo de keyframes que compartilham um mesmo timeline de animação CSS",
      "Camada de isolamento criada automaticamente por qualquer display flex ou grid",
    ],
    correctIndex: 0,
    explanation:
      "Um stacking context é criado por elementos com: position+z-index, opacity < 1, transform, filter, isolation: isolate, entre outros. Elementos dentro do mesmo stacking context têm seus z-index comparados entre si — mas um elemento filho nunca pode sair visualmente 'na frente' do nível de stacking do contexto pai, independente do z-index.",
    example:
      ".modal { position: fixed; z-index: 9999; } .dentro-do-modal { position: absolute; z-index: 1; } /* z-index 1 dentro do stacking context do modal */",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__6",
    tags: ["css", "nth-child", "pseudo-classe", "seletor", "formula"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question:
      "Como funciona o seletor :nth-child() em CSS e quais fórmulas aceita?",
    options: [
      "Seleciona filhos por posição com fórmulas como 2n+1 (ímpares), 2n (pares)",
      "Seleciona elementos com base em sua classe CSS ou tipo de tag HTML",
      "Seleciona especificamente o n-ésimo elemento de determinado seletor de tipo",
      "Seleciona filhos que possuem um atributo com valor numérico específico",
    ],
    correctIndex: 0,
    explanation:
      ":nth-child(An+B) seleciona elementos na posição An+B (n=0,1,2…). Exemplos: :nth-child(2n) = pares, :nth-child(2n+1) = ímpares (= :nth-child(odd)), :nth-child(3n) = múltiplos de 3, :nth-child(-n+3) = primeiros 3. Parecido: :nth-of-type seleciona entre elementos do mesmo tipo, não todos os filhos.",
    example:
      "tr:nth-child(even) { background: #f5f5f5; } li:nth-child(-n+3) { font-weight: bold; } /* destaca os 3 primeiros itens */",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__7",
    tags: [
      "css",
      "critical-rendering-path",
      "performance",
      "render-blocking",
      "browser",
    ],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question:
      "O que é o Critical Rendering Path e como o CSS impacta a renderização?",
    options: [
      "CSS é render-blocking — o browser aguarda carregar e parsear o CSS antes de pintar",
      "CSS não interfere no Critical Rendering Path, sendo processado em paralelo",
      "CSS só bloqueia renderização quando o arquivo tem mais de 100 regras",
      "CSS é processado em uma thread separada sem bloquear o parser do HTML",
    ],
    correctIndex: 0,
    explanation:
      "O Critical Rendering Path é a sequência: HTML parsing → CSSOM build → Render Tree → Layout → Paint. O CSS é render-blocking: o browser não pinta a página enquanto o CSSOM não estiver completo, pois qualquer CSS poderia alterar o layout. Para otimizar: minimize CSS crítico, use media queries para CSS não-crítico, e evite @import em cascata.",
    example:
      '<link rel="stylesheet" href="critico.css"> — bloqueia render. <link rel="stylesheet" href="print.css" media="print"> — não bloqueia (condição nunca verdadeira na tela).',
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__8",
    tags: ["css", "clip-path", "recorte", "forma", "mascara"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question: "Como funciona a propriedade clip-path em CSS?",
    options: [
      "Define uma região de recorte geométrica que determina a área visível do elemento",
      "Cria uma sombra em formato de recorte ao redor do elemento estilizado",
      "Remove elementos invisíveis da viewport para otimizar o reflow do layout",
      "Corta o texto que excede as dimensões definidas para o elemento no CSS",
    ],
    correctIndex: 0,
    explanation:
      "clip-path recorta o elemento em uma forma geométrica, ocultando o que fica fora dessa área. Aceita: circle(), ellipse(), polygon(), inset() e path() SVG. A área recortada não é clicável. Pode ser animada com transition e @keyframes para efeitos de reveal. Afeta o visual mas não o layout (o espaço original é mantido).",
    example:
      ".avatar { clip-path: circle(50%); } /* círculo */ .banner { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); } /* diagonal no bottom */",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__9",
    tags: ["css", "will-change", "performance", "gpu", "otimizacao"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question: "Quando e por que usar a propriedade will-change em CSS?",
    options: [
      "Avisa o browser para criar uma camada GPU antecipando animações, mas usar com parcimônia",
      "Indica ao browser que certas propriedades do elemento nunca serão alteradas",
      "Desabilita animações em elementos para economizar recursos de CPU/GPU",
      "Previne que JavaScript modifique as propriedades listadas no elemento",
    ],
    correctIndex: 0,
    explanation:
      "will-change: transform, opacity indica ao browser que esses valores mudarão, promovendo o elemento a uma camada de composição separada na GPU. Isso elimina repaints durante a animação. Porém, cada camada consome memória — use apenas em elementos que realmente animam, por tempo limitado (idealmente via JS antes/depois da animação), não globalmente.",
    example:
      ".elemento-animado { will-change: transform; transition: transform 0.5s; } /* promove à GPU antecipadamente */ .elemento-animado:hover { transform: scale(1.1); }",
  },
  {
    id: "linguagens-de-programacao__CSS__Difícil__10",
    tags: ["css", "css-in-js", "styled-components", "scoped", "javascript"],
    track: "linguagens-de-programacao",
    category: "CSS",
    difficulty: "Difícil",
    question:
      "O que é CSS-in-JS e quais são suas principais vantagens em relação ao CSS tradicional?",
    options: [
      "Estilos escritos em JS com escopo automático, remoção de dead code e valores dinâmicos",
      "CSS compilado para JavaScript para reduzir o número de arquivos no bundle",
      "Técnica de importar arquivos .css diretamente em módulos JavaScript",
      "Padrão BEM de nomenclatura de classes implementado por ferramentas JavaScript",
    ],
    correctIndex: 0,
    explanation:
      "CSS-in-JS (styled-components, Emotion, vanilla-extract) escreve CSS em arquivos JavaScript, gerando nomes de classe únicos (escopo local automático, sem colisões). Vantagens: dead-code elimination (CSS não usado é removido), valores dinâmicos baseados em props/estado, co-localização de estilos com componentes. Desvantagem: overhead de runtime em algumas implementações.",
    example:
      "const Botao = styled.button` background: ${props => props.primary ? '#2563eb' : 'white'}; padding: 8px 16px; ` — CSS dinâmico com escopo automático.",
  },
];

const updated = [...existing, ...newCards];
fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf8");
console.log(
  `✅ Adicionados ${newCards.length} cards. Total agora: ${updated.length}`,
);
