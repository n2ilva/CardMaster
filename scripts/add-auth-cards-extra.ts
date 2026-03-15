/**
 * Adiciona 3 cards Difícil restantes de Autenticação e Autorização (D:8, D:9, D:10)
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = resolve(__dirname, "../data/cards/engenharia-de-software.json");
const data: any[] = JSON.parse(readFileSync(filePath, "utf8"));

const newCards = [
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__8",
    tags: ["authorization-server", "AS-design", "multi-tenant"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "Como projetar um Authorization Server multi-tenant que seja seguro, escalável e que isole completamente os dados entre tenants?",
    options: [
      "Isolamento por tenant em todos os níveis: signing keys separadas por tenant, namespacing de client_ids, tokens contendo tenant_id claim, audit logs particionados, rate limits independentes e endpoint discovery segregado por tenant",
      "Multi-tenant Authorization Server simplesmente adiciona um prefix ao username (tenant1/user@email) — os tokens gerados são idênticos entre tenants e o isolamento é apenas lógico",
      "A solução mais simples é uma instância separada do Authorization Server por tenant — escalabilidade é sacrificada em favor do isolamento de dados completo",
      "Tenants devem compartilhar as mesmas signing keys RSA — chaves diferentes por tenant aumentam complexidade sem benefício real de segurança adicional"
    ],
    correctIndex: 0,
    explanation: "Desafios multi-tenant AS: (1) Signing keys: vazamento de key de tenant A não compromete tenant B → keys rotacionadas independentemente. (2) Client isolation: client_id 'webapp' do tenant A é diferente do tenant B → namespace: 'tenantA:webapp'. (3) Token claims: {sub: userId, tid: tenantId, ...} → Resource Server valida que tid corresponde ao tenant esperado. (4) Discovery: /{tenant}/.well-known/openid-configuration por tenant para configurações independentes. (5) Rate limiting por tenant: um tenant em burst não afeta outros. (6) Audit logs: query por tenant para compliance independente. Exemplos: Azure AD (cada tenant é isolado), Okta, Auth0.",
    example: "Empresa SaaS com 1000 clientes. Token para usuário do Tenant X: {sub:'alice', tid:'tenant-x', roles:['admin']}. Resource Server valida: request.tenant_context == token.tid? Se não → 403. Signing key de tenant-x comprometida: apenas usuários desse tenant afetados, rotação isolada. Os outros 999 tenants não são impactados."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__9",
    tags: ["continuous-authentication", "risk-based", "adaptive-auth"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "O que é Risk-Based Authentication (RBA) e como algoritmos de análise de risco em tempo real determinam quando exigir fatores adicionais?",
    options: [
      "RBA analisa sinais em tempo real (device fingerprint, localização, velocidade de navegação, padrão de uso) para calcular score de risco — alta confiança: acesso direto; médio risco: MFA; alto risco: bloqueio ou step-up auth",
      "Risk-Based Authentication analisa apenas o endereço IP do usuário para determinar o nível de risco — IPs conhecidos são confiáveis e IPs desconhecidos exigem verificação adicional",
      "RBA é exclusivo para instituições financeiras — outros setores não precisam de autenticação adaptativa por não lidarem com transações de alto valor",
      "Risk score em RBA é calculado apenas uma vez por sessão no momento do login — não há análise contínua durante o uso da aplicação após a autenticação inicial"
    ],
    correctIndex: 0,
    explanation: "Sinais tipicamente avaliados: Device fingerprint (browser, OS, hardware) → confiable se já visto. Geolocation → novo país? VPN/Tor? IP reputation (listas negras de IPs maliciosos). Velocidade impossível: login em SP às 10h, login em Tokyo às 12h → impossível. Behavioral biometrics: velocidade de digitação, padrão de mouse. Time of day: acesso às 3h no domingo. Transaction risk: transferência acima de threshold. Score engine: ML model ou regras baseadas em pontos. Ações por score: 0-30 (low): login normal. 31-70 (medium): TOTP/push notification. 71-100 (high): bloqueio + alerta + human review. Melhora UX (menos MFA pra usuários confiáveis) e segurança simultaneamente.",
    example: "Usuário faz login normalmente do laptop pessoal em casa (risk score 15 → acesso direto). Mesmo usuário tenta login de IP anônimo Tor na Rússia às 2h (risk score 92 → conta bloqueada + email de alerta). Usuário real aciona desbloqueio via email autenticado. Conta protegida sem degradar UX do usuário legítimo."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__10",
    tags: ["cryptographic-agility", "post-quantum", "key-rotation"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "O que é agilidade criptográfica em sistemas de autenticação e por que é crítica na era pós-quântica?",
    options: [
      "Capacidade de migrar algoritmos criptográficos sem redesenhar o sistema — essencial porque computadores quânticos ameaçam RSA/EC atuais; NIST padronizou algoritmos pós-quânticos (CRYSTALS-Kyber, CRYSTALS-Dilithium) para a transição",
      "Agilidade criptográfica significa que o sistema suporta múltiplos algoritmos de hash para senhas (bcrypt, argon2, scrypt) — necessário para compatibilidade com sistemas legados",
      "É um requisito exclusivo de sistemas militares e governamentais — aplicações comerciais não precisam considerar ameaças de computação quântica",
      "Post-quantum cryptography está disponível como atualização automática em todos os sistemas operacionais modernos — desenvolvedores não precisam tomar ações adicionais"
    ],
    correctIndex: 0,
    explanation: "Ameaça quântica: Algoritmo de Shor quebra RSA e ECC em tempo polinomial em computador quântico grande o suficiente. RSA-2048 → inseguro. ECDSA (JWT signatures) → inseguro. Harvest now, decrypt later: estados-nação já coletam dados criptografados hoje para decriptografar quando tiverem QC. NIST PQC (2024): padronizou CRYSTALS-Kyber (key encapsulation), CRYSTALS-Dilithium e Falcon (assinaturas digitais). Agilidade criptográfica: código não deve ter algoritmo hardcoded. Abstrair algoritmo: JWT com 'alg' field como config, não constante. Migração gradual: suportar algoritmos antigos E novos durante transição. TLS 1.3 suporta hybrid key exchange (clássico + pós-quântico simultâneo).",
    example: "Sistema de autenticação atual: algoritmo de assinatura de token = 'RS256' hardcoded. Transição pós-quântica: mudar para 'CRYSTALS-Dilithium' requer reescrever o sistema. Com agilidade: config {signing_algorithm: 'RS256', supported_algorithms: ['RS256', 'CRYDI3']}. Migração: mudar config, zero reescrita de código. Tokens antigos (RS256) aceitos por período de transição; novos tokens em CRYDI3."
  }
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter((c: any) => c.category === "Autenticação e Autorização");
console.log("Autenticação e Autorização: total=" + cat.length);
console.log("F:" + cat.filter((c: any) => c.difficulty === "Fácil").length +
  " M:" + cat.filter((c: any) => c.difficulty === "Médio").length +
  " D:" + cat.filter((c: any) => c.difficulty === "Difícil").length);
console.log("Total engenharia-de-software.json:", data.length);

// Resumo geral das 4 categorias concluídas nesta sessão
const categorias = ["Metodologias Ágeis", "Segurança no Desenvolvimento", "Mensageria e Filas", "Autenticação e Autorização"];
console.log("\n── Resumo Final ──");
for (const c of categorias) {
  const cs = data.filter((x: any) => x.category === c);
  console.log(`${c}: ${cs.length} (F:${cs.filter((x:any)=>x.difficulty==="Fácil").length} M:${cs.filter((x:any)=>x.difficulty==="Médio").length} D:${cs.filter((x:any)=>x.difficulty==="Difícil").length})`);
}
