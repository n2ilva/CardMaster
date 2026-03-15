/**
 * Adiciona 20 cards de Autenticação e Autorização ao engenharia-de-software.json
 * (Fácil 5-10, Médio 4-10, Difícil 4-7)
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
  // ── Fácil 5-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__5",
    tags: ["SSO", "single-sign-on", "identity-provider"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "O que é Single Sign-On (SSO) e como beneficia usuários e empresas?",
    options: [
      "SSO permite que o usuário faça login uma única vez e acesse múltiplos sistemas sem reautenticar — centralizando identidade em um Identity Provider (IdP)",
      "SSO é um protocolo de segurança que exige login duplo em sistemas críticos — dois fatores de autenticação obrigatórios para cada aplicação da empresa",
      "SSO sincroniza senhas entre múltiplos sistemas — quando o usuário altera a senha em um sistema, é automaticamente atualizada em todos",
      "SSO é utilizado exclusivamente para autenticação em APIs REST — não é aplicável a aplicações web com interface gráfica de usuário"
    ],
    correctIndex: 0,
    explanation: "SSO: um login → acesso a N sistemas. Usuario autentica no Identity Provider (Okta, Azure AD, Google Workspace). IdP emite token/assertion. Sistemas confiam no IdP sem pedir senha novamente. Benefícios: melhor UX (menos logins), segurança centralizada (uma política de senha para todos), revogação central (desativar usuário desativa todos os acessos), auditoria única. Protocolos: SAML 2.0 (enterprise, XML-based), OIDC/OAuth2 (moderno, JSON/JWT). Risco: IdP é ponto único de falha — alta disponibilidade é crítica.",
    example: "Dev faz login no Okta de manhã. Acessa GitHub, Jira, Datadog, AWS Console — sem precisar digitar senha novamente. O dia todo, um único login. Ao sair da empresa: admin desativa conta no Okta → acesso revogado instantaneamente em todos os sistemas."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__6",
    tags: ["password-policy", "hashing", "credential-security"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "Quais são as boas práticas atuais de políticas de senha segundo o NIST SP 800-63B?",
    options: [
      "NIST 800-63B recomenda: mínimo 8 chars, sem rotação periódica forçada, sem regras de complexidade arbitrárias, verificar contra senhas comprometidas (Have I Been Pwned), permitir colar senhas",
      "NIST recomenda rotação mensal obrigatória de senhas com requisito de pelo menos 3 tipos de caracteres (maiúscula, número, símbolo) para máxima segurança",
      "A melhor política é exigir senhas de pelo menos 20 caracteres alfanuméricos sem símbolos — símbolos são difíceis de lembrar e não aumentam a segurança significativamente",
      "NIST não tem recomendações para políticas de senhas — cada empresa deve definir suas próprias baseadas nos requisitos regulatórios do setor"
    ],
    correctIndex: 0,
    explanation: "NIST 2017 atualizou completamente as recomendações: (1) Sem rotação periódica forçada — causa senhas fracas previsíveis ('Senha2024!' → 'Senha2025!'). Só rotacionar se houver evidência de comprometimento. (2) Sem regras arbitrárias de complexidade — causam senhas previsíveis e fáceis de esquecer. (3) Tamanho mínimo 8, máximo pelo menos 64 chars. (4) Verificar contra bancos de senhas comprometidas. (5) Não bloquear colar senha (impede uso de gerenciador de senhas). (6) Rate limiting em vez de lockout permanente.",
    example: "Política antiga: trocar senha a cada 30 dias, deve ter maiúscula+número+símbolo. Resultado: usuários usam 'Empresa123!', 'Empresa124!'. Política NIST: senha de 20 chars, nunca trocar a não ser se comprometida. Resultado: usuários usam 'meu-gato-fala-portugues' (muito mais forte)."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__7",
    tags: ["api-key", "authentication", "service-auth"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "O que são API Keys, quando usá-las e quais são suas limitações de segurança?",
    options: [
      "API Keys são tokens estáticos que identificam aplicações/serviços — simples de implementar mas sem expiração nativa, sem contexto de usuário e perigosas se expostas em código",
      "API Keys são a forma mais segura de autenticação disponível — são impossíveis de serem interceptadas por serem transmitidas apenas em headers HTTPS",
      "API Keys devem sempre ser incluídas como parâmetro na URL da query string para facilitar debugging e logging nos servidores web",
      "API Keys têm expiração automática de 24 horas por padrão na maioria dos serviços — após esse período, devem ser regeneradas pelo desenvolvedor"
    ],
    correctIndex: 0,
    explanation: "API Keys: string aleatória longa que identifica um cliente da API. Vantagens: simples, stateless, fácil de implementar. Limitações: (1) Estáticas por padrão — se comprometidas, requerem rotação manual. (2) Não carregam contexto de usuário (quem usou a key?). (3) Devs acidentalmente commitam no código/Git. (4) Sem escopos nativos (ou tem acesso total ou não tem). Boas práticas: transmitir em Header (Authorization: ApiKey XXX) nunca na URL, hashing no banco (armazenar hash, não o valor), escopos/permissões, rotação periódica, monitorar uso anômalo. Melhor para: autenticação M2M simples, integrações.",
    example: "Stripe API Key no código: 'sk_live_abc123'. Dev commita por acidente no GitHub público. Bots scanner detectam em <1 minuto. Conta comprometida. Solução: usar variáveis de ambiente, secret manager, nunca commitar a chave. Stripe nowDays envia alerta automático se key detectada no GitHub."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__8",
    tags: ["biometrics", "FIDO2", "passwordless"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "O que é autenticação sem senha (passwordless) e quais são as abordagens mais comuns?",
    options: [
      "Elimina senhas usando: magic links (email), TOTP sem senha (authenticator app), biometria (Face ID, fingerprint), passkeys (FIDO2/WebAuthn) — mais seguro pois não há senha para vazar",
      "Autenticação passwordless significa que o usuário define uma PIN numérica de 4 dígitos em vez de uma senha alfanumérica — mais simples e igualmente seguro",
      "Passwordless é exclusivo de aplicações mobile — aplicações web sempre precisam de senha como fator primário de autenticação por limitações do protocolo HTTP",
      "Magic links enviados por email são menos seguros que senhas tradicionais pois qualquer pessoa com acesso ao email pode logar na conta"
    ],
    correctIndex: 0,
    explanation: "Passwordless elimina o maior vetor de ataque: senhas reutilizadas/fracas/comprometidas em data breaches. Opções: (1) Magic link: email com link único expirado. (2) OTP sem senha: código por email/SMS. (3) Passkeys (FIDO2): chave criptográfica no dispositivo, biometria como verificação local — phishing-resistant. (4) Push notification: Duo, Microsoft Authenticator. Passkeys (Google, Apple, Microsoft): public key armazenada no servidor, private key no dispositivo (protegida por biometria/PIN). Phishing-resistant: usuário não digita nada que possa ser interceptado.",
    example: "Usuário visita site com passkeys. Clica 'Login'. Sistema pede biometria no dispositivo (Face ID). Dispositivo assina o challenge com a chave privada. Servidor valida com a chave pública cadastrada. Zero senha transmitida. Phishing impossível — chave privada nunca sai do dispositivo."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__9",
    tags: ["oauth-scopes", "permissions", "least-privilege"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "O que são OAuth 2.0 scopes e como implementam o princípio do menor privilégio em autorização de APIs?",
    options: [
      "Scopes definem as permissões específicas que um token autoriza — a aplicação solicita apenas os scopes necessários e o usuário vê e aprova exatamente o que será acessado",
      "Scopes são rótulos opcionais que identificam o ambiente de execução do token (development, staging, production) — não determinam permissões de acesso",
      "OAuth scopes são exclusivos para APIs públicas — sistemas internos não usam scopes pois a confiança entre serviços é assumida por padrão",
      "Todos os tokens OAuth têm os mesmos scopes por padrão — a customização de permissões é feita após a emissão do token pelo servidor de recursos"
    ],
    correctIndex: 0,
    explanation: "Scopes: granularidade de permissão. GitHub: 'repo:read' vs 'repo:write' vs 'delete_repo'. Google: 'email' vs 'profile' vs 'gmail.readonly'. Princípio mínimo privilégio: app de leitura de email pede apenas 'gmail.readonly' — não 'gmail.modify'. Usuário vê na tela de consentimento exatamente o que vai ser acessado. Access token carrega os scopes no payload. Resource server valida se o token tem o scope necessário para aquela operação. Solicitação de scopes excessivos → desconfiança do usuário → conversão baixa.",
    example: "App de calendário pede scopes: 'calendar.read', 'calendar.write'. Consentimento: 'Este app quer Ler e Editar seus eventos do Google Calendar'. Usuário aprova. Token emitido com esses dois scopes. App tenta deletar evento (requer 'calendar.delete' não solicitado) → 403 Forbidden. Escopo limitou o dano potencial."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Fácil__10",
    tags: ["session-management", "cookie-security", "httponly"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Fácil",
    question: "Como gerenciar sessões de forma segura em aplicações web usando cookies com as flags corretas?",
    options: [
      "Cookie de sessão deve ter: HttpOnly (JavaScript não lê), Secure (apenas HTTPS), SameSite=Strict/Lax (previne CSRF), Path e Domain específicos, expiração adequada",
      "Sessões seguras apenas exigem que o ID de sessão seja suficientemente longo — as flags do cookie são opcionais para aplicações com HTTPS habilitado",
      "Armazenar o token JWT no localStorage é mais seguro que cookies pois não é enviado automaticamente em todas as requisições como os cookies fazem",
      "SameSite=None é a configuração mais segura para cookies de sessão pois permite maior compatibilidade com diferentes origens de requisição"
    ],
    correctIndex: 0,
    explanation: "Flags de cookie essenciais: HttpOnly: JavaScript (document.cookie) não consegue ler → elimina XSS como vetor de roubo de sessão. Secure: cookie só enviado via HTTPS → interceptação impossível em HTTP. SameSite=Strict: cookie não enviado em requests cross-site → previne CSRF. SameSite=Lax: permite alguns cases de cross-site (ex: links de outros sites). SameSite=None (necessita Secure): para aplicações cross-site legítimas. Expiração: sessão com expiração absoluta + sliding expiration. ID de sessão: cryptographically random, mínimo 128 bits.",
    example: "Set-Cookie: session_id=abc; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600. Ataque XSS injeta script na página → document.cookie retorna '' (HttpOnly). Tentativa de CSRF via form cross-site → browser não envia cookie (SameSite=Lax). Dois vetores eliminados com 3 flags."
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__4",
    tags: ["ABAC", "PBAC", "policy-based"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "Qual a diferença entre RBAC (Role-Based) e ABAC (Attribute-Based Access Control) e quando cada um é mais adequado?",
    options: [
      "RBAC: acesso baseado em roles fixos (admin, editor). ABAC: acesso baseado em atributos dinâmicos (usuário.departamento, recurso.classificação, contexto.horário) — ABAC é mais flexível mas mais complexo de implementar",
      "ABAC é simplesmente uma versão mais avançada do RBAC que usa múltiplos roles ao mesmo tempo — a diferença é apenas de quantidade de roles por usuário",
      "RBAC é usado para APIs públicas e ABAC para sistemas internos — a escolha é determinada pelo tipo de cliente (externo vs. interno) não pelo modelo de permissão",
      "ABAC requer que cada usuário tenha pelo menos um atributo 'role' que funciona exatamente como no RBAC — são equivalentes na prática"
    ],
    correctIndex: 0,
    explanation: "RBAC: usuário tem roles → roles têm permissões. Simples, legível, padrão para maioria dos sistemas. Limitação: roles explodem com regras específicas ('gerente_sul_leitura_contratos_menores_10k'). ABAC (XACML, OPA): policy avalia múltiplos atributos. Ex: user.department='RH' AND resource.type='contrato' AND resource.value<10000 AND context.time='08:00-18:00' → ALLOW. Open Policy Agent (OPA): escreve policies em Rego, avalia qualquer JSON. Quando ABAC: regras contextuais complexas, compliance, multi-tenancy granular.",
    example: "Healthcare: médico só pode ver prontuário de pacientes que estão internados no departamento onde trabalha durante seu turno. RBAC: impossível sem explosão de roles. ABAC: policy = user.role=médico AND patient.department=user.department AND patient.status=internado AND context.shift=user.current_shift. 4 atributos em uma policy."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__5",
    tags: ["service-to-service", "mTLS", "client-credentials"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "Como implementar autenticação segura entre microserviços (service-to-service) sem credenciais de usuário?",
    options: [
      "OAuth2 Client Credentials Flow: serviço autentica com client_id/secret no Authorization Server e recebe access token para chamar APIs. Alternativa: mTLS com certificados de cliente entre serviços",
      "Microserviços dentro da mesma rede privada não precisam de autenticação entre si — a segurança de rede (VPC, firewall) é suficiente para garantir confiança",
      "Serviços devem reutilizar o token JWT do usuário para chamadas entre si — isso garante rastreabilidade e elimina a necessidade de credenciais separadas",
      "A melhor prática é usar um API key estático compartilhado entre todos os microserviços — facilita o debugging e é seguro em redes privadas"
    ],
    correctIndex: 0,
    explanation: "Client Credentials Flow: sem usuário envolvido. Serviço A POST /token {grant_type: client_credentials, client_id, client_secret} → Authorization Server emite access token. Serviço A chama Serviço B com Bearer token. B valida com o Auth Server. Rotação automática via token de curta duração. mTLS: ambos os lados apresentam certificado TLS. Vantagem: identidade forte sem shared secrets. Service Mesh (Istio/Linkerd): mTLS automático entre todos os pods sem código adicional. Spiffe/SPIRE: identidade criptográfica baseada em workload identity.",
    example: "Payment Service chama Fraud Service. Client Credentials: Payment obtém token com scope 'fraud:check' a cada 5 minutos. Fraud Service valida que o token é do Payment Service com esse scope. Se Payment Service for comprometido, atacante tem token por no máximo 5 minutos antes de expirar."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__6",
    tags: ["token-introspection", "token-revocation", "opaque-tokens"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "Qual a diferença entre tokens opacos (opaque tokens) e tokens auto-contidos (JWT) para autorização de APIs?",
    options: [
      "Opaque: referência aleatória validada pelo Auth Server via introspection (stateful, pode ser revogado instantaneamente). JWT: auto-contido (claims embutidos, validação local sem chamada remota), mas difícil de revogar antes da expiração",
      "Tokens opacos são mais seguros pois são criptografados — JWTs são apenas codificados em Base64 e podem ser lidos por qualquer pessoa que os intercepte",
      "JWT e opaque tokens são equivalentes em segurança — a única diferença é que JWTs são maiores e causam mais overhead de rede em APIs com muitas requisições",
      "Tokens opacos só funcionam em sistemas monolíticos — microserviços devem sempre usar JWT pois introspection cria dependência centralizada inaceitável"
    ],
    correctIndex: 0,
    explanation: "JWT: Header.Payload.Signature. Payload com claims (sub, exp, roles). Resource Server valida assinatura localmente — sem chamada ao Auth Server. Rápido, mas: revogação = esperar expirar (problema para logout ou account takeover). Mitigação: token curto (15 min) + refresh token. Opaque: string aleatória. Resource Server valida via OAuth2 introspection endpoint POST /introspect → recebe JSON com {active, sub, scope, exp}. Vantagem: revogação instantânea. Custo: chamada de rede em cada requisição (cache de curta duração mitiga). Escolha: JWTs para APIs internas de alto volume; opaque para auth crítica com revogação necessária.",
    example: "Banco: usuário reporta roubo de dispositivo. Com JWT: token com 60min de expiração → atacante tem até 60 min após revogação para usar. Com opaque: Auth Server marca token como inactive → próxima requisição com introspection retorna {active: false} → 403 imediato."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__7",
    tags: ["delegation", "impersonation", "on-behalf-of"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "Como implementar delegação de autorização (on-behalf-of flow) em arquiteturas de microserviços com múltiplas camadas?",
    options: [
      "OAuth2 Token Exchange (RFC 8693): Service A recebe token do usuário, troca por um token 'actor' para chamar Service B em nome do usuário — propaga identidade mantendo auditoria de quem fez o quê",
      "Delegação em microserviços é feita passando o username e role do usuário como headers HTTP entre serviços — simples e eficiente pois evita overhead de tokens",
      "Service A deve compartilhar sua client_secret com Service B para que B possa gerar tokens independentes com a mesma identidade do usuário",
      "On-behalf-of requer que o usuário faça login novamente em cada microserviço da cadeia — é a única forma segura de propagar identidade em sistemas distribuídos"
    ],
    correctIndex: 0,
    explanation: "Problemas de passar o token do usuário diretamente para B: (1) B não deveria ter acesso ao token original (escopo excessivo). (2) Cadeia de chamadas A→B→C→D: quem originou? Token Exchange (RFC 8693 / Azure AD OBO): A recebe user token. A chama Auth Server: POST /token {grant_type: urn:ietf:params:oauth:grant-type:token-exchange, subject_token: user_token, actor_token: service_a_token}. Novo token emitido para A agindo em nome do usuário mas com escopo limitado para chamar B. Auditoria: claims 'act' (actor) e 'sub' (original user) no token.",
    example: "Usuário → API Gateway → Order Service → Inventory Service. Order Service usa Token Exchange: troca token do usuário por token 'Order Service in behalf of User X' com scope limitado 'inventory:read'. Inventory Service vê quem é o ator (Order Service) E o usuário original. Auditoria completa."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__8",
    tags: ["SAML", "federation", "enterprise-sso"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "Como o protocolo SAML 2.0 funciona para federação de identidade em ambientes enterprise e como diferencia do OIDC?",
    options: [
      "SAML 2.0: XML-based, Service Provider redireciona para IdP, IdP retorna XML assertion assinado, SP valida assinatura. OIDC: JSON/JWT-based, mais simples, adequado para apps modernas e mobile",
      "SAML 2.0 e OIDC são protocolos equivalentes em todos os aspectos — a diferença é apenas que SAML usa XML e OIDC usa JSON, sem impacto funcional",
      "SAML é exclusivo para autenticação entre empresas diferentes (B2B federation) enquanto OIDC é usado apenas para autenticação de consumidores (B2C)",
      "OIDC é uma versão modernizada do SAML que o substituiu completamente — sistemas novos não precisam suportar SAML pois está em processo de depreciação"
    ],
    correctIndex: 0,
    explanation: "SAML 2.0 (2005, OASIS): SP-Initiated: usuario → SP → redirect para IdP → IdP autentica → redirect com XML assertion assinado → SP valida → acesso. XML com atributos do usuário. Forte em: enterprise legacy, applications antigas, regulamentações que exigem SAML. Problemas: XML complexo, difícil para mobile/SPA. OIDC (2014, OAuth2 extension): adiciona ID Token (JWT) ao OAuth2. UserInfo endpoint para atributos. Discovery document (/.well-known/openid-configuration). Mais simples para devs modernos. Maioria dos Identity Providers suportam ambos (Okta, Azure AD, Auth0).",
    example: "Empresa de 10k funcionários com Active Directory. Sistema legado de RH usa SAML (integração direta com ADFS da Microsoft). Novo portal web usa OIDC (mais simples de implementar). Mesmo Azure AD serve os dois protocolos para a mesma base de usuários."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__9",
    tags: ["authorization-patterns", "ReBAC", "relationship-based"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "O que é ReBAC (Relationship-Based Access Control) e como o Google Zanzibar o implementa para autorização em grande escala?",
    options: [
      "ReBAC define permissões por relacionamentos entre entidades (usuário is editor OF documento). Zanzibar: tuples (user, relation, object) armazenados distribuídamente com consistência eventual e checagens em O(1) por namespace",
      "ReBAC é uma extensão do RBAC onde roles podem ter relacionamentos hierárquicos (admin herda todas as permissões de editor) — implementado diretamente no banco relacional",
      "Google Zanzibar é um banco de dados de autenticação que armazena senhas de todos os produtos Google de forma centralizada e segura",
      "ReBAC requer que todas as permissões sejam verificadas no cliente (browser/app) antes de chamar o servidor — reduz latência de autorização eliminando chamadas de rede"
    ],
    correctIndex: 0,
    explanation: "Google Zanzibar (2019 paper): sistema de autorização global do Google (Drive, YouTube, Maps). Modelo: tuples (user:alice, relation:editor, object:document:readme.md). Grupos: (user:*#member, relation:viewer, object:folder:x) → herança. Check: alice pode editor readme.md? → lookup tuple → yes. Escala: trilhões de ACL tuples, 10M+ QPS, latência <1ms P95. Implementações open source: OpenFGA (Auth0), SpiceDB (Authzed), Keto (Ory). Ideal: Google Docs-style sharing (compartilhamento granular por usuário, grupo, hierarquia de pastas).",
    example: "Google Docs: Alice compartilha 'relatorio.pdf' com Bob como 'editor' e com 'time-marketing' como 'viewer'. Zanzibar tuples: (alice, owner, doc:relatorio), (bob, editor, doc:relatorio), (group:marketing, viewer, doc:relatorio). Check Bob pode editar: found tuple bob-editor-doc:relatorio → ALLOW."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Médio__10",
    tags: ["device-trust", "conditional-access", "context-aware"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Médio",
    question: "O que é Context-Aware Access (acesso condicional) e como fatores como dispositivo, localização e comportamento afetam decisões de autorização?",
    options: [
      "Políticas que combinam identidade com contexto: dispositivo gerenciado, localização geográfica, IP corporativo, horário, comportamento anômalo — negando ou exigindo MFA adicional quando contexto é suspeito",
      "Context-Aware Access significa que o usuário pode mudar as permissões de sua própria conta com base no contexto em que está trabalhando",
      "É exclusivo para autenticação mobile — em aplicações desktop, o contexto de acesso não pode ser determinado com precisão suficiente para ser utilizado",
      "Context-Aware Access substitui completamente o MFA — se o dispositivo é confiável, nenhuma forma adicional de autenticação é necessária"
    ],
    correctIndex: 0,
    explanation: "Zero Trust + context: cada acesso é avaliado por múltiplos sinais. Google BeyondCorp: acesso baseado em device trust level + user identity + request context. Microsoft Conditional Access: if (user in 'risky-users' OR device == 'unmanaged' OR location == 'unusual-country') require MFA OR block. Sinais avaliados: Device compliance (patch level, encryption, MDM enrollment), localização (geolocation, IP reputation), hora do dia (acesso às 3h no domingo é suspeito), velocidade impossível (login NY, depois login Tokyo 1h depois). Continuous evaluation: acesso verificado durante toda a sessão, não apenas no login.",
    example: "Funcionário em home office (IP residencial, dispositivo pessoal não-gerenciado) tenta acessar sistema HR: Conditional Access policy requer MFA adicional + limita funcionalidades (só leitura). Mesmo funcionário no escritório (IP corporativo, laptop gerenciado): acesso completo sem MFA adicional — contexto de baixo risco."
  },

  // ── Difícil 4-7 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__4",
    tags: ["WebAuthn", "FIDO2", "passkeys-implementation"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "Como WebAuthn/FIDO2 funciona criptograficamente e por que é resistente a phishing diferente de TOTP e SMS?",
    options: [
      "WebAuthn usa criptografia de chave pública vinculada ao domínio (origin binding): chave privada nunca sai do authenticator, desafio inclui o domínio atual — phishing de domínio diferente usa chave diferente, desafio falha automaticamente",
      "WebAuthn é mais seguro que TOTP pois usa tokens de maior entropia (256 bits) em vez dos 6 dígitos do Google Authenticator que podem ser adivinhados por brute force",
      "A resistência a phishing do FIDO2 vem de um servidor de lista negra de domínios maliciosos que é consultado antes de cada autenticação",
      "WebAuthn executa autenticação exclusivamente no servidor sem envolver o dispositivo do usuário — isso elimina o risco de phishing pois o dispositivo não é vetor de ataque"
    ],
    correctIndex: 0,
    explanation: "WebAuthn flow: (1) Servidor envia challenge + relying party ID (domínio). (2) Browser verifica: current origin === RP ID? Se não → abort. (3) Authenticator assina {challenge, rpID, origin, ...} com chave privada vinculada a esse RP. (4) Servidor verifica assinatura com chave pública. Phishing resistance: site-evil.com tenta emular bank.com. Browser detecta origin mismatch: expected rpID='bank.com', atual='/evil.com' → autenticação bloqueada. TOTP: código de 6 dígitos é digitável em qualquer site — phishing captura o código válido por 30s. SMS: interceptável por SIM swap. Chave privada FIDO2: nunca sai do dispositivo, vinculada ao domínio.",
    example: "Usuário recebe email phishing com link para 'bank-security-update.com'. No site falso, tenta login. Browser gera WebAuthn assertion com rpID='bank-security-update.com'. Authenticator recusa: chave registrada é para rpID='bank.com', não para esse domínio. Login falha. Phishing completamente ineficaz."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__5",
    tags: ["PAM", "privileged-access", "just-in-time"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "O que é Privileged Access Management (PAM) e como Just-In-Time (JIT) provisioning reduz a superfície de ataque de contas privilegiadas?",
    options: [
      "PAM gerencia contas com acesso elevado (root, DBA, admin de cloud) com checkout de credenciais, gravação de sessão e auditoria. JIT: acesso concedido apenas pelo tempo necessário, revogado automaticamente após — zero standing privileges",
      "PAM é sinônimo de gerenciador de senhas corporativo (LastPass, 1Password) que armazena as senhas de todos os administradores da empresa em um vault centralizado",
      "JIT provisioning significa criar novas contas de usuário automaticamente no Active Directory quando um funcionário é admitido — otimiza o processo de onboarding de RH",
      "PAM é relevante apenas para empresas com mais de 1000 funcionários — pequenas empresas não precisam de controles especiais para contas administrativas"
    ],
    correctIndex: 0,
    explanation: "Standing privileges: conta admin sempre com acesso elevado. Risco: comprometimento = acesso permanente total. PAM (CyberArk, BeyondTrust, HashiCorp Vault Enterprise): senha de raiz armazenada no vault, rotacionada automática após uso → admin não sabe a senha atual. Session recording: cada ação de admin gravada para auditoria/compliance. JIT Azure PIM / AWS IAM Identity Center: dev solicita acesso elevado → aprovação (manual ou automática) → acesso concedido por 2h → revogado automaticamente. Zero standing privileges: ninguém tem acesso permanente, solicita quando precisa, janela de exposição mínima.",
    example: "DBA precisa fazer manutenção emergencial. Solicita acesso privilegiado ao database com justificativa 'Incidente #4521'. PAM libera por 1 hora com sessão gravada. DBA acessa, corrige o problema. Após 1 hora: acesso revogado automaticamente. Auditoria: quem acessou, quando, quais comandos executou."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__6",
    tags: ["distributed-session", "token-binding", "session-fixation"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "Quais são as vulnerabilidades avançadas de gerenciamento de sessão (session fixation, session hijacking, CSRF) e como defesas arquiteturais as mitigam?",
    options: [
      "Session fixation: atacante define session ID antes do login → após login, usa o mesmo ID. Mitigation: gerar novo session ID após autenticação. Session hijacking: roubo do session token. Mitigation: HttpOnly+Secure+SameSite, rotação de sessão, validação de User-Agent/IP. CSRF: SameSite cookies + CSRF tokens double-submit",
      "Session fixation é impossível em aplicações que usam HTTPS — a criptografia do protocolo TLS garante que o session ID não pode ser manipulado antes do login",
      "A única defesa necessária contra session hijacking é usar tokens muito longos (>512 bits) — tamanho do session ID é o único fator de segurança relevante",
      "CSRF é um problema obsoleto em 2024 — todos os browsers modernos implementam proteção automatica contra CSRF sem necessidade de configuração do desenvolvedor"
    ],
    correctIndex: 0,
    explanation: "Session fixation attack: (1) Atacante visita o site, obtém session ID. (2) Envia link para vítima com session ID fixo. (3) Vítima faz login usando o session ID já conhecido pelo atacante. (4) Atacante usa o mesmo ID como usuário autenticado. Defesa: regenerate session ID após login bem-sucedido. Session hijacking: XSS rouba cookie (HttpOnly previne), MITM (Secure previne), network sniffing. Double-submit CSRF: cookie CSRF + header/hidden field com mesmo valor — server valida que ambos conferem (cross-site não consegue ler o cookie para duplicar no form).",
    example: "Express.js: req.session.regenerate() após login bem-sucedido. Novo session ID gerado → atacante com ID fixado pré-login fica com ID inválido. Cookie com HttpOnly+Secure+SameSite=Strict. CORS configurado corretamente. CSRF token em formulários sensíveis. Múltiplas camadas de defesa."
  },
  {
    id: "engenharia-de-software__Autenticação e Autorização__Difícil__7",
    tags: ["identity-federation", "cross-domain", "trust-chain"],
    track: "engenharia-de-software",
    category: "Autenticação e Autorização",
    difficulty: "Difícil",
    question: "Como implementar federação de identidade entre organizações diferentes (partner federation, B2B) com garantias de segurança adequadas?",
    options: [
      "Estabelecer trust entre Identity Providers via SAML metadata exchange ou OIDC federation, com mapeamento de claims entre organizações, attribute filtering e controle de quais atributos são compartilhados cross-organization",
      "B2B federation requer que as duas organizações compartilhem o mesmo banco de dados de usuários — sincronização via LDAP é o único método aceito para ambientes enterprise",
      "Federação entre organizações é feita criando uma conta duplicada no sistema da empresa parceira — cada usuário tem duas contas independentes gerenciadas separadamente",
      "OIDC não suporta federação B2B — apenas SAML 2.0 é tecnicamente capaz de federar identidades entre diferentes organizações e domínios"
    ],
    correctIndex: 0,
    explanation: "B2B federation: Empresa A confia no IdP da Empresa B para autenticar usuários de B que precisam acessar sistemas de A. SAML: troca de SAML metadata (EntityID, certificado de assinatura, endpoints). Identity mapping: partner-user@companyB → permissions no sistema de A. OIDC federation (emerging): IdP A confia em IdP B via OIDC issuer discovery. Attribute filtering: só compartilhar email e grupode trabalho — não CPF, salário. Claims transformation: role 'engineer' em B mapeia para role 'developer' em A. Trust chain: cada organização mantém sua própria lista de parceiros confiáveis. Revogação: remover trust da metadata de B revoga acesso de todos os usuários de B imediatamente.",
    example: "Empresa A e Empresa B em joint venture. Projeto comum usa ferramentas da Empresa A. SAML federation: A adiciona metadata do IdP de B como trusted IdP. Bob@B.com faz login usando credenciais do IdP de B. A recebe assertion: NameID=bob@b.com, groups=[project-x-team]. Bob acessa com permissões mapeadas. Quando contrato termina: A remove trust do IdP de B → todos os usuários de B perdem acesso instantaneamente."
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
