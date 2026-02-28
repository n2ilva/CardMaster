import { Prisma } from "@prisma/client";

import { prisma } from "./prisma.js";

type PortCard = {
  category: string;
  level: "INICIANTE" | "JUNIOR" | "PLENO";
  question: string;
  answer: string;
  wrongOptions: string[];
  answerDescription: string;
};

// ─────────────────────────────────────────────────────
// CATEGORIA 1 — Compreensão e Interpretação de Textos
// ─────────────────────────────────────────────────────

const compreensaoCards: PortCard[] = [
  // ── INICIANTE (12 questões) ──
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question:
      "Qual a diferença entre ideia principal e ideia secundária em um texto?",
    answer:
      "A ideia principal é a tese central; as secundárias são argumentos ou exemplos que a sustentam",
    wrongOptions: [
      "São a mesma coisa, apenas em parágrafos diferentes",
      "A ideia secundária é sempre mais importante",
      "A ideia principal aparece somente no título",
    ],
    answerDescription:
      "A ideia principal (tese) é o ponto central que o autor defende. As ideias secundárias funcionam como suporte — exemplos, dados e argumentos que reforçam a tese.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que significa 'inferir' em uma leitura de texto?",
    answer:
      "Concluir algo que não está dito explicitamente, com base em pistas do texto",
    wrongOptions: [
      "Copiar uma frase do texto",
      "Resumir o texto em uma palavra",
      "Traduzir o texto para outra língua",
    ],
    answerDescription:
      "Inferir é ler nas entrelinhas — tirar conclusões lógicas a partir de informações implícitas, sem que o autor as declare diretamente.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question:
      "Qual tipo de texto tem como objetivo principal convencer o leitor?",
    answer: "Texto dissertativo-argumentativo",
    wrongOptions: ["Texto narrativo", "Texto descritivo", "Texto injuntivo"],
    answerDescription:
      "O texto dissertativo-argumentativo apresenta uma tese e a defende com argumentos, visando persuadir o leitor. É o tipo cobrado na redação do ENEM.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que é um texto narrativo?",
    answer:
      "Texto que conta uma história com personagens, enredo, tempo e espaço",
    wrongOptions: [
      "Texto que ensina a fazer algo",
      "Texto que descreve uma paisagem sem ação",
      "Texto que apresenta dados estatísticos",
    ],
    answerDescription:
      "A narrativa organiza eventos em sequência temporal, com elementos como narrador, personagens, conflito, clímax e desfecho.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que é um texto injuntivo (instrucional)?",
    answer:
      "Texto que orienta o leitor a realizar uma ação, como manuais e receitas",
    wrongOptions: [
      "Texto que narra uma aventura",
      "Texto que apresenta uma opinião",
      "Texto que descreve um sentimento",
    ],
    answerDescription:
      "O texto injuntivo usa verbos no imperativo ou infinitivo para instruir: receitas culinárias, bulas de remédio, tutoriais etc.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que é paráfrase?",
    answer:
      "Reescrever uma ideia com outras palavras, mantendo o sentido original",
    wrongOptions: [
      "Copiar o texto exatamente como está",
      "Contradizer o autor do texto",
      "Traduzir um texto de outra língua",
    ],
    answerDescription:
      "Paráfrase é a reformulação de um enunciado preservando seu significado. É uma habilidade essencial para interpretação e produção textual.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "Em um texto, o que indica a expressão 'em contrapartida'?",
    answer: "Introduz uma ideia oposta ou contrária à anterior",
    wrongOptions: [
      "Reforça a ideia anterior",
      "Apresenta uma conclusão",
      "Indica uma causa",
    ],
    answerDescription:
      "'Em contrapartida' é um conector de oposição/contraste, equivalente a 'por outro lado', 'entretanto'. Sinaliza mudança de perspectiva.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "Qual a função de um título em um texto?",
    answer: "Antecipar o tema, despertar interesse e orientar a leitura",
    wrongOptions: [
      "Substituir a conclusão",
      "Apenas enfeitar o texto",
      "Resumir todos os parágrafos",
    ],
    answerDescription:
      "O título funciona como porta de entrada do texto: antecipa o assunto, cria expectativas e pode conter recursos como ironia ou ambiguidade.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question:
      "Quando o autor diz 'Segundo pesquisas...', que estratégia argumentativa está usando?",
    answer: "Argumento de autoridade (citação de fonte confiável)",
    wrongOptions: [
      "Argumento por exemplificação",
      "Argumento por comparação",
      "Falácia lógica",
    ],
    answerDescription:
      "Citar pesquisas, especialistas ou dados oficiais é um argumento de autoridade — reforça a credibilidade da tese apoiando-se em fontes reconhecidas.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que é gênero textual?",
    answer:
      "Formato socialmente reconhecido de texto, como notícia, carta, e-mail, crônica",
    wrongOptions: [
      "O mesmo que tipo textual",
      "Apenas textos literários",
      "A língua em que o texto foi escrito",
    ],
    answerDescription:
      "Gêneros textuais são formas concretas de comunicação (carta, artigo, tweet). Diferem de tipos textuais (narração, descrição, argumentação), que são estruturas abstratas.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "O que é coerência textual?",
    answer:
      "A relação lógica e harmoniosa entre as ideias de um texto, garantindo que faça sentido",
    wrongOptions: [
      "O uso correto de vírgulas",
      "A quantidade de parágrafos",
      "A repetição de palavras-chave",
    ],
    answerDescription:
      "Coerência diz respeito ao sentido global do texto — as ideias não podem se contradizer e devem manter uma progressão lógica.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "INICIANTE",
    question: "Qual a diferença entre coesão e coerência?",
    answer:
      "Coesão liga as partes do texto com conectivos e referências; coerência garante o sentido lógico global",
    wrongOptions: [
      "São sinônimos",
      "Coesão é sobre o conteúdo e coerência sobre a forma",
      "Coerência só existe em textos narrativos",
    ],
    answerDescription:
      "Coesão = mecanismos linguísticos (pronomes, conjunções, sinônimos) que conectam as partes. Coerência = lógica interna do texto. Um texto coeso pode ser incoerente se as ideias se contradisserem.",
  },

  // ── JUNIOR (12 questões) ──
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question:
      "'Embora o projeto tenha mérito, sua execução foi desastrosa.' Qual a relação entre as orações?",
    answer: "Concessão — reconhece um fato, mas apresenta ressalva",
    wrongOptions: [
      "Causa e consequência",
      "Adição de ideias",
      "Explicação da primeira oração",
    ],
    answerDescription:
      "'Embora' é conjunção concessiva — indica que o fato seguinte contraria a expectativa gerada pela primeira oração, sem negá-la.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que são pressupostos em um texto?",
    answer:
      "Informações que o leitor pode deduzir a partir de marcas linguísticas do texto",
    wrongOptions: [
      "Informações inventadas pelo leitor",
      "O título do texto",
      "Dados explícitos no primeiro parágrafo",
    ],
    answerDescription:
      "Pressupostos são inferências marcadas linguisticamente: 'Ele parou de fumar' pressupõe que fumava antes. São diferentes de subentendidos (intencionais, dependem do contexto).",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "Qual a diferença entre linguagem formal e informal?",
    answer:
      "Formal segue a norma-padrão (contextos oficiais); informal é coloquial (contextos cotidianos)",
    wrongOptions: [
      "Formal é usada só em textos antigos",
      "Informal é sempre errada",
      "Não há diferença prática entre elas",
    ],
    answerDescription:
      "A variação de registro depende do contexto: uma petição judicial exige linguagem formal; uma conversa com amigos admite gírias e coloquialismos. Ambas são válidas em seus contextos.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que é intertextualidade?",
    answer:
      "Relação de um texto com outros textos, por citação, alusão ou paródia",
    wrongOptions: [
      "A tradução de um texto",
      "A leitura em voz alta",
      "A cópia integral de outro texto",
    ],
    answerDescription:
      "Intertextualidade ocorre quando um texto faz referência a outro — pode ser explícita (citação) ou implícita (alusão, paródia, pastiche).",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question:
      "Em 'A educação é a arma mais poderosa para mudar o mundo', que figura de linguagem há?",
    answer: "Metáfora",
    wrongOptions: ["Metonímia", "Hipérbole", "Pleonasmo"],
    answerDescription:
      "Metáfora é a comparação implícita (sem 'como'). A educação é comparada a uma arma — não literalmente, mas por seu poder transformador.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que é um editorial de jornal?",
    answer:
      "Texto opinativo que expressa a posição do veículo de comunicação sobre um tema atual",
    wrongOptions: [
      "Reportagem neutra sobre um evento",
      "Anúncio publicitário",
      "Carta do leitor",
    ],
    answerDescription:
      "O editorial é um gênero textual opinativo — não é assinado por um indivíduo, mas representa a opinião institucional do jornal ou revista.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question:
      "Qual a função dos conectivos 'portanto', 'logo', 'assim' em um texto?",
    answer: "Introduzir uma conclusão",
    wrongOptions: [
      "Introduzir uma causa",
      "Introduzir uma concessão",
      "Introduzir uma condição",
    ],
    answerDescription:
      "'Portanto', 'logo', 'assim', 'dessa forma' são conectivos conclusivos — indicam que o que vem a seguir é uma dedução ou resultado lógico do que foi dito.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que é ambiguidade em um texto?",
    answer: "Possibilidade de uma frase ter mais de uma interpretação",
    wrongOptions: [
      "Texto com muitos parágrafos",
      "Uso excessivo de adjetivos",
      "Um erro ortográfico",
    ],
    answerDescription:
      "Ambiguidade pode ser intencional (recurso literário, humor) ou um vício de linguagem. Ex: 'O policial prendeu o ladrão em sua casa' — casa de quem?",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que é o foco narrativo em primeira pessoa?",
    answer: "O narrador participa da história como personagem e usa 'eu'",
    wrongOptions: [
      "O narrador sabe tudo sobre todos os personagens",
      "O texto é escrito na forma de diálogo apenas",
      "O narrador é impessoal e objetivo",
    ],
    answerDescription:
      "Narrador em 1ª pessoa (narrador-personagem) conta a história do seu ponto de vista, com visão parcial dos fatos. Ex: 'Eu acordei cedo naquele dia...'",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "Qual a diferença entre fato e opinião em um texto jornalístico?",
    answer: "Fato é um dado verificável; opinião é um juízo de valor pessoal",
    wrongOptions: [
      "São sinônimos no jornalismo",
      "Fato é sempre verdadeiro e opinião sempre falsa",
      "Opinião aparece apenas em editoriais",
    ],
    answerDescription:
      "Fato: 'A temperatura chegou a 40°C' (verificável). Opinião: 'O calor está insuportável' (subjetivo). Distinguir ambos é essencial para leitura crítica.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question: "O que é uma crônica?",
    answer:
      "Texto curto, geralmente publicado em jornal, que comenta o cotidiano com leveza ou reflexão",
    wrongOptions: [
      "Um livro extenso de ficção",
      "Um relatório técnico",
      "Um poema com rimas",
    ],
    answerDescription:
      "A crônica é um gênero híbrido entre jornalismo e literatura. Parte de fatos do dia a dia e pode ter tom humorístico, lírico ou crítico.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "JUNIOR",
    question:
      "O que significa 'extrapolar o texto' em questões de interpretação?",
    answer:
      "Ir além do que o texto diz, adicionando informações que não estão nele",
    wrongOptions: [
      "Resumir o texto corretamente",
      "Encontrar a ideia principal",
      "Citar o texto literalmente",
    ],
    answerDescription:
      "Extrapolar é um erro comum em provas: o aluno traz conhecimento externo ou faz afirmações que o texto não sustenta. Interpretar é diferente de inventar.",
  },

  // ── PLENO (12 questões) ──
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question:
      "'O silêncio do governo sobre a crise é ensurdecedor.' Que recurso estilístico o autor usa?",
    answer: "Paradoxo (ou antítese paradoxal) — 'silêncio ensurdecedor'",
    wrongOptions: ["Pleonasmo", "Eufemismo", "Onomatopeia"],
    answerDescription:
      "Paradoxo é a união de ideias contraditórias que gera um sentido novo: silêncio não pode ensurdecer, mas o autor destaca que a omissão é tão gritante que incomoda.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "Em termos argumentativos, o que é uma falácia 'ad hominem'?",
    answer:
      "Atacar a pessoa que faz o argumento em vez de refutar o argumento em si",
    wrongOptions: [
      "Usar dados estatísticos falsos",
      "Fazer uma generalização a partir de um exemplo",
      "Citar uma autoridade sem credibilidade",
    ],
    answerDescription:
      "Ad hominem (contra a pessoa) é uma falácia lógica que desvia o debate: em vez de rebater a tese, ataca-se o caráter, aparência ou vida pessoal de quem a apresenta.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é polifonia em um texto?",
    answer:
      "Presença de múltiplas vozes ou pontos de vista dentro do mesmo texto",
    wrongOptions: [
      "Texto escrito por vários autores ao mesmo tempo",
      "Uso de muitas figuras de linguagem",
      "Texto com muitos parágrafos",
    ],
    answerDescription:
      "Polifonia (conceito de Bakhtin) ocorre quando o texto incorpora diferentes perspectivas — por meio de discurso direto, indireto livre, ironia ou citação.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question:
      "Qual a diferença entre discurso direto, indireto e indireto livre?",
    answer:
      "Direto: fala do personagem com aspas. Indireto: narrador reformula a fala. Indireto livre: mistura voz do narrador com a do personagem",
    wrongOptions: [
      "São apenas variações de pontuação sem diferença de sentido",
      "Direto é usado em poesia e indireto em prosa",
      "Indireto livre é quando o narrador fala em 1ª pessoa",
    ],
    answerDescription:
      "Direto: 'Estou cansado', disse ele. Indireto: Ele disse que estava cansado. Indireto livre: Estava cansado demais. Não aguentava mais. (narrador + personagem mesclados)",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é a progressão temática de um texto?",
    answer:
      "A forma como o tema se desenvolve ao longo dos parágrafos, avançando a argumentação",
    wrongOptions: [
      "A repetição da tese em cada parágrafo",
      "A lista de referências bibliográficas",
      "O número de citações diretas",
    ],
    answerDescription:
      "Progressão temática é o avanço das ideias: cada parágrafo retoma algo do anterior (tema dado) e acrescenta informação nova (rema), evitando circularidade.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é o efeito de sentido produzido pela ironia?",
    answer:
      "Dizer o contrário do que se pensa para criticar, provocar humor ou desmascarar algo",
    wrongOptions: [
      "Repetir palavras para dar ênfase",
      "Suavizar uma informação desagradável",
      "Exagerar um fato para impressionar",
    ],
    answerDescription:
      "A ironia cria uma camada de significado: o sentido literal é oposto ao pretendido. Ex: 'Que lindo, mais um escândalo de corrupção!' O contexto revela a real intenção.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "Em análise de textos, o que é o 'contrato de comunicação'?",
    answer:
      "Conjunto de expectativas entre autor e leitor sobre o gênero, tom e finalidade do texto",
    wrongOptions: [
      "Um documento jurídico assinado pelo autor",
      "A capa do livro ou jornal",
      "As regras gramaticais da língua",
    ],
    answerDescription:
      "O contrato de comunicação (Charaudeau) estabelece papéis: quem lê uma notícia espera objetividade; quem lê uma crônica aceita subjetividade. Quebrar esse contrato gera estranhamento.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é um argumento por analogia?",
    answer:
      "Comparar duas situações semelhantes para sustentar que a conclusão de uma vale para a outra",
    wrongOptions: [
      "Repetir o mesmo argumento várias vezes",
      "Citar um especialista no assunto",
      "Usar dados numéricos para provar algo",
    ],
    answerDescription:
      "Analogia: 'Assim como um vírus se espalha sem controle, a desinformação contamina a sociedade.' A força do argumento depende da validade da comparação.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é a macroestrutura de um texto dissertativo?",
    answer:
      "Organização global: introdução (tese), desenvolvimento (argumentos) e conclusão (proposta/síntese)",
    wrongOptions: [
      "Apenas o primeiro e o último parágrafos",
      "O layout visual da página",
      "A lista de palavras-chave do texto",
    ],
    answerDescription:
      "A macroestrutura é o esqueleto do texto. Cada parte tem função: introdução contextualiza e apresenta a tese; desenvolvimento argumenta; conclusão sintetiza e/ou propõe solução.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question:
      "Em que consiste a estratégia argumentativa de 'causa e consequência'?",
    answer:
      "Mostrar que um fenômeno A provoca o resultado B para convencer o leitor",
    wrongOptions: [
      "Comparar dois textos diferentes",
      "Listar exemplos sem relação entre si",
      "Usar linguagem informal para aproximar o leitor",
    ],
    answerDescription:
      "Ex: 'O desmatamento (causa) aumenta as enchentes urbanas (consequência).' Essa estratégia é muito eficaz porque explica o porquê, fortalecendo a argumentação.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que significa 'modalização' em um texto?",
    answer:
      "Marcas linguísticas que indicam o grau de certeza, dúvida ou subjetividade do autor",
    wrongOptions: [
      "O uso de modos verbais formais",
      "A divisão do texto em módulos",
      "A escolha da fonte tipográfica",
    ],
    answerDescription:
      "Modalização revela a atitude do enunciador: 'certamente ocorreu' (certeza), 'talvez ocorra' (dúvida), 'é necessário que' (obrigação). Afeta como o leitor recebe a informação.",
  },
  {
    category: "Compreensão e Interpretação de Textos",
    level: "PLENO",
    question: "O que é letramento crítico?",
    answer:
      "Capacidade de ler textos questionando seus propósitos, ideologias e relações de poder",
    wrongOptions: [
      "Saber ler e escrever na norma-padrão",
      "Criticar qualquer texto lido",
      "Ler apenas textos acadêmicos",
    ],
    answerDescription:
      "Letramento crítico vai além da decodificação: analisa quem produziu o texto, por que, para quem, que vozes são silenciadas. É essencial na era da desinformação.",
  },
];

