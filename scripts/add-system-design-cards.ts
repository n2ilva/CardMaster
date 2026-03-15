/**
 * Adiciona 10 cards de System Design ao engenharia-de-software.json
 * (Fácil 8-10, Médio 8-10, Difícil 7-10)
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
  // ── Fácil 8-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__System Design__Fácil__8",
    tags: ["redis", "in-memory", "cache"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Fácil",
    question:
      "O que é um banco de dados em memória como Redis e quando usá-lo?",
    options: [
      "Armazenamento temporário em RAM para acesso ultra-rápido; ideal para cache, sessões e filas",
      "Substituto completo de bancos relacionais com persistência automática",
      "Banco de dados colunares para análise de grandes volumes de dados",
      "Sistema de arquivos distribuído para armazenamento de objetos",
    ],
    correctIndex: 0,
    explanation:
      "Bancos em memória como Redis armazenam dados na RAM, oferecendo latência sub-milissegundo. São ideais para cache de resultados caros, gerenciamento de sessões, pub/sub, filas e contadores. Não substituem bancos persistentes — são complementos para dados quentes e temporários.",
    example:
      "Um e-commerce usa Redis para: cache de catálogo de produtos (evita queries repetidas), sessões de usuário (login), carrinho de compras (dados temporários) e contadores de estoque em tempo real.",
  },
  {
    id: "engenharia-de-software__System Design__Fácil__9",
    tags: ["autoscaling", "cloud", "elasticity"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Fácil",
    question: "O que é autoscaling e qual problema ele resolve?",
    options: [
      "Ajuste automático de recursos computacionais conforme a demanda para balancear custo e performance",
      "Técnica de compressão de dados para reduzir uso de armazenamento automaticamente",
      "Processo de atualização automática de código em produção sem downtime",
      "Mecanismo de backup automático de banco de dados em intervalos regulares",
    ],
    correctIndex: 0,
    explanation:
      "Autoscaling adiciona ou remove instâncias automaticamente baseado em métricas (CPU, memória, requisições/s). Resolve o dilema de superprovisionamento (custo alto) vs. subprovisionamento (sistema lento). Pode ser horizontal (mais instâncias) ou vertical (instâncias maiores).",
    example:
      "Um app de e-commerce tem 10 instâncias normalmente. Na Black Friday, o tráfego sobe 10x. Autoscaling detecta CPU > 70% e sobe para 100 instâncias automaticamente. Após o pico, reduz de volta para 10, economizando custo.",
  },
  {
    id: "engenharia-de-software__System Design__Fácil__10",
    tags: ["webhook", "polling", "push"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Fácil",
    question:
      "Qual a diferença entre webhook e polling para comunicação entre sistemas?",
    options: [
      "Webhook: o servidor notifica o cliente quando há eventos (push). Polling: o cliente pergunta periodicamente se há novidades (pull)",
      "Webhook: comunicação síncrona em tempo real via WebSocket. Polling: comunicação assíncrona via filas",
      "Webhook: protocolo binário de alta velocidade. Polling: protocolo texto mais simples e universal",
      "Webhook: usado apenas para autenticação OAuth. Polling: exclusivo para sincronização de banco de dados",
    ],
    correctIndex: 0,
    explanation:
      "Polling gera tráfego desnecessário: o cliente pergunta repetidamente mesmo sem novidades. Webhook inverte o fluxo — o servidor chama o cliente só quando há evento. Webhooks são mais eficientes mas exigem que o cliente exponha endpoint público. Polling é mais simples quando o cliente está atrás de NAT/firewall.",
    example:
      "GitHub usa webhooks: quando há um push, o GitHub chama sua URL imediatamente. Alternativa polling: você checaria a API a cada X segundos — 95% das chamadas seriam em vão sem novidades.",
  },

  // ── Médio 8-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__System Design__Médio__8",
    tags: ["saga", "microservices", "distributed-transactions"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Médio",
    question: "O que é o padrão Saga e por que é necessário em microsserviços?",
    options: [
      "Sequência de transações locais coordenadas por eventos ou orquestração para garantir consistência distribuída sem 2PC",
      "Padrão de cache distribuído que replica dados entre microsserviços para evitar chamadas síncronas",
      "Estratégia de versionamento de APIs que permite evolução sem quebrar clientes existentes",
      "Mecanismo de autenticação federada entre serviços usando tokens JWT compartilhados",
    ],
    correctIndex: 0,
    explanation:
      "Microsserviços não compartilham banco de dados, impossibilitando transações ACID distribuídas. Saga divide a transação em etapas menores, cada uma com compensação em caso de falha. Existem duas implementações: Coreografia (eventos) — cada serviço reage a eventos do anterior; e Orquestração — um Saga orchestrator coordena os passos.",
    example:
      "Pedido de compra: 1) Reservar estoque → 2) Cobrar cartão → 3) Enviar email. Se o cartão falhar, uma transação compensatória libera o estoque reservado na etapa 1.",
  },
  {
    id: "engenharia-de-software__System Design__Médio__9",
    tags: ["grpc", "protocol-buffers", "rpc"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Médio",
    question: "O que é gRPC e em quais cenários ele supera REST?",
    options: [
      "Framework RPC que usa Protocol Buffers (binário) e HTTP/2; superior para comunicação interna entre microsserviços com alta performance",
      "Versão aprimorada de GraphQL com suporte nativo a streaming e subscriptions em tempo real",
      "Protocolo de mensageria assíncrona similar ao RabbitMQ com garantia de entrega exactly-once",
      "Padrão de autenticação entre serviços usando certificados mTLS e tokens rotativos",
    ],
    correctIndex: 0,
    explanation:
      "gRPC usa Protocol Buffers (serialização binária, ~5x menor que JSON) e HTTP/2 (multiplexing, headers comprimidos, streaming bidirecional). Além disso, contrato fortemente tipado via .proto evita erros de integração. É mais eficiente que REST para comunicação interna, mas REST segue sendo melhor para APIs públicas (debugabilidade, ferramental).",
    example:
      "Netflix usa gRPC internamente para comunicação entre centenas de microsserviços onde latência e throughput são críticos. A API pública para apps e TVs ainda usa REST/GraphQL por ser mais fácil de consumir por clientes externos.",
  },
  {
    id: "engenharia-de-software__System Design__Médio__10",
    tags: ["service-mesh", "istio", "sidecar"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Médio",
    question:
      "O que é um Service Mesh e quais problemas ele resolve em arquiteturas de microsserviços?",
    options: [
      "Camada de infraestrutura (proxies sidecar) que gerencia comunicação entre serviços: observabilidade, segurança mTLS, circuit breaking e retry automático",
      "Banco de dados distribuído que centraliza o estado compartilhado entre microsserviços para evitar inconsistências",
      "Plataforma de orquestração de containers que substitui o Kubernetes em ambientes de alta disponibilidade",
      "Padrão de API Gateway que roteia requisições externas para os microsserviços internos corretos",
    ],
    correctIndex: 0,
    explanation:
      "Em microsserviços, preocupações como retry, timeout, circuit breaking, mTLS e tracing se repetem em cada serviço. Service Mesh (ex: Istio, Linkerd) extrai isso para proxies sidecar (containers auxiliares) transparentes à aplicação. Os serviços comunicam-se normalmente; o sidecar intercepta e aplica as políticas automaticamente.",
    example:
      "Com Istio: seu serviço de pagamento não precisa implementar retry logic, TLS mútuo ou trace propagation. O sidecar Envoy ao lado do pod faz tudo isso transparentemente, e você tem o dashboard Kiali mostrando todas as conexões.",
  },

  // ── Difícil 7-10 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__System Design__Difícil__7",
    tags: ["2pc", "distributed-transactions", "consensus"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Difícil",
    question:
      "O que é Two-Phase Commit (2PC) e por que raramente é usado em sistemas modernos distribuídos?",
    options: [
      "Protocolo de transação distribuída que garante atomicidade via coordenador; evitado por ser bloqueante, ter ponto único de falha e baixa tolerância a partições",
      "Estratégia de deploy em duas fases: canary release seguida de blue/green para garantir rollback seguro",
      "Algoritmo de replicação que sincroniza dois datacenters primários antes de confirmar cada escrita",
      "Técnica de cache invalidation que invalida em duas etapas para evitar race conditions em sistemas distribuídos",
    ],
    correctIndex: 0,
    explanation:
      "2PC: Fase 1 (Prepare) — coordenador pergunta a todos os participantes se podem commitar. Fase 2 (Commit/Abort) — se todos disseram sim, commita; qualquer não, aborta. Problemas: é bloqueante (participantes aguardam coordenador), o coordenador é SPOF, e viola o teorema CAP pois pausa em caso de partição de rede. Sistemas modernos preferem Saga + consistência eventual.",
    example:
      "Amazon usa Saga: ao comprar, cada microsserviço (estoque, pagamento, entrega) tem sua transação local + compensação. Se algo falha, compensações revertem o estado. Isso sacrifica isolamento ACID mas ganha disponibilidade e escala horizontal.",
  },
  {
    id: "engenharia-de-software__System Design__Difícil__8",
    tags: ["distributed-storage", "object-storage", "s3"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Difícil",
    question:
      "Quais são os principais desafios de design ao construir um sistema de armazenamento de objetos distribuído (como S3)?",
    options: [
      "Consistent hashing para distribuição, replicação multi-região para durabilidade, erasure coding para eficiência, e metadados separados do dado para escala independente",
      "Uso exclusivo de bancos relacionais com particionamento vertical e índices compostos para alta disponibilidade",
      "Implementação de RAID distribuído com dois data centers síncronos e WAL centralizado para recovery",
      "Armazenamento em árvore B+ distribuída com coordenação via ZooKeeper para consistência forte",
    ],
    correctIndex: 0,
    explanation:
      "S3-like storage: (1) Consistent hashing distribui objetos entre nós sem rehashing total ao escalar. (2) Replicação 3x (ou erasure coding para economizar espaço com mesma durabilidade). (3) Metadados em sistemas separados (ex: banco distribuído) para queries eficientes. (4) Arquitetura com separation of concerns: namenode (metadados) vs datanodes (dados brutos).",
    example:
      "HDFS: NameNode guarda metadados (onde cada bloco está), DataNodes guardam os blocos de 128MB. Um arquivo de 1GB vira ~8 blocos replicados 3x = 3GB armazenados. Perda de qualquer DataNode não perde dados.",
  },
  {
    id: "engenharia-de-software__System Design__Difícil__9",
    tags: ["strangler-fig", "migration", "legacy"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Difícil",
    question:
      "O que é o padrão Strangler Fig e como ele permite migrar sistemas legados sem big-bang rewrite?",
    options: [
      "Roteamento gradual de funcionalidades do sistema legado para novos microsserviços via facade/proxy, evoluindo incrementalmente até o legado ser desativado",
      "Técnica de injeção de dependência que substitui componentes hardcoded por interfaces configuráveis para facilitar testes",
      "Padrão de banco de dados que migra schema gradualmente usando views compatíveis com versões antigas e novas",
      "Estratégia de branch por feature que mantém múltiplas versões do sistema em paralelo para testes A/B",
    ],
    correctIndex: 0,
    explanation:
      "Inspirado na figueira-de-estrangulamento que cresce ao redor de uma árvore hospedeira. Um proxy (Strangler Facade) fica na frente do sistema legado. Novas funcionalidades vão para serviços modernos; as antigas são migradas incrementalmente. O legado vai 'encolhendo' até ser desativado. Oposto ao big-bang rewrite, que é arriscado e geralmente fracassa.",
    example:
      "Migração de monolito para microsserviços: coloca-se um API Gateway na frente. /checkout redireciona para novo serviço de checkout moderno. /catalog ainda vai ao monolito. Gradualmente, cada endpoint é migrado. Após 2 anos, o monolito é desativado sem nenhuma parada de serviço.",
  },
  {
    id: "engenharia-de-software__System Design__Difícil__10",
    tags: ["search", "elasticsearch", "inverted-index"],
    track: "engenharia-de-software",
    category: "System Design",
    difficulty: "Difícil",
    question:
      "Como funciona um índice invertido e por que é fundamental para sistemas de busca como Elasticsearch?",
    options: [
      "Mapa de token → lista de documentos que contêm o token; permite busca full-text em O(1) por termo independente do tamanho do corpus",
      "Estrutura de árvore B+ que organiza documentos por data de criação para buscas temporais eficientes",
      "Hash map que armazena o conteúdo completo de documentos em memória para evitar leituras de disco",
      "Índice de chave primária reverso que ordena registros do último para o primeiro para buscas por sufixo",
    ],
    correctIndex: 0,
    explanation:
      "Índice invertido: para cada token único, armazena a lista de documentos que o contêm (e posição, frequência, etc.). Busca 'python tutorial': encontra doc_ids de 'python' ∩ doc_ids de 'tutorial' em microssegundos. Elasticsearch distribui o índice em shards, cada shard sendo um índice Lucene. TF-IDF/BM25 ordena resultados por relevância.",
    example:
      "Corpus: Doc1='python é rápido', Doc2='tutorial python avançado'. Índice invertido: python→[Doc1,Doc2], tutorial→[Doc2], rápido→[Doc1]. Busca 'python tutorial': intersecção = [Doc2], retornado primeiro por ter ambos os termos.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const sd = data.filter((c: any) => c.category === "System Design");
console.log("System Design: total=" + sd.length);
console.log(
  "F:" +
    sd.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    sd.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    sd.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
