/**
 * Adiciona 20 cards de Segurança no Desenvolvimento ao engenharia-de-software.json
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
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__5",
    tags: ["authentication", "authorization", "security"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "Qual a diferença entre autenticação e autorização em segurança de aplicações?",
    options: [
      "Autenticação: verifica quem você é (identidade). Autorização: verifica o que você pode fazer (permissões). São etapas distintas e sequenciais",
      "São sinônimos — ambos se referem ao processo de login e controle de acesso em sistemas web modernos",
      "Autenticação é exclusiva para APIs REST; autorização é usada apenas em aplicações web com sessões de usuário",
      "Autorização é feita no frontend para melhor UX; autenticação é feita no backend para segurança",
    ],
    correctIndex: 0,
    explanation:
      "Autenticação (AuthN): 'Você é quem diz ser?' — validada com senha, biometria, MFA. Autorização (AuthZ): 'Você tem permissão para isso?' — verificada após autenticação via RBAC, ACL, policies. Erro comum: verificar autenticação mas não autorização (usuário logado acessa dados de outro usuário). Sempre verifique AMBAS no servidor — nunca confie no cliente.",
    example:
      "Usuário faz login com email/senha → autenticado. Tenta acessar /admin → servidor verifica se ele tem role 'admin' → autorização negada. Sem verificação de autorização, qualquer usuário logado poderia acessar o painel admin.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__6",
    tags: ["environment-variables", "secrets", "configuration"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "Por que nunca commitar credenciais no Git e quais as melhores práticas para gerenciar segredos?",
    options: [
      "Repositórios podem ser expostos (breach, acesso indevido) e histórico do Git mantém credenciais para sempre mesmo após 'deletar' — usar variáveis de ambiente e gerenciadores de segredos",
      "É apenas uma convenção de estilo de código que melhora a legibilidade e organização do projeto para novos desenvolvedores",
      "Credenciais no Git são aceitáveis se o repositório for privado — o problema só existe em repositórios públicos",
      "O problema se resolve usando .gitignore para esconder os arquivos de configuração durante os pushes de código",
    ],
    correctIndex: 0,
    explanation:
      "Mesmo repos privados são breach targets. Git history é permanente — `git log` mostra tudo. Soluções: .env files + .gitignore (nunca commitar .env com valores reais). Gerenciadores: AWS Secrets Manager, HashiCorp Vault, GitHub Secrets (CI/CD), Azure Key Vault. Se commitou: revogar as credenciais IMEDIATAMENTE (não adianta só deletar o commit — histórico existe), trocar todos os tokens expostos. git-secrets (pre-commit hook) previne acidentes.",
    example:
      "Dev commita config.json com chave AWS. Mesmo deletando no próximo commit, a chave está no git history. GitHub Secret Scanning detecta automaticamente e alerta. Conta AWS comprometida em minutos por bots que monitoram repositórios.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__7",
    tags: ["principle-of-least-privilege", "access-control", "security"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "O que é o Princípio do Menor Privilégio (Principle of Least Privilege) e como aplicá-lo no desenvolvimento?",
    options: [
      "Cada componente/usuário/serviço deve ter apenas as permissões mínimas necessárias para sua função — limita o impacto de comprometimentos",
      "Desenvolvedores iniciantes devem ter acesso limitado ao repositório até completarem 6 meses de experiência na empresa",
      "APIs devem retornar o mínimo de dados possível em cada resposta para economizar banda e melhorar a performance",
      "Serviços de terceiros devem ser usados apenas quando absolutamente necessário para reduzir a superfície de ataque do sistema",
    ],
    correctIndex: 0,
    explanation:
      "Aplicações práticas: banco de dados (usuário da app tem SELECT/INSERT/UPDATE — nunca DROP TABLE). IAM AWS (role da Lambda só acessa o S3 bucket específico). Microserviços (serviço A não consegue chamar API do serviço C diretamente). Container (não roda como root). Se um componente é comprometido, o atacante fica limitado ao escopo mínimo de acesso daquele componente.",
    example:
      "API de listagem de produtos: usuário DB com SELECT no schema produtos. API de pedidos: usuário DB diferente com SELECT/INSERT em orders. Se a API de produtos for hackeada, atacante não consegue inserir pedidos fraudulentos — os privilégios são isolados.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__8",
    tags: ["security-headers", "http", "browser-security"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "Quais são os principais security headers HTTP e que ataques cada um previne?",
    options: [
      "Content-Security-Policy (XSS), X-Frame-Options (clickjacking), Strict-Transport-Security (downgrade HTTP), X-Content-Type-Options (MIME sniffing) — configurados no servidor e respeitados pelo browser",
      "Security headers são configurados apenas no frontend via meta tags HTML e não têm relação com as respostas do servidor backend",
      "Apenas HTTPS e certificados SSL são necessários para segurança HTTP — headers adicionais são redundantes em aplicações modernas",
      "Security headers precisam ser habilitados pelo usuário final nas configurações do navegador — não são controlados pelo desenvolvedor",
    ],
    correctIndex: 0,
    explanation:
      "Headers essenciais: Content-Security-Policy (CSP): define de onde scripts/estilos podem ser carregados — bloqueia XSS. X-Frame-Options: DENY previne a página de ser embed em iframe — bloqueia clickjacking. HSTS (Strict-Transport-Security): força HTTPS sempre — previne downgrade. X-Content-Type-Options: nosniff — browser não tenta adivinhar MIME type (evita executar arquivo texto como JS). Referrer-Policy: controla quanta informação vai no cabeçalho Referer.",
    example:
      "Sem CSP: atacante injeta <script src='evil.com/steal.js'> e roda JS livre. Com CSP: 'default-src self' → browser bloqueia qualquer script externo. Em segundos de adição de header, vetor de ataque eliminado.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__9",
    tags: ["input-validation", "server-side", "trust"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "Por que validação de input no frontend não é suficiente para segurança e onde deve ser feita?",
    options: [
      "Validação no frontend pode ser bypassada facilmente (DevTools, curl, Postman) — validação e sanitização no servidor são obrigatórias; frontend é apenas UX",
      "Validação no frontend é suficiente pois browsers modernos bloqueiam automaticamente requisições maliciosas antes de chegarem ao servidor",
      "A validação deve ser feita apenas no banco de dados com constraints — validated no servidor cria lógica duplicada desnecessária",
      "Validação no cliente e servidor são equivalentes em segurança — escolha um para evitar duplicação de código e manutenção extra",
    ],
    correctIndex: 0,
    explanation:
      "Regra fundamental: nunca confie em input do cliente. Bypass trivial: abrir DevTools → Network → modificar request. Ou usar curl/Postman direto na API pulando o frontend completamente. Validação frontend: para UX rápida (feedback imediato ao usuário). Validação backend: para segurança (obrigatória). Sanitização backend: limpar dados antes de usar em queries, HTML, comandos. Nunca confie em: form fields, headers, cookies, URL params, JSON body.",
    example:
      "Campo de email com validação frontend: browser bloqueia emails inválidos. Atacante usa curl: POST /api/user com {email: '<script>alert(1)</script>'}. Sem validação backend, stored XSS inserido no banco. Frontend nunca viu a requisição.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Fácil__10",
    tags: ["https", "tls", "certificate", "encryption"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Fácil",
    question:
      "O que é TLS/HTTPS e por que certificados de segurança são tão importantes para aplicações web?",
    options: [
      "TLS criptografa dados em trânsito impedindo man-in-the-middle attacks; certificados validam a identidade do servidor autenticando que você está no site correto",
      "HTTPS só é necessário em páginas de pagamento — páginas estáticas e APIs internas podem funcionar com HTTP sem risco",
      "TLS é um protocolo opcional que oferece apenas performance — um protocolo de backup quando HTTP está sobrecarregado",
      "Certificados SSL/TLS são gerenciados automaticamente por todos os provedores de cloud sem configuração adicional necessária",
    ],
    correctIndex: 0,
    explanation:
      "TLS (Transport Layer Security): criptografia em trânsito (dados não são legíveis em interceptação). Certificado: cadeia de confiança — CA (Certificate Authority) valida que o domínio pertence a quem diz. Sem HTTPS: rede Wi-Fi pública → qualquer um pode ver tokens de autenticação, dados de formulários. Let's Encrypt: certificados gratuitos e automáticos. HTTP Strict Transport Security (HSTS): força sempre HTTPS. Certificados expirados = browser alerta 'conexão insegura'.",
    example:
      "Usuário em rede de café acessa app HTTP. Atacante com Wireshark vê: 'Authorization: Bearer abc123token'. Com HTTPS: vê apenas bytes sem sentido criptografados. Token do usuário seguro mesmo em rede comprometida.",
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__4",
    tags: ["jwt", "session", "token-security"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "Quais são as principais vulnerabilidades de segurança em implementações JWT e como mitigá-las?",
    options: [
      "Algorithm confusion (alg:none), weak secrets em HS256, falta de validação de claims (exp, iss), armazenamento inseguro (localStorage) e tokens sem rotação/revogação adequada",
      "JWT é inerentemente seguro quando usado com HTTPS — não há vulnerabilidades adicionais além das já cobertas pelo protocolo TLS",
      "O único problema real com JWT é o tamanho do token que pode exceder limites de cookies — usar compression resolve todas as questões de segurança",
      "JWTs devem sempre ser armazenados no localStorage para melhor performance — cookies são mais vulneráveis por serem enviados automáticamente",
    ],
    correctIndex: 0,
    explanation:
      "Vulnerabilidades: (1) alg:none: algoritmo 'none' aceita token sem assinatura — sempre validar algoritmo explicitamente. (2) Weak secret: HS256 com secret curto é quebrável por brute force. (3) Não validar exp: token expirado ainda aceito. (4) localStorage XSS: script malicioso lê o token. Mitigações: (1) Whitelist de algoritmos (só RS256 ou HS256 com secret forte). (2) HttpOnly cookie para armazenamento. (3) Refresh tokens com rotação. (4) Blacklist de tokens revogados (Redis).",
    example:
      "API aceita { alg: 'none', typ: 'JWT' }.eyJzdWIiOiJhZG1pbiJ9. Atacante gera token para qualquer usuário sem conhecer o secret. Fix 1 linha: if (token.header.alg !== 'HS256') throw new Error('Invalid algorithm').",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__5",
    tags: ["command-injection", "path-traversal", "server-security"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "O que é Command Injection e Path Traversal? Como identificar e prevenir essas vulnerabilidades?",
    options: [
      "Command Injection: input do usuário executado como comando do sistema operacional. Path Traversal: input manipula caminhos de arquivo (../etc/passwd). Prevenção: nunca usar exec/shell com input do usuário; validar e sanitizar paths",
      "São vulnerabilidades exclusivas de aplicações legacy em PHP e ASP.NET — frameworks modernos como Node.js e Spring Boot são imunes por design",
      "Command Injection ocorre apenas em linhas de comando Linux — Windows e macOS não são afetados por esse tipo de vulnerabilidade",
      "Path Traversal requer acesso físico ao servidor — é uma vulnerabilidade de segurança física, não de código de aplicação",
    ],
    correctIndex: 0,
    explanation:
      "Command Injection: exec('ping ' + userInput) → input: '8.8.8.8; cat /etc/passwd' → executa 2 comandos. Fix: usar APIs nativas sem shell (dns.lookup() em vez de exec('ping')). Se inevitável: whitelist estrita, sem caracteres especiais. Path Traversal: readFile('/uploads/' + filename) → filename: '../../etc/passwd'. Fix: path.resolve() + verificar se está dentro do diretório permitido. Nunca concatenar input do usuário em paths.",
    example:
      "Sistema de relatórios: exec('generate-report ' + reportName). Atacante envia reportName = 'x; rm -rf /'. Servidor deleta todos os arquivos. Fix: usar biblioteca de geração sem shell, validar reportName com regex [a-zA-Z0-9-_] apenas.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__6",
    tags: ["rate-limiting", "api-security", "abuse-prevention"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "Por que rate limiting é essencial para segurança de APIs e quais estratégias de implementação existem?",
    options: [
      "Rate limiting previne brute force, scraping, DDoS e abuso de APIs — estratégias: fixed window, sliding window, token bucket, leaky bucket — implementado por IP, userID ou API key",
      "Rate limiting é apenas uma funcionalidade de billing para cobrança por uso de API — não tem relação com segurança de aplicações",
      "Rate limiting só é necessário para APIs públicas — APIs internas entre microserviços não precisam de limite de requisições",
      "Implementar rate limiting causa degradação significativa de performance — é melhor usar autenticação forte em vez de limitar requisições",
    ],
    correctIndex: 0,
    explanation:
      "Ataques prevenidos: brute force de senha (1000 tentativas/s sem rate limit), credential stuffing, scraping de dados, DDoS de aplicação. Estratégias: Fixed window (100 req/min por IP — simples mas vulnerável a burst). Sliding window (distribuído no tempo). Token bucket (permite burst controlado). Leaky bucket (rate uniforme). Implementação: por IP (Nginx, API Gateway), por usuário (mais preciso), por endpoint (/login mais restritivo que /public).",
    example:
      "Endpoint /api/login sem rate limit: atacante testa 1000 senhas em 1 minuto com botnet. Com rate limit: 5 tentativas/minuto por IP + lockout por 15 minutos após falhas → brute force inviável. Adiciona CAPTCHA após 3 falhas para proteção adicional.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__7",
    tags: ["ssrf", "server-side-request-forgery", "internal-network"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "O que é SSRF (Server-Side Request Forgery) e por que é particularmente perigoso em ambientes cloud?",
    options: [
      "Atacante faz o servidor buscar recursos internos (metadata de instância AWS, serviços internos) — em cloud expõe credenciais IAM via http://169.254.169.254",
      "SSRF é um ataque que força o servidor a executar código JavaScript malicioso enviado pelo cliente em requisições AJAX",
      "É uma vulnerabilidade de configuração de servidor web que ocorre quando request forwarding está habilitado sem autenticação adequada",
      "SSRF afeta apenas aplicações que aceitam uploads de arquivo — não é relevante para APIs que processam apenas dados JSON",
    ],
    correctIndex: 0,
    explanation:
      "SSRF: aplicação faz request HTTP a URL fornecida pelo usuário. Ataque: URL = http://169.254.169.254/latest/meta-data/iam/security-credentials/role → servidor AWS retorna chaves temporárias IAM. Capital One breach (2019): SSRF + excesso de permissões IAM → 100M registros expostos. Mitigações: whitelist de domínios permitidos, bloquear IPs internos (169.254.x.x, 10.x.x.x, 172.16-31.x.x), nunca redirecionar sem validação.",
    example:
      "Ferramenta de screenshot de site: POST {url: 'http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-role'}. Servidor retorna JSON com AccessKeyId e SecretAccessKey. Atacante usa as credenciais para acessar todos os recursos AWS da empresa.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__8",
    tags: ["dependency-scanning", "supply-chain", "CVE"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "Como um ataque de supply chain funciona no ecossistema de pacotes npm/npm e como se defender?",
    options: [
      "Pacote malicioso ou comprometido é instalado como dependência — defesa: audit automático (npm audit, Snyk), pin de versões, Dependabot, verificar integridade com checksums",
      "Supply chain attacks afetam apenas hardware e sistemas de terceiros — código aberto npm é inspecionado pela comunidade e seguro por padrão",
      "O problema se resolve usando apenas pacotes com mais de 1000 estrelas no GitHub — popularidade garante que o código foi auditado adequadamente",
      "Supply chain attacks são prevenidos automaticamente pelo package-lock.json que garante que as mesmas versões sejam sempre instaladas",
    ],
    correctIndex: 0,
    explanation:
      "Vetores: (1) Typosquatting: pacote 'lodash' vs 'lodahs' — nome similar. (2) Hijacking: conta npm comprometida → versão maliciosa do pacote legítimo. (3) Dependency confusion: pacote interno com nome similar ao público. Casos reais: event-stream (2018), ua-parser-js (2021), node-ipc (2022 — código de sabotagem por geolocalização). Defesas: npm audit em CI/CD, Snyk/Socket.dev para análise, crachá de assinatura (npm provenance), minimal installs.",
    example:
      "Projeto usa pacote X que depende de pacote Y. Atacante compromete conta do maintainer de Y no npm, publica Y@2.1.0 com código que exfiltra env variables. npm update instala automaticamente. Sem npm audit automatizado no CI, passa despercebido.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__9",
    tags: ["encryption-at-rest", "data-protection", "GDPR"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "Qual a diferença entre criptografia em trânsito e em repouso e quando cada uma é necessária?",
    options: [
      "Em trânsito (TLS): protege dados durante transmissão (rede). Em repouso (AES-256): protege dados armazenados (banco, disco, backups) — ambas necessárias para dados sensíveis e compliance (LGPD, GDPR)",
      "Criptografia em repouso é opcional — se o banco de dados tem autenticação forte, os dados armazenados já estão protegidos adequadamente",
      "TLS protege tanto dados em trânsito quanto em repouso — não é necessário criptografar o banco de dados se HTTPS está habilitado",
      "Criptografia em repouso é necessária apenas para dados financeiros — dados de usuários comuns como emails e nomes não precisam ser criptografados",
    ],
    correctIndex: 0,
    explanation:
      "Em trânsito: TLS protege contra interceptação na rede. Sem ele, Wi-Fi público expõe dados. Em repouso: se banco de dados é comprometido (backup roubado, acesso físico a disco), dados sem criptografia são legíveis imediatamente. AES-256 para dados em rest é padrão. Campo a campo (CPF, cartão): criptografia a nível de coluna. Backup criptografado: fundamental. LGPD/GDPR: exige proteção de dados pessoais — criptografia em repouso é requisito prático.",
    example:
      "Empresa armazena CPFs em texto plano. Banco de dados vaza por SQL injection. Todos os 2M de CPFs expostos imediatamente. Com criptografia por campo: atacante obtém apenas bytes ininteligíveis. Mesmo com o banco, sem a chave de criptografia, dados são inúteis.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Médio__10",
    tags: ["security-code-review", "SAST", "DAST", "DevSecOps"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Médio",
    question:
      "O que é DevSecOps e como integrar segurança no pipeline de CI/CD sem bloquear a velocidade de desenvolvimento?",
    options: [
      "Shift left de segurança: SAST no pre-commit, DAST no staging, SCA para dependências, secrets scanning automático — segurança como código, não gate manual no final",
      "DevSecOps significa ter um time de segurança dedicado que revisa todo código manualmente antes de cada release para garantir conformidade",
      "É uma prática exclusiva de grandes empresas com equipes de segurança — startups e times pequenos não têm recursos para implementar DevSecOps",
      "DevSecOps requer contratar especialistas em segurança para cada squad — times fullstack sem especialização em segurança não podem aplicar essa prática",
    ],
    correctIndex: 0,
    explanation:
      "Shift left: encontrar problemas cedo (mais barato corrigir). SAST (Static Analysis): analisa código sem executar — Semgrep, SonarQube, CodeQL. DAST (Dynamic Analysis): ataca aplicação rodando — OWASP ZAP, Burp Suite automated. SCA (Software Composition Analysis): vulnerabilidades em dependências — Snyk, Dependabot, npm audit. Secrets scanning: git-secrets, GitHub Secret Scanning. Pipeline: pre-commit → SAST → build → DAST em staging → deploy. Regra: falhas críticas bloqueiam pipeline, warnings viram tickets.",
    example:
      "Dev commita código com hardcoded API key → Git hook (Gitleaks) bloqueia o commit imediatamente. PR aberto → SAST detecta SQL injection potencial → comentário automático na linha do PR. Nenhum gatekeeper humano necessário, segurança embarcada no fluxo.",
  },

  // ── Difícil 4-7 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__4",
    tags: ["threat-modeling", "STRIDE", "security-architecture"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "O que é Threat Modeling com STRIDE e como aplicar na fase de design de software para identificar riscos antes de codar?",
    options: [
      "STRIDE categoriza ameaças: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege — analisa o sistema (data flow diagrams) para encontrar tratamentos preventivos",
      "STRIDE é um framework de testes de penetração executado após o deployment para identificar vulnerabilidades em sistemas já em produção",
      "Threat Modeling é feito exclusivamente por red teams externos — times de desenvolvimento não têm o viés necessário para modelar ameaças ao próprio código",
      "STRIDE é uma ferramenta automática que analisa o código-fonte e gera relatórios de vulnerabilidades sem necessidade de análise manual",
    ],
    correctIndex: 0,
    explanation:
      "Threat Modeling: 4 etapas. (1) Defina o escopo (o que você está protegendo?). (2) Desenhe DFDs (Data Flow Diagrams) — componentes, dados, trust boundaries. (3) Identifique ameaças com STRIDE: Spoofing (falsificação de identidade) → autenticação forte. Tampering (modificação de dados) → integridade/assinaturas. Repudiation (negar ações) → audit logs. Information Disclosure (exposição) → criptografia. DoS (indisponibilidade) → rate limiting. Elevation of Privilege (escalada) → RBAC/AuthZ. (4) Mitigações. Quando: design phase, muito mais barato que pós-desenvolvimento.",
    example:
      "Sistema de pagamentos no design: DFD mostra 'usuário → API → banco de dados'. Trust boundary: internet vs. rede interna. STRIDE na API: Tampering (interceptação de valor de transação) → solução: assinar o payload com HMAC. EoP (usuário comum virar admin) → RBAC rigoroso. Problemas identificados antes de uma linha de código.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__5",
    tags: ["zero-trust", "network-security", "identity"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "O que é a arquitetura Zero Trust e como ela difere do modelo de segurança perimetral tradicional?",
    options: [
      "'Never trust, always verify' — sem zona interna confiável; cada request é autenticado e autorizado independentemente da origem; micro-segmentação e acesso mínimo por padrão",
      "Zero Trust significa desabilitar toda forma de autenticação para eliminar pontos de falha — a segurança vem de criptografia de ponta a ponta exclusivamente",
      "É um modelo de segurança para startups sem infraestrutura existente — empresas com sistemas legados não conseguem implementar Zero Trust",
      "Zero Trust remove todos os firewalls e VPNs em favor de autenticação apenas de aplicação — simplifica a arquitetura de rede corporativa",
    ],
    correctIndex: 0,
    explanation:
      "Perimetral (castle and moat): rede interna = confiável. Problema: insider threat, lateral movement após breach. Zero Trust (NIST SP 800-207): identidade é o novo perimetro. Princípios: (1) Verificar sempre (MFA, device health). (2) Menor privilégio (acesso just-in-time, just-enough). (3) Assume breach (seja como se já estivesse comprometido). Implementação: Identity Provider (Okta, Azure AD), Service Mesh (mTLS entre microserviços), micro-segmentação de rede, continuous monitoring. Google BeyondCorp (2014) foi o pioneiro.",
    example:
      "Modelo antigo: dev na VPN tem acesso a todos os servidores internos. Zero Trust: mesmo na rede interna, dev precisa autenticar para cada serviço (MFA), autorização granular (só acessa ambientes onde tem permissão explícita), acesso temporário com expiração automática.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__6",
    tags: ["penetration-testing", "red-team", "security-assessment"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "Qual a diferença entre Penetration Testing, Red Team Exercise e Bug Bounty? Como estruturar um programa de segurança defensiva?",
    options: [
      "Pentest: escopo/tempo definido, metodologia estruturada (OWASP, PTES). Red Team: simulação realista de APT sem limitações de escopo. Bug Bounty: programa contínuo com hackers externos — camadas complementares de validação de segurança",
      "São termos sinônimos para o mesmo processo — a diferença está apenas no tamanho da empresa que contrata e no orçamento disponível",
      "Red Team é exclusivamente para segurança física (data centers, escritórios); Pentest e Bug Bounty cobrem apenas aspectos digitais",
      "Bug Bounty substitui completamente Pentest e Red Team — é mais eficiente pagar apenas por vulnerabilidades encontradas que contratar consultores",
    ],
    correctIndex: 0,
    explanation:
      "Pentest: contratado, escopo definido (ex: só API de pagamentos), prazo fixo (1-2 semanas), relatório estruturado com CVSS. Útil para: auditorias, compliance, avaliação de área específica. Red Team: simula adversário real (APT), sem aviso prévio ao time técnico, meses de duração, testa detecção além de prevenção. Bug Bounty (HackerOne, Bugcrowd): crowdsourcing contínuo, paga por resultado, escala com comunidade global. Estrutura: Pentest anual + Red Team bianual + Bug Bounty contínuo + DAST automatizado.",
    example:
      "Banco: Pentest anual verificou compliance PCI-DSS (escopo: sistemas de cartão). Red Team bianual: atacou sem aviso, comprometeu email de executivo, escalou para sistemas internos — detectado após 3 semanas, revelou gaps no SOC. Bug Bounty: pesquisador externo encontra IDOR crítico, recebe $5000.",
  },
  {
    id: "engenharia-de-software__Segurança no Desenvolvimento__Difícil__7",
    tags: ["cryptography", "PKI", "key-management"],
    track: "engenharia-de-software",
    category: "Segurança no Desenvolvimento",
    difficulty: "Difícil",
    question:
      "Como funciona a gestão segura de chaves criptográficas em aplicações de produção e quais erros críticos evitar?",
    options: [
      "Usar HSM ou KMS (AWS KMS, Azure Key Vault) para armazenar chaves, rotação automática periódica, envelope encryption, separação de chaves por ambiente e auditoria de acesso",
      "Gerar uma chave forte e armazená-la como variável de ambiente é suficiente para produção — rotação manual anual é uma boa prática adicional",
      "Chaves criptográficas devem ser hardcoded no código para garantir que nunca sejam perdidas ou alteradas acidentalmente por operadores",
      "Apenas algoritmos modernos como AES-256 importam — o método de armazenamento e gestão de chaves tem impacto mínimo na segurança real",
    ],
    correctIndex: 0,
    explanation:
      "Erros críticos: (1) Chave hardcoded no código (exposta no repo). (2) Mesma chave em todos os ambientes (dev/staging/prod). (3) Chave nunca rotacionada (se vazada, comprometimento é permanente). (4) Backup de chave sem proteção. Boas práticas: HSM (Hardware Security Module) para chaves críticas — chave nunca sai do hardware. KMS (gerenciado): AWS KMS, GCP Cloud KMS. Envelope encryption: DEK (Data Encryption Key) criptografada pela KEK (Key Encryption Key) no KMS. Rotação automática (anual para KMS, mais frequente para DEKs). Audit trail de quem usou qual chave quando.",
    example:
      "Envelope encryption: dado criptografado com DEK aleatória → DEK criptografada com KEK no KMS → só DEK criptografada armazenada com o dado. Para descriptografar: KMS é chamado para descriptografar DEK → DEK usada para descriptografar dado → DEK descartada. Mesmo acesso ao banco não expõe dados sem acesso ao KMS.",
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