// ──────────────────────────
// CATEGORIA 2 — Sintaxe
// ──────────────────────────

const sintaxeCards: PortCard[] = [
  // ── INICIANTE (12 questões) ──
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é sujeito de uma oração?",
    answer: "Termo sobre o qual se declara algo; o verbo concorda com ele",
    wrongOptions: [
      "A ação praticada na frase",
      "O complemento do verbo",
      "O advérbio que modifica o verbo",
    ],
    answerDescription:
      "Sujeito é o ser de quem se fala. Ex: 'Os alunos estudaram.' → sujeito = 'Os alunos'. O verbo 'estudaram' concorda com ele (3ª pessoa plural).",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é predicado?",
    answer: "Tudo que se declara sobre o sujeito, tendo o verbo como núcleo",
    wrongOptions: [
      "O sujeito da oração",
      "Apenas o verbo da frase",
      "O advérbio da frase",
    ],
    answerDescription:
      "Predicado = verbo + complementos e modificadores. Ex: 'Os alunos estudaram matemática ontem.' → predicado = 'estudaram matemática ontem'.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "Em 'Choveu muito ontem', qual o tipo de sujeito?",
    answer: "Sujeito inexistente (oração sem sujeito)",
    wrongOptions: ["Sujeito simples", "Sujeito oculto", "Sujeito composto"],
    answerDescription:
      "Verbos que indicam fenômenos da natureza (chover, nevar, trovejar) formam orações sem sujeito. O verbo fica na 3ª pessoa do singular.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "Qual a função do objeto direto?",
    answer:
      "Complementar o sentido de um verbo transitivo direto, sem preposição",
    wrongOptions: [
      "Modificar o sujeito",
      "Substituir o predicado",
      "Indicar circunstância de tempo",
    ],
    answerDescription:
      "Objeto direto completa o verbo sem preposição. Ex: 'Ela leu o livro.' → 'o livro' é OD do verbo 'leu'. Pergunte: leu o quê? → o livro.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é concordância verbal?",
    answer: "O verbo deve concordar em número e pessoa com o sujeito",
    wrongOptions: [
      "O verbo concorda com o objeto direto",
      "O verbo sempre fica no singular",
      "O verbo concorda com o advérbio",
    ],
    answerDescription:
      "Regra básica: sujeito no plural → verbo no plural. 'Os meninos brincam' (✓). 'Os meninos brinca' (✗).",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "Quando se usa vírgula antes de 'mas'?",
    answer:
      "Sempre, pois 'mas' é conjunção adversativa que inicia oração coordenada",
    wrongOptions: [
      "Nunca se usa vírgula antes de 'mas'",
      "Apenas se a frase for longa",
      "Só em textos formais",
    ],
    answerDescription:
      "Antes de conjunções adversativas (mas, porém, contudo, todavia), usa-se vírgula obrigatoriamente: 'Estudou muito, mas não passou.'",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é uma oração coordenada?",
    answer:
      "Oração sintaticamente independente, ligada a outra por conjunção coordenativa ou por vírgula",
    wrongOptions: [
      "Oração que depende de outra para ter sentido",
      "Oração sem verbo",
      "Oração que funciona como sujeito",
    ],
    answerDescription:
      "Coordenadas são orações independentes. Ex: 'Estudou e passou.' — ambas têm sentido sozinhas. Podem ser: aditivas, adversativas, alternativas, conclusivas ou explicativas.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é uma oração subordinada?",
    answer:
      "Oração que depende sintaticamente de outra (principal) para completar seu sentido",
    wrongOptions: [
      "Oração independente ligada por vírgula",
      "Oração que sempre vem primeiro na frase",
      "Oração sem sujeito",
    ],
    answerDescription:
      "Subordinadas funcionam como termo da oração principal. Ex: 'Espero que você venha.' → 'que você venha' é subordinada substantiva (funciona como OD de 'espero').",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "Quando NÃO se usa vírgula?",
    answer: "Entre sujeito e predicado (na ordem direta)",
    wrongOptions: [
      "Antes de conjunções adversativas",
      "Após adjunto adverbial deslocado",
      "Para separar aposto explicativo",
    ],
    answerDescription:
      "Nunca separe sujeito do predicado com vírgula: 'Os alunos, estudaram.' (✗). 'Os alunos estudaram.' (✓). Mesmo com sujeito longo, não se usa vírgula ali.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é adjunto adverbial?",
    answer:
      "Termo que indica circunstância (tempo, lugar, modo, causa etc.) relacionada ao verbo",
    wrongOptions: [
      "Complemento obrigatório do verbo",
      "O sujeito da oração",
      "O predicativo do sujeito",
    ],
    answerDescription:
      "Adjunto adverbial é acessório — pode ser retirado sem prejudicar a estrutura. Ex: 'Ele viajou ontem.' → 'ontem' = adj. adv. de tempo.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é objeto indireto?",
    answer: "Complemento do verbo transitivo indireto, ligado por preposição",
    wrongOptions: [
      "Complemento sem preposição",
      "O sujeito passivo",
      "O advérbio de modo",
    ],
    answerDescription:
      "OI completa verbo com preposição obrigatória. Ex: 'Ela gosta de música.' → 'de música' é OI. Pergunte: gosta de quê? → de música.",
  },
  {
    category: "Sintaxe",
    level: "INICIANTE",
    question: "O que é aposto?",
    answer:
      "Termo que explica ou especifica outro termo, geralmente entre vírgulas",
    wrongOptions: [
      "O verbo principal da oração",
      "O sujeito composto",
      "O objeto direto",
    ],
    answerDescription:
      "Aposto explicativo: 'Machado de Assis, grande escritor brasileiro, nasceu no Rio.' → 'grande escritor brasileiro' explica quem é Machado.",
  },

  // ── JUNIOR (12 questões) ──
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question:
      "'Faz cinco anos que não o vejo.' O verbo 'faz' está no singular por quê?",
    answer:
      "Porque 'fazer' indicando tempo decorrido é impessoal (não tem sujeito)",
    wrongOptions: [
      "Porque concorda com 'anos'",
      "Porque está no modo subjuntivo",
      "Porque o sujeito é oculto",
    ],
    answerDescription:
      "O verbo 'fazer' indicando tempo transcorrido é impessoal → fica na 3ª pessoa do singular: 'Faz dois dias', 'Faz meses'. Nunca 'Fazem cinco anos'.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question:
      "Qual a regência correta: 'Assisti o filme' ou 'Assisti ao filme'?",
    answer:
      "'Assisti ao filme' — assistir no sentido de ver exige preposição 'a'",
    wrongOptions: [
      "'Assisti o filme' está correto",
      "Ambas estão erradas",
      "A preposição 'a' é opcional",
    ],
    answerDescription:
      "Assistir = ver → VTI (pede preposição 'a'): 'Assisti ao jogo.' Assistir = ajudar → VTD: 'O médico assistiu o paciente.'",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "Em 'Os livros que comprei são bons', qual a função de 'que'?",
    answer:
      "Pronome relativo que retoma 'livros' e funciona como objeto direto de 'comprei'",
    wrongOptions: [
      "Conjunção integrante",
      "Pronome interrogativo",
      "Advérbio de intensidade",
    ],
    answerDescription:
      "'Que' = os quais (pronome relativo). Retoma 'livros' e dentro da subordinada é OD: 'comprei [os livros]'. Diferente da conjunção 'que' (ex: 'Espero que chova').",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "Quando se usa 'a fim de' e quando 'afim'?",
    answer: "'A fim de' = finalidade (para). 'Afim' = semelhança/afinidade",
    wrongOptions: [
      "São a mesma coisa, apenas grafias alternativas",
      "'Afim' indica finalidade e 'a fim de' é adjetivo",
      "'A fim de' não existe na norma-padrão",
    ],
    answerDescription:
      "'Estudou a fim de passar' (= para passar). 'Interesses afins' (= semelhantes). São palavras diferentes com significados distintos.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "O que é uma oração subordinada adjetiva explicativa?",
    answer:
      "Oração que acrescenta informação extra sobre o antecedente, entre vírgulas",
    wrongOptions: [
      "Oração que restringe o sentido do antecedente",
      "Oração que funciona como advérbio",
      "Oração que substitui o sujeito",
    ],
    answerDescription:
      "Explicativa: 'O Sol, que é uma estrela, ilumina a Terra.' (informação adicional, entre vírgulas). Restritiva: 'Os alunos que estudaram passaram.' (restringe quais alunos, sem vírgula).",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question:
      "'Necessito de que todos colaborem.' Que tipo de oração é 'de que todos colaborem'?",
    answer: "Oração subordinada substantiva objetiva indireta",
    wrongOptions: [
      "Oração coordenada sindética",
      "Oração subordinada adjetiva",
      "Oração subordinada adverbial causal",
    ],
    answerDescription:
      "Funciona como objeto indireto de 'necessito' (VTI que pede 'de'). Teste: Necessito de quê? → de que todos colaborem.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question:
      "Qual a concordância correta: 'Haviam muitas pessoas' ou 'Havia muitas pessoas'?",
    answer: "'Havia muitas pessoas' — haver no sentido de existir é impessoal",
    wrongOptions: [
      "'Haviam muitas pessoas' está correto",
      "Ambas estão corretas",
      "Nenhuma está correta — o correto é 'houveram'",
    ],
    answerDescription:
      "Haver = existir → impessoal, sempre na 3ª do singular: 'Havia erros', 'Houve problemas'. Nunca 'Haviam erros' ou 'Houveram problemas'.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "O que é predicativo do sujeito?",
    answer:
      "Termo que atribui qualidade ou estado ao sujeito por meio de verbo de ligação",
    wrongOptions: [
      "O mesmo que objeto direto",
      "Apenas adjetivos antes do sujeito",
      "O verbo principal da oração",
    ],
    answerDescription:
      "Ex: 'Ela está cansada.' → predicativo 'cansada' atribui estado ao sujeito 'Ela', por meio do verbo de ligação 'está'.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question:
      "Em 'É necessário que todos participem', a oração 'que todos participem' funciona como:",
    answer: "Sujeito (oração subordinada substantiva subjetiva)",
    wrongOptions: ["Objeto direto", "Adjunto adverbial", "Aposto"],
    answerDescription:
      "O que é necessário? → que todos participem. A oração exerce função de sujeito da oração principal 'É necessário'. Quando a principal tem verbo impessoal + predicativo, a subordinada é subjetiva.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "Qual a diferença entre 'onde' e 'aonde'?",
    answer:
      "'Onde' = lugar em que (estático). 'Aonde' = a + onde (direção, movimento)",
    wrongOptions: [
      "São sinônimos em qualquer contexto",
      "'Aonde' é informal e incorreto",
      "'Onde' indica movimento e 'aonde' indica repouso",
    ],
    answerDescription:
      "'Onde você mora?' (estático, lugar fixo). 'Aonde você vai?' (direção, movimento). 'Aonde' = 'a que lugar', exigido por verbos de movimento (ir, chegar).",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "O uso de ponto e vírgula é adequado em qual situação?",
    answer:
      "Separar orações coordenadas longas ou itens de uma enumeração complexa",
    wrongOptions: [
      "Substituir ponto final em qualquer frase",
      "Indicar dúvida, como o ponto de interrogação",
      "Separar sujeito de predicado",
    ],
    answerDescription:
      "Ponto e vírgula indica pausa intermediária (mais que vírgula, menos que ponto). Ex: 'Estudou muito; porém, não foi aprovado.' Também separa itens de listas em normas e leis.",
  },
  {
    category: "Sintaxe",
    level: "JUNIOR",
    question: "O que é voz passiva?",
    answer:
      "Construção em que o sujeito sofre a ação do verbo, em vez de praticá-la",
    wrongOptions: [
      "Quando o verbo está no passado",
      "Quando há sujeito oculto",
      "Quando a frase está na 3ª pessoa",
    ],
    answerDescription:
      "Voz ativa: 'O aluno fez o trabalho.' Voz passiva: 'O trabalho foi feito pelo aluno.' O sujeito (trabalho) recebe a ação. Agente da passiva: 'pelo aluno'.",
  },

  // ── PLENO (12 questões) ──
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "'Vendem-se casas.' O sujeito desta oração é:",
    answer:
      "'Casas' — trata-se de voz passiva sintética com pronome apassivador 'se'",
    wrongOptions: [
      "Sujeito indeterminado",
      "Sujeito oculto (eles vendem)",
      "Não há sujeito",
    ],
    answerDescription:
      "VTD + se = pronome apassivador → sujeito paciente: 'Casas são vendidas.' Logo, o verbo concorda com 'casas': 'Vendem-se casas' (e não 'Vende-se casas').",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "'Precisa-se de funcionários.' O 'se' aqui é:",
    answer: "Índice de indeterminação do sujeito",
    wrongOptions: [
      "Pronome apassivador",
      "Pronome reflexivo",
      "Conjunção condicional",
    ],
    answerDescription:
      "VTI + se = sujeito indeterminado. O verbo fica no singular: 'Precisa-se de funcionários' (nunca 'Precisam-se'). Não há voz passiva com VTI.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question:
      "Na frase 'A cidade cujas ruas são estreitas é antiga', qual a função de 'cujas'?",
    answer:
      "Pronome relativo com valor possessivo, funciona como adjunto adnominal de 'ruas'",
    wrongOptions: [
      "Conjunção causal",
      "Pronome demonstrativo",
      "Advérbio de lugar",
    ],
    answerDescription:
      "'Cujo/cuja' = de quem/do qual. Estabelece relação de posse entre o antecedente ('cidade') e o consequente ('ruas'): as ruas da cidade. Concorda com o consequente.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question:
      "Qual a concordância correta: 'Mais de um aluno faltou' ou 'Mais de um aluno faltaram'?",
    answer: "'Mais de um aluno faltou' — verbo no singular",
    wrongOptions: [
      "'Mais de um aluno faltaram'",
      "Ambas estão corretas",
      "Nenhuma — o correto é 'Mais de uns alunos faltaram'",
    ],
    answerDescription:
      "'Mais de um' leva o verbo ao singular, exceto se houver reciprocidade: 'Mais de um aluno se abraçaram' (ação recíproca → plural).",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "Na oração 'Convém que estudes', classifique 'que estudes':",
    answer: "Oração subordinada substantiva subjetiva",
    wrongOptions: [
      "Oração subordinada adjetiva restritiva",
      "Oração subordinada adverbial temporal",
      "Oração coordenada explicativa",
    ],
    answerDescription:
      "O que convém? → que estudes (sujeito oracional). Verbos como convir, parecer, constar + 'que' formam subordinada subjetiva.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question:
      "Qual a regência correta: 'Prefiro café do que chá' ou 'Prefiro café a chá'?",
    answer:
      "'Prefiro café a chá' — preferir rege a preposição 'a', não 'do que'",
    wrongOptions: [
      "'Prefiro café do que chá' é correto",
      "Ambas estão corretas na norma-padrão",
      "'Prefiro mais café que chá' é a forma correta",
    ],
    answerDescription:
      "Regência de preferir: prefere-se algo A algo. 'Prefiro estudar a trabalhar.' Nunca 'do que' ou 'mais... do que' na norma culta (preferir já contém ideia de 'mais').",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "O que é zeugma?",
    answer: "Omissão de um termo já mencionado anteriormente na frase",
    wrongOptions: [
      "Repetição de um termo para dar ênfase",
      "Inversão da ordem natural da frase",
      "Uso de preposição desnecessária",
    ],
    answerDescription:
      "Zeugma é um tipo de elipse: 'Eu gosto de café; ela, de chá.' (omitiu-se 'gosta' na segunda oração). Recurso de coesão que evita repetição.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "'Se eu ver a resposta, aviso você.' Essa frase está correta?",
    answer: "Não. O correto é 'Se eu vir' (futuro do subjuntivo do verbo ver)",
    wrongOptions: [
      "Sim, está completamente correta",
      "Não, o correto é 'Se eu veio'",
      "Não, o correto é 'Se eu vi'",
    ],
    answerDescription:
      "Futuro do subjuntivo de 'ver' = vir (quando eu vir, se eu vir). Confusão comum com infinitivo 'ver'. Também: 'Se eu fizer' (não 'se eu fazer'), 'quando eu puser' (não 'pôr').",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "Qual a colocação pronominal correta: 'Me diga' ou 'Diga-me'?",
    answer:
      "'Diga-me' na norma-padrão — em início de frase o pronome é enclítico",
    wrongOptions: [
      "'Me diga' está correto na norma culta",
      "Ambas são igualmente formais",
      "Nenhuma — o correto é 'Diga-se-me'",
    ],
    answerDescription:
      "Regra: não se inicia frase com pronome oblíquo átono na norma-padrão. Início de frase → ênclise: 'Diga-me', 'Faça-o'. Exceções: com palavras atrativas (não, que, já, etc.) → próclise: 'Não me diga.'",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question:
      "'A maioria dos alunos passou' ou 'A maioria dos alunos passaram'?",
    answer:
      "Ambas estão corretas — concordância pode ser com o núcleo 'maioria' (singular) ou com 'alunos' (plural)",
    wrongOptions: [
      "Somente a primeira está correta",
      "Somente a segunda está correta",
      "Nenhuma está correta",
    ],
    answerDescription:
      "Expressões partitivas (a maioria de, grande parte de, metade de) admitem concordância com o núcleo do sujeito (singular) ou com o especificador (plural). Ambas são aceitas pela gramática normativa.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "O que é anacoluto?",
    answer:
      "Quebra da estrutura sintática: um termo fica solto, sem função na oração",
    wrongOptions: [
      "Inversão elegante da frase",
      "Concordância com o sujeito mais próximo",
      "Uso de pronome relativo incorreto",
    ],
    answerDescription:
      "Ex: 'Eu, parece que estou melhor.' → 'Eu' não tem função sintática na oração 'parece que estou melhor'. É um desvio (ou recurso expressivo) chamado anacoluto.",
  },
  {
    category: "Sintaxe",
    level: "PLENO",
    question: "Qual a diferença entre complemento nominal e adjunto adnominal?",
    answer:
      "Complemento nominal completa nome com preposição (paciente); adjunto adnominal caracteriza o nome (agente)",
    wrongOptions: [
      "São a mesma coisa",
      "Adjunto adnominal é sempre um artigo",
      "Complemento nominal não usa preposição",
    ],
    answerDescription:
      "Complemento nominal: 'confiança em Deus' (Deus não confia, é alvo de confiança — paciente). Adjunto adnominal: 'crítica do professor' (professor critica — agente). Teste: se o termo pratica a ação do nome, é adjunto; se sofre, é complemento.",
  },
];

