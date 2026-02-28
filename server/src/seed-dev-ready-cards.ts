import { Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { prisma } from "./prisma.js";

dotenv.config();

const categories = [
  "JavaScript",
  "Java",
  "C#",
  "C++",
  "Kotlin",
  "Python",
] as const;
const levels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const cardsPerLevel = 30;

const prompts = [
  {
    topic: "tipagem",
    question: "Como funciona a tipagem em {lang} e qual impacto na manutenção?",
    answer:
      "Em {lang}, entender a tipagem ajuda a evitar erros em tempo de execução e melhora a legibilidade do código em times grandes.",
  },
  {
    topic: "controle de fluxo",
    question:
      "Quando usar if/else, switch e operadores condicionais em {lang}?",
    answer:
      "Em {lang}, escolha a estrutura pelo nível de clareza: if/else para regras complexas, switch para múltiplos casos fixos e ternário para condições simples.",
  },
  {
    topic: "loops",
    question:
      "Quais cuidados com loops para evitar gargalos de performance em {lang}?",
    answer:
      "Em {lang}, reduza operações custosas dentro do loop, prefira estruturas adequadas e avalie complexidade temporal para grandes volumes.",
  },
  {
    topic: "coleções",
    question: "Como escolher entre listas, conjuntos e mapas em {lang}?",
    answer:
      "Em {lang}, use listas para ordem, conjuntos para unicidade e mapas para busca por chave, considerando custo de inserção e consulta.",
  },
  {
    topic: "tratamento de erro",
    question: "Qual estratégia de tratamento de erro é recomendada em {lang}?",
    answer:
      "Em {lang}, trate erros no nível certo de abstração, registre contexto relevante e evite suprimir exceções silenciosamente.",
  },
  {
    topic: "funções",
    question:
      "Quais boas práticas para funções limpas e reutilizáveis em {lang}?",
    answer:
      "Em {lang}, mantenha funções curtas, com responsabilidade única e nomes expressivos, reduzindo efeitos colaterais.",
  },
  {
    topic: "imutabilidade",
    question: "Qual vantagem de usar estruturas imutáveis em {lang}?",
    answer:
      "Em {lang}, imutabilidade reduz bugs de estado compartilhado, facilita testes e simplifica raciocínio em concorrência.",
  },
  {
    topic: "concorrência",
    question: "Quais riscos comuns de concorrência em {lang} e como mitigar?",
    answer:
      "Em {lang}, evite condições de corrida com sincronização adequada, isolamento de estado e estratégias thread-safe.",
  },
  {
    topic: "orientação a objetos",
    question: "Como aplicar encapsulamento de forma correta em {lang}?",
    answer:
      "Em {lang}, exponha apenas o necessário via interface pública e mantenha regras de negócio protegidas internamente.",
  },
  {
    topic: "herança e composição",
    question: "Quando preferir composição em vez de herança em {lang}?",
    answer:
      "Em {lang}, composição é preferível quando busca flexibilidade e baixo acoplamento, evitando hierarquias rígidas.",
  },
  {
    topic: "testes unitários",
    question: "Quais características de um bom teste unitário em {lang}?",
    answer:
      "Em {lang}, testes unitários devem ser rápidos, determinísticos, independentes e focados em comportamento observável.",
  },
  {
    topic: "mock e stubs",
    question: "Como usar mocks sem fragilizar testes em {lang}?",
    answer:
      "Em {lang}, mocke apenas dependências externas, evitando acoplamento ao detalhe de implementação.",
  },
  {
    topic: "arquitetura",
    question: "Como separar camadas de aplicação em {lang}?",
    answer:
      "Em {lang}, separe apresentação, domínio e infraestrutura para facilitar manutenção, testes e evolução.",
  },
  {
    topic: "API",
    question: "Quais práticas para validar entrada em APIs escritas em {lang}?",
    answer:
      "Em {lang}, valide payload no boundary da aplicação, normalize dados e retorne erros claros para o cliente.",
  },
  {
    topic: "serialização",
    question: "Quais cuidados ao serializar objetos em {lang}?",
    answer:
      "Em {lang}, evite expor campos sensíveis e mantenha contratos de serialização consistentes entre versões.",
  },
  {
    topic: "segurança",
    question: "Como reduzir vulnerabilidades comuns em aplicações {lang}?",
    answer:
      "Em aplicações {lang}, sanitize entrada, use autenticação forte e mantenha dependências atualizadas.",
  },
  {
    topic: "logs",
    question: "Qual padrão de log facilita observabilidade em sistemas {lang}?",
    answer:
      "Em sistemas {lang}, use logs estruturados com correlação de requisição, níveis adequados e mensagens acionáveis.",
  },
  {
    topic: "performance",
    question: "Como iniciar análise de performance em código {lang}?",
    answer:
      "Em {lang}, meça primeiro com profiling, identifique hotspots reais e só então aplique otimizações.",
  },
  {
    topic: "memória",
    question: "Quais sinais indicam mau uso de memória em aplicações {lang}?",
    answer:
      "Em {lang}, crescimento contínuo de memória, latência alta e pausas longas indicam necessidade de investigar vazamentos e alocações.",
  },
  {
    topic: "tratamento assíncrono",
    question: "Quais boas práticas em operações assíncronas com {lang}?",
    answer:
      "Com {lang}, trate timeouts, retries e cancelamento, além de manter propagação clara de erros.",
  },
  {
    topic: "clean code",
    question: "Como aplicar Clean Code em projetos {lang} sem exagero?",
    answer:
      "Em {lang}, priorize legibilidade e simplicidade, equilibrando padrões com necessidades reais de negócio.",
  },
  {
    topic: "design patterns",
    question: "Quando usar padrões de projeto em soluções {lang}?",
    answer:
      "Em {lang}, use padrões para resolver problemas recorrentes; evite aplicar por moda quando a solução simples basta.",
  },
  {
    topic: "versionamento",
    question: "Como evoluir APIs em {lang} sem quebrar consumidores?",
    answer:
      "Em {lang}, versionamento, depreciação gradual e contratos claros reduzem impacto em clientes existentes.",
  },
  {
    topic: "refatoração",
    question: "Quais passos seguros para refatorar código legado em {lang}?",
    answer:
      "Em {lang}, cubra comportamento atual com testes, refatore em pequenas etapas e valide continuamente.",
  },
  {
    topic: "integração contínua",
    question: "O que não pode faltar em pipeline CI para projeto {lang}?",
    answer:
      "Em {lang}, inclua build reproduzível, testes automatizados, lint e checagens de segurança antes de merge.",
  },
  {
    topic: "code review",
    question: "Quais critérios objetivos em code review para código {lang}?",
    answer:
      "Para {lang}, avalie corretude, legibilidade, cobertura de testes e impacto arquitetural das mudanças.",
  },
  {
    topic: "documentação",
    question: "Como manter documentação técnica útil em times {lang}?",
    answer:
      "Em times {lang}, documente decisões e contratos importantes próximos ao código e atualize junto das entregas.",
  },
  {
    topic: "boas práticas de PR",
    question: "Como estruturar PRs pequenos e revisáveis em projetos {lang}?",
    answer:
      "Em {lang}, PRs menores com contexto claro aceleram revisão, reduzem bugs e facilitam rollback.",
  },
  {
    topic: "debugging",
    question:
      "Qual abordagem eficiente para depurar falhas intermitentes em {lang}?",
    answer:
      "Em {lang}, reproduza cenário, aumente observabilidade, isole hipótese e valide correção com teste regressivo.",
  },
  {
    topic: "boas práticas de deploy",
    question: "Quais cuidados antes de colocar aplicação {lang} em produção?",
    answer:
      "Para {lang}, valide configuração, monitoração, rollback e saúde dos serviços antes do deploy final.",
  },
] as const;

const beginnerPrompts = [
  {
    question: "O que é uma variável em {lang}?",
    answer: "Uma variável guarda um valor para usar depois no programa.",
  },
  {
    question: "Para que serve um comentário em {lang}?",
    answer: "Comentário explica o código para quem está lendo.",
  },
  {
    question: "O que é uma função em {lang}?",
    answer: "Função é um bloco reutilizável que executa uma tarefa.",
  },
  {
    question: "Qual a diferença entre texto e número em {lang}?",
    answer: "Texto representa palavras e número representa valor numérico.",
  },
  {
    question: "Para que serve um if em {lang}?",
    answer: "If executa um bloco apenas quando a condição é verdadeira.",
  },
  {
    question: "Quando usar else em {lang}?",
    answer: "Else roda quando a condição do if não for atendida.",
  },
  {
    question: "O que é um loop em {lang}?",
    answer: "Loop repete instruções enquanto uma regra for atendida.",
  },
  {
    question: "O que significa erro de sintaxe em {lang}?",
    answer: "É quando o código foi escrito fora da regra da linguagem.",
  },
  {
    question: "Para que serve imprimir no console em {lang}?",
    answer:
      "Ajuda a visualizar valores e entender o que o programa está fazendo.",
  },
  {
    question: "O que é uma lista/array em {lang}?",
    answer: "É uma coleção de valores guardados em sequência.",
  },
  {
    question: "O que é um booleano em {lang}?",
    answer: "Booleano só pode ser verdadeiro ou falso.",
  },
  {
    question: "Para que serve comparar valores em {lang}?",
    answer: "Comparação ajuda a decidir qual caminho o código deve seguir.",
  },
  {
    question: "O que é uma string em {lang}?",
    answer: "String é um texto, como nome, mensagem ou frase.",
  },
  {
    question: "O que é concatenar texto em {lang}?",
    answer: "É juntar dois ou mais textos em uma só mensagem.",
  },
  {
    question: "O que é entrada de dados em {lang}?",
    answer: "É receber informação do usuário ou de outra fonte.",
  },
  {
    question: "O que é saída de dados em {lang}?",
    answer: "É mostrar ou retornar o resultado do programa.",
  },
  {
    question: "Por que dar nome claro para variáveis em {lang}?",
    answer: "Nomes claros facilitam leitura e manutenção do código.",
  },
  {
    question: "O que é retorno de função em {lang}?",
    answer: "É o valor que a função entrega ao terminar sua execução.",
  },
  {
    question: "Para que serve organizar código em funções em {lang}?",
    answer: "Facilita reutilização, testes e entendimento do programa.",
  },
  {
    question: "O que é depuração (debug) em {lang}?",
    answer: "É investigar o código para encontrar e corrigir erros.",
  },
  {
    question: "Qual a importância de testar código em {lang}?",
    answer: "Testes ajudam a garantir que o programa funciona como esperado.",
  },
  {
    question: "O que é uma condição verdadeira em {lang}?",
    answer: "É uma expressão que resulta em valor verdadeiro.",
  },
  {
    question: "O que é uma condição falsa em {lang}?",
    answer: "É uma expressão que resulta em valor falso.",
  },
  {
    question: "Para que serve quebrar problemas em partes menores em {lang}?",
    answer: "Fica mais fácil desenvolver, testar e corrigir cada etapa.",
  },
  {
    question: "O que é erro de lógica em {lang}?",
    answer: "Código executa, mas entrega resultado diferente do esperado.",
  },
  {
    question: "Para que serve uma constante em {lang}?",
    answer: "Constante guarda valor que não deve mudar durante execução.",
  },
  {
    question: "Por que evitar código duplicado em {lang}?",
    answer: "Evita retrabalho e reduz chance de erro na manutenção.",
  },
  {
    question: "O que é parâmetro de função em {lang}?",
    answer: "Parâmetro é a informação que a função recebe para trabalhar.",
  },
  {
    question: "O que é chamada de função em {lang}?",
    answer: "É o ato de executar uma função definida no código.",
  },
  {
    question: "Por que ler mensagens de erro em {lang}?",
    answer: "A mensagem indica a causa do problema e onde corrigir.",
  },
] as const;

const categoryFocuses: Record<(typeof categories)[number], readonly string[]> =
  {
    JavaScript: [
      "Node.js em produção",
      "React com estado assíncrono",
      "segurança no frontend",
      "testes com Jest",
      "APIs REST/GraphQL",
      "event loop e performance",
      "TypeScript progressivo",
      "arquitetura modular",
    ],
    Java: [
      "Spring Boot",
      "JPA/Hibernate",
      "concorrência e threads",
      "microserviços",
      "JVM e garbage collection",
      "segurança com OAuth2",
      "mensageria com Kafka",
      "testes com JUnit",
    ],
    "C#": [
      ".NET e ASP.NET Core",
      "Entity Framework",
      "LINQ e coleções",
      "programação assíncrona",
      "arquitetura limpa",
      "autenticação JWT",
      "observabilidade",
      "testes xUnit",
    ],
    "C++": [
      "gestão de memória",
      "STL e algoritmos",
      "concorrência",
      "otimização de desempenho",
      "RAII",
      "boas práticas de ponteiros",
      "sistemas embarcados",
      "depuração avançada",
    ],
    Kotlin: [
      "Android moderno",
      "coroutines",
      "Ktor/Spring",
      "arquitetura MVVM",
      "null safety",
      "injeção de dependência",
      "testes instrumentados",
      "integração com Java",
    ],
    Python: [
      "FastAPI/Django",
      "automação de tarefas",
      "data engineering",
      "testes com pytest",
      "tipagem com mypy",
      "concorrência async",
      "segurança de dependências",
      "boas práticas de API",
    ],
  };

const contextAngles = [
  "cenário de concurso público",
  "projeto legado em evolução",
  "sistema de alta disponibilidade",
  "ambiente com compliance",
  "time distribuído",
  "prazo curto de entrega",
  "alto volume de usuários",
  "integração com terceiros",
  "monitoramento contínuo",
  "necessidade de rollback rápido",
] as const;

type PromptPair = {
  question: string;
  answer: string;
};

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
  }

  return hash;
}

