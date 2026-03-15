/**
 * Adiciona 3 cards Difícil restantes de Mensageria e Filas (D:8, D:9, D:10)
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
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__8",
    tags: ["change-data-capture", "CDC", "debezium"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "O que é Change Data Capture (CDC) com Debezium e como ele implementa o Outbox Pattern sem polling de banco de dados?",
    options: [
      "CDC lê o transaction log do banco de dados (binlog MySQL, WAL PostgreSQL) capturando cada mudança em tempo real sem overhead de polling — Debezium publica essas mudanças como eventos Kafka automaticamente",
      "CDC é uma técnica de backup incremental que copia apenas as linhas alteradas — é usada exclusivamente para replicação de banco de dados entre datacenters",
      "Debezium faz polling regular na tabela outbox a cada 1 segundo — CDC é apenas um nome mais técnico para esse processo de polling frequente",
      "CDC requer modificação de todas as queries SQL da aplicação para emitir eventos de mudança — o banco de dados não tem essa capacidade nativamente",
    ],
    correctIndex: 0,
    explanation:
      "CDC: banco de dados nativamente registra cada INSERT/UPDATE/DELETE no transaction log para replicação. Debezium (Red Hat, open source) conecta como slave de replicação ao banco, lê o binlog/WAL e transforma cada operação em evento Kafka. Zero polling: eventos são capturados em milissegundos. Zero change no app code: app apenas escreve no banco normalmente. Outbox com CDC: INSERT na tabela outbox → Debezium detecta via binlog → publica no Kafka automaticamente. Suporta PostgreSQL, MySQL, MongoDB, Oracle, SQL Server.",
    example:
      "PostgreSQL: Debezium conecta ao WAL (Write-Ahead Log). Dev faz INSERT na tabela orders. WAL registra a operação. Debezium lê o WAL entry em <100ms. Publica {before: null, after: {id:1, status:'created'}} no tópico Kafka 'orders.public.orders'. Nenhuma mudança no código da aplicação.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__9",
    tags: ["broker-performance", "throughput", "latency", "tuning"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "Como tunar Kafka para alto throughput vs. baixa latência e quais são os tradeoffs de configurações como batch.size, linger.ms e acks?",
    options: [
      "Alto throughput: batch.size grande + linger.ms alto (aguarda mais mensagens por batch) + acks=1. Baixa latência: batch.size=1 + linger.ms=0 + acks=1. acks=all adiciona latência mas garante durabilidade replicada",
      "Throughput e latência seguem a mesma otimização no Kafka — não há tradeoff entre os dois, apenas configurar mais partitions aumenta ambos proporcionalmente",
      "linger.ms deve sempre ser 0 em produção pois qualquer delay de publicação é inaceitável — batch.size é irrelevante para performance real",
      "acks=all deve ser evitado pois causa perda de mensagens se o líder da partição falhar antes dos followers replicarem — acks=0 é mais seguro",
    ],
    correctIndex: 0,
    explanation:
      "Producer tradeoffs: batch.size (bytes por batch, padrão 16KB): maior batch → melhor compressão, menos requests de rede, maior throughput, maior latência. linger.ms (ms que o producer espera por mais mensagens, padrão 0): 0=envia imediatamente (baixa latência). 5-10ms=acumula batch maior (alto throughput). acks: 0=no wait (máximo throughput, pode perder). 1=espera líder confirmar (balanceado). all/-1=espera todos os ISR (máximo durabilidade, maior latência). Compressão (snappy, lz4, zstd): reduz size de rede/disco, pequeno overhead de CPU. Consumer fetch.min.bytes e fetch.max.wait.ms: similar trade-off para leitura em lote.",
    example:
      "Telemetria de IoT (10M eventos/s tolerantes a alguma perda): acks=0, linger.ms=20ms, batch.size=1MB, compressão=lz4. Pagamentos (baixo volume, zero perda): acks=all, linger.ms=0, replication.factor=3, min.insync.replicas=2.",
  },
  {
    id: "engenharia-de-software__Mensageria e Filas__Difícil__10",
    tags: ["consumer-lag", "monitoring", "kafka-alerting"],
    track: "engenharia-de-software",
    category: "Mensageria e Filas",
    difficulty: "Difícil",
    question:
      "O que é consumer lag no Kafka, como monitorar e quais estratégias usar quando o lag cresce descontroladamente?",
    options: [
      "Consumer lag = diferença entre offset do último registro produzido e o offset do consumer group. Lag crescente indica consumer mais lento que o producer — estratégias: aumentar partitions, scale out consumers, otimizar processamento, priorizar mensagens críticas",
      "Consumer lag é a latência de rede entre producer e consumer — é monitorado automaticamente pelo Kafka e ajustado sem intervenção manual",
      "Lag crescente indica problema no producer — o consumer está consumindo mais rápido que o producer produz, criando starvation no consumer group",
      "Consumer lag máximo aceitável é sempre 0 — qualquer lag indica falha de configuração que deve ser corrigida imediatamente pausando produção",
    ],
    correctIndex: 0,
    explanation:
      "Consumer lag = (latest_offset - consumer_current_offset) por partition. Lag=0: consumer em tempo real. Lag crescendo: consumer não acompanha. Causas: consumer lento (processamento pesado por mensagem), poucas instâncias, black Friday (spike). Monitoramento: kafka-consumer-groups.sh --describe, Burrow (LinkedIn), Prometheus kafka_consumer_group_lag. Alertas: lag > N * latência_aceitável. Estratégias: (1) Aumentar partitions do tópico + adicionar consumer instances no grupo. (2) Otimizar consumer (processar em batch, paralelismo interno). (3) Separar processamento pesado em async (consumer salva mensagem e retorna, worker processa). (4) Priorização: criar tópico de prioridade alta para mensagens críticas.",
    example:
      "Sistema de notificações: lag explodiu durante live de produto — 500K mensagens pendentes. Ação imediata: kubectl scale deployment notification-consumer --replicas=20. Partitions do tópico: 20 (cada consumer pega 1). Lag normalizado em 15 minutos. Lição: auto-scaling baseado em lag metric (KEDA com Kafka trigger).",
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
