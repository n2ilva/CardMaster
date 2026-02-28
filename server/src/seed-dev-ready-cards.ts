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

const promptAnswerDescriptions: Record<string, string> = {
  tipagem:
    "Resumo: Tipagem define como {lang} atribui e valida tipos de variáveis — forte ou fraca, estática ou dinâmica. Tipos claros previnem erros silenciosos e facilitam refatoração.\n\nAplicação: Em projetos grandes, tipos explícitos funcionam como documentação viva, melhoram autocompletar da IDE e reduzem bugs em revisão de código.\n\nExemplo:\ntipoExplicito nome = 'Maria'\ntipoExplicito idade = 30\n// idade = 'trinta' → ERRO de tipo detectado",
  "controle de fluxo":
    "Resumo: if/else trata condições complexas, switch compara um valor contra vários casos fixos, e ternário resolve condições simples em uma linha.\n\nAplicação: Escolha pela legibilidade — if/else para lógica elaborada, switch para 3+ valores possíveis, ternário para atribuições simples.\n\nExemplo:\nswitch(status) {\n  case 'ativo': processar(); break;\n  case 'inativo': arquivar(); break;\n  default: registrarErro();\n}",
  loops:
    "Resumo: Evite operações custosas (banco, rede) dentro de loops — multiplica o tempo por N iterações. Avalie complexidade temporal (O(n) vs O(n²)).\n\nAplicação: Prefira operações em lote sempre que possível.\n\nExemplo:\n// Ruim: N consultas\nfor item in lista: buscar(item)\n// Bom: 1 consulta em lote\nresultados = buscarTodos(lista)",
  coleções:
    "Resumo: Listas preservam ordem e aceitam duplicados. Conjuntos garantem unicidade com busca O(1). Mapas associam chaves a valores para acesso direto.\n\nExemplo:\nlista = [1, 2, 2] // ordem + duplicados\nconjunto = {1, 2, 3} // sem duplicados\nmapa = {'chave': 'valor'} // acesso por chave O(1)",
  "tratamento de erro":
    "Resumo: Trate erros na camada que tem contexto para agir. Registre informações suficientes para diagnóstico e nunca suprima exceções silenciosamente.\n\nExemplo:\ntry { resultado = processar(dados) }\ncatch (ErroValidacao e) {\n  log.warn(e.contexto)\n  retornarErro(400, e.mensagem)\n}\n// Não capture exceções genéricas sem ação",
  funções:
    "Resumo: Funções limpas fazem uma coisa bem, têm nomes descritivos, poucos parâmetros e evitam efeitos colaterais.\n\nExemplo:\n// Ruim: múltiplas responsabilidades\nprocessarEEnviar(dados, email)\n// Bom: responsabilidade única\nvalidar(dados)\nenviar(email)",
  imutabilidade:
    "Resumo: Estruturas imutáveis não mudam após criação — modificações geram cópias novas. Elimina bugs de estado compartilhado e torna código previsível.\n\nExemplo:\n// Mutável (risco em concorrência):\nlista.add(item) // altera original\n// Imutável (seguro):\nnovaLista = lista.com(item) // original intacto",
  concorrência:
    "Resumo: Riscos comuns — race conditions (acesso simultâneo) e deadlocks (travamento mútuo). Mitigação: sincronização adequada, isolamento de estado e estruturas thread-safe.\n\nAplicação: Use locks otimistas ou filas de mensagem para proteger dados compartilhados entre múltiplas threads.",
  "orientação a objetos":
    "Resumo: Encapsulamento expõe apenas a interface pública e protege estado interno. Regras de negócio ficam dentro da classe, garantindo consistência.\n\nExemplo:\nclass Conta {\n  privado saldo = 0\n  depositar(valor) {\n    if (valor > 0) saldo += valor\n  }\n  // saldo protegido internamente\n}",
  "herança e composição":
    "Resumo: Composição injeta dependências variáveis, oferecendo flexibilidade. Herança cria hierarquias rígidas. Prefira composição quando precisar trocar comportamento.\n\nExemplo:\n// Herança (acoplado): Pato extends Ave\n// Composição (flexível):\nclass Pato { constructor(comportamentoVoo) }",
  "testes unitários":
    "Resumo: Bons testes são rápidos (ms), determinísticos, independentes e focados em comportamento observável. Padrão AAA: Arrange, Act, Assert.\n\nExemplo:\n// Arrange\ncalc = new Calculadora()\n// Act\nresultado = calc.somar(2, 3)\n// Assert\nassert resultado == 5",
  "mock e stubs":
    "Resumo: Mocke apenas dependências externas (banco, API, filesystem). Mockar classes internas acopla o teste à implementação.\n\nExemplo:\nmock = criarMock(ServicoEmail)\nservico = new Pedido(mock)\nservico.finalizar(pedido)\nassert mock.foiChamado('enviar')",
  arquitetura:
    "Resumo: Separar apresentação, domínio e infraestrutura permite evolução independente. A camada de domínio contém regras puras, sem dependência de frameworks.\n\nAplicação: Trocar banco ou framework web não impacta lógica de negócio. Testes ficam simples porque o domínio é testável isoladamente.",
  API: "Resumo: Valide entrada no boundary (controller) antes de processar. Normalize dados, valide formatos e retorne erros claros com códigos HTTP adequados.\n\nExemplo:\nfunction criarUsuario(req) {\n  if (!validar(req.email)) return erro(400, 'Email inválido')\n  email = normalizar(req.email)\n}",
  serialização:
    "Resumo: Evite expor campos sensíveis (senhas, tokens) na saída JSON. Mantenha contratos estáveis — adicionar campos é seguro, remover quebra clientes.\n\nExemplo:\n// Seguro: { id: 1, nome: 'Maria' }\n// NUNCA: { senha: '...', tokenInterno: '...' }",
  segurança:
    "Resumo: Sanitize entrada (previne injeção), use autenticação forte (JWT, OAuth) e mantenha dependências atualizadas. Menor privilégio: cada componente só acessa o necessário.\n\nAplicação: Inclua análise de vulnerabilidades (SAST/DAST) no pipeline CI e monitore CVEs.",
  logs: "Resumo: Logs estruturados (JSON) com timestamp, nível, ID de correlação e mensagens acionáveis. Não logue dados sensíveis.\n\nExemplo:\n{ timestamp: '2025-01-15', level: 'ERROR',\n  correlationId: 'abc-123',\n  message: 'Falha no pagamento', orderId: 456 }",
  performance:
    "Resumo: Meça primeiro com profiling, identifique hotspots reais e só então otimize. Otimização prematura é desperdício.\n\nAplicação: Monitore latência p95/p99, throughput e uso de recursos. Compare métricas antes/depois de cada otimização.",
  memória:
    "Resumo: Sinais de problema — crescimento contínuo do heap, pausas longas de GC e latência degradando. Causas: referências circulares, caches sem limite, listeners não removidos.\n\nAplicação: Use heap dumps e profiler de memória para encontrar objetos retidos desnecessariamente.",
  "tratamento assíncrono":
    "Resumo: Trate timeouts, retries com backoff exponencial, cancelamento cooperativo e propagação clara de erros.\n\nExemplo:\ntry { resultado = await buscar(url, timeout=5000) }\ncatch (Timeout) { retry: 1s, 2s, 4s... }\ncatch (Erro) { propagar com contexto }",
  "clean code":
    "Resumo: Priorize legibilidade — nomes expressivos, funções curtas, sem comentários óbvios. Equilibre padrões com necessidades reais do projeto.\n\nAplicação: Em código crítico, invista em clareza. Em scripts únicos ou PoCs, aceite pragmatismo.",
  "design patterns":
    "Resumo: Use padrões para problemas recorrentes, não por moda. Factory para criação variável, Observer para notificação desacoplada, Strategy para trocar algoritmos.\n\nAplicação: Se a solução simples resolve, não aplique padrão. Sobreengenharia prejudica.",
  versionamento:
    "Resumo: Versionamento explícito (v1, v2), depreciação gradual com avisos e contratos claros. Adições são retrocompatíveis; remoções quebram clientes.\n\nAplicação: Mantenha versões anteriores ativas por período definido e comunique cronograma de depreciação.",
  refatoração:
    "Resumo: Cubra comportamento atual com testes, refatore em pequenas etapas e valide continuamente. Commits frequentes facilitam rollback.\n\nAplicação: Extract Method, Rename Variable e Replace Conditional with Polymorphism são técnicas seguras com cobertura de testes.",
  "integração contínua":
    "Resumo: Pipeline CI: build reproduzível, testes automatizados, lint e checagens de segurança. Tudo antes do merge.\n\nAplicação: Bloqueie merge se etapa falhar. Cache de dependências acelera execução.",
  "code review":
    "Resumo: Avalie corretude, legibilidade, cobertura de testes e impacto arquitetural das mudanças.\n\nAplicação: Use checklists, comente com sugestões construtivas e automatize verificações de estilo com linters.",
  documentação:
    "Resumo: Documente decisões de arquitetura (ADRs), contratos de API e guias de setup — informações não óbvias no código.\n\nAplicação: README para setup, ADRs para decisões, docstrings para funções públicas.",
  "boas práticas de PR":
    "Resumo: PRs pequenos (até ~400 linhas) — revisão rápida, menos bugs, rollback fácil. Contexto claro: o que muda, por quê, como testar.\n\nAplicação: Use template (Contexto, Mudança, Como testar). Separe refatoração de mudanças funcionais.",
  debugging:
    "Resumo: Reproduza o cenário, aumente observabilidade, isole uma hipótese por vez e valide correção com teste regressivo.\n\nAplicação: Feature flags para isolar componentes, correlação de logs para rastrear fluxos, staging espelhando produção.",
  "boas práticas de deploy":
    "Resumo: Valide configuração, confirme monitoração ativa, garanta rollback rápido e verifique saúde dos serviços dependentes.\n\nAplicação: Deploy canário/blue-green para reduzir risco. Smoke tests automatizados pós-deploy.",
};