function rotationSeed(): number {
  const rawSeed = process.env.SEED_ROTATION;

  if (!rawSeed) {
    return Math.floor(Date.now() / 86400000);
  }

  const numeric = Number(rawSeed);
  return Number.isFinite(numeric) ? numeric : hashString(rawSeed);
}

function selectRotatingPrompts(
  pool: PromptPair[],
  count: number,
  key: string,
): PromptPair[] {
  if (pool.length === 0) {
    return [];
  }

  const extractBaseQuestion = (question: string): string =>
    question.split(" Foco:")[0].split(" Cenário:")[0].trim();

  const groupsMap = new Map<string, PromptPair[]>();
  for (const prompt of pool) {
    const groupKey = extractBaseQuestion(prompt.question);
    const existing = groupsMap.get(groupKey);
    if (existing) {
      existing.push(prompt);
    } else {
      groupsMap.set(groupKey, [prompt]);
    }
  }

  const groups = Array.from(groupsMap.values());
  if (groups.length === 0) {
    return [];
  }

  const baseSeed = hashString(`${key}:${rotationSeed()}`);
  const groupStart = baseSeed % groups.length;
  const pointers = groups.map(
    (group, index) => hashString(`${key}:group:${index}`) % group.length,
  );

  const selected: PromptPair[] = [];
  for (let index = 0; index < count; index += 1) {
    const groupIndex = (groupStart + index) % groups.length;
    const group = groups[groupIndex];
    const pointer = pointers[groupIndex] % group.length;
    selected.push(group[pointer]);
    pointers[groupIndex] = (pointer + 1) % group.length;
  }

  return selected;
}