// ──────────────────────────
// CATEGORIA 3 — Morfologia
// ──────────────────────────

const morfologiaCards: PortCard[] = [
  // ── INICIANTE (12 questões) ──
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "Quantas classes gramaticais existem na língua portuguesa?",
    answer:
      "Dez: substantivo, adjetivo, artigo, numeral, pronome, verbo, advérbio, preposição, conjunção e interjeição",
    wrongOptions: ["Cinco", "Oito", "Doze"],
    answerDescription:
      "As 10 classes se dividem em variáveis (substantivo, adjetivo, artigo, numeral, pronome, verbo) e invariáveis (advérbio, preposição, conjunção, interjeição).",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é um substantivo?",
    answer:
      "Palavra que nomeia seres, objetos, conceitos, sentimentos e lugares",
    wrongOptions: [
      "Palavra que indica ação",
      "Palavra que modifica o verbo",
      "Palavra que liga orações",
    ],
    answerDescription:
      "Substantivos nomeiam: concretos (mesa, gato) e abstratos (amor, saudade). Podem ser próprios (Brasil) ou comuns (país), simples ou compostos.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "Qual a diferença entre adjetivo e advérbio?",
    answer:
      "Adjetivo qualifica o substantivo; advérbio modifica o verbo, adjetivo ou outro advérbio",
    wrongOptions: [
      "São a mesma classe gramatical",
      "Advérbio qualifica o substantivo",
      "Adjetivo modifica o verbo",
    ],
    answerDescription:
      "Adjetivo: 'menina bonita' (qualifica o substantivo). Advérbio: 'correu rapidamente' (modifica o verbo). Advérbio é invariável; adjetivo flexiona em gênero e número.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que são conjunções?",
    answer:
      "Palavras que ligam orações ou termos de mesma função dentro da oração",
    wrongOptions: [
      "Palavras que substituem o substantivo",
      "Palavras que indicam ação",
      "Palavras que expressam sentimento",
    ],
    answerDescription:
      "Conjunções coordenativas ligam termos ou orações independentes (e, mas, ou). Subordinativas introduzem oração dependente (que, se, quando, embora, porque).",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "Quais são os pronomes pessoais retos?",
    answer: "Eu, tu, ele/ela, nós, vós, eles/elas",
    wrongOptions: [
      "Me, te, se, nos, vos",
      "Meu, teu, seu, nosso",
      "Este, esse, aquele",
    ],
    answerDescription:
      "Pronomes retos exercem função de sujeito. Os oblíquos (me, te, o, a, lhe, nos, vos) são complementos. Ex: 'Eu o vi.' → 'Eu' (reto/sujeito), 'o' (oblíquo/OD).",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é um verbo transitivo?",
    answer:
      "Verbo que precisa de complemento (objeto) para ter sentido completo",
    wrongOptions: [
      "Verbo que não precisa de complemento",
      "Verbo que indica estado",
      "Verbo conjugado no passado",
    ],
    answerDescription:
      "Transitivo direto: complemento sem preposição ('comprou um livro'). Transitivo indireto: com preposição ('gosta de música'). Intransitivo: não pede complemento ('O sol nasceu').",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é preposição?",
    answer:
      "Palavra invariável que liga dois termos, estabelecendo relação de sentido entre eles",
    wrongOptions: [
      "Palavra que substitui o sujeito",
      "Palavra que indica ação no passado",
      "Palavra que expressa admiração",
    ],
    answerDescription:
      "Preposições essenciais: a, ante, após, até, com, contra, de, desde, em, entre, para, perante, por, sem, sob, sobre, trás. Ex: 'Casa de madeira' — 'de' liga casa a madeira (matéria).",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "Quais são os três tempos verbais fundamentais?",
    answer: "Presente, pretérito (passado) e futuro",
    wrongOptions: [
      "Indicativo, subjuntivo e imperativo",
      "Ativo, passivo e reflexivo",
      "Simples, composto e nominal",
    ],
    answerDescription:
      "Presente: 'eu falo'. Pretérito: 'eu falei'. Futuro: 'eu falarei'. Cada tempo pode ocorrer nos modos indicativo, subjuntivo e, no caso do presente, imperativo.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é o modo subjuntivo?",
    answer:
      "Modo verbal que expressa dúvida, desejo, hipótese ou possibilidade",
    wrongOptions: [
      "Modo que expressa certeza",
      "Modo usado apenas em ordens",
      "Modo que indica ação concluída",
    ],
    answerDescription:
      "Subjuntivo: 'Espero que ele venha' (desejo), 'Se eu fosse rico' (hipótese), 'Talvez chova' (dúvida). Contrasta com o indicativo, que expressa certeza.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é um artigo definido e indefinido?",
    answer:
      "Definido (o, a, os, as) especifica o substantivo; indefinido (um, uma, uns, umas) generaliza",
    wrongOptions: [
      "Definido generaliza e indefinido especifica",
      "Ambos funcionam como adjetivos",
      "Artigos não existem em português",
    ],
    answerDescription:
      "'O aluno chegou' (aluno específico, já conhecido). 'Um aluno chegou' (aluno qualquer, desconhecido). Artigos antecedem substantivos e indicam gênero e número.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é um pronome demonstrativo?",
    answer:
      "Pronome que situa algo no espaço, tempo ou no texto: este, esse, aquele",
    wrongOptions: [
      "Pronome que indica posse",
      "Pronome que substitui o verbo",
      "Pronome usado apenas em perguntas",
    ],
    answerDescription:
      "Este/esta: perto de quem fala. Esse/essa: perto de quem ouve. Aquele/aquela: distante de ambos. No texto: este = o que será dito; esse = o que já foi dito.",
  },
  {
    category: "Morfologia",
    level: "INICIANTE",
    question: "O que é interjeição?",
    answer:
      "Palavra que expressa emoção ou sentimento de forma exclamativa: ah!, ufa!, eita!",
    wrongOptions: [
      "Palavra que liga orações",
      "Palavra que nomeia objetos",
      "Palavra que modifica o verbo",
    ],
    answerDescription:
      "Interjeições são palavras invariáveis que expressam estados emocionais: surpresa (oh!), alívio (ufa!), dor (ai!), chamamento (ô!). Sempre seguidas de exclamação.",
  },

  // ── JUNIOR (12 questões) ──
  {
    category: "Morfologia",
    level: "JUNIOR",
    question:
      "Qual a diferença entre 'por que', 'por quê', 'porque' e 'porquê'?",
    answer:
      "'Por que' = pergunta/causa. 'Por quê' = fim de frase. 'Porque' = resposta/explicação. 'Porquê' = substantivo (motivo)",
    wrongOptions: [
      "São todos iguais e intercambiáveis",
      "'Porque' é usado em pergunta e 'por que' em resposta",
      "'Porquê' é uma forma incorreta",
    ],
    answerDescription:
      "'Por que saiu?' (pergunta). 'Saiu por quê?' (fim de frase). 'Saiu porque quis.' (explicação). 'Não sei o porquê.' (substantivo, o motivo).",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "Qual a diferença entre 'mau' e 'mal'?",
    answer:
      "'Mau' = adjetivo (oposto de bom). 'Mal' = advérbio (oposto de bem) ou substantivo/conjunção",
    wrongOptions: [
      "São sinônimos",
      "'Mal' é sempre substantivo",
      "'Mau' é advérbio e 'mal' é adjetivo",
    ],
    answerDescription:
      "'Ele é mau' (adjetivo → oposto: bom). 'Ele fez mal' (advérbio → oposto: bem). 'Mal chegou, saiu' (conjunção = assim que).",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "O que são verbos irregulares?",
    answer:
      "Verbos que alteram o radical ou as desinências ao serem conjugados, fugindo do paradigma regular",
    wrongOptions: [
      "Verbos que nunca mudam de forma",
      "Verbos usados apenas na linguagem informal",
      "Verbos que não podem ser conjugados",
    ],
    answerDescription:
      "Ex: 'fazer' → eu faço, ele fez (radical muda). 'ir' → eu vou, eu fui (totalmente irregular). Regulares mantêm o radical: 'cantar' → canto, cantei, cantarei.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "Qual a diferença entre conjunção coordenativa e subordinativa?",
    answer:
      "Coordenativa liga elementos independentes; subordinativa introduz oração dependente da principal",
    wrongOptions: [
      "São a mesma coisa",
      "Coordenativa sempre indica oposição",
      "Subordinativa liga apenas substantivos",
    ],
    answerDescription:
      "Coordenativas: e (adição), mas (oposição), ou (alternância), portanto (conclusão), pois (explicação). Subordinativas: que, se, quando, embora, porque, conforme, etc.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "O que são pronomes relativos?",
    answer:
      "Pronomes que retomam um termo anterior (antecedente) e introduzem oração subordinada adjetiva",
    wrongOptions: [
      "Pronomes que indicam posse",
      "Pronomes que substituem advérbios",
      "Pronomes usados apenas em perguntas",
    ],
    answerDescription:
      "Que, o qual, quem, cujo, onde, quanto. Ex: 'O livro que comprei é bom.' → 'que' retoma 'livro' e introduz a subordinada adjetiva.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "Qual o particípio de 'aceitar' e de 'pagar'?",
    answer:
      "'Aceito' (regular: aceitado também existe) e 'pago' (irregular; pagado é arcaico)",
    wrongOptions: [
      "'Aceitado' e 'pagado' apenas",
      "'Aceite' e 'pagou'",
      "Esses verbos não têm particípio",
    ],
    answerDescription:
      "Verbos abundantes têm dois particípios: regular (-ado/-ido) usado com 'ter/haver'; irregular usado com 'ser/estar'. 'Tinha aceitado' / 'foi aceito'. 'Tinha pagado' / 'foi pago'.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "Qual a diferença entre 'há' e 'a' indicando tempo?",
    answer: "'Há' = tempo passado (faz). 'A' = tempo futuro (daqui a)",
    wrongOptions: [
      "São intercambiáveis",
      "'Há' é futuro e 'a' é passado",
      "'A' nunca indica tempo",
    ],
    answerDescription:
      "'Há três anos não o vejo' (= faz três anos — passado). 'Daqui a três anos me formo' (= futuro). Dica: se pode trocar por 'faz', usa-se 'há'.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "O que são verbos defectivos?",
    answer: "Verbos que não possuem todas as formas de conjugação",
    wrongOptions: [
      "Verbos com defeito gramatical",
      "Verbos que só existem no infinitivo",
      "Verbos que mudam completamente de radical",
    ],
    answerDescription:
      "Abolir, falir, reaver não se conjugam em todas as pessoas. Ex: 'abolir' não tem 1ª pessoa do singular no presente: não existe 'eu abulo'. Usa-se perífrase: 'eu quero abolir'.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "O que é locução conjuntiva?",
    answer:
      "Duas ou mais palavras que funcionam como uma conjunção: 'à medida que', 'a fim de que'",
    wrongOptions: [
      "Uma conjunção usada duas vezes",
      "Um substantivo que substitui a conjunção",
      "Uma lista de conjunções",
    ],
    answerDescription:
      "Locuções conjuntivas exercem papel de conjunção: 'à medida que' (proporção), 'a fim de que' (finalidade), 'ainda que' (concessão), 'visto que' (causa).",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question:
      "Qual a diferença entre 'esse' e 'este' na referenciação textual?",
    answer:
      "'Este' refere-se ao que será mencionado (catáfora); 'esse' refere-se ao que já foi dito (anáfora)",
    wrongOptions: [
      "São sempre intercambiáveis no texto",
      "'Esse' é para o futuro e 'este' para o passado",
      "'Este' é informal e 'esse' é formal",
    ],
    answerDescription:
      "'Quero dizer isto: nunca desista.' (catáfora — antecipa). 'Nunca desista. Isso é fundamental.' (anáfora — retoma). Na prática informal, a distinção é menos rígida.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "O que é derivação prefixal?",
    answer:
      "Formação de palavra nova pela adição de prefixo ao radical: in + feliz = infeliz",
    wrongOptions: [
      "Formação de palavra pela junção de dois radicais",
      "Mudança de classe gramatical sem acréscimo",
      "Adição de sufixo ao radical",
    ],
    answerDescription:
      "Prefixos alteram o sentido sem mudar a classe gramatical: feliz → infeliz (ambos adjetivos). Exemplos: des + fazer = desfazer; re + construir = reconstruir.",
  },
  {
    category: "Morfologia",
    level: "JUNIOR",
    question: "Qual a diferença entre verbo no gerúndio e no particípio?",
    answer:
      "Gerúndio (-ndo) indica ação em progresso; particípio (-ado/-ido) indica ação concluída",
    wrongOptions: [
      "São formas idênticas do mesmo tempo verbal",
      "Gerúndio é passado e particípio é presente",
      "Particípio só existe em verbos regulares",
    ],
    answerDescription:
      "Gerúndio: 'Estou estudando' (ação em curso). Particípio: 'Tenho estudado' / 'O trabalho foi concluído' (ação terminada). São formas nominais do verbo, junto com o infinitivo.",
  },

  // ── PLENO (12 questões) ──
  {
    category: "Morfologia",
    level: "PLENO",
    question: "Qual a diferença entre 'se não' e 'senão'?",
    answer:
      "'Se não' = conjunção condicional + advérbio de negação. 'Senão' = caso contrário, mas sim, a não ser",
    wrongOptions: [
      "São a mesma palavra, apenas grafias diferentes",
      "'Senão' é a forma incorreta",
      "'Se não' significa 'caso contrário'",
    ],
    answerDescription:
      "'Se não chover, irei' (condição negativa). 'Vá, senão se atrasa' (= caso contrário). 'Não fez nada senão dormir' (= a não ser). Contextos diferentes, sentidos diferentes.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "Qual o plural de 'qualquer' e de 'mal'?",
    answer: "'Quaisquer' e 'males'",
    wrongOptions: [
      "'Qualqueres' e 'maus'",
      "'Qualquers' e 'mals'",
      "'Quaisqueres' e 'males'",
    ],
    answerDescription:
      "Qualquer → quaisquer (flexão do primeiro elemento 'qual'). Mal (substantivo) → males. Mau (adjetivo) → maus. Atenção: 'mau' e 'mal' varáveis diferentes.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "O que é um verbo vicário?",
    answer:
      "Verbo que substitui outro verbo ou oração inteira para evitar repetição — geralmente 'fazer'",
    wrongOptions: [
      "Verbo que indica vício ou hábito",
      "Verbo auxiliar como 'ter' e 'haver'",
      "Verbo que só existe no infinitivo",
    ],
    answerDescription:
      "'Ela estuda mais do que eu faço.' → 'faço' substitui 'estudo' (verbo vicário). O verbo 'fazer' é o mais usado como vicário em português.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "O que é derivação parassintética?",
    answer:
      "Acréscimo simultâneo de prefixo e sufixo ao radical: a + noit + ecer = anoitecer",
    wrongOptions: [
      "Adição de apenas um prefixo",
      "Junção de dois radicais",
      "Mudança de classe sem afixos",
    ],
    answerDescription:
      "Na parassíntese, prefixo e sufixo são adicionados ao mesmo tempo — retirar um deles torna a palavra inexistente: 'noitecer' e 'anoit' não existem. Outros ex: empobrecer, desalmado.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "Qual a função morfológica de '-mente' em 'rapidamente'?",
    answer:
      "Sufixo que transforma adjetivo (rápida) em advérbio de modo (rapidamente)",
    wrongOptions: [
      "Prefixo que indica negação",
      "Desinência de gênero feminino",
      "Radical da palavra",
    ],
    answerDescription:
      "O sufixo '-mente' se une à forma feminina do adjetivo: rápida + mente = rapidamente. Clara + mente = claramente. É o principal formador de advérbios de modo em português.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question:
      "Conjugue o verbo 'intervir' no pretérito perfeito, 3ª pessoa do singular:",
    answer: "Ele interveio",
    wrongOptions: ["Ele interviu", "Ele interveu", "Ele interveiu"],
    answerDescription:
      "'Intervir' segue a conjugação de 'vir': vim → intervim, veio → interveio, vieram → intervieram. Erro comum: 'interviu' (que seguiria o paradigma de 'ouvir').",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "O que é hibridismo na formação de palavras?",
    answer:
      "Palavra formada por elementos de línguas diferentes: automóvel (grego + latim), sambódromo (tupi + grego)",
    wrongOptions: [
      "Palavra formada por dois radicais da mesma língua",
      "Neologismo criado pela internet",
      "Palavra estrangeira sem adaptação ao português",
    ],
    answerDescription:
      "Hibridismo combina radicais ou afixos de origens distintas. Televisão: tele (grego) + visão (latim). Sociologia: sócio (latim) + logia (grego). É um processo produtivo de formação vocabular.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "O que é conversão (derivação imprópria)?",
    answer:
      "Mudança de classe gramatical de uma palavra sem alteração de forma: 'jantar' (verbo → substantivo)",
    wrongOptions: [
      "Acréscimo de sufixo para mudar a classe",
      "Tradução de palavra estrangeira",
      "Flexão de gênero do substantivo",
    ],
    answerDescription:
      "'O jantar está pronto' (verbo → substantivo). 'O azul do céu' (adjetivo → substantivo). A classe muda pelo contexto sintático, sem acréscimo de morfemas.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question:
      "Qual a forma correta do imperativo de 'ir' na 2ª pessoa do singular (tu)?",
    answer: "Vai (afirmativo) / Não vás (negativo)",
    wrongOptions: ["Vai / Não vai", "Vá / Não ir", "Ide / Não ides"],
    answerDescription:
      "Imperativo afirmativo de 'tu' vem do presente do indicativo sem o 's': tu vais → vai (tu). Imperativo negativo vem do subjuntivo: não vás. 'Vá' é para 'você'.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "O que são morfemas gramaticais (desinências)?",
    answer:
      "Elementos que indicam flexões (gênero, número, pessoa, tempo/modo) — ex: gat-a-s, cant-á-va-mos",
    wrongOptions: [
      "A palavra inteira é o morfema",
      "Apenas os prefixos da palavra",
      "Sinônimo de sílaba tônica",
    ],
    answerDescription:
      "Em 'cantávamos': cant- (radical) + -a- (vogal temática) + -va- (desinência modo-temporal: pretérito imperfeito) + -mos (desinência número-pessoal: 1ª plural).",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "Qual a diferença entre 'ao encontro de' e 'de encontro a'?",
    answer:
      "'Ao encontro de' = a favor, na mesma direção. 'De encontro a' = contra, em oposição",
    wrongOptions: [
      "São sinônimos",
      "'Ao encontro de' é oposição e 'de encontro a' é concordância",
      "Ambas indicam movimento físico apenas",
    ],
    answerDescription:
      "'A proposta vai ao encontro dos interesses do povo' (concorda). 'A proposta vai de encontro aos interesses do povo' (contraria). Confusão muito comum.",
  },
  {
    category: "Morfologia",
    level: "PLENO",
    question: "Qual a diferença entre 'em vez de' e 'ao invés de'?",
    answer:
      "'Em vez de' = no lugar de (substituição geral). 'Ao invés de' = ao contrário de (oposição, contrário)",
    wrongOptions: [
      "São expressões idênticas",
      "'Ao invés de' pode substituir 'em vez de' em todos os casos",
      "'Em vez de' indica oposição e 'ao invés de' indica substituição",
    ],
    answerDescription:
      "'Em vez de estudar, dormiu' (substituição). 'Ao invés de subir, desceu' (ação contrária). Na prática, 'em vez de' serve para ambos os casos; 'ao invés de' é restrito a opostos.",
  },
];

