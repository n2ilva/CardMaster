/**
 * Adiciona 3 cards Difícil restantes de Metodologias Ágeis (D:8, D:9, D:10)
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
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__8",
    tags: ["continuous-discovery", "experiment", "product-led"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "Como estruturar um processo de Continuous Discovery em times de produto ágeis para minimizar risco de construir features erradas?",
    options: [
      "Cadência semanal de entrevistas com usuários, árvore de oportunidades para mapear problemas, experimentos de menor custo para validar hipóteses antes de comprometer Sprints de desenvolvimento",
      "Fazer uma pesquisa de mercado abrangente no início do trimestre que define todas as features do roadmap para os próximos 3 meses de desenvolvimento",
      "Substituir user stories tradicionais por hipóteses de negócio validadas apenas por dados de analytics e A/B tests em produção",
      "Contratar pesquisadores de UX dedicados que realizam estudos etnográficos mensais entregando relatórios ao Product Owner",
    ],
    correctIndex: 0,
    explanation:
      "Teresa Torres (Continuous Discovery Habits): weekly touchpoints com clientes (não estudos grandes e raros). Opportunity Solution Tree: outcome desejado → oportunidades (dores dos usuários) → soluções → experimentos. Princípio: teste a menor hipótese possível. Protótipo de papel antes de mockup. Mockup antes de código. Spike técnico antes de Sprint inteiro. Cada experimento reduz incerteza progressivamente. Objetivo: nunca chegar ao Spring Planning sem evidências.",
    example:
      "Hipótese: 'usuários querem exportar para Excel'. Custo validação: 30min de entrevistas com 5 usuários. Resultado: 2/5 querem. Reformulação: 'usuários de planos enterprise querem relatórios customizáveis'. Revalida com 5 clientes enterprise: 4/5 confirmam. Agora sim entra no backlog.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__9",
    tags: ["FLEX", "less", "nexus", "scaled-agile"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "Quais são as principais diferenças entre SAFe, LeSS e Nexus para escalar ágil, e como escolher o framework certo?",
    options: [
      "SAFe: prescritivo/top-down, bom para grandes empresas com múltiplos ART; LeSS: extensão mínima do Scrum para 2-8 times, evita burocracia; Nexus: foca em integração técnica entre 3-9 times Scrum",
      "São nomes diferentes para a mesma metodologia — as organizações escolhem o nome com base na preferência do consultor Agile contratado",
      "SAFe é para hardware, LeSS é para software, Nexus é exclusivo para empresas de tecnologia da informação com mais de 500 funcionários",
      "Nexus é o mais burocrático dos três, SAFe é o mais leve e LeSS requer certificações extensas de todos os membros antes de implementar",
    ],
    correctIndex: 0,
    explanation:
      "SAFe (Scaled Agile Framework): 4 configurações (Essential, Large Solution, Portfolio, Full). Agile Release Train (ART) de 50-125 pessoas. Program Increment (PI) de 8-12 semanas. Críticas: overhead de cerimônias, difícil adaptar. LeSS (Craig Larman): 'Scrum writ large'. 2-8 times, um Product Owner, um Product Backlog. LeSS Huge para mais de 8 times com Area POs. Minimalista. Nexus (Scrum.org): integração foco — Nexus Integration Team, Nexus Sprint Backlog combinado. Escolha: tamanho, cultura de autonomia, contexto regulatório.",
    example:
      "Banco grande (500+ devs, compliance pesado) → SAFe por estrutura de governança. Startup crescendo para 5 times → LeSS pela simplicidade. Empresa com Scrum funcionando bem, crescendo para 6 times de produto → Nexus para manter as práticas existentes adicionando só a camada de integração.",
  },
  {
    id: "engenharia-de-software__Metodologias Ágeis__Difícil__10",
    tags: ["agile-metrics", "flow", "DORA", "four-keys"],
    track: "engenharia-de-software",
    category: "Metodologias Ágeis",
    difficulty: "Difícil",
    question:
      "Como as DORA Metrics (Four Keys) e métricas de fluxo Kanban se complementam para medir saúde real de times ágeis além de velocity?",
    options: [
      "DORA mede saúde do pipeline de entrega (deployment frequency, lead time for changes, change failure rate, MTTR); métricas de fluxo medem saúde do processo de desenvolvimento (cycle time, throughput, WIP, flow efficiency)",
      "DORA Metrics substituem completamente as métricas de Scrum (velocity, burndown) e são suficientes para qualquer time de software",
      "DORA mede apenas aspectos de segurança de produção; métricas de fluxo medem esforço e pontos de história completados por desenvolvedor",
      "São métricas conflitantes — DORA incentiva deploys frequentes enquanto métricas de fluxo incentivam WIP alto para maximizar ocupação do time",
    ],
    correctIndex: 0,
    explanation:
      "DORA (DevOps Research & Assessment): Deployment Frequency (elite: múltiplos/dia), Lead Time for Changes (elite: <1h), Change Failure Rate (elite: 0-15%), MTTR (elite: <1h). Fluxo Kanban: Cycle Time (previsibilidade), Throughput (itens/semana, não pontos), WIP (itens em andamento simultâneo), Flow Efficiency (tempo ativo vs. espera). Combinados: DORA mostra saúde técnica/operacional; fluxo mostra saúde do processo de trabalho. Velocity (pontos/Sprint) mostra muito pouco sozinha — não detecta gargalos, não prevê confiabilidade.",
    example:
      "Time com velocity 'estável' de 40pts/Sprint mas: cycle time de 15 dias (gargalo em code review), change failure rate 30% (deploys quebrando), MTTR 4h (incidentes demorados). Velocity mentia que estava bem. DORA + fluxo revelam o problema real.",
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