function cleanAnswerForButton(answer: string): string {
  return answer
    .replace(/^Resposta\s+[A-D]:\s*/i, "")
    .replace(/^Categoria\s+[^.]+\.\s*/i, "")
    .replace(/^Em\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+aplicações\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+sistemas\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+times\s+[^,]+,\s*/i, "")
    .replace(/^Para\s+[^,]+,\s*/i, "")
    .replace(/^Com\s+[^,]+,\s*/i, "")
    .trim();
}

function buildCardsForCategory(
  category: (typeof categories)[number],
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) => {
    const promptSource = level === "INICIANTE" ? beginnerPrompts : prompts;
    const focuses = categoryFocuses[category];

    const promptPool = promptSource.flatMap((prompt) =>
      focuses.flatMap((focus) =>
        contextAngles.map((angle) => ({
          question: `${prompt.question} Foco: ${focus}. Cenário: ${angle}.`,
          answer: `${prompt.answer} Foco prático: ${focus}. Contexto: ${angle}.`,
        })),
      ),
    );

    return selectRotatingPrompts(
      promptPool,
      cardsPerLevel,
      `DESENVOLVIMENTO:${category}:${level}`,
    ).map((prompt) => ({
      track: "DESENVOLVIMENTO",
      category,
      level,
      question: prompt.question.replaceAll("{lang}", category),
      answer: cleanAnswerForButton(
        prompt.answer.replaceAll("{lang}", category),
      ),
    }));
  });
}

async function main() {
  const cards = categories.flatMap((category) =>
    buildCardsForCategory(category),
  );

  await prisma.readyFlashcard.deleteMany({
    where: {
      track: "DESENVOLVIMENTO",
      category: {
        in: [...categories],
      },
    },
  });

  await prisma.readyFlashcard.createMany({ data: cards });

  console.log(
    `Seed concluído: ${cards.length} cards prontos salvos no MongoDB.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