// ──────────────────────────────────────
// CATEGORIA 4 — Ortografia e Acentuação
// ──────────────────────────────────────

const ortografiaCards: PortCard[] = [
  // ── INICIANTE (12 questões) ──
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Quando se usa 'ss' em vez de 'ç'?",
    answer:
      "Usa-se 'ss' entre duas vogais para som de /s/; 'ç' antes de 'a', 'o', 'u'",
    wrongOptions: [
      "'Ss' e 'ç' são sempre intercambiáveis",
      "'Ç' é usado entre vogais",
      "'Ss' é usado antes de 'e' e 'i'",
    ],
    answerDescription:
      "'Ss' entre vogais: passo, assunto. 'Ç' antes de a/o/u: coração, ação, açúcar. Antes de 'e' e 'i' já se usa 'c' com som de /s/: cedo, cidade.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "O que são palavras oxítonas, paroxítonas e proparoxítonas?",
    answer:
      "Oxítonas: última sílaba tônica. Paroxítonas: penúltima. Proparoxítonas: antepenúltima",
    wrongOptions: [
      "Oxítonas têm duas sílabas, paroxítonas três",
      "Proparoxítonas são as mais comuns em português",
      "Paroxítonas sempre recebem acento gráfico",
    ],
    answerDescription:
      "Oxítona: ca-fé, a-vó. Paroxítona: ca-sa, es-co-la. Proparoxítona: lâm-pa-da, mú-si-ca. A maioria das palavras em português é paroxítona.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Toda proparoxítona é acentuada?",
    answer: "Sim, todas as proparoxítonas recebem acento gráfico",
    wrongOptions: [
      "Não, depende da terminação",
      "Apenas as terminadas em 'a'",
      "Não, nenhuma proparoxítona é acentuada",
    ],
    answerDescription:
      "Regra absoluta: toda proparoxítona é acentuada. Exemplos: lâmpada, último, árvore, lógica, música, médico.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Qual a grafia correta: 'concerteza' ou 'com certeza'?",
    answer: "'Com certeza' (duas palavras separadas)",
    wrongOptions: [
      "'Concerteza' (junto)",
      "Ambas estão corretas",
      "'Conserteza' (junto, com s)",
    ],
    answerDescription:
      "'Com certeza' é a forma correta — preposição 'com' + substantivo 'certeza'. 'Concerteza' não existe na língua portuguesa.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Quando se usa 'x' com som de /ch/?",
    answer:
      "Geralmente após ditongo e após a sílaba inicial 'en': caixa, enxame, peixe",
    wrongOptions: [
      "Nunca; 'x' sempre tem som de /ks/",
      "Apenas em palavras estrangeiras",
      "Sempre que a palavra começa com vogal",
    ],
    answerDescription:
      "Após ditongo: caixa, faixa, ameixa. Após 'en-': enxame, enxaqueca, enxerto. Exceções: enchente, encher (derivam de 'cheio').",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Qual a diferença entre 'mas' e 'mais'?",
    answer:
      "'Mas' = conjunção adversativa (porém). 'Mais' = advérbio de intensidade/quantidade",
    wrongOptions: [
      "São sinônimos",
      "'Mas' é advérbio e 'mais' é conjunção",
      "'Mais' é usado apenas em comparações",
    ],
    answerDescription:
      "'Estudou, mas não passou.' (oposição). 'Preciso de mais tempo.' (quantidade). Dica: se pode substituir por 'porém', use 'mas'.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Quando oxítonas são acentuadas?",
    answer: "Quando terminam em 'a(s)', 'e(s)', 'o(s)', 'em', 'ens'",
    wrongOptions: [
      "Todas são acentuadas",
      "Nenhuma é acentuada",
      "Apenas as terminadas em consoante",
    ],
    answerDescription:
      "Exemplos: sofá, café, cipó, alguém, parabéns. Não se acentuam: aqui, urubu, saci (terminam em 'i', 'u' — sem acento nessas terminações, salvo hiato).",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Qual a grafia correta: 'previlégio' ou 'privilégio'?",
    answer: "'Privilégio' (com i na segunda sílaba)",
    wrongOptions: [
      "'Previlégio' (com e)",
      "Ambas estão corretas",
      "'Previlêgio' (com e e acento circunflexo)",
    ],
    answerDescription:
      "A forma correta é 'privilégio' (pri-vi-lé-gio). 'Previlégio' é erro comum de pronúncia e escrita. Da mesma forma: 'ministério' (não 'mininstério').",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Qual a diferença entre 'a' e 'há'?",
    answer:
      "'A' = preposição ou artigo. 'Há' = verbo haver (existir ou tempo passado)",
    wrongOptions: [
      "São a mesma palavra",
      "'Há' é preposição e 'a' é verbo",
      "'A' indica tempo passado",
    ],
    answerDescription:
      "'A loja fica a dois quilômetros' (preposição). 'Há muitas opções' (= existem). 'Há dois dias não chove' (= faz dois dias). Dica: 'há' pode ser substituído por 'existe' ou 'faz'.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "O que é dígrafo?",
    answer:
      "Duas letras que representam um único som: ch, lh, nh, ss, rr, sc, gu, qu",
    wrongOptions: [
      "Duas letras com dois sons distintos",
      "Uma letra com dois sons",
      "Encontro de duas vogais",
    ],
    answerDescription:
      "Em 'chuva', o 'ch' produz um único som /ʃ/. Em 'guerra', 'gu' = /g/. Dígrafos não se separam na divisão silábica, exceto rr, ss, sc, sç, xc.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "Qual a grafia correta: 'impecilho' ou 'empecilho'?",
    answer: "'Empecilho' (com 'e' no início)",
    wrongOptions: ["'Impecilho' (com 'i')", "Ambas são aceitas", "'Impesilho'"],
    answerDescription:
      "A forma correta é 'empecilho' (com 'e'). Erro comum trocar por 'i'. Outros erros frequentes: beneficente (não 'beneficiente'), meritocracia (não 'meritocracia').",
  },
  {
    category: "Ortografia e Acentuação",
    level: "INICIANTE",
    question: "O que é um hiato?",
    answer:
      "Encontro de duas vogais em sílabas diferentes: sa-ú-de, po-e-ta, ba-ú",
    wrongOptions: [
      "Encontro de duas vogais na mesma sílaba",
      "Encontro de consoante e vogal",
      "Uma palavra sem vogais",
    ],
    answerDescription:
      "Hiato: vogais se separam em sílabas distintas. Ditongo: vogais na mesma sílaba (pai, lei). O 'i' e 'u' tônicos em hiato podem ser acentuados: saúde, baú, país.",
  },

  // ── JUNIOR (12 questões) ──
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Quando se usa hífen com o prefixo 'auto-'?",
    answer:
      "Quando a palavra seguinte começa com 'o' ou 'h': auto-observação, auto-hipnose",
    wrongOptions: [
      "Sempre se usa hífen com 'auto'",
      "Nunca se usa hífen com 'auto'",
      "Apenas em palavras compostas com mais de 3 sílabas",
    ],
    answerDescription:
      "Regra geral pós-Acordo Ortográfico: usa-se hífen quando o prefixo termina na mesma vogal que inicia a palavra seguinte, ou antes de 'h'. Auto + escola = autoescola (sem hífen). Auto + observação = auto-observação.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question:
      "Por que 'ideia' e 'assembleia' perderam o acento no novo Acordo Ortográfico?",
    answer:
      "Porque ditongos abertos 'ei' e 'oi' em paroxítonas deixaram de ser acentuados",
    wrongOptions: [
      "Porque se tornaram proparoxítonas",
      "Porque agora são oxítonas",
      "O acento foi mantido",
    ],
    answerDescription:
      "O Acordo de 2009 eliminou o acento de ditongos abertos em paroxítonas: ideia (era idéia), assembleia, jiboia. Em oxítonas, o acento permanece: herói, papéis, chapéu.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Quando se usa crase (à)?",
    answer:
      "Quando ocorre fusão da preposição 'a' com o artigo feminino 'a': a + a = à",
    wrongOptions: [
      "Sempre antes de palavras femininas",
      "Antes de qualquer preposição",
      "Apenas em início de frase",
    ],
    answerDescription:
      "'Fui à escola' (a + a = à). Não há crase antes de masculinos, verbos, pronomes pessoais ou 'a' no singular + plural: 'a festas' (preposição sozinha).",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Qual a diferença entre 'sessão', 'seção' e 'cessão'?",
    answer:
      "'Sessão' = reunião/exibição. 'Seção' = divisão/parte. 'Cessão' = ato de ceder",
    wrongOptions: [
      "São a mesma palavra com grafias alternativas",
      "'Cessão' é uma reunião e 'sessão' é uma divisão",
      "'Seção' não existe no português",
    ],
    answerDescription:
      "'Sessão de cinema' (exibição). 'Seção de esportes do jornal' (parte/divisão). 'Cessão de direitos' (ceder algo). São parônimos — som parecido, significados diferentes.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Quando NÃO se usa crase?",
    answer:
      "Antes de palavras masculinas, verbos, pronomes pessoais e entre palavras repetidas",
    wrongOptions: [
      "Antes de palavras femininas",
      "Antes de nomes de cidades sem artigo",
      "Apenas as duas primeiras opções",
    ],
    answerDescription:
      "Não há crase em: 'a ele', 'a partir de', 'face a face', 'a cavalo'. Também não há antes de 'Esta', 'Essa', 'Toda' (sem artigo) e cidades sem artigo: 'Fui a Brasília' (mas 'Fui à Bahia').",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Qual a regra de hífen para o prefixo 'super-'?",
    answer:
      "Usa-se hífen quando a palavra seguinte começa com 'r' ou 'h': super-resistente, super-homem",
    wrongOptions: [
      "Nunca se usa hífen com 'super'",
      "Sempre se usa hífen com 'super'",
      "Apenas antes de vogais",
    ],
    answerDescription:
      "Prefixos terminados em 'r' (super, hiper, inter) usam hífen antes de 'r' ou 'h': super-raça, inter-regional, hiper-hidratação. Sem hífen: supermercado, interestadual.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Qual a grafia correta: 'excessão' ou 'exceção'?",
    answer: "'Exceção' (com 'ç')",
    wrongOptions: ["'Excessão' (com 'ss')", "Ambas são aceitas", "'Excesão'"],
    answerDescription:
      "'Exceção' é a forma correta. A confusão ocorre pela influência de 'excesso' (com 'ss'). São palavras da mesma família, mas com grafias diferentes.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Por que 'voo' e 'enjoo' não têm mais acento circunflexo?",
    answer:
      "O Acordo Ortográfico eliminou o acento de 'oo' e 'ee' em paroxítonas",
    wrongOptions: [
      "Ainda têm acento circunflexo",
      "Porque se tornaram oxítonas",
      "Porque são monossílabos",
    ],
    answerDescription:
      "Antes: vôo, enjôo, crêem, lêem. Depois do Acordo: voo, enjoo, creem, leem. O acento duplo em 'ee' e 'oo' foi abolido.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Qual a diferença entre 'descrição' e 'discrição'?",
    answer:
      "'Descrição' = ato de descrever. 'Discrição' = qualidade de ser discreto",
    wrongOptions: [
      "São a mesma palavra",
      "'Discrição' é o ato de descrever",
      "Nenhuma das duas existe",
    ],
    answerDescription:
      "'Faça uma descrição do produto' (descrever). 'Aja com discrição' (discreto). Parônimos: palavras de som semelhante mas significado diferente.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Quando se usa 's' com som de /z/ entre vogais?",
    answer: "O 's' entre vogais tem naturalmente som de /z/: casa, rosa, mesa",
    wrongOptions: [
      "Nunca; 's' sempre tem som de /s/",
      "Apenas em palavras de origem latina",
      "Apenas no início da palavra",
    ],
    answerDescription:
      "'S' entre vogais = /z/: casa, mesa, rosa. Para som de /s/ entre vogais, usa-se 'ss', 'ç', 'sc', 'xc': passo, açúcar, piscina, exceto.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Quando se usa trema em português?",
    answer:
      "O trema foi abolido pelo Acordo Ortográfico, exceto em nomes próprios estrangeiros e seus derivados",
    wrongOptions: [
      "Usa-se em 'qü' e 'gü' sempre",
      "Nunca existiu trema em português",
      "Usa-se apenas em palavras com 'ü'",
    ],
    answerDescription:
      "Antes: lingüiça, freqüente. Depois do Acordo (2009): linguiça, frequente. O trema só permanece em nomes como Müller, mülleriano.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "JUNIOR",
    question: "Qual a grafia correta: 'paralização' ou 'paralisação'?",
    answer: "'Paralisação' (com 's')",
    wrongOptions: [
      "'Paralização' (com 'z')",
      "Ambas são aceitas",
      "'Paralizassão'",
    ],
    answerDescription:
      "'Paralisação' vem de 'paralisar' (-isar, não -izar). Regra: se a palavra primitiva tem 's' no radical (análise → analisar), mantém 's'. Com 'z': real → realizar, legal → legalizar.",
  },

  // ── PLENO (12 questões) ──
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question:
      "A crase é obrigatória, proibida ou facultativa antes de pronomes possessivos femininos (sua, minha)?",
    answer:
      "Facultativa: 'Refiro-me à sua proposta' ou 'Refiro-me a sua proposta'",
    wrongOptions: [
      "Sempre obrigatória",
      "Sempre proibida",
      "Obrigatória no singular e proibida no plural",
    ],
    answerDescription:
      "Antes de possessivos femininos, o artigo é facultativo, logo a crase também: 'Fui à/a minha casa.' Mas se o possessivo estiver no plural com preposição no singular, não há crase: 'Refiro-me a suas propostas.'",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question:
      "Qual a regra de hífen quando o prefixo termina com a mesma vogal que começa a próxima palavra?",
    answer: "Usa-se hífen: anti-inflamatório, micro-organismo, contra-ataque",
    wrongOptions: [
      "Juntam-se sem hífen em todos os casos",
      "Usa-se hífen apenas com prefixos gregos",
      "Elimina-se uma das vogais",
    ],
    answerDescription:
      "Regra do Acordo: vogais iguais → hífen (anti-inflamatório, micro-ônibus). Vogais diferentes → sem hífen (autoescola, semiaberto). Exceção: prefixo 'co-' dispensa hífen mesmo com 'o': cooperar.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Quando o 'i' e 'u' tônicos em hiato NÃO recebem acento?",
    answer:
      "Quando seguidos de 'nh' ou quando formam sílaba com 'l', 'r', 'z' ou letra igual: rainha, ruim, juiz, xiita",
    wrongOptions: [
      "Sempre recebem acento em hiato",
      "Quando estão no início da palavra",
      "Quando a palavra é oxítona",
    ],
    answerDescription:
      "Regra: 'i' e 'u' tônicos em hiato são acentuados (saúde, país), exceto: antes de 'nh' (rainha), seguidos de consoante na mesma sílaba (juiz = ju-iz, 'z' fecha a sílaba), ou seguidos de letra igual (xiita).",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "A palavra 'bem-vindo' tem hífen. E 'benvindo'?",
    answer:
      "'Bem-vindo' com hífen é a forma correta; 'benvindo' sem hífen é apenas nome próprio",
    wrongOptions: [
      "Ambas estão corretas como adjetivo",
      "'Benvindo' é a forma após o Acordo",
      "'Bem vindo' sem hífen é a forma atual",
    ],
    answerDescription:
      "'Bem' + adjetivo/particípio leva hífen: bem-vindo, bem-humorado, bem-feito. 'Mal' segue a mesma regra: mal-educado, mal-humorado.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Por que 'feiura' perdeu o acento e 'Piauí' não?",
    answer:
      "Porque 'feiura' tem 'u' tônico após ditongo (regra eliminada), enquanto 'Piauí' tem hiato simples sem ditongo precedente",
    wrongOptions: [
      "Ambas perderam o acento",
      "Ambas mantiveram o acento",
      "'Piauí' é nome próprio, por isso é exceção",
    ],
    answerDescription:
      "O Acordo eliminou acento de 'i' e 'u' tônicos após ditongo em paroxítonas: feiúra → feiura, baiúca → baiuca. Em 'Piauí', não há ditongo antes do 'i' — é um hiato puro Pi-au-í (oxítona), então mantém acento.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Qual a regra para acentuar monossílabos tônicos?",
    answer:
      "Acentuam-se os terminados em 'a(s)', 'e(s)', 'o(s)': já, pé, nó, mês, pôs",
    wrongOptions: [
      "Todos os monossílabos são acentuados",
      "Nenhum monossílabo recebe acento",
      "Apenas os terminados em consoante",
    ],
    answerDescription:
      "Monossílabos tônicos com 'a/e/o' + opcional 's': já, más, pé, mês, pó, nós, pôs. Monossílabos átonos (preposições, artigos, pronomes) não são acentuados: de, em, me, se.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question:
      "Qual a diferença entre 'acerca de', 'a cerca de' e 'há cerca de'?",
    answer:
      "'Acerca de' = sobre. 'A cerca de' = a aproximadamente (distância). 'Há cerca de' = faz aproximadamente (tempo)",
    wrongOptions: [
      "São todas formas da mesma expressão",
      "'Há cerca de' indica distância",
      "'Acerca de' indica tempo passado",
    ],
    answerDescription:
      "'Falou acerca de política' (= sobre). 'Mora a cerca de 5 km' (distância). 'Há cerca de 3 anos' (tempo passado). Três expressões, três significados.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Quando se usa 'j' ou 'g' antes de 'e' e 'i'?",
    answer:
      "Palavras de origem tupi e africana usam 'j' (jiboia, pajé); de origem latina/grega, 'g' (gesso, gigante). Na dúvida, consulte o dicionário",
    wrongOptions: [
      "'J' antes de 'e' e 'g' antes de 'i' sempre",
      "São sempre intercambiáveis",
      "'G' é usado apenas com 'u' (gue, gui)",
    ],
    answerDescription:
      "Não há regra universal — depende da etimologia. Palavras derivadas mantêm a letra da primitiva: viajar → viajei (com j); agir → agência (com g). Memorização e dicionário são aliados.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question:
      "O acento diferencial permaneceu em quais palavras após o Acordo?",
    answer:
      "'Pôr' (verbo) vs 'por' (preposição) e 'pôde' (pretérito) vs 'pode' (presente)",
    wrongOptions: [
      "Em todas as palavras que tinham acento diferencial",
      "Em nenhuma — todos foram eliminados",
      "Apenas em 'pôr' e 'fôrma'",
    ],
    answerDescription:
      "Obrigatórios: pôr/por, pôde/pode. Facultativo: fôrma/forma. Eliminados: pára/para, péla/pela, pólo/polo, pêra/pera.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Quando paroxítonas são acentuadas?",
    answer:
      "Quando terminam em: i(s), u(s), l, n, r, x, ã(s), ão(s), ps, um, uns, ditongo",
    wrongOptions: [
      "Todas as paroxítonas são acentuadas",
      "Apenas as terminadas em 'a' e 'o'",
      "Nenhuma paroxítona é acentuada",
    ],
    answerDescription:
      "Exemplos: lápis, vírus, fácil, hífen, caráter, tórax, ímã, órgão, bíceps, médium, álbuns, memória (ditongo). Paroxítonas terminadas em a(s), e(s), o(s), em(ns) geralmente NÃO são acentuadas (são a maioria).",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Qual a grafia correta: 'micro-ondas' ou 'microondas'?",
    answer: "'Micro-ondas' (com hífen, pois vogais iguais: o + o)",
    wrongOptions: [
      "'Microondas' (sem hífen)",
      "Ambas são aceitas",
      "'Micro ondas' (separado sem hífen)",
    ],
    answerDescription:
      "Regra: prefixo terminando na mesma vogal do segundo elemento → hífen: micro-ondas, micro-ônibus, anti-inflamatório. Vogais diferentes → sem hífen: autoescola, semiaberto.",
  },
  {
    category: "Ortografia e Acentuação",
    level: "PLENO",
    question: "Qual a diferença entre 'afim' e 'a fim de'?",
    answer:
      "'Afim' = semelhante (adjetivo). 'A fim de' = com objetivo de, para (locução prepositiva de finalidade)",
    wrongOptions: [
      "São a mesma expressão",
      "'Afim' indica finalidade",
      "'A fim de' é um adjetivo",
    ],
    answerDescription:
      "'Temos interesses afins' (= semelhantes). 'Estudou a fim de passar' (= para passar). Contextos e classes gramaticais completamente diferentes.",
  },
];

