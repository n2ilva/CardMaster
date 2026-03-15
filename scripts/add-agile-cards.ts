/**
 * Adiciona 20 cards de Metodologias Ágeis ao engenharia-de-software.json
 * (Fácil 5-10, Médio 4-10, Difícil 4-10)
 */
import { readFileSync, writeFileSync } from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = resolve(
  __dirname,
  "../data/cards/engenharia-de-software.json",
);
const data: any[] = JSON.parse(readFileSync(filePath, "utf8"));

const newCards = [
  // ── Fácil 5-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__5",
    tags: ["sprint", "timebox", "scrum"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question: "O que é um Sprint no Scrum e qual sua duração recomendada?",
    options: [
      "Ciclo fixo de desenvolvimento (timebox) de 1 a 4 semanas onde o time entrega um incremento potencialmente utilizável",
      "Reunião diária de 15 minutos onde o time sincroniza progresso, impedimentos e planos do dia",
      "Documento que lista todas as funcionalidades priorizadas pelo Product Owner para o produto",
      "Processo de revisão do código realizado ao final de cada tarefa antes de mover para a próxima coluna no Kanban",
    ],
    correctIndex: 0,
    explanation:
      "Sprint é o coração do Scrum: ciclo timeboxed (limite de tempo fixo, não se estende). Duração: 1-4 semanas, mais comum 2 semanas. Ao final, o time deve ter um Incremento funcional ('Done'). O Scrum Guide recomenda sprints mais curtos para times novos (mais feedback). A duração escolhida não muda durante o Sprint.",
    example:
      "Time escolhe Sprint de 2 semanas. Segunda-feira: Sprint Planning — selecionam 5 User Stories do backlog. Quinze dias depois, sexta: Sprint Review — demonstram o software funcionando. Retrospectiva: o que melhorar. Recomeça na segunda.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__6",
    tags: ["daily-scrum", "standup", "impediments"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question:
      "O que é a Daily Scrum (standup) e quais as três perguntas tradicionais?",
    options: [
      "Reunião diária de 15 min onde cada membro responde: o que fiz ontem, o que farei hoje, e há algum impedimento?",
      "Reunião semanal de status report para o Scrum Master atualizar stakeholders sobre o progresso do Sprint",
      "Sessão de pair programming rotativa que ocorre diariamente para transferir conhecimento entre membros do time",
      "Revisão diária do backlog pelo Product Owner para re-priorizar itens baseado em feedback de usuários",
    ],
    correctIndex: 0,
    explanation:
      "Daily Scrum: 15 minutos, mesmo horário/local, timebox rígido. Perguntas clássicas: (1) O que fiz ontem que contribui para a meta do Sprint? (2) O que farei hoje? (3) Há impedimentos? Não é status report para o gerente — é sincronização do time. Discussões aprofundadas acontecem depois com as pessoas relevantes ('after-party'). Scrum Master remove impedimentos identificados.",
    example:
      "Dev A: 'Terminei a tela de login. Hoje implemento o esqueci minha senha. Sem impedimentos.' Dev B: 'Ainda travado na integração com o pagamento — API externa sem documentação.' Scrum Master anota o impedimento de B para resolver após a daily.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__7",
    tags: ["product-backlog", "sprint-backlog", "refinement"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question: "Qual a diferença entre Product Backlog e Sprint Backlog?",
    options: [
      "Product Backlog: lista ordenada de tudo que o produto pode precisar (PO é dono). Sprint Backlog: subconjunto selecionado para o Sprint atual + plano de como entregar (time é dono)",
      "Product Backlog contém apenas user stories de longa duração. Sprint Backlog contém tarefas técnicas detalhadas dos desenvolvedores",
      "São o mesmo artefato com nomes diferentes — Sprint Backlog é o nome do Product Backlog durante o período de um Sprint",
      "Product Backlog é gerenciado por stakeholders externamente. Sprint Backlog é a versão interna apenas para o time de desenvolvimento",
    ],
    correctIndex: 0,
    explanation:
      "Product Backlog: único, vivo, ordenado por valor. Responsabilidade do Product Owner priorizá-lo. Contém features, bugs, melhorias técnicas. Nunca está 'completo'. Sprint Backlog: cada Sprint tem o seu. Time seleciona itens no Sprint Planning e os decompõe em tarefas. Time tem autonomia sobre o Sprint Backlog — PO não pode adicionar itens durante o Sprint.",
    example:
      "Product Backlog: 80 itens. Sprint Planning: time se compromete com os top 6 baseado na velocidade histórica. Esses 6 vão para o Sprint Backlog. Time quebra cada story em tarefas menores (1-2 dias). O restante dos 74 fica no Product Backlog aguardando.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__8",
    tags: ["extreme-programming", "XP", "practices"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question:
      "O que é XP (Extreme Programming) e quais são suas práticas técnicas mais conhecidas?",
    options: [
      "Metodologia ágil com foco em práticas técnicas de excelência: TDD, pair programming, integração contínua, refactoring contínuo e releases pequenos e frequentes",
      "Framework de gerenciamento de projetos para times de hardware que adaptou o Scrum para ciclos de desenvolvimento de produtos físicos",
      "Versão estendida do Scrum com cerimônias adicionais de revisão de arquitetura e sessões de mob programming obrigatórias",
      "Metodologia exclusivamente para startups que combina Lean Startup com práticas de deploy contínuo em ambientes cloud",
    ],
    correctIndex: 0,
    explanation:
      "XP (Kent Beck, 1999): metodologia com valores (comunicação, simplicidade, feedback, coragem, respeito) e práticas técnicas rigorosas. TDD: escreve teste antes do código. Pair programming: dois devs em uma máquina. CI: integrar várias vezes ao dia. Refactoring: código sempre limpo. Collective ownership: qualquer um pode mudar qualquer código. Planning game: PO e time negociam iteração. Influenciou fortemente as práticas DevOps modernas.",
    example:
      "TDD em XP: antes de implementar login, escreve teste: assert login('user','pass') returns token. Testa (falha — código não existe). Implementa mínimo para passar. Refatora. Resultado: código com cobertura 100% desde o início, design emergente.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__9",
    tags: ["velocity", "burndown", "sprint-progress"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question:
      "O que é velocidade (velocity) de um time Scrum e para que serve?",
    options: [
      "Média de story points entregues por Sprint nos últimos ciclos; usada para prever capacidade futura e planejar releases",
      "Métrica de produtividade individual de cada desenvolvedor para avaliações de performance e bonificação",
      "Número de tarefas concluídas por dia; usado para calcular o tempo exato de conclusão de cada user story",
      "Tempo médio de deploy de código em produção; indica a eficiência do pipeline CI/CD do time",
    ],
    correctIndex: 0,
    explanation:
      "Velocity: média dos story points concluídos em N sprints anteriores (geralmente 3-5). Se últimos 3 Sprints: 34, 38, 30 pts → velocidade ~34. Para planejar release: backlog tem 200 pts restantes → ~6 Sprints para concluir. Variação é normal — não é meta de performance. Não compare velocidades entre times (calibrações diferentes de story points). Melhora com o tempo à medida que o time se conhece.",
    example:
      "Roadmap Q2: 8 features = 180 story points. Velocidade do time: 45 pts/Sprint. 180÷45 = 4 Sprints = 8 semanas. Com buffer de 20%: planejar 5 Sprints = 10 semanas para a funcionalidade completa.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Fácil__10",
    tags: ["definition-of-done", "DoD", "quality"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Fácil",
    question:
      "O que é a Definition of Done (DoD) e por que é fundamental para qualidade em Scrum?",
    options: [
      "Checklist compartilhado de critérios que uma story deve atender para ser considerada 'Pronta' (código, testes, code review, deploy em staging, documentação)",
      "Critérios de aceitação específicos de cada user story escritos pelo Product Owner durante o backlog refinement",
      "Processo de validação com usuários reais que confirma que a feature entregue resolve o problema identificado",
      "Aprovação formal do cliente ao final do Sprint durante a Sprint Review para liberar pagamento da iteração",
    ],
    correctIndex: 0,
    explanation:
      "DoD é acordada pelo time e se aplica a TODAS as stories — não é por story. Exemplo de DoD: código revisado (peer review), testes unitários escritos e passando, cobertura > 80%, sem warnings de lint, deploy em staging, documentação da API atualizada. Sem DoD clara, 'feito' significa coisas diferentes para cada pessoa. O incremento do Sprint só é legítimo se todos os itens passam na DoD.",
    example:
      "Dev diz 'terminei'. Tech lead pergunta: passou na DoD? Código foi revisado? Sim. Testes passando? Sim. Coverage 80%? 72% — não passou. Story vai para 'impedida' até coverage ser corrigida. DoD evita dívida técnica acumulada.",
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__4",
    tags: ["okr", "goals", "alignment"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "Como OKRs (Objectives and Key Results) se integram ao desenvolvimento ágil para alinhar times a objetivos de negócio?",
    options: [
      "OKRs definem 'o quê' e 'como medir' (nível estratégico); backlog ágil define 'como implementar' — conectar features do backlog a KRs evita trabalho sem propósito",
      "OKRs substituem o Product Backlog em organizações maduras — são suficientemente detalhados para guiar o Sprint Planning diretamente",
      "OKRs são exclusivos para times comerciais (vendas, marketing); times de desenvolvimento usam apenas story points e velocidade",
      "OKRs e Scrum são incompatíveis — OKRs são anuais e rígidos enquanto Scrum é adaptativo e de curto prazo",
    ],
    correctIndex: 0,
    explanation:
      "OKRs (Google, Intel): Objective (qualitativo, inspirador) + Key Results (mensuráveis, 3-5 por objetivo). Time Product: 'Aumentar retenção' (O) → 'Churn < 5%/mês' e 'DAU/MAU > 40%' (KRs). Backlog priorizado por impacto nos KRs: feature X aumenta DAU? Vai pro topo. Feature Y não afeta KRs? Espera. OKRs trimestrais se alinham bem com 6-7 sprints de 2 semanas. Evita 'feature factory' — time entende por quê está construindo.",
    example:
      "OKR: O='Ser a app de finanças mais confiável' KR='NPS > 60'. Sprint Planning: 'Adicionar autenticação biométrica' tem impacto alto no KR. 'Redesign da cor dos botões' tem impacto baixo. Priorização objetiva com dados.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__5",
    tags: ["kanban-metrics", "cycle-time", "lead-time"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "O que são cycle time e lead time no Kanban e como usá-los para melhorar o fluxo?",
    options: [
      "Lead time: tempo do pedido até entrega (perspectiva do cliente). Cycle time: tempo de início efetivo ao fim do trabalho. Reduzir cycle time melhora previsibilidade e detecta gargalos",
      "São sinônimos para o tempo total de desenvolvimento — a distinção é apenas terminológica entre times brasileiros e americanos",
      "Cycle time mede velocidade de deploy ao vivo; lead time mede tempo de code review. Monitorados separadamente no pipeline",
      "Lead time é a duração de cada Sprint; cycle time é o tempo médio para completar uma user story dentro do Sprint",
    ],
    correctIndex: 0,
    explanation:
      "Lead time: quando o cliente pediu → quando recebeu. Cycle time: quando o time começou a trabalhar → quando entregou. Lead time ≥ Cycle time (inclui tempo na fila). Para melhorar: (1) Limit WIP (Work in Progress) — menos itens em paralelo = cycle time menor. (2) Cumulative Flow Diagram mostra gargalos (acúmulo em uma coluna). (3) Control Chart mostra variação do cycle time — alta variação indica processo imprevisível.",
    example:
      "Story entra no backlog segunda. Time só começa quinta (fila de 3 dias). Fica em Review 2 dias. Total lead time: 7 dias. Cycle time: 4 dias (quinta a domingo). WIP limit na coluna In Progress reduz o tempo na fila.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__6",
    tags: ["product-discovery", "dual-track", "hypothesis"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "O que é dual-track agile (discovery + delivery) e como evita construir a coisa errada?",
    options: [
      "Dois fluxos paralelos: Discovery (validar problema/solução com usuários antes de construir) e Delivery (implementar o que foi validado) — evita desperdiçar Sprints em features desnecessárias",
      "Metodologia com dois times: um de front-end e um de back-end trabalhando simultaneamente em tracks separados do mesmo produto",
      "Abordagem de duas velocidades de Sprint: Discovery usa Sprints de 1 semana e Delivery usa Sprints de 4 semanas para trabalho mais complexo",
      "Processo de QA em duas fases: testes de descoberta de bugs (exploratório) paralelo ao desenvolvimento e testes de regressão após cada Sprint",
    ],
    correctIndex: 0,
    explanation:
      "Problema: time constrói feature inteira em 3 Sprints → usuários não usam → desperdício. Dual-track: Discovery track: Product Manager + Designer fazem pesquisa com usuários, prototipagem, testes de usabilidade. Apenas features validadas vão para Delivery track. Time de entrega tem backlog saudável de trabalho já validado. Marty Cagan (SVPG): mínimo 2 Sprints de discovery antes de cada discovery chegar no backlog.",
    example:
      "Discovery: PM entrevista 10 usuários sobre notificações → 7 reclamam de spam, 3 querem mais. Hipótese: preferências granulares. Prototipa em Figma → testa → 8/10 aprovam. Só então entra no backlog de Delivery. Feature construída tem 80%+ de chance de ser usada.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__7",
    tags: ["estimation", "planning-poker", "relative-sizing"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "Por que Planning Poker funciona melhor que estimativas individuais e quais vieses ele reduz?",
    options: [
      "Revela estimativas simultamente (sem âncora), força todos a opinar, divergências grandes geram discussão que descobre riscos ocultos e alinha entendimento da story",
      "É mais rápido que outros métodos de estimativa pois usa cartas físicas que aceleram o processo de votação do time",
      "Garante que a estimativa final é sempre a média matemática das estimativas individuais, removendo outliers do processo",
      "Funciona melhor para equipes distribuídas pois é assíncrono por design, com cada membro estimando independentemente a qualquer hora",
    ],
    correctIndex: 0,
    explanation:
      "Vieses eliminados: Anchoring (quem fala primeiro influencia os outros — no planning poker todos revelam em simultâneo). HiPPO (Highest Paid Person's Opinion — gerente fala, todos concordam — aqui todos têm voz igual). Divergências grandes (1 vs 13) indicam entendimento diferente da story — a discussão que segue alinha o time e descobre requisitos ocultos. Sequência de Fibonacci (1,2,3,5,8,13,21): reflete incerteza crescente em estimativas maiores.",
    example:
      "Story 'Integrar com Pix': dev backend vota 13 (conhece a API do Banco Central complexa), dev frontend vota 3 (pensa só na tela). Discussão revela: os dois não sabem o que o outro sabe. Após conversa, ambos votam 8 com entendimento completo.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__8",
    tags: ["agile-transformation", "anti-patterns", "cargo-cult"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "O que é 'cargo cult agile' e quais são os anti-patterns mais comuns em transformações ágeis?",
    options: [
      "Seguir rituais ágeis superficialmente sem adotar os princípios (daily sem transparência, sprints com escopo fixo, PO sem autonomia) — aparência de ágil sem os benefícios",
      "Prática de copiar a estrutura organizacional do Spotify (tribos, squads, chapters) sem adaptar à cultura da empresa",
      "Termo para times que usam Scrum mas não possuem ferramentas digitais de backlog — gestão manual em post-its físicos apenas",
      "Abordagem de times que combinam Scrum e Kanban arbitrariamente sem seguir nenhuma metodologia definida completamente",
    ],
    correctIndex: 0,
    explanation:
      "Anti-patterns clássicos: (1) 'Scrum-ban': Daily é status report para gerente. (2) Sprint com prazo fixo E escopo fixo — impossível, precisa flexibilizar um. (3) PO que nunca diz não — backlog cresce indefinidamente sem priorização. (4) Velocidade como KPI de performance — time infla estimativas. (5) Daily de 1 hora — não é timebox. (6) 'Agile waterfall': planejamento anual detalhado, execução em Sprints — só a forma sem a substância.",
    example:
      "Time faz daily de 30 min, Sprint Review virou demo para gestores aprovarem release, retrospectiva cancelada por 'falta de tempo'. Forma ágil, substância waterfall. Resultado: nenhum benefício, mais overhead de cerimônias.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__9",
    tags: ["lean", "value-stream", "waste"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "Quais os 7 desperdícios Lean adaptados para software e como identificá-los no desenvolvimento ágil?",
    options: [
      "Overproduction (features não usadas), waiting (filas), handoffs, defects, over-engineering, partially done work e task switching — cada um adiciona lead time sem valor",
      "Os 7 desperdícios são exclusivos para manufatura Toyota; em software, apenas 'bugs' e 'retrabalho' são reconhecidos como desperdício",
      "Reuniões, documentação, code review, testes automatizados, deploys manuais, reuniões de retrospectiva e pair programming",
      "Tempo gasto em refactoring, atualização de dependências, configuração de ambiente, onboarding de novos devs e dívida técnica",
    ],
    correctIndex: 0,
    explanation:
      "Mary e Tom Poppendieck adaptaram o Toyota Production System para software: (1) Partially done work: branch aberto há 3 semanas. (2) Extra features: código não usado. (3) Relearning: falta de documentação força re-entendimento. (4) Handoffs: 'jogo de passa-passa' entre times. (5) Task switching: 5 projetos em paralelo. (6) Delays: PR aguardando review por 3 dias. (7) Defects: bugs em produção. Value Stream Mapping visualiza onde o tempo é gasto.",
    example:
      "Value stream de uma feature: código pronto em 2h, aguarda code review 3 dias, aguarda QA 2 dias, aguarda deploy janela semanal 4 dias. Total: 9 dias, mas apenas 2h de trabalho real — 97% desperdício de espera.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Médio__10",
    tags: ["scrum-master", "servant-leader", "impediments"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Médio",
    question:
      "Qual é o verdadeiro papel do Scrum Master e em que ele difere de um gerente de projetos tradicional?",
    options: [
      "Servant leader que protege o time, remove impedimentos, facilita cerimônias e treina em ágil — sem autoridade hierárquica, não delega tarefas nem cobra resultados individualmente",
      "Gerente técnico responsável por atribuir tarefas, acompanhar progresso individual e reportar status para stakeholders executivos",
      "Líder técnico que garante a qualidade do código, aprova pull requests e decide a arquitetura das soluções implementadas",
      "Product Owner secundário que escreve user stories técnicas e negocia com stakeholders sobre escopo e prazos de entrega",
    ],
    correctIndex: 0,
    explanation:
      "Scrum Master não tem autoridade sobre o time — facilita, não comanda. Responsabilidades: facilitar cerimônias (Planning, Daily, Review, Retro), remover impedimentos sistêmicos (não técnicos), proteger o time de interrupções externas, coachear PO em boas práticas de backlog, e promover melhoria contínua. Diferença chave: gerente tradicional controla (say what to do); Scrum Master serve (remove obstacles). Times auto-organizados decidem como trabalhar.",
    example:
      "Impedimento: dependência de API de outro time há 2 semanas. Gerente tradicional: cobra o outro time no email. Scrum Master: agenda conversa direct entre os devs, facilita acordo, documenta o padrão de integração para evitar futuros bloqueios similares.",
  },

  // ── Difícil 4-10 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__4",
    tags: ["team-topology", "stream-aligned", "platform-team"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "O que é Team Topologies e como os 4 tipos de time (stream-aligned, platform, enabling, complicated-subsystem) reduzem carga cognitiva?",
    options: [
      "Framework de design organizacional: stream-aligned entrega valor diretamente ao usuário; platform reduz carga com self-service; enabling transfere habilidades; complicated-subsystem para especialistas em domínios complexos",
      "Modelo de hierarquia de times onde stream-aligned são os líderes sênior e os outros tipos são camadas subordinadas com responsabilidades reduzidas",
      "Metodologia de contratação que define perfis ideais para cada tipo de projeto: plataformas, produtos, serviços e sistemas legados",
      "Estrutura Spotify adaptada que renomeia tribos, squads e chapters para terminologia mais adequada a empresas de software enterprise",
    ],
    correctIndex: 0,
    explanation:
      "Team Topologies (Skelton & Pais): (1) Stream-aligned: foco em fluxo de valor de ponta a ponta (feature team); limite: carga cognitiva por excesso de responsabilidades. (2) Platform: reduz carga do stream-aligned com self-service de infra/ferramentas. (3) Enabling: time temporário que ensina práticas novas ao stream-aligned (ex: ensinar TDD). (4) Complicated-subsystem: especialistas em domínio complexo (ML, criptografia) que servem múltiplos times. Patterms de interação: Collaboration, X-as-a-Service, Facilitating.",
    example:
      "Antes: time de produto também cuida de infra, CI/CD e segurança — carga cognitiva altíssima. Depois: Platform Team cria ferramentas self-service. Stream-aligned team foca 100% em features. Velocidade de entrega dobra.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__5",
    tags: ["conways-law", "architecture", "team-structure"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "O que é a Lei de Conway e como ela influencia a arquitetura de sistemas em organizações ágeis?",
    options: [
      "'Organizations design systems that mirror their own communication structure' — times separados criam microsserviços separados; times acoplados criam sistemas acoplados; mudança arquitetural exige mudança organizacional",
      "Princípio que diz que sistemas complexos sempre evoluem para refletir a estrutura cognitiva de seus arquitetos principais, independente da estrutura da organização",
      "Lei empírica que estabelece que o número de bugs em um sistema é proporcional ao número de times que trabalharam nele ao longo do tempo",
      "Teoria que afirma que microsserviços só funcionam bem quando há um time dedicado para cada serviço com mais de 3 desenvolvedores",
    ],
    correctIndex: 0,
    explanation:
      "Conway (1968): sistemas tendem a replicar as estruturas de comunicação das organizações. Amazon: 'You can't have a system architecture that is inconsistent with your team structure.' Inverse Conway Maneuver: projete a estrutura de times que você quer ter no sistema. Quer microsserviços? Forme times independentes com ownership de cada serviço. Quer monolito modular? Times com fronteiras claras mas integrados. Amazon formou times de 2 pizzas → APIs independentes → microsserviços.",
    example:
      "Empresa com time de front e time de back separados → API acoplada (front precisa pedir mudanças ao back constantemente). Reorganizou para times de produto (fullstack) → APIs coesas por domínio, menos dependências inter-times, deploys independentes.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__6",
    tags: ["psychological-safety", "retro", "high-performance"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "O que é segurança psicológica no contexto de times ágeis e como ela impacta a performance segundo a pesquisa Project Aristotle do Google?",
    options: [
      "Crença de que o time é seguro para riscos interpessoais (falar sem medo de punição); fator número 1 de times de alta performance — sem ela, retrospectivas são superficiais e falhas são escondidas",
      "Política de confidencialidade que garante que discussões de retrospectiva nunca são compartilhadas fora do time para incentivar honestidade",
      "Nível de senioridade mínimo necessário para que um time tome decisões autônomas sem aprovação de gerentes ou arquitetos sênior",
      "Processo de onboarding que garante que novos membros sentem-se confortáveis com a codebase antes de receber tarefas complexas",
    ],
    correctIndex: 0,
    explanation:
      "Project Aristotle (Google, 2012-2015): 200+ times analisados. Conclusão: composição do time (skills, senioridade) importa menos que como o time interaje. Fator #1: segurança psicológica. Sem ela: falhas são escondidas (medo de julgamento), ideias não são compartilhadas, retrospectivas ficam falsas ('tudo ótimo'). Com ela: erros viram aprendizado coletivo, riscos técnicos são reportados cedo, inovação aumenta. Scrum Master tem papel crucial em criar esse ambiente.",
    example:
      "Time A: dev introduziu bug em prod, ficou quieto por 2 horas com medo de punição. Post-mortem revelou 4h de downtime evitável. Time B (alta segurança psicológica): dev avisou imediatamente no canal do time → rollback em 7 minutos. Mesma situação, desfechos completamente diferentes.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__7",
    tags: ["impact-mapping", "story-mapping", "product-strategy"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "Como Impact Mapping e Story Mapping conectam visão estratégica de produto com o backlog tático do Scrum?",
    options: [
      "Impact Map: goal → actors → impacts → deliverables (priorizando por impacto no negócio). Story Map: jornada do usuário horizontal + profundidade de detalhe vertical, revelando MVP e releases incrementais",
      "São técnicas equivalentes que apenas visualizam o backlog de formas diferentes — a escolha entre elas é questão de preferência pessoal do Product Owner",
      "Impact Mapping é usada apenas em projetos de transformação digital; Story Mapping é exclusiva para produtos de consumo B2C",
      "Ambas substituem completamente o Product Backlog em Scrum — times maduros usam apenas mapas visuais sem lista ordenada de itens",
    ],
    correctIndex: 0,
    explanation:
      "Impact Map (Gojko Adzic): árvore Why (goal de negócio) → Who (atores) → How (comportamentos que mudam) → What (entregáveis). Força perguntar 'por que construir isso?' antes do 'o quê'. Story Map (Jeff Patton): eixo X = jornada do usuário (backbone), eixo Y = detalhamento crescente. Linha horizontal identifica MVP mínimo. Releases incrementais por 'fatias horizontais'. Transforma lista flat de backlog em narrativa coesa.",
    example:
      "Story Map de e-commerce: backbone = Browse → Search → Add to Cart → Checkout → Track Order. MVP (linha 1): lista simples, search básico, carrinho, pagamento cartão, email confirmação. Release 2 (linha 2): filtros avançados, wishlist, Pix, rastreamento real-time.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter((c: any) => c.category === "Metodologias Ágeis");
console.log("Metodologias Ágeis: total=" + cat.length);
console.log(
  "F:" +
    cat.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    cat.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    cat.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