const beginnerAnswerDescriptions: string[] = [
  "Uma variável é um espaço nomeado na memória para armazenar valores. Use nomes descritivos para facilitar a leitura.\n\nExemplo:\nnome = 'João'\nidade = 25\n// Reutilize variáveis ao longo do programa",
  "Comentários explicam a intenção do código para quem lê. Use para clarificar lógica complexa, não para repetir o óbvio.\n\nExemplo:\n// Calcula desconto para clientes premium\ndesconto = preco * 0.15",
  "Função agrupa instruções reutilizáveis com um propósito único. Recebe parâmetros e pode retornar resultado.\n\nExemplo:\nfunction somar(a, b) { return a + b }\nresultado = somar(3, 5) // 8",
  "Tipos básicos: inteiro (42), decimal (3.14), texto ('Olá'), booleano (true/false). Cada tipo define quais operações são válidas.\n\nExemplo:\nidade = 25 // inteiro\npreco = 9.99 // decimal\nnome = 'Ana' // texto",
  "if executa bloco se condição for verdadeira; else executa alternativa. É a base da tomada de decisão no código.\n\nExemplo:\nif (idade >= 18) { mostrar('Maior de idade') }\nelse { mostrar('Menor de idade') }",
  "for repete um bloco um número determinado de vezes. Ideal para iterar sobre listas ou contadores.\n\nExemplo:\nfor (i = 0; i < 5; i++) { mostrar(i) }\n// imprime 0, 1, 2, 3, 4",
  "Array armazena vários valores em sequência, acessíveis por índice (começando em 0). É a coleção mais básica.\n\nExemplo:\nfrutas = ['maçã', 'banana', 'uva']\nfrutas[0] // 'maçã'\nfrutas[2] // 'uva'",
  "String é o tipo para texto. Permite concatenar, buscar caracteres e converter maiúsculas/minúsculas.\n\nExemplo:\nnome = 'Maria'\nnome.tamanho // 5\nnome.maiuscula() // 'MARIA'",
  "Operadores aritméticos: + soma, - subtrai, * multiplica, / divide, % retorna resto. Módulo (%) verifica paridade.\n\nExemplo:\n10 + 3 = 13\n10 % 3 = 1 (resto da divisão)",
  "Import permite reutilizar código de outros arquivos ou bibliotecas, organizando o projeto em módulos independentes.\n\nAplicação: Importe apenas o necessário para manter o código limpo e evitar dependências circulares.",
  "A função print/console exibe valores na saída do programa. Essencial para verificar resultados durante desenvolvimento.\n\nExemplo:\nprint('Olá, mundo!')\nprint(resultado) // mostra o valor atual",
  "Conversão transforma valor de um tipo para outro (texto '42' para número 42). Conversão incorreta gera erro.\n\nExemplo:\ntexto = '42'\nnumero = converterParaInteiro(texto) // 42\nconverterParaInteiro('abc') // ERRO",
  "Depurar é encontrar e corrigir erros. Técnicas básicas: print para ver valores e ler mensagens de erro com atenção.\n\nAplicação: Verifique valores das variáveis em cada etapa para encontrar onde o resultado diverge.",
  "Indentação mostra quais linhas pertencem a funções, loops ou condições. Código sem indentação é difícil de ler.\n\nExemplo:\n// Correto:\nif (x) {\n    executar()\n}\n// Confuso: sem recuo",
  "null representa ausência de valor. Acessar propriedades de variável nula causa erro — sempre verifique antes.\n\nExemplo:\nusuario = buscar(id)\nif (usuario != null) { mostrar(usuario.nome) }",
  "Escopo define onde variável é acessível. Variáveis dentro de função só existem ali dentro.\n\nExemplo:\nfunction exemplo() { local = 10 }\n// 'local' não existe fora da função",
  "Constante é variável que não muda após criação. Use para configurações fixas e valores nomeados.\n\nExemplo:\nconst PI = 3.14159\nconst URL = 'https://api.exemplo.com'\n// PI = 3.0 → ERRO",
  "Booleano aceita apenas true ou false. É a base de todas as condições no código.\n\nExemplo:\nmaior = idade >= 18 // true ou false\nif (maior) { permitir() }",
  "Método é função que pertence a um objeto/classe. Opera sobre os dados daquele objeto.\n\nExemplo:\nlista = [3, 1, 2]\nlista.ordenar() // método do objeto\n// lista = [1, 2, 3]",
  "AND (&&): ambas condições verdadeiras. OR (||): basta uma verdadeira. Essenciais para condições compostas.\n\nExemplo:\nif (idade >= 18 && temCNH) { dirigir() }\nif (admin || dono) { editar() }",
  "return encerra a função e devolve valor ao chamador. Sem return, pode não produzir resultado utilizável.\n\nExemplo:\nfunction dobro(n) { return n * 2 }\nresultado = dobro(5) // 10",
  "Concatenar é juntar textos em um só. O operador + é o mais comum.\n\nExemplo:\nsaudacao = 'Olá, ' + nome + '!'\n// 'Olá, Maria!'",
  "Parâmetros são variáveis na definição da função que recebem valores na chamada.\n\nExemplo:\nfunction cumprimentar(nome) { mostrar('Olá, ' + nome) }\ncumprimentar('Ana') // 'Ana' é o argumento",
  "Vetor vazio é lista sem elementos, ponto de partida para adicionar itens dinamicamente.\n\nExemplo:\nitens = []\nitens.add('maçã')\nitens.add('banana')\n// itens = ['maçã', 'banana']",
  "Incrementar é aumentar valor da variável. ++ adiciona 1, += adiciona valor específico.\n\nExemplo:\ncontador = 0\ncontador++ // 1\ncontador += 5 // 6",
  "= atribui valor. == compara igualdade. Confundir os dois é erro clássico de iniciantes.\n\nExemplo:\nx = 10 // atribuição: x recebe 10\nif (x == 10) // comparação: x é igual a 10?",
  "Palavras como if, else, for, return, class têm significado especial e não podem ser usadas como nomes de variáveis.\n\nAplicação: Erro de sintaxe no nome de variável? Verifique se não é palavra reservada.",
  "== compara se dois valores são iguais. Em algumas linguagens, === verifica tipo e valor.\n\nExemplo:\n5 == 5 // true\n5 == '5' // depende da linguagem\n5 === '5' // false (tipos diferentes)",
  "Verificar tipo ajuda a evitar operações incompatíveis. Quando o erro diz 'tipo incompatível', inspecione o tipo real.\n\nAplicação: Use typeof, type() ou equivalente para descobrir o tipo de uma variável.",
  "Mensagens de erro indicam o que deu errado, o arquivo e a linha do problema. Ler com calma é o primeiro passo.\n\nAplicação: Copie a mensagem e pesquise online — a maioria dos erros comuns já foi respondida pela comunidade.",
];