// ────────────────────────
// CATEGORIA 5 — Semântica
// ────────────────────────

const semanticaCards: PortCard[] = [
  // ── INICIANTE (12 questões) ──
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é denotação?",
    answer: "Sentido literal, objetivo e dicionarizado de uma palavra",
    wrongOptions: [
      "Sentido figurado de uma palavra",
      "Significado oposto de uma palavra",
      "O som de uma palavra",
    ],
    answerDescription:
      "Denotação = sentido real. 'O coração bombeia sangue' (sentido literal). Opõe-se à conotação (sentido figurado).",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é conotação?",
    answer: "Sentido figurado, subjetivo ou metafórico de uma palavra",
    wrongOptions: [
      "Sentido literal e objetivo",
      "Sinônimo de denotação",
      "Uma palavra sem significado",
    ],
    answerDescription:
      "Conotação = sentido figurado. 'Ele tem um coração de ouro' (generosidade, não metal). A linguagem literária e publicitária usa amplamente a conotação.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que são sinônimos?",
    answer:
      "Palavras com significados semelhantes: bonito/lindo, casa/lar, rápido/veloz",
    wrongOptions: [
      "Palavras com significados opostos",
      "Palavras com a mesma grafia",
      "Palavras de mesma classe gramatical apenas",
    ],
    answerDescription:
      "Sinônimos não são perfeitamente intercambiáveis — há nuances: 'morrer' e 'falecer' são sinônimos, mas 'falecer' é mais formal. O contexto determina a melhor escolha.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que são antônimos?",
    answer:
      "Palavras com significados opostos: bom/mau, claro/escuro, início/fim",
    wrongOptions: [
      "Palavras com o mesmo significado",
      "Palavras que rimam",
      "Palavras da mesma família",
    ],
    answerDescription:
      "Antônimos estabelecem relação de oposição. Podem ser graduais (quente/frio, com graus intermediários) ou complementares (vivo/morto, sem graduação).",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é uma metáfora?",
    answer:
      "Comparação implícita entre dois elementos com base em semelhança: 'A vida é uma viagem'",
    wrongOptions: [
      "Comparação com uso de 'como'",
      "Repetição de palavras",
      "Exagero intencional",
    ],
    answerDescription:
      "Metáfora é comparação sem conectivo: 'Ele é uma fera' (habilidoso). Comparação/símile usa 'como': 'Ele é como uma fera.' Metáfora é mais expressiva e direta.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é hipérbole?",
    answer: "Exagero intencional para dar ênfase: 'Estou morrendo de fome'",
    wrongOptions: [
      "Diminuição intencional",
      "Comparação entre dois elementos",
      "Uso de palavras com som semelhante",
    ],
    answerDescription:
      "Hipérbole amplifica a realidade: 'Já te disse um milhão de vezes' (muitas vezes). É recurso expressivo, não literal. Muito usada na fala coloquial.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é eufemismo?",
    answer:
      "Suavização de uma expressão desagradável: 'Ele nos deixou' em vez de 'morreu'",
    wrongOptions: [
      "Exagero para dar ênfase",
      "Uso do sentido literal das palavras",
      "Repetição de uma ideia",
    ],
    answerDescription:
      "Eufemismo atenua ideias desagradáveis: 'Passou desta para melhor' (morreu). 'Pessoa da terceira idade' (velha). Usado por delicadeza ou conveniência social.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é metonímia?",
    answer:
      "Substituição de uma palavra por outra com a qual tem relação: 'Leu Machado de Assis' (= a obra dele)",
    wrongOptions: [
      "Comparação entre palavras",
      "Repetição de sons",
      "Inversão de palavras na frase",
    ],
    answerDescription:
      "Metonímia troca por contiguidade: autor pela obra ('li Machado'), parte pelo todo ('cem cabeças de gado'), continente pelo conteúdo ('tomou um copo' = o líquido).",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que são homônimos?",
    answer:
      "Palavras com mesma pronúncia ou grafia, mas significados diferentes: banco (assento) e banco (instituição)",
    wrongOptions: [
      "Palavras com significados semelhantes",
      "Palavras com significados opostos",
      "Palavras de origens diferentes que rimam",
    ],
    answerDescription:
      "Homônimos perfeitos: mesma grafia e pronúncia (banco/banco). Homógrafos: mesma grafia, pronúncia diferente (colher verbo / colher substantivo). Homófonos: mesmo som, grafia diferente (sessão/cessão).",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que são parônimos?",
    answer:
      "Palavras semelhantes na grafia e pronúncia, mas com significados diferentes: comprimento/cumprimento, eminente/iminente",
    wrongOptions: [
      "Palavras iguais com significados diferentes",
      "Palavras com significados iguais",
      "Palavras que rimam entre si",
    ],
    answerDescription:
      "Parônimos causam confusão: tráfego/tráfico, descriminar/discriminar, ratificar/retificar. Diferem dos homônimos por terem grafias/sons apenas parecidos, não idênticos.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é personificação (prosopopeia)?",
    answer:
      "Atribuir características humanas a seres inanimados ou irracionais: 'O vento sussurrava'",
    wrongOptions: [
      "Exagero intencional",
      "Comparação entre duas pessoas",
      "Uso de palavras opostas",
    ],
    answerDescription:
      "Personificação humaniza o não humano: 'A lua sorria', 'As flores dançavam ao vento'. Recurso expressivo muito usado em poesia e textos literários.",
  },
  {
    category: "Semântica",
    level: "INICIANTE",
    question: "O que é ironia?",
    answer:
      "Dizer o contrário do que se pensa, geralmente com tom crítico ou humorístico",
    wrongOptions: [
      "Repetir a mesma ideia",
      "Exagerar um fato",
      "Suavizar uma expressão",
    ],
    answerDescription:
      "'Que educado, jogou o lixo no chão!' (o contrário do que pensa). A ironia depende de contexto, tom de voz e marcas textuais para ser compreendida.",
  },

  // ── JUNIOR (12 questões) ──
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "Qual a diferença entre polissemia e homonímia?",
    answer:
      "Polissemia: uma palavra com vários sentidos relacionados. Homonímia: palavras diferentes que coincidem na forma",
    wrongOptions: [
      "São a mesma coisa",
      "Polissemia é entre idiomas e homonímia é dentro do mesmo idioma",
      "Homonímia é ter vários sentidos e polissemia é coincidência de formas",
    ],
    answerDescription:
      "Polissemia: 'pé' (do corpo, da mesa, da planta) — sentidos derivados de um original. Homonímia: 'manga' (fruta) e 'manga' (da camisa) — origens diferentes, coincidência de forma.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é catacrese?",
    answer:
      "Metáfora desgastada pelo uso, incorporada ao cotidiano: 'pé da mesa', 'boca do estômago'",
    wrongOptions: [
      "Erro de ortografia",
      "Exagero intencional",
      "Uso formal da linguagem",
    ],
    answerDescription:
      "Catacrese é uma metáfora que se tornou tão comum que perdeu o efeito figurado: 'embarcar no avião' (originalmente, só se embarcava em barco). Já não é percebida como figura de linguagem.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é antítese?",
    answer:
      "Aproximação de palavras ou ideias contrárias para criar contraste: 'É feio, mas é bom'",
    wrongOptions: [
      "Repetição de palavras iguais",
      "Suavização de expressão",
      "Exagero proposital",
    ],
    answerDescription:
      "Antítese contrapõe ideias: 'Nasce o sol e eu não vi a hora do sol se pôr' (Cazuza). Diferente do paradoxo, que une ideias contraditórias em si mesmas.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é pleonasmo?",
    answer:
      "Redundância — repetição de uma ideia para reforçá-la: 'subir para cima', 'ver com os olhos'",
    wrongOptions: [
      "Uso de palavras com sentido figurado",
      "Omissão de palavras na frase",
      "Inversão da ordem das palavras",
    ],
    answerDescription:
      "Pleonasmo vicioso: 'subir pra cima', 'entrar pra dentro' (erro). Pleonasmo literário: 'Morrerás morte vil' (Gonçalves Dias) — redundância intencional, expressiva.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "Qual a diferença entre 'ratificar' e 'retificar'?",
    answer: "'Ratificar' = confirmar, validar. 'Retificar' = corrigir, emendar",
    wrongOptions: [
      "São sinônimos",
      "'Ratificar' é corrigir e 'retificar' é confirmar",
      "Ambas significam fazer novamente",
    ],
    answerDescription:
      "'O juiz ratificou a sentença' (confirmou). 'O juiz retificou o erro no documento' (corrigiu). Parônimos frequentes em provas e textos jurídicos.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é sinestesia?",
    answer:
      "Mistura de sensações de sentidos diferentes: 'voz doce' (audição + paladar)",
    wrongOptions: [
      "Repetição de consoantes",
      "Exagero proposital",
      "Comparação entre duas pessoas",
    ],
    answerDescription:
      "Sinestesia une percepções sensoriais distintas: 'cor quente' (visão + tato), 'som áspero' (audição + tato), 'perfume suave' (olfato + tato). Recurso comum em poesia.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é campo semântico?",
    answer:
      "Conjunto de palavras relacionadas por um tema em comum: 'escola', 'professor', 'aluno', 'aula'",
    wrongOptions: [
      "Palavras que rimam entre si",
      "Palavras com mesma classe gramatical",
      "Palavras com mesma origem etimológica",
    ],
    answerDescription:
      "Campo semântico agrupa palavras de um mesmo universo de significação. O campo semântico de 'tecnologia' inclui: computador, software, hardware, código, programa, etc.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "Qual a diferença entre 'eminente' e 'iminente'?",
    answer:
      "'Eminente' = ilustre, importante. 'Iminente' = prestes a acontecer",
    wrongOptions: [
      "São sinônimos",
      "'Iminente' = importante; 'eminente' = prestes a acontecer",
      "Ambas significam 'elevado'",
    ],
    answerDescription:
      "'Eminente professor' (renomado). 'Perigo iminente' (que vai ocorrer a qualquer momento). Parônimos clássicos em concursos.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é gradação?",
    answer:
      "Sequência de palavras que intensifica uma ideia progressivamente: 'olhou, viu, observou, analisou'",
    wrongOptions: [
      "Repetição de sons iguais",
      "Uso de palavras opostas",
      "Omissão de conectivos",
    ],
    answerDescription:
      "Gradação constrói uma escala crescente ou decrescente: 'Um minuto, uma hora, um dia, uma vida inteira.' Intensifica o efeito expressivo pela progressão.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question:
      "Qual a diferença entre sentido literal e figurado na frase 'Ela quebrou o gelo'?",
    answer:
      "Literal: quebrou pedaço de gelo. Figurado: superou a timidez/desconforto inicial",
    wrongOptions: [
      "Só existe o sentido literal",
      "Literal: ficou com frio. Figurado: derreteu gelo",
      "Não há sentido figurado nessa expressão",
    ],
    answerDescription:
      "Expressões idiomáticas têm sentido figurado consagrado pelo uso. 'Quebrar o gelo' figuradamente = iniciar uma conversa em ambiente tenso. O contexto determina qual sentido está ativo.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é aliteração?",
    answer:
      "Repetição de sons consonantais para criar efeito sonoro: 'O rato roeu a roupa do rei de Roma'",
    wrongOptions: [
      "Repetição de vogais",
      "Uso de palavras opostas",
      "Inversão da ordem da frase",
    ],
    answerDescription:
      "Aliteração repete consoantes: 'Vozes veladas, veludosas vozes' (Cruz e Sousa — repetição do /v/). É recurso sonoro, comum em poesia e publicidade.",
  },
  {
    category: "Semântica",
    level: "JUNIOR",
    question: "O que é assonância?",
    answer:
      "Repetição de sons vocálicos em uma frase ou verso: 'Sou Ana, da cama, da cana, fulana, bacana'",
    wrongOptions: [
      "Repetição de consoantes",
      "Uso de palavras estrangeiras",
      "Omissão de palavras na frase",
    ],
    answerDescription:
      "Assonância repete vogais: 'Berro pelo aterro, pelo desterro' (Caetano Veloso — repetição de /e/). Cria musicalidade e ritmo. Complementa a aliteração na construção sonora do texto.",
  },

  // ── PLENO (12 questões) ──
  {
    category: "Semântica",
    level: "PLENO",
    question: "Qual a diferença entre ambiguidade e polissemia?",
    answer:
      "Ambiguidade é duplo sentido na frase (pode ser vício). Polissemia é propriedade da palavra (vários sentidos no dicionário)",
    wrongOptions: [
      "São a mesma coisa",
      "Ambiguidade é da palavra e polissemia é da frase",
      "Polissemia é sempre um vício de linguagem",
    ],
    answerDescription:
      "Polissemia é lexical (a palavra 'banco' tem vários sentidos). Ambiguidade é textual ('O policial prendeu o ladrão em sua casa' — ambiguidade estrutural). Polissemia é natural; ambiguidade pode ser defeito ou recurso.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é uma perífrase?",
    answer:
      "Expressão que substitui uma palavra por descrição de suas características: 'cidade maravilhosa' = Rio de Janeiro",
    wrongOptions: [
      "Palavra que contradiz outra",
      "Repetição desnecessária",
      "Palavra com sentido oposto ao pretendido",
    ],
    answerDescription:
      "Perífrase (ou antonomásia quando se refere a pessoa): 'Rei do futebol' (Pelé), 'língua de Camões' (português), 'astro-rei' (Sol). É uma forma indireta de referência.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é litote?",
    answer:
      "Negação do contrário para afirmar algo de forma atenuada: 'Ela não é nada burra' (= é inteligente)",
    wrongOptions: [
      "Exagero intencional",
      "Repetição de ideias",
      "Uso de palavras com som semelhante",
    ],
    answerDescription:
      "Litote atenua afirmando pela negação do oposto: 'Não é impossível' (= é possível). É uma forma sutil de expressão, diferente do eufemismo (que suaviza diretamente).",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é um oxímoro?",
    answer:
      "Combinação de palavras contraditórias em uma mesma expressão: 'silêncio eloquente', 'clara escuridão'",
    wrongOptions: [
      "Repetição de sons vocálicos",
      "Inversão de sujeito e predicado",
      "Exagero para causar humor",
    ],
    answerDescription:
      "Oxímoro (ou paradoxo concentrado) une opostos numa expressão curta: 'amarga doçura', 'gelo fervente'. Semelhante ao paradoxo, mas mais compacto.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "Qual a diferença entre 'discriminar' e 'descriminar'?",
    answer:
      "'Discriminar' = distinguir ou tratar com preconceito. 'Descriminar' = inocentar, tirar a culpa",
    wrongOptions: [
      "São sinônimos",
      "'Descriminar' é tratar com preconceito",
      "'Discriminar' é inocentar",
    ],
    answerDescription:
      "'Discriminar raças' (diferenciar). 'Discriminar alguém' (preconceito). 'Descriminar o réu' (absolver, tirar o crime). Des + criminar = remover o caráter criminoso.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é anáfora (figura de linguagem)?",
    answer:
      "Repetição de uma palavra ou expressão no início de versos ou frases consecutivas",
    wrongOptions: [
      "Omissão de uma palavra já mencionada",
      "Uso de sentido figurado",
      "Inversão da ordem natural da frase",
    ],
    answerDescription:
      "'É preciso amar. / É preciso lutar. / É preciso resistir.' A repetição de 'É preciso' no início cria ritmo e ênfase. Não confundir com anáfora textual (referência a termo anterior).",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "Qual a diferença entre 'tráfego' e 'tráfico'?",
    answer:
      "'Tráfego' = trânsito, movimento de veículos/dados. 'Tráfico' = comércio ilegal",
    wrongOptions: [
      "São sinônimos perfeitos",
      "'Tráfego' é comércio e 'tráfico' é trânsito",
      "Ambas se referem ao trânsito de veículos",
    ],
    answerDescription:
      "'Tráfego intenso de dados' (fluxo legítimo). 'Tráfico de drogas' (comércio criminoso). Parônimos com contextos totalmente diferentes.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é disfemismo?",
    answer:
      "Uso de expressão mais dura, grosseira ou depreciativa em vez da neutra: 'bateu as botas' (= morreu)",
    wrongOptions: [
      "Suavização de uma expressão",
      "Repetição excessiva de palavras",
      "Uso de linguagem formal",
    ],
    answerDescription:
      "Disfemismo é o oposto do eufemismo: torna a expressão mais crua ou chocante. 'Bater as botas', 'esticar as canelas' (morrer). Pode ter tom humorístico, depreciativo ou provocativo.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é uma metonímia por sinédoque?",
    answer:
      "Tipo de metonímia que troca a parte pelo todo ou o todo pela parte: 'Não tinha teto' (= casa)",
    wrongOptions: [
      "Comparação entre dois objetos",
      "Uso de exagero para enfatizar",
      "Inversão de causa e efeito",
    ],
    answerDescription:
      "Sinédoque é um tipo de metonímia: parte pelo todo ('Cem cabeças de gado' = cem bois), todo pela parte ('O Brasil venceu' = a seleção). Gênero pelo específico e vice-versa.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "Qual a diferença entre 'infligir' e 'infringir'?",
    answer:
      "'Infligir' = aplicar (pena, castigo). 'Infringir' = violar, descumprir (lei, regra)",
    wrongOptions: [
      "São sinônimos",
      "'Infligir' é violar e 'infringir' é aplicar",
      "Ambas significam punir",
    ],
    answerDescription:
      "'Infligir uma multa ao motorista' (aplicar). 'Infringir a lei de trânsito' (violar). Parônimos clássicos em provas de concursos e exames.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é elipse?",
    answer:
      "Omissão de um termo facilmente identificável pelo contexto: 'Na sala, apenas silêncio' (omitiu 'havia')",
    wrongOptions: [
      "Repetição de uma palavra para dar ênfase",
      "Uso de sentido figurado",
      "Inversão da ordem direta da frase",
    ],
    answerDescription:
      "Elipse omite sem prejudicar o entendimento: 'Eu gosto de café; ela, de chá.' (omitiu 'gosta'). Quando o elemento omitido é um verbo já mencionado, chama-se zeugma.",
  },
  {
    category: "Semântica",
    level: "PLENO",
    question: "O que é 'hiperonímia' e 'hiponímia'?",
    answer:
      "Hiperônimo = palavra geral que engloba outras (animal). Hipônimo = palavra específica englobada (gato, cão)",
    wrongOptions: [
      "São tipos de sinônimos",
      "Hiperônimo é a palavra específica e hipônimo é a geral",
      "São tipos de antônimos",
    ],
    answerDescription:
      "'Fruta' é hiperônimo de 'maçã', 'banana', 'uva' (hipônimos). A relação de inclusão é hierárquica. Importante em coesão textual: usar hiperônimos evita repetições (ex: 'a fruta' retomando 'maçã').",
  },
];

