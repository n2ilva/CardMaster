/**
 * Adiciona 20 cards de CI/CD e DevOps ao engenharia-de-software.json
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
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__5",
    tags: ["pipeline", "stages", "build"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question:
      "O que é um artefato de build em CI/CD e por que deve ser gerado uma única vez?",
    options: [
      "Saída compilada/empacotada do código (jar, imagem Docker, binário); gerada uma vez e promovida entre ambientes garante que dev/staging/prod rodam exatamente o mesmo código",
      "Log do pipeline armazenado para auditoria; deve existir em cópia única por questões de compliance e rastreabilidade",
      "Arquivo de configuração de ambiente gerado automaticamente na primeira execução do pipeline de CI",
      "Relatório de cobertura de testes gerado após cada push, usado para decidir se o PR pode ser mergeado",
    ],
    correctIndex: 0,
    explanation:
      "Build once, deploy many: compilar o mesmo código em cada ambiente abre risco de diferenças sutis (versão de biblioteca, flags de compilação). O artefato gerado em CI é guardado no registry/artifact store e promovido: dev → staging → prod. Isso garante que o que foi testado é exatamente o que vai a produção.",
    example:
      "CI builda a imagem app:sha-abc123, roda testes. Aprovado: deploy no staging da imagem app:sha-abc123. Aprovado: promoção para prod da mesma imagem app:sha-abc123. Nenhuma recompilação ocorre.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__6",
    tags: ["branch-strategy", "trunk-based", "feature-branch"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question: "O que é trunk-based development e como ele facilita CI/CD?",
    options: [
      "Todos os devs integram no branch principal diariamente com commits pequenos/feature flags; elimina long-lived branches e conflicts de merge dolorosos",
      "Estratégia onde cada release recebe um branch permanente para hotfixes; main fica reservado só para features novas",
      "Modelo onde trunk é o branch de release e desenvolvedores trabalham em branches permanentes de componentes",
      "Abordagem que usa squash merges para manter histórico linear; não exige CI mas é compatível com CD automatizado",
    ],
    correctIndex: 0,
    explanation:
      "Gitflow com branches de vida longa (feature/backend-rewrite vivendo 3 semanas) leva a merges dolorosos e CI quebrado. Trunk-based: branches de curta duração (< 2 dias) ou commits direto no main com feature flags. CI pode integrar e testar continuamente. Feature flags desacoplam deploy de release: código entra na main desabilitado, ativado gradualmente por usuário/porcentagem.",
    example:
      "Dev abre branch feature/login-redesign, commita em horas (não semanas), abre PR pequeno. CI roda em minutos. Merge. Feature oculta por flag LOGIN_V2=false. Quando pronta, ativa para 5% dos usuários primeiro.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__7",
    tags: ["environment", "staging", "production"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question:
      "Quais são os ambientes típicos em um pipeline CI/CD (dev, staging, prod) e o propósito de cada um?",
    options: [
      "Dev: iteração rápida do desenvolvedor. Staging: réplica fiel de prod para testes integrados. Prod: ambiente real dos usuários com alta disponibilidade",
      "Dev: apenas gerenciado pelo DevOps. Staging: ambiente dos testers de QA exclusivamente. Prod: gerenciado só pelo SRE",
      "Dev e staging são equivalentes; a diferença está apenas na quantidade de dados — staging tem dados reais mascarados",
      "Os três ambientes devem ter configurações idênticas incluindo número de instâncias e tamanho de banco de dados",
    ],
    correctIndex: 0,
    explanation:
      "Dev: rápido, local ou compartilhado, pode ser instável. Staging (pré-prod): configuração idêntica ao prod (mesma cloud region, mesmo tamanho de banco), dados sintéticos. Onde smoke tests, performance tests e homologação ocorrem. Prod: ambiente real, alterações só via pipeline. Alguns times adicionam QA entre dev e staging para testes manuais exploratórios.",
    example:
      "Bug encontrado em prod: reproduz exatamente em staging (mesma config) mas não em dev (banco menor, sem dados de volume). Staging revelou o problema antes — sem staging, só teria aparecido em prod.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__8",
    tags: ["monitoring", "alerting", "observability"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question:
      "Por que monitoramento e alertas são parte essencial da cultura DevOps?",
    options: [
      "DevOps fecha o loop: deploy vai a produção, monitoramento detecta anomalias imediatamente, permitindo rollback rápido — sem monitoramento, CD sem visibilidade é arriscado",
      "Monitoramento é responsabilidade exclusiva do time de SRE/infraestrutura, sem relação com o ciclo de desenvolvimento",
      "Alertas substituem testes automatizados em produção — são mais confiáveis pois usam dados reais de usuários",
      "O foco do DevOps é automação de deploy; monitoramento pertence ao domínio de ITSM e gestão de incidentes",
    ],
    correctIndex: 0,
    explanation:
      "You build it, you run it (Werner Vogels, Amazon). DevOps: o time que desenvolve é responsável pela operação. Monitoramento contínuo detecta regressões de performance, erros novos ou degradação de SLIs/SLOs logo após deploy. DORA metrics: MTTR (Mean Time to Recovery) só é bom com monitoramento que detecta rápido. Sem alertas, problemas ficam horas sem detecção.",
    example:
      "Deploy às 14h. Às 14:05 alerta: taxa de erros 5xx subiu de 0.1% para 3%. On-call rollback automático às 14:07. Usuários afetados por 7 minutos. Sem monitoramento: problema detectado por tweet de cliente às 18h.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__9",
    tags: ["rollback", "revert", "deploy-safety"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question:
      "O que é rollback em CI/CD e quais estratégias permitem fazê-lo rapidamente?",
    options: [
      "Reverter para versão anterior estável; facilitado por imutabilidade de artefatos, blue/green (troca de tráfego instantânea) ou feature flags (desligar sem novo deploy)",
      "Reverter commits no Git e aguardar o pipeline re-executar todo o build e testes antes de ir a produção",
      "Processo manual de restauração de backup do banco de dados e redeployment da versão anterior do código",
      "Técnica exclusiva de microserviços que reverte todos os serviços simultaneamente usando transações distribuídas",
    ],
    correctIndex: 0,
    explanation:
      "Rollback rápido é fundamental para MTTR baixo. Estratégias: (1) Blue/Green: ambiente antigo ainda está de pé — troca DNS/LB em segundos. (2) Feature flags: desligar feature problemática sem novo deploy. (3) Kubernetes: kubectl rollout undo deployment/app em segundos. (4) Imutabilidade: artefato anterior ainda existe no registry, basta fazer redeploy. Evite rollbacks de banco (schema migrations são difíceis de reverter — prefira migrations backward-compatible).",
    example:
      "Blue/Green: v1.5 (green) rodando. Deploy v1.6 no ambiente blue. Alerta de problema? aws elbv2 modify-listener... aponta de volta para green em segundos. v1.6 fica em standby para investigação.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Fácil__10",
    tags: ["shift-left", "security", "SAST"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Fácil",
    question:
      "O que significa 'shift-left' em DevOps e como impacta qualidade e segurança?",
    options: [
      "Antecipar verificações (testes, segurança, qualidade) para as fases mais cedo do ciclo — quanto mais cedo detectar, mais barato corrigir",
      "Mover responsabilidades de operação do time de Ops para os desenvolvedores, reduzindo silos entre equipes",
      "Estratégia de pipeline onde stages de deploy ocorrem antes dos testes para acelerar feedback em ambientes reais",
      "Técnica de code review onde o autor revisa o PR antes dos pares para identificar problemas óbvios antecipadamente",
    ],
    correctIndex: 0,
    explanation:
      "Bug encontrado em prod custa 100x mais que em desenvolvimento. Shift-left: testes unitários no commit, análise estática (SAST) no PR, dependency scanning antes do merge, testes de integração antes do deploy. DevSecOps aplica shift-left à segurança: SAST (Semgrep, SonarQube), SCA (Snyk, Dependabot) e secrets scanning (GitGuardian) no pipeline, não em auditorias trimestrais.",
    example:
      "Semgrep no PR detecta SQL injection potencial antes do merge. Snyk bloqueia library com CVE crítico antes do deploy. Custo: 5 minutos do desenvolvedor. Alternativa: descobrir em pentest trimestral — custo: semanas de correção + possível breach.",
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__4",
    tags: ["terraform", "IaC", "idempotency"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "O que é Terraform e como ele implementa o conceito de infraestrutura como código?",
    options: [
      "Ferramenta IaC declarativa que descreve o estado desejado da infra; plan mostra diff, apply converge para o estado, state file rastreia recursos reais",
      "Linguagem de scripting para automação de configuração de servidores, similar ao Ansible mas com suporte a rollback automático",
      "Plataforma de cloud agnóstica que abstrai APIs dos provedores em uma camada unificada com deployment automático",
      "Sistema de templates para gerar arquivos de configuração de containers baseado em variáveis de ambiente definidas pelo time",
    ],
    correctIndex: 0,
    explanation:
      "Terraform: você escreve HCL declarando o que quer (resource 'aws_instance' 'web' { ami = '...' instance_type = 't3.micro' }). terraform plan mostra o diff entre estado atual (state file) e desejado. terraform apply executa as mudanças via APIs do provider. Idempotência: aplicar o mesmo código múltiplas vezes não cria duplicatas. State file rastreia o que Terraform gerencia — nunca edite manualmente.",
    example:
      "Criar 3 VMs idênticas: resource 'aws_instance' com count=3. Escalar para 5: mudar count=5 e rodar terraform apply — Terraform cria exatamente 2 VMs novas. Sem Terraform: manual, propenso a inconsistências e 'snowflake servers'.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__5",
    tags: ["observability", "metrics", "traces", "logs"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "O que são os três pilares da observabilidade (métricas, logs, traces) e qual a diferença entre eles?",
    options: [
      "Métricas: agregações numéricas ao longo do tempo (latência p99, taxa de erro). Logs: eventos textuais detalhados. Traces: rastreamento de uma requisição por múltiplos serviços",
      "Métricas: dashboards visuais de uso de recursos. Logs: alertas automáticos com thresholds. Traces: gravação de sessões de usuário para replay",
      "Os três pilares são equivalentes — a diferença é apenas de ferramenta: Prometheus (métricas), ELK (logs) e Jaeger (traces) fazem o mesmo",
      "Métricas e logs são para monitoramento reativo (pós-falha). Traces são para monitoramento proativo prevenindo falhas antes de ocorrer",
    ],
    correctIndex: 0,
    explanation:
      "Métricas (Prometheus): counters, gauges, histograms — 'quantos erros/s nas últimas 5 min?'. Baratos para armazenar, ideais para alertas e dashboards. Logs (ELK, Loki): eventos individuais detalhados — 'o que aconteceu nessa requisição específica?'. Caros em volume. Traces (Jaeger, Zipkin, OTEL): rastreio de uma requisição passando por serviço-A → B → C mostrando latência em cada hop. OpenTelemetry padroniza instrumentação para os três.",
    example:
      "Alerta: latência p99 > 2s (métrica). Investigação: logs do serviço mostram queries lentas (log). Root cause: trace mostra que serviço de pagamento está demorando 1.8s sozinho. Sem traces, a investigação levaria horas.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__6",
    tags: ["SLO", "SLA", "SLI", "error-budget"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "O que são SLI, SLO e SLA e como o error budget balanceia confiabilidade e velocidade?",
    options: [
      "SLI: métrica medida (ex: % de requisições < 200ms). SLO: meta interna (99.9% de uptime). SLA: contrato com cliente. Error budget: quanto downtime ainda é permitido no período",
      "SLI é o mesmo que SLA — ambos são contratos de nível de serviço com clientes externos e internos respectivamente",
      "SLO é o objetivo financeiro do time DevOps; SLI mede se o orçamento de infraestrutura está sendo respeitado",
      "Error budget é o número máximo de bugs permitidos por release; SLO define o threshold de qualidade mínima para deploy",
    ],
    correctIndex: 0,
    explanation:
      "SLI: o que você mede (ex: latência p99, taxa de sucesso). SLO: target interno (99.9% de requisições < 500ms no mês). SLA: compromisso contratual com penalidades. Error budget = 100% - SLO = 0.1% do tempo pode estar fora. Se budget esgotou: pause features, foque em confiabilidade. Se budget saudável: veloz com features. Isso cria incentivo racional — mais deploys gastam budget, menos deploys conservam.",
    example:
      "SLO de 99.9% uptime/mês = 43 min de downtime permitidos. Gasto 30 min → 13 min restantes. Time DevOps pode fazer mais deploys. Gasto tudo → freeze de features, foco total em reduzir toil e melhorar confiabilidade.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__7",
    tags: ["ansible", "configuration-management", "idempotent"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "O que é Ansible e quando ele é preferível ao Terraform para automação de infraestrutura?",
    options: [
      "Ferramenta de gerenciamento de configuração agentless (usa SSH); melhor para configurar e provisionar software em servidores existentes, enquanto Terraform é para criar/destruir recursos cloud",
      "Substituto do Terraform para provisionamento de recursos AWS com sintaxe YAML mais simples e curva de aprendizado menor",
      "Plataforma de orquestração de containers que gerencia o ciclo de vida de pods Kubernetes via playbooks declarativos",
      "Ferramenta de teste de infraestrutura que valida se configurações de Terraform estão corretas antes do apply",
    ],
    correctIndex: 0,
    explanation:
      "Terraform brilha em criar/modificar/destruir recursos cloud (VMs, redes, buckets). Ansible brilha em configurar o que já existe: instalar pacotes, copiar arquivos, configurar serviços, aplicar hardening. Ansible é agentless (só precisa de SSH e Python no target). Idempotente: rodar o playbook 10x tem o mesmo efeito que rodar 1x. Uso conjunto comum: Terraform cria a VM, Ansible configura o software nela.",
    example:
      "Terraform provisiona 10 VMs EC2. Ansible playbook instala nginx, copia certificados TLS, configura firewall e configura usuários em todas as 10 VMs em paralelo. Mudar versão do nginx: atualiza playbook, rodar novamente — idempotente.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__8",
    tags: ["DORA", "metrics", "deployment-frequency"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "Quais são as métricas DORA e o que elas medem na maturidade de DevOps de um time?",
    options: [
      "Deployment Frequency (velocidade), Lead Time for Changes (eficiência), MTTR (recuperação) e Change Failure Rate (qualidade) — as 4 métricas que preveem performance organizacional",
      "Métricas de custo DevOps: Deploy Cost, Operations Ratio, Resource Allocation e Automation Coverage — medem ROI da automação",
      "Indicadores de satisfação: Developer NPS, On-call Burden, Review Turnaround e Release Anxiety — medem saúde do time",
      "Métricas de pipeline: Build Duration, Test Coverage, Artifact Size e Cache Hit Ratio — otimização técnica de CI/CD",
    ],
    correctIndex: 0,
    explanation:
      "DORA (DevOps Research and Assessment): (1) Deployment Frequency: times elite deployam múltiplas vezes/dia. (2) Lead Time for Changes: tempo do commit ao prod; elite < 1 hora. (3) MTTR (Mean Time to Recovery): tempo de detecção + resolução; elite < 1 hora. (4) Change Failure Rate: % de deploys que causam incidente; elite < 5%. Pesquisa de 7 anos com 32k profissionais correlacionou essas métricas com performance de negócio.",
    example:
      "Time antes da transformação DevOps: deploy mensal (DF), lead time 3 meses, MTTR 1 semana, CFR 25%. Após: deploys diários, lead time 2 horas, MTTR 15 min, CFR 2% — mesmas métricas DORA, transformação mensurável.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__9",
    tags: ["helm", "kubernetes", "package-manager"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question: "O que é Helm e como ele simplifica deploys no Kubernetes?",
    options: [
      "Package manager do Kubernetes: agrupa manifests YAML em charts reutilizáveis com valores configuráveis, versionamento e rollback nativo",
      "Dashboard web para gerenciar clusters Kubernetes com interface visual para deploy e monitoramento de pods",
      "Ferramenta de geração automática de Dockerfiles e Kubernetes manifests a partir do código-fonte da aplicação",
      "Substituto do kubectl que usa linguagem natural para criar e gerenciar recursos Kubernetes sem YAML",
    ],
    correctIndex: 0,
    explanation:
      "Problema: um app Kubernetes pode ter 10+ manifests (Deployment, Service, ConfigMap, HPA, Ingress...). Helm agrupa tudo em um Chart. values.yaml centraliza configurações. helm install minha-app ./chart --set image.tag=v1.2 deploya tudo de uma vez. helm upgrade faz upgrade, helm rollback desfaz. Helm Hub: charts prontos para postgres, redis, prometheus — não precisa escrever do zero.",
    example:
      "Deploy de Postgres: helm install db bitnami/postgresql --set auth.postgresPassword=secret --set primary.persistence.size=20Gi. Em vez de escrever StatefulSet, Service, PVC, Secret manualmente. Atualizar versão: helm upgrade db bitnami/postgresql --set image.tag=16.2.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Médio__10",
    tags: ["vault", "secrets-management", "rotation"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Médio",
    question:
      "Como gerenciar secrets em larga escala com HashiCorp Vault em ambientes de produção?",
    options: [
      "Vault centraliza secrets com controle de acesso por política, rotação automática, audit log de acesso e dynamic secrets (credenciais temporárias geradas sob demanda)",
      "Vault criptografa secrets em arquivos .env no repositório Git usando chave simétrica distribuída pelo time de DevOps",
      "Ferramenta exclusiva para secrets de banco de dados relacionais; para outros tipos de secrets, use AWS SSM Parameter Store",
      "Vault substitui completamente o mecanismo de IAM do cloud provider, centralizando todas as permissões em uma política única",
    ],
    correctIndex: 0,
    explanation:
      "Vault features: (1) Static secrets: armazena e versiona segredos com ACL por path. (2) Dynamic secrets: gera credenciais DB temporárias com TTL — app pede, Vault cria user temporário no Postgres, TTL expira, user some. (3) Audit log: quem acessou qual secret e quando. (4) Auto-unseal: integração com AWS KMS/GCP CKM para auto-unseal seguro. (5) AppRole/Kubernetes auth: apps autenticam via identidade do pod.",
    example:
      "App no Kubernetes autentica via service account → Vault verifica identidade → retorna credenciais Postgres válidas por 1h → app usa → expirou, solicita novas. Se o pod for comprometido, credencial expira em 1h automaticamente.",
  },

  // ── Difícil 4-10 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__4",
    tags: ["progressive-delivery", "feature-flags", "canary"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "O que é Progressive Delivery e como ele combina canary releases, feature flags e A/B testing para deploys seguros?",
    options: [
      "Deploy incremental controlado por observabilidade: começa com 1% do tráfego/usuários, monitora SLIs, expande automaticamente se saudável ou rollback automático se degradar",
      "Estratégia de deploy que requer aprovação manual em cada incremento de porcentagem para garantir conformidade regulatória",
      "Técnica exclusiva para mobile apps onde versões são distribuídas gradualmente pelas app stores sem controle do time DevOps",
      "Processo de QA progressivo que testa em cada ambiente (dev → staging → prod) aguardando aprovação manual entre estágios",
    ],
    correctIndex: 0,
    explanation:
      "Progressive Delivery (Martin Fowler/Jez Humble): evolução de CD. Ferramentas como Argo Rollouts ou Flagger monitoram métricas (error rate, latency p99) durante o canary. Se métricas degradarem, rollback automático. Feature flags (LaunchDarkly, OpenFeature): deploy desacoplado de release — código em prod mas feature desligada. A/B testing: variante B para segmento específico medindo conversão. Targeting: novo checkout só para usuários premium primeiro.",
    example:
      "Argo Rollouts: deploy nova versão para 5% do tráfego. Monitora error rate 10 min. < 1%? Avança para 20%. Continue automaticamente. Erro rate > 2%? Rollback automático para versão anterior. Zero intervenção humana no happy path.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__5",
    tags: ["chaos-engineering", "resilience", "fault-injection"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "O que é Chaos Engineering e como Chaos Monkey/LitmusChaos são usados para aumentar resiliência em produção?",
    options: [
      "Injeção controlada de falhas em produção (matar pods, adicionar latência, derrubar AZs) para descobrir fraquezas de resiliência antes que aconteçam naturalmente",
      "Processo de stress test executado mensalmente em staging para simular alta carga; não deve ser executado em produção nunca",
      "Framework de testes de mutação que altera código aleatoriamente para verificar se os testes unitários detectam regressões",
      "Técnica de rollout que introduz bugs intencionalmente em branches de feature para treinar o time em debugging",
    ],
    correctIndex: 0,
    explanation:
      "Chaos Monkey (Netflix): mata instâncias aleatórias em produção para garantir que serviços sobrevivem à perda de nós. Simian Army: variantes para AZ inteiras, latência de rede, etc. LitmusChaos (CNCF, Kubernetes-native): experimentos: pod-delete, network-loss, cpu-hog, disk-fill, node-drain. Game Days: exercícios planejados de failure injection com time observando. Princípio: é melhor descobrir fraquezas em experimento controlado do que em outage real às 3h.",
    example:
      "Netflix roda Chaos Monkey diariamente em prod. App deve sobreviver à morte de qualquer instância sem downtime. Time que não passou no Chaos Monkey sabe exatamente quais são seus SPOFs antes de virar incidente P1.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__6",
    tags: ["policy-as-code", "OPA", "compliance"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "O que é Policy as Code com OPA (Open Policy Agent) e como ele automatiza compliance em pipelines DevOps?",
    options: [
      "Policies de segurança/compliance escritas em Rego e executadas como gate no pipeline: bloqueia Terraform que abre porta 22 pública, rejeita imagens sem scan, valida manifests Kubernetes",
      "Ferramenta de auditoria que gera relatórios de compliance automaticamente para ISO 27001 e SOC 2 baseada em análise de pipeline",
      "Sistema de gerenciamento de políticas de acesso IAM que substitui roles e policies da AWS/GCP com sintaxe unificada",
      "Framework de testes de segurança que executa pentests automatizados no pipeline CI/CD antes de cada deploy de produção",
    ],
    correctIndex: 0,
    explanation:
      "OPA é um engine de policies genérico com linguagem Rego. Casos de uso: (1) Conftest: valida Terraform/Kubernetes YAML no CI — bloqueia se security_groups tiver 0.0.0.0/0. (2) Gatekeeper (Kubernetes): Admission Controller que rejeita pods sem resource limits ou imagens unsigned. (3) Integração com CI: policy gate que valida artefatos antes de deploy. Separa 'o que é permitido' do código da aplicação.",
    example:
      "Policy Rego: 'deny se container.securityContext.runAsRoot = true'. Qualquer Kubernetes manifest com runAsRoot é rejeitado automaticamente no PR e no deploy pelo Gatekeeper — sem revisão manual de segurança necessária.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__7",
    tags: ["database-migration", "flyway", "zero-downtime"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "Como realizar database migrations com zero downtime em pipelines CI/CD de produção?",
    options: [
      "Migrations em múltiplas fases: (1) adicionar coluna nullable/campo compatível, (2) deploy código que suporta ambos os estados, (3) migrar dados, (4) deploy código que usa nova estrutura, (5) remover coluna antiga",
      "Executar migration com lock de tabela durante janela de manutenção noturna; zero downtime é impossível em mudanças de schema",
      "Usar apenas migrations de inserção de dados; alterações de schema devem ser evitadas após a primeira versão de produção",
      "Rodar migrations em paralelo ao deploy em uma única transação distribuída garantida pelo Flyway/Liquibase",
    ],
    correctIndex: 0,
    explanation:
      "Padrão Expand-Contract (Parallel Change): Expand — migration que só adiciona (nova coluna nullable, novo índice concurrent). Ambas versões do código funcionam com o schema. Deploy código novo. Contract — após validação, remover estrutura antiga em outra migration. Ferramentas: Flyway, Liquibase controlam versões de migration. CREATE INDEX CONCURRENTLY (Postgres) não bloqueia tabela. Never: DROP COLUMN em migration com rollout em curso — quebra a versão anterior do código que ainda roda.",
    example:
      "Renomear coluna 'name' para 'full_name': (1) Adicionar full_name nullable. (2) Deploy código que escreve em ambas. (3) Backfill: UPDATE SET full_name=name. (4) Deploy código que só usa full_name. (5) DROP COLUMN name. Cada passo é seguro de reverter.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter((c: any) => c.category === "CI/CD e DevOps");
console.log("CI/CD e DevOps: total=" + cat.length);
console.log(
  "F:" +
    cat.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    cat.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    cat.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
