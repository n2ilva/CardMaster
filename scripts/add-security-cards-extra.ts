/**
 * Adiciona 3 cards Difícil restantes de Segurança no Desenvolvimento (D:8, D:9, D:10)
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
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__8",
    tags: ["oauth2", "PKCE", "authorization-code-flow"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "Quais são as vulnerabilidades do OAuth 2.0 Implicit Flow e por que Authorization Code + PKCE é o padrão recomendado hoje?",
    options: [
      "Implicit Flow expõe access token na URL (logs, Referer header, history) e não há refresh token; PKCE previne authorization code interception em apps públicas sem armazenar client_secret",
      "OAuth 2.0 Implicit Flow é o padrão recomendado atual — Authorization Code é legado e mais complexo desnecessariamente para aplicações SPA modernas",
      "A vulnerabilidade do Implicit Flow é apenas teórica — na prática, tokens na URL são seguros porque o HTTPS criptografa os parâmetros de query string",
      "PKCE é obrigatório apenas para apps mobile nativas; SPAs e aplicações web continuam sendo mais seguras com Implicit Flow por design",
    ],
    correctIndex: 0,
    explanation:
      "Implicit Flow (deprecado por RFC 9700): token retornado diretamente na URL fragment. Problemas: (1) URL fica no browser history. (2) Servidor de logs registra URL. (3) Referer header vaza para sites terceiros. (4) Sem refresh token (sessão curta ou insegura). Authorization Code + PKCE: (1) Code é trocado por token server-side (não visível na URL). (2) PKCE (Proof Key for Code Exchange): code_verifier + code_challenge impedem interceptação do authorization code em apps sem client_secret (SPA, mobile). RFC 9700 (2025) depreca Implicit Flow oficialmente.",
    example:
      "SPA com Implicit Flow: redirect_uri contém #access_token=abc123. Browser history salva a URL. Analytics de terceiro no site captura via Referer. Com PKCE: app gera code_verifier aleatório → envia code_challenge (hash) → recebe code → troca code por token server-side → token nunca na URL.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__9",
    tags: ["memory-safety", "buffer-overflow", "secure-coding"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "O que são memory safety vulnerabilities (buffer overflow, use-after-free) e como linguagens e frameworks modernos as previnem?",
    options: [
      "Erros de gerenciamento manual de memória em C/C++ permitem sobrescrita de memória (buffer overflow) ou acesso após liberação (use-after-free) — Rust previne em compile time; linguagens GC (Java, Go, Python) eliminam a classe de vulnerabilidade",
      "Memory safety é relevante apenas para sistemas operacionais e drivers — aplicações web e APIs nunca são afetadas por vulnerabilidades de memória",
      "Buffer overflow só ocorre em sistemas 32-bit legados — sistemas 64-bit modernos têm proteção automática contra todos os tipos de memory corruption",
      "Use-after-free é resolvido com boas práticas de código como sempre inicializar variáveis — não requer linguagens especiais ou ferramentas de análise",
    ],
    correctIndex: 0,
    explanation:
      "70% das vulnerabilidades críticas da Microsoft são memory safety (dados da empresa). Buffer overflow: escrever além dos limites de array sobrescreve memória adjacente (return addresses → RCE). Use-after-free: ponteiro para memória já liberada → comportamento indefinido exploitável. Defesas em C/C++: ASLR, stack canaries, DEP/NX, sanitizers (AddressSanitizer). Rust: ownership + borrow checker: impossível ter dangling pointers ou data races em compile time. Java/Python/Go: garbage collector elimina use-after-free. Chrome: 70% dos bugs de alta severidade eram memory safety — migrando módulos críticos para Rust.",
    example:
      "OpenSSL Heartbleed (CVE-2014-0160): leitura de buffer além dos limites. Pedido: 'envie mensagem X de tamanho Y bytes' — Y manipulado para ser maior que X. Servidor lê além da mensagem, retorna memória adjacente com chaves privadas, senhas, dados de outros usuários. 500.000 servidores afetados.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__10",
    tags: ["incident-response", "post-mortem", "breach-response"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "Como estruturar um plano de resposta a incidentes de segurança e quais são os passos críticos nas primeiras horas após um breach?",
    options: [
      "Identificar → Conter (isolar sistemas comprometidos) → Erradicar (remover ameaça) → Recuperar → Post-mortem (causa raiz, não culpa) → Melhorias preventivas. Preservar evidências antes de conter",
      "O primeiro passo após um breach é formatar os servidores comprometidos imediatamente para eliminar o malware e restaurar backup limpo o mais rápido possível",
      "Incidentes de segurança devem ser gerenciados apenas pelo CISO e time de segurança — devs e ops não devem ser envolvidos para evitar contaminação de evidências",
      "Comunicar publicamente o breach imediatamente nas redes sociais da empresa é obrigatório por lei antes de investigar o que foi comprometido",
    ],
    correctIndex: 0,
    explanation:
      "NIST Incident Response Lifecycle: Preparation → Detection → Containment → Eradication → Recovery → Post-Incident. Primeiras horas críticas: (1) Não apague o servidor — preservar evidências (logs, memória). (2) Isolar (network segmentation) sem desligar. (3) Identificar escopo: o que foi acessado? (4) Notificações legais: LGPD (72h para autoridade), contratos com clientes. (5) Timeline de containment. Post-mortem blameless: 5 Whys para causa raiz sistêmica, não punição individual. Runbooks pré-escritos: decisão sob pressão é pior → documentar o plano antes do incidente.",
    example:
      "Detecção 02h: alerta de exfiltração de dados. 02h15: isolar servidor na VLAN de quarentena (serviço down mas evidências preservadas). 02h30: snapshot de disco e memória para análise forense. 03h: identificado que 50k registros foram lidos via SQL injection. 04h: patch aplicado, WAF rule criada. 09h: notificação à ANPD conforme LGPD. Post-mortem em 48h: causa raiz = input não sanitizado + sem WAF. Prevention: SAST no CI/CD.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter(
  (c: any) => c.category === "Segurança no Desenvolvimento",
);
console.log("Segurança no Desenvolvimento: total=" + cat.length);
console.log(
  "F:" +
    cat.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    cat.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    cat.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