// ─────────────────────────────
// Construção e inserção no banco
// ─────────────────────────────

const allPortuguesCards: PortCard[] = [
  ...compreensaoCards,
  ...sintaxeCards,
  ...morfologiaCards,
  ...ortografiaCards,
  ...semanticaCards,
];

async function main() {
  const cards: Prisma.ReadyFlashcardCreateManyInput[] = allPortuguesCards.map(
    (card) => ({
      track: "PORTUGUES" as const,
      category: card.category,
      level: card.level,
      question: card.question,
      answer: card.answer,
      wrongOptions: card.wrongOptions,
      answerDescription: card.answerDescription,
    }),
  );

  await prisma.readyFlashcard.deleteMany({
    where: { track: "PORTUGUES" },
  });

  await prisma.readyFlashcard.createMany({ data: cards });

  const countByLevel = {
    INICIANTE: cards.filter((c) => c.level === "INICIANTE").length,
    JUNIOR: cards.filter((c) => c.level === "JUNIOR").length,
    PLENO: cards.filter((c) => c.level === "PLENO").length,
  };

  console.log(
    `Seed concluído: ${cards.length} cards de Português salvos no MongoDB.`,
  );
  console.log(`  Fácil (INICIANTE): ${countByLevel.INICIANTE}`);
  console.log(`  Médio (JUNIOR): ${countByLevel.JUNIOR}`);
  console.log(`  Difícil (PLENO): ${countByLevel.PLENO}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
