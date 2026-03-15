/**
 * Adiciona 20 cards de Mensageria e Filas ao engenharia-de-software.json
 * (Fácil 5-10, Médio 4-10, Difícil 4-7)
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
    id: "engenharia-de-software__Mensageria e Filas__Fácil__5",
    tags: ["message-broker", "producer-consumer", "async"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "Quais são os componentes principais de um sistema de mensageria: producer, broker e consumer?",
    options: [
      "Producer: publica mensagens. Broker: armazena e roteie mensagens (RabbitMQ, Kafka). Consumer: lê e processa mensagens — desacoplamento total entre quem envia e quem recebe",
      "Producer e consumer são sinônimos para o mesmo componente; broker é o servidor central que coordena a comunicação síncrona entre eles",
      "Broker é opcional em sistemas modernos — producers e consumers se comunicam diretamente via HTTP/2 com multiplexação de streams",
      "Consumer process a mensagem e depois republica para o producer confirmar o recebimento — comunicação bidirecional obrigatória",
    ],
    correctIndex: 0,
    explanation:
      "Arquitetura clássica: Producer cria eventos (pedido criado, pagamento processado) sem saber quem vai consumir. Broker (middleware): armazena, roteia, garante entrega, persiste. Consumer processa assincronamente em seu próprio ritmo. Benefícios: desacoplamento temporal (producer não espera consumer), resiliência (consumer pode estar down temporariamente), escalabilidade (múltiplos consumers). Analogia: correios — você posta uma carta (producer), agência guarda (broker), destinatário pega quando puder (consumer).",
    example:
      "E-commerce: usuário faz pedido → API publica 'PedidoCriado' no broker → 3 consumers leem: estoque deduz item, email de confirmação enviado, analytics registra venda. API não sabe quem consome — cada serviço é independente.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Fácil__6",
    tags: ["SQS", "AWS", "cloud-messaging"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "O que é Amazon SQS e quando escolhê-lo em vez de RabbitMQ ou Kafka?",
    options: [
      "SQS é fila gerenciada da AWS: sem servidor para gerenciar, escalabilidade automática, pay-per-use — ideal para workloads AWS que precisam de simplicidade sem expertise operacional de Kafka/RabbitMQ",
      "SQS é equivalente técnico ao Kafka em todos os aspectos — a única diferença é que é da AWS e tem custo por mensagem processada",
      "SQS só deve ser usado com Lambda — é incompatível com aplicações containerizadas em ECS ou EC2 por limitações de polling",
      "SQS é mais rápido que RabbitMQ e Kafka mas limita mensagens a 256KB — para mensagens grandes, necessita armazenar payload no RDS antes de enfileirar",
    ],
    correctIndex: 0,
    explanation:
      "SQS vantagens: zero ops (AWS gerencia), escala automática para qualquer volume, dois tipos: Standard (alta throughput, at-least-once) e FIFO (ordenação garantida, exactly-once, 3000 msg/s). Ideal quando: já no ecossistema AWS, equipe pequena sem expertise de brokers, workload variável. RabbitMQ vantagem: routing avançado (exchanges, bindings), protocolos múltiplos (AMQP, MQTT). Kafka vantagem: replay de eventos, alta throughput (milhões/s), streaming em tempo real. SQS tem limite de retensão de 14 dias — não é event store.",
    example:
      "Startup com infraestrutura AWS: sistema de notificações com picos eventuais → SQS FIFO. Não precisa de engenheiro DevOps para gerenciar broker. Escala automaticamente no Black Friday. Custo: $0.40 por milhão de mensagens.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Fácil__7",
    tags: ["message-durability", "persistence", "reliability"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "O que é durabilidade de mensagens e por que é importante configurá-la corretamente em brokers como RabbitMQ?",
    options: [
      "Mensagens duráveis são persistidas em disco — se o broker reiniciar, as mensagens não são perdidas. Requer: exchange durável + fila durável + mensagem persistente (delivery_mode=2)",
      "Durabilidade em RabbitMQ é habilitada automaticamente para todas as filas — não há configuração necessária pois é o comportamento padrão",
      "Mensagens duráveis e mensagens persistentes são a mesma coisa — apenas um dos três (exchange, queue, message) precisa ser configurado como durável",
      "Durabilidade de mensagens é exclusiva do Kafka — RabbitMQ usa apenas memória e não suporta persistência em disco por design",
    ],
    correctIndex: 0,
    explanation:
      "Sem durabilidade: broker reinicia → mensagens na fila são perdidas. Três camadas em RabbitMQ: (1) Exchange durável: metadados do exchange sobrevivem ao restart. (2) Fila durável (durable: true): fila sobrevive ao restart. (3) Mensagem persistente (delivery_mode: 2): mensagem é gravada em disco antes de confirmar recebimento. Custo: persistência em disco é lenta. Tradeoff: throughput vs durabilidade. Para operações críticas (pagamentos, pedidos): sempre durável. Para dados descartáveis (logs em tempo real): volátil pode ser aceitável.",
    example:
      "Sistema de pagamentos com fila de pendências não durável: broker reinicia durante janela de manutenção → 500 pagamentos pendentes perdidos. Com durabilidade: mensagens escritas em disco → após restart, fila retoma do ponto exato onde parou.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Fácil__8",
    tags: ["event-driven", "webhooks", "asynchronous"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "Qual a diferença entre webhook e fila de mensagens para comunicação assíncrona entre sistemas?",
    options: [
      "Webhook: HTTP push direto do sender para o receiver (acoplado); fila: buffer desacoplado com garantias de entrega. Fila é mais resiliente — receiver pode estar down sem perder mensagens",
      "Webhooks são mais confiáveis que filas porque usam HTTP que tem garantias de entrega automáticas via TCP — mensagens nunca são perdidas",
      "Webhook e fila são tecnicamente idênticos — a diferença é apenas que webhooks são usados para comunicação externa e filas para comunicação interna",
      "Filas de mensagens só funcionam dentro da mesma rede privada — para sistemas externos, webhooks são obrigatórios por questões de firewall",
    ],
    correctIndex: 0,
    explanation:
      "Webhook: sender faz HTTP POST para endpoint do receiver. Problema: se receiver está down, mensagem é perdida. Sem retries automáticos nativos. Sender precisa lidar com falhas. Fila: mensagem armazenada no broker. Consumer processa quando disponível. Retries automáticos configuráveis. Consumer down? Mensagem aguarda. Quando usar webhook: integração simples com terceiros (GitHub, Stripe). Quando usar fila: sistemas críticos, alto volume, consumers que podem falhar, necessidade de replay.",
    example:
      "Stripe usa webhook para 'pagamento confirmado' → seu servidor recebe o POST. Se seu servidor estava down, Stripe tenta novamente por até 3 dias. Porém, se Stripe não conseguir após N tentativas, mensagem é perdida. Com fila: seu servidor consome no próprio ritmo, nunca perde.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Fácil__9",
    tags: ["consumer-group", "load-balancing", "scaling"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "O que são grupos de consumidores (consumer groups) e como permitem escalar o processamento de mensagens?",
    options: [
      "Grupo de consumers que compartilham o processamento de uma fila/tópico — cada mensagem é entregue a apenas um consumer do grupo, permitindo paralelismo horizontal",
      "Consumer groups são exclusivos do Kafka — em RabbitMQ e SQS, cada consumer precisa ser configurado individualmente sem agrupamento",
      "Todos os consumers em um grupo recebem cópias de todas as mensagens — é o mecanismo de broadcast nativo de sistemas de mensageria",
      "Consumer groups limitam o número máximo de consumers — adicionar consumers além do tamanho do grupo causa erros de configuração no broker",
    ],
    correctIndex: 0,
    explanation:
      "Load balancing automático: fila com 10.000 mensagens pendentes. 1 consumer: processa todas sequencialmente. Adicionar mais consumers no grupo: mensagens distribuídas entre eles. 10 consumers = ~10x throughput. Kafka: cada partition é consumida por apenas 1 consumer do grupo (partitions = paralelismo máximo). RabbitMQ: múltiplos consumers em uma fila competem pelas mensagens (competing consumers pattern). SQS: consumers fazem polling — escala adicionando mais instâncias que fazem poll.",
    example:
      "Black Friday: fila de processamento de pedidos acumula 50.000 mensagens. Deploy automático escala de 2 para 20 instâncias do consumer. Cada instância pega mensagens da fila. Processamento que levaria 5 horas é concluído em 30 minutos.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Fácil__10",
    tags: ["message-acknowledgment", "ack", "at-least-once"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Fácil",
    question:
      "O que é o mecanismo de acknowledgment (ack) em filas de mensagens e por que é fundamental para confiabilidade?",
    options: [
      "Consumer confirma ao broker que processou a mensagem com sucesso — sem ack, broker recoloca mensagem na fila após timeout, garantindo que nenhuma mensagem seja perdida por crash do consumer",
      "Acknowledgment é a confirmação do producer ao broker de que a mensagem foi publicada — o consumer recebe automaticamente todas as mensagens sem precisar confirmar",
      "Ack automático é sempre a melhor opção pois elimina latência de confirmação e maximiza throughput sem impacto na confiabilidade do sistema",
      "Consumer deve enviar ack antes de processar a mensagem para reservar exclusividade — outros consumers do grupo não recebem a mesma mensagem durante o processamento",
    ],
    correctIndex: 0,
    explanation:
      "Fluxo correto: (1) Consumer recebe mensagem. (2) Processa com sucesso. (3) Envia ack ao broker. (4) Broker remove da fila. Se consumer crasha antes do ack: broker recoloca na fila (redelivery) → outro consumer processa. Ack automático (antes de processar): mensagem removida antes do processamento → se crash durante processamento, mensagem perdida. Ack manual (dopo del processamento): at-least-once delivery. Consequência do at-least-once: idempotência obrigatória no consumer (processar 2x não deve causar efeitos duplicados).",
    example:
      "Consumer recebe 'ProcessarPagamento'. Sem ack manual: broker remove imediatamente. Consumer crasha durante cobrança no cartão. Pagamento perdido — nenhum consumer vai reprocessar. Com ack manual: broker aguarda. Consumer crasha. Broker reentrega para outro consumer. Pagamento processado com sucesso.",
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__4",
    tags: ["kafka-consumer-group", "offset", "replay"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "Como o gerenciamento de offsets funciona no Kafka e como o replay de eventos é possível ao contrário de filas tradicionais?",
    options: [
      "Kafka armazena offset de onde cada consumer group leu — consumer group pode resetar para qualquer offset (início, específico, por timestamp) permitindo replay; mensagens ficam por tempo configurável independente de leitura",
      "Offset no Kafka é gerenciado automaticamente pelo broker e não pode ser modificado pelos consumers — replay requer recriar todo o tópico do zero",
      "Kafka deleta mensagens imediatamente após leitura como filas tradicionais — replay é impossível pois os dados não são mais armazenados após consumo",
      "Replay no Kafka é possível apenas criando um novo consumer group — o consumer group original não pode voltar a ler mensagens já processadas",
    ],
    correctIndex: 0,
    explanation:
      "Kafka retém mensagens por tempo configurável (padrão 7 dias) independente de leitura. Consumer group tem seu próprio offset por partition. Commit automático (risco de perda de posição) vs manual (controle total). Operações de offset: seek to beginning (replay completo), seek to timestamp (replay de ponto específico), seek to offset (replay de posição exata). Casos de uso: novo microserviço precisa processar histórico para popular seu banco local, debug de problema em produção, reprocessamento após correção de bug em consumer.",
    example:
      "Bug encontrado em consumer de relatórios que processou 3 dias de eventos incorretamente. Fix deployado. Reset do consumer group offset para 3 dias atrás. Consumer lê tudo novamente, gera relatórios corretos. Em RabbitMQ: impossível — os eventos foram removidos na primeira leitura.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__5",
    tags: ["event-sourcing", "CQRS", "eventual-consistency"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "Como Event Sourcing e CQRS se relacionam com sistemas de mensageria para criar arquiteturas robustas?",
    options: [
      "Event Sourcing armazena mudanças de estado como eventos imutáveis (log de auditoria total); CQRS separa leituras de escritas; mensageria propaga eventos entre bounded contexts de forma assíncrona",
      "Event Sourcing e CQRS são padrões exclusivos para bancos de dados relacionais — são incompatíveis com sistemas de mensageria baseados em brokers",
      "CQRS significa que leituras e escritas usam o mesmo modelo de dados mas em instâncias de banco separadas — mensageria não tem papel nesse padrão",
      "Event Sourcing substitui completamente o banco de dados — não há necessidade de um banco relacional ou NoSQL quando o sistema usa uma fila de eventos",
    ],
    correctIndex: 0,
    explanation:
      "Event Sourcing: estado atual = replay de todos os eventos passados. Auditoria nativa, time-travel queries. CQRS: Command side (escreve eventos) → mensageria → Query side (lê de read models otimizados). Fluxo: usuário executa command → command handler valida e emite evento → evento publicado no broker → event handlers atualizam read models (Elasticsearch, Redis, PG). Cada bounded context consome eventos e mantém seu próprio read model. Eventual consistency: read models ficam em sync eventualmente.",
    example:
      "E-commerce: PlacedOrder command → OrderPlaced event → broker. 3 consumers: (1) atualiza read model de pedidos (PostgreSQL), (2) atualiza search index (Elasticsearch), (3) atualiza dashboard analytics (Redis). Cada um com schema otimizado para sua query.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__6",
    tags: ["circuit-breaker", "resilience", "failure-handling"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "Como o padrão Circuit Breaker se integra com sistemas de mensageria para evitar cascata de falhas?",
    options: [
      "Circuit Breaker monitora falhas em chamadas downstream — abre o circuito após N falhas pausando requisições; mensageria adiciona buffer para o consumo retomar quando o circuit fechar",
      "Circuit Breaker em mensageria significa interromper completamente o producer quando qualquer consumer falha — stop total de publicação de mensagens",
      "Circuit Breaker substitui a Dead Letter Queue em sistemas modernos — é uma abordagem mais robusta que não requer configuração de DLQ no broker",
      "Circuit Breaker é aplicado exclusivamente em APIs REST e gRPC — em sistemas de mensageria, o próprio broker gerencia falhas sem padrões adicionais",
    ],
    correctIndex: 0,
    explanation:
      "Problema: consumer chama banco de dados que está lento → processamento acumula → fila cresce → memória estourа → cascata. Circuit Breaker no consumer: (1) Closed: processando normalmente. (2) Open: após muitas falhas, para de fazer poll/ack temporariamente. (3) Half-open: tenta processar uma mensagem de teste. Se sucesso, fecha o circuito. Na prática: Resilience4j, Polly, Hystrix. Consumer para de confirmar (ack) as mensagens — broker as recoloca na fila para processamento futuro quando o circuito fechar.",
    example:
      "Consumer de emails integra com Sendgrid. Sendgrid fica temporariamente indisponível. Sem circuit breaker: consumer tenta, falha, DLQ enche, operadores alertados manualmente. Com CB + fila: circuito abre, mensagens ficam na fila principal, após 5 minutos CB testa Sendgrid, serviço restaurado, circuito fecha, processamento retoma automaticamente.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__7",
    tags: ["message-ordering", "FIFO", "concurrency"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "Quando a ordenação de mensagens é crítica e como garantir processamento na ordem correta em sistemas distribuídos?",
    options: [
      "Ordenação crítica para eventos causalmente relacionados (criação antes de atualização de um registro). Soluções: SQS FIFO com message group ID, Kafka partition key, particionamento por entidade garante ordenação por entidade",
      "Ordenação em sistemas distribuídos é impossível de garantir — arquiteturas modernas são projetadas para serem order-insensitive sem exceções",
      "A solução sempre é usar uma fila FIFO global — toda mensagem do sistema passa pela mesma fila ordenada independente do tipo de evento",
      "Ordenação é garantida automaticamente por qualquer broker que use timestamps — os consumers ordenam as mensagens por timestamp antes de processar",
    ],
    correctIndex: 0,
    explanation:
      "Problema real: 'AtualizarEndereco' para usuário X chega antes de 'CriarUsuario' X → consumer tenta atualizar usuário que não existe. Soluções por ferramenta: Kafka: partition key = userId → todos os eventos do usuário X vão para a mesma partition → processados em ordem pelo consumer dessa partition. SQS FIFO: MessageGroupId = userId → mesmo grupo = ordenação garantida, porém sem paralelismo dentro do grupo. RabbitMQ: consistent hashing exchange roteia por chave para a mesma fila. Tradeoff: ordenação reduz paralelismo.",
    example:
      "E-commerce: OrderCreated → OrderPaid → OrderShipped para pedido 123. Se processados fora de ordem: OrderShipped sem OrderCreated no banco → erro. Solução: Kafka partition key = orderId. Todos os 3 eventos do pedido 123 na mesma partition, mesma ordem de publicação.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__8",
    tags: ["schema-registry", "avro", "contract"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "O que é Schema Registry e por que é essencial para evolução de contratos de mensagens entre producers e consumers?",
    options: [
      "Repositório central de esquemas (Avro, Protobuf) que valida mensagens na publicação e garante compatibilidade retroativa — producers e consumers evoluem independentemente sem quebrar contratos",
      "Schema Registry é um banco de dados relacional que armazena historicos de mensagens para fins de auditoria e compliance regulatório",
      "É obrigatório apenas para mensagens em formato binário (Avro, Protobuf) — JSON nativo do Kafka não precisa de schema registry",
      "Schema Registry substitui a documentação de API — uma vez que o schema está registrado, nenhuma outra documentação técnica é necessária",
    ],
    correctIndex: 0,
    explanation:
      "Problema: producer adiciona campo obrigatório 'cpf' em evento de usuário → consumers antigos que não conhecem o campo começam a falhar. Confluent Schema Registry: schemas versionados, compatibilidade evoluída (BACKWARD: consumers antigos leem novos eventos; FORWARD: consumers novos leem eventos antigos; FULL: ambos). Avro + Schema Registry: mensagem Kafka armazena apenas schema ID (4 bytes) + dados binários → consumer busca schema no registry → deserializa. Validação na publicação: producer rejeita se schema incompatível.",
    example:
      "Producer adiciona campo opcional 'phoneNumber' em UserCreated. Schema Registry valida BACKWARD compatibility: campo novo é opcional? Sim. Consumers antigos que não sabem do campo: ignoram. Nenhum consumer falha. Se fosse campo obrigatório: Schema Registry rejeita a publicação automaticamente.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__9",
    tags: ["message-size", "chunking", "large-payloads"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "Como lidar com mensagens grandes em sistemas de filas que têm limites de tamanho de payload?",
    options: [
      "Claim check pattern: armazenar payload grande no storage (S3, blob) e publicar na fila apenas a referência (URL/ID) — consumer busca o dado completo quando processa",
      "Compressão gzip do payload resolve todos os problemas de tamanho — mensagens de qualquer tamanho podem ser comprimidas para caber em qualquer limite de broker",
      "Aumentar o limite de tamanho de mensagem do broker (max.message.bytes no Kafka) é sempre a solução correta — não há desvantagens em aumentar esse parâmetro",
      "Mensagens grandes devem ser divididas em chunks numerados enviados sequencialmente — o consumer remonta o payload original antes de processar",
    ],
    correctIndex: 0,
    explanation:
      "Limites: SQS=256KB, RabbitMQ padrão=128MB (mas alto memória), Kafka padrão=1MB por batch. Claim Check Pattern: (1) Producer salva payload em S3/Azure Blob. (2) Publica na fila: {claimCheckId: 'uuid', bucket: 'payloads', key: 'uuid.json'}. (3) Consumer lê a mensagem da fila. (4) Baixa payload do storage. (5) Processa. (6) Opcionalmente deleta do storage. Vantagens: fila fica leve, storage é barato e escalável, payload pode ser qualquer tamanho.",
    example:
      "Sistema de processamento de relatórios PDF (10-50MB cada). SQS limit 256KB. Solução: gerador de relatório salva PDF em S3, publica {reportId: 'xxx', s3Key: 'reports/xxx.pdf'} no SQS. Consumer lê pointer, baixa PDF do S3, processa análise de conteúdo, publica resultado em outra fila.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Médio__10",
    tags: ["outbox-pattern", "transactional-messaging", "consistency"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Médio",
    question:
      "O que é o Transactional Outbox Pattern e qual problema de consistência ele resolve em sistemas com banco de dados e mensageria?",
    options: [
      "Salvar o evento na mesma transação do banco de dados (tabela outbox) e depois publicar no broker via processo separado — garante que banco e mensagem são sempre consistentes (sem dual write problem)",
      "Outbox Pattern é um design de inbox de emails onde as mensagens ficam armazenadas até o usuário as ler — não tem relação com transações de banco de dados",
      "Resolve o problema de mensagens duplicadas fazendo o consumer verificar uma tabela de outbox no banco de dados antes de processar cada mensagem",
      "O padrão consiste em publicar a mensagem no broker primeiro e só então fazer commit da transação no banco — garante que o broker recebe antes do banco confirmar",
    ],
    correctIndex: 0,
    explanation:
      "Dual write problem: (1) salva no banco (sucesso) → (2) publica no broker (falha). Banco atualizado, mensagem não publicada — inconsistência. Outbox Pattern: (1) Na mesma transação: salva no banco + insere registro na tabela outbox. (2) Processo separado (Debezium/Change Data Capture ou polling): lê tabela outbox e publica no broker. Se o processo de publicação falhar: tabela outbox ainda tem o registro → retry automático. Garantia: se banco tem o dado, o evento SEMPRE será publicado.",
    example:
      "Order criada: BEGIN TRANSACTION → INSERT INTO orders → INSERT INTO outbox(event='OrderCreated', payload=...) → COMMIT. Debezium monitora tabela outbox via binlog → publica no Kafka. Se app crasha após o COMMIT mas antes do Debezium ler: outbox tem o evento → publicado no próximo ciclo.",
  },

  // ── Difícil 4-7 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__4",
    tags: ["kafka-streams", "stream-processing", "windowing"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "Como Kafka Streams e windowing functions permitem processamento de eventos em tempo real com agregações por janelas de tempo?",
    options: [
      "Kafka Streams é biblioteca de processamento stateful com Tumbling (janelas fixas sem overlap), Hopping (janelas com overlap), Session (janelas por atividade) e Sliding windows para agregações sobre streams contínuos",
      "Kafka Streams é um banco de dados NoSQL integrado ao Kafka que armazena todos os eventos em memória para consultas em tempo real",
      "Windowing no Kafka é configurado no broker — os consumers recebem automaticamente grupos de mensagens agregadas por time window definido no tópico",
      "Janelas de tempo em Kafka Streams são exclusivamente para eventos com timestamps no futuro — eventos atrasados são automaticamente descartados",
    ],
    correctIndex: 0,
    explanation:
      "Kafka Streams: forma Java/JVM de processar streams Kafka sem infraestrutura adicional (Spark/Flink). Stateful operations: joins, aggregations com RocksDB local state store. Window types: Tumbling (1min janelas fixas, 00:00-01:00, 01:00-02:00 — sem overlap). Hopping (1min com slide de 30s — overlap). Session (inatividade de 5min fecha janela). Sliding (evento + vizinhos dentro de N ms). Late arrivals: grace period configura quanto tempo aceita eventos atrasados. Watermarks: progressão do tempo lógico do stream.",
    example:
      "Dashboard de fraude: contar transações por cartão na última janela de 5 minutos (Tumbling). Cartão X: 50 transações em 5 min → alerta. Kafka Streams KStream.groupByKey().windowedBy(TimeWindows.of(Duration.ofMinutes(5))).count(). Resultado materializado em KTable consultável em tempo real.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__5",
    tags: ["competing-consumers", "poison-message", "error-handling"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "O que é uma 'poison message' e como estratégias de retry com backoff exponencial e DLQ previnem que uma mensagem inválida paralise todo o sistema?",
    options: [
      "Poison message causa falha repetida no consumer — sem controle, o consumer fica em loop infinito. Solução: retry com exponential backoff + jitter + max retries + DLQ para análise manual de mensagens não processáveis",
      "Poison message é um tipo de mensagem criptografada que apenas consumers autorizados conseguem descriptografar — outros consumers a ignoram automaticamente",
      "A solução para poison messages é sempre deletar a mensagem após a primeira falha — tentar novamente é desnecessário pois o erro se repetirá",
      "Poison messages só ocorrem em sistemas sem schema registry — uma vez que o schema é validado, nenhuma mensagem pode causar erros de processamento",
    ],
    correctIndex: 0,
    explanation:
      "Poison message: mensagem que sempre falha (dado corrompido, bug no consumer para esse caso específico). Sem controle: consumer recebe → falha → nack → broker reentrega → consumer recebe → falha... loop infinito. Consumer monopolizado, outras mensagens bloqueadas. Solução em camadas: (1) Retry imediato com limite (3x). (2) Backoff exponencial com jitter: espera 1s, 2s, 4s, 8s (evita thundering herd). (3) Max delivery count atingido → mover para DLQ. (4) DLQ monitorada por alertas, análise manual, possível fix + requeue. RabbitMQ: x-dead-letter-exchange. Kafka: consumer code com retry topic.",
    example:
      "Mensagem com campo 'amount' nulo chega em consumer de pagamentos. try {process()} catch {retry count++; delay = min(2^retries, 30s) + random jitter; if retries>5: send to DLQ}. Mensagem vai para DLQ após 5 tentativas. Alerta dispara. Dev analisa, corrige o producer, reenfileira com dado correto.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__6",
    tags: ["exactly-once", "idempotency", "distributed-transactions"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "Por que exactly-once delivery em mensageria distribuída é extremamente difícil e como exactly-once semantics do Kafka funciona?",
    options: [
      "Exige coordenação atômica entre producer, broker e consumer — Kafka implementa via idempotent producer (PID + sequence number) + transações (consume-transform-produce atômico) + isolation level no consumer",
      "Exactly-once é facilmente alcançável em qualquer broker moderno — é apenas uma configuração simples de delivery.mode no producer",
      "Exactly-once e at-least-once são equivalentes em prática — a diferença é apenas teórica e não afeta aplicações do mundo real",
      "Kafka garante exactly-once automaticamente para todos os tópicos sem configuração adicional — é o comportamento padrão desde a versão 2.0",
    ],
    correctIndex: 0,
    explanation:
      "CAP theorem para mensageria: garantir exatamente 1 entrega requer saber se a mensagem foi entregue — o que requer consenso distribuído. Kafka EOS: (1) Idempotent producer: cada producer tem PID + sequence number. Broker detecta e descarta duplicatas do mesmo producer. (2) Transactions: producer.beginTransaction() → produce to topicA → produce to topicB → consumer.commit() → producer.commitTransaction(). Tudo atômico. (3) Consumer: isolation.level=read_committed → só lê mensagens de transações commitadas. Custo: menor throughput (~10-20%). Casos de uso: transferências bancárias, exatamente uma cobrança.",
    example:
      "Consumer lê pagamento de topicA, faz transform, publica resultado em topicB e commita offset: tudo isso em uma única transação Kafka. Se o processo crasha no meio: toda a transação é revertida. Próxima execução: reprocessa a mensagem original e publica resultado novamente, atomicamente.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__7",
    tags: ["event-mesh", "service-mesh", "cloud-events"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "O que é Event Mesh e como o padrão CloudEvents padroniza o formato de eventos para interoperabilidade entre brokers heterogêneos?",
    options: [
      "Event Mesh: camada de roteamento que conecta múltiplos brokers (Kafka, RabbitMQ, SNS) em uma rede de eventos. CloudEvents: spec CNCF que padroniza headers (id, source, type, time) para portabilidade entre plataformas",
      "Event Mesh é sinônimo de Service Mesh — ambos gerenciam comunicação entre microserviços usando sidecar proxies como Envoy e Istio",
      "CloudEvents substitui completamente todos os protocolos de mensageria existentes — brokers compatíveis com CloudEvents não precisam de Kafka ou RabbitMQ",
      "Event Mesh é uma tecnologia exclusiva para ambientes multi-cloud — sistemas em cloud única não precisam desse padrão de roteamento de eventos",
    ],
    correctIndex: 0,
    explanation:
      "Event Mesh (Solace, Red Hat AMQ): federação de brokers — evento publicado em um broker pode ser roteado para consumers em outro broker (cross-cloud, cross-datacenter). CloudEvents (CNCF spec): problema real — cada serviço inventa seu formato de evento. CloudEvents padroniza envelope: specversion, id (UUID único), source (URI do sistema que originou), type (domínio.entidade.ação), time (ISO 8601), datacontenttype, data (payload). Suportado por: Knative, Azure EventGrid, AWS EventBridge, Serverless Framework. Portabilidade: mesmo consumer processa eventos de diferentes producers sem código específico.",
    example:
      "Empresa com Kafka (backend) + Azure Event Grid (cloud) + AWS EventBridge (legacy). Evento de pedido criado em Kafka no formato CloudEvents: {specversion:'1.0', type:'com.company.order.created', source:'/orders-service', id:'uuid', data:{...}}. Consumer no Azure Event Grid processa o mesmo formato sem adaptação.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter((c: any) => c.category === "Mensageria e Filas");
console.log("Mensageria e Filas: total=" + cat.length);
console.log(
  "F:" +
    cat.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    cat.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    cat.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