type PromptPair = {
  question: string;
  answer: string;
  answerDescription?: string;
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

function stripMetadata(text: string): string {
  return text
    .replace(/\s*Foco\s*(?:prático)?\s*:[^.]*\./gi, "")
    .replace(/\s*Cenário\s*:[^.]*\./gi, "")
    .replace(/\s*Contexto\s*(?:aplicado)?\s*:[^.]*\./gi, "")
    .trim();
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

    const promptPool = promptSource.flatMap((prompt, idx) =>
      focuses.flatMap((focus) =>
        contextAngles.map((angle) => ({
          question: `${prompt.question} Foco: ${focus}. Cenário: ${angle}.`,
          answer: `${prompt.answer} Foco prático: ${focus}. Contexto: ${angle}.`,
          answerDescription:
            level === "INICIANTE"
              ? beginnerAnswerDescriptions[idx]
              : promptAnswerDescriptions[prompts[idx].topic],
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
      question: stripMetadata(prompt.question.replaceAll("{lang}", category)),
      answer: cleanAnswerForButton(
        stripMetadata(prompt.answer.replaceAll("{lang}", category)),
      ),
      ...(prompt.answerDescription && {
        answerDescription: prompt.answerDescription.replaceAll(
          "{lang}",
          category,
        ),
      }),
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
