/**
 * Adiciona 3 cards Difícil (8-10) de CI/CD e DevOps
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
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__8",
    tags: ["multi-cloud", "portability", "vendor-lock-in"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "Como estruturar pipelines CI/CD portáveis evitando vendor lock-in em ferramentas de automação?",
    options: [
      "Abstrair lógica em scripts (Makefile/shell), usar containers para tooling, OpenTofu/Crossplane para IaC agnóstica, e Dagger para pipelines portáveis entre CI providers",
      "Usar apenas GitHub Actions pois é o padrão de mercado com maior ecossistema e evitar ferramentas de nicho com menos suporte",
      "Duplicar o pipeline completo em dois CI providers diferentes e usar DNS failover para alternar entre eles em caso de outage",
      "Manter toda a lógica no CI provider (GitHub Actions, GitLab CI) pois troca de ferramenta é evento raro que não justifica abstração",
    ],
    correctIndex: 0,
    explanation:
      "Vendor lock-in: pipeline totalmente em GitHub Actions specific syntax torna migração para GitLab CI um retrabalho enorme. Padrões: (1) Makefile como interface: `make test`, `make build`, `make deploy` — CI chama make, não implementa lógica. (2) Dockerized tools: tudo roda em container, mesmo ambiente local e CI. (3) Dagger: pipeline escrito em Go/Python que roda em qualquer CI. (4) OpenTofu (fork open-source do Terraform) evita lock-in comercial na IaC.",
    example:
      "Migração de CircleCI para GitHub Actions: sem abstração = reescrever 50 pipelines. Com Makefile: mudar apenas o trigger YAML de cada CI — lógica permanece nos Makefiles intocada. Migração em 1 dia vs 2 semanas.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__9",
    tags: ["platform-engineering", "IDP", "golden-paths"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "O que é Platform Engineering e como Internal Developer Platforms (IDPs) melhoram a experiência do desenvolvedor em escala?",
    options: [
      "Time dedicado que constrói plataformas self-service (IDP) com golden paths de CI/CD, templates e abstrações sobre infra complexa, reduzindo cognitive load dos devs de produto",
      "Prática de otimização de custos cloud onde toda infraestrutura deve ser aprovada por comitê de plataforma antes de provisionar",
      "Abordagem onde cada time de produto gerencia sua própria infraestrutura independentemente sem times de plataforma centralizados",
      "Conjunto de ferramentas de monitoramento centralizado que observa todos os deploys de uma organização em um único dashboard",
    ],
    correctIndex: 0,
    explanation:
      "Em escala, cada time reinventando CI/CD, IaC e observabilidade cria inconsistências e retrabalho. Platform Engineering cria 'golden paths': maneiras opinionadas e suportadas de fazer deploy, criar serviço, configurar observabilidade. Developer Portal (Backstage) cataloga serviços, docs e runbooks. IDPs oferecem self-service: dev cria novo microsserviço via template em minutos com CI/CD, alert rules e dashboards já configurados.",
    example:
      "Spotify criou Backstage: dev clica 'New Service' → template cria repo, Terraform workspace, pipeline CI/CD, Datadog dashboard e PagerDuty integration automaticamente. Dev foca em código de negócio, não em yak-shaving de infra.",
  },
  {
    id: "engenharia-de-software__CI-CD e DevOps__Difícil__10",
    tags: ["supply-chain", "SLSA", "provenance", "SBOM"],
    track: "engenharia-de-software",
    category: "CI/CD e DevOps",
    difficulty: "Difícil",
    question:
      "O que é segurança na cadeia de suprimentos de software (SLSA, SBOM, provenance) e por que virou prioridade após ataques como SolarWinds?",
    options: [
      "SLSA: framework de níveis de integridade do build (hermético, reproduzível, auditável). SBOM: inventário de todas as dependências. Provenance: atestado assinado de como o artefato foi construído",
      "Conjunto de ferramentas para auditar fornecedores de hardware e garantir que servidores de produção não têm backdoors de fábrica",
      "Processo de verificação de identidade de desenvolvedores com autenticação multi-fator obrigatória em todos os commits",
      "Padrão ISO para avaliação de risco em aquisições de software terceirizado para empresas do setor financeiro regulado",
    ],
    correctIndex: 0,
    explanation:
      "SolarWinds: atacante comprometeu o build system, injetou malware no artefato — clientes instalaram atualização 'legítima' com backdoor. SLSA (Supply chain Levels for Software Artifacts) define 4 níveis de proteção do pipeline de build. SBOM (Software Bill of Materials): lista todas as dependências como Log4j — quando nova CVE emerge, sabe exatamente quais sistemas são afetados. Provenance: atestado assinado (Cosign + OIDC) linkando artefato ao commit e pipeline que o gerou.",
    example:
      "Executive Order americana 2021 exigiu SBOMs de software vendido ao governo após SolarWinds. Com SBOM: quando Log4Shell surgiu, empresas com SBOM identificaram sistemas afetados em horas. Sem SBOM: semanas de auditoria manual.",
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
