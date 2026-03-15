/**
 * Adiciona 3 cards Difícil (8-10) de Docker e Containers
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
    id: "engenharia-de-software__Docker e Containers__Difícil__8",
    tags: ["sigstore", "cosign", "supply-chain"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "O que é assinatura de imagens com Cosign/Sigstore e como ela protege a cadeia de suprimentos de software?",
    options: [
      "Assina criptograficamente imagens Docker com chaves ECDSA e registra em log imutável (Rekor); garante que apenas imagens do pipeline oficial cheguem a produção",
      "Criptografa o conteúdo das layers da imagem para evitar extração de segredos por inspetores de imagem",
      "Processo de verificação de checksum MD5 entre push e pull para detectar corrupção de dados em trânsito",
      "Mecanismo de autenticação mútua entre Docker Daemon e o registry usando certificados TLS rotativos",
    ],
    correctIndex: 0,
    explanation:
      "Problema: se um atacante comprometer o registry ou CI/CD, pode substituir imagens. Cosign assina imagens com chave privada após o build. Política de admissão (Kyverno/OPA Gatekeeper) no Kubernetes rejeita imagens sem assinatura válida. Keyless signing (OIDC): usa identidade do CI/CD (GitHub Actions, GitLab) como prova — sem gerenciar chaves. O log Rekor é append-only, auditável publicamente.",
    example:
      "cosign sign --key cosign.key ghcr.io/org/app:v1.0 após o build. No cluster Kubernetes, Kyverno policy: 'rejeitar pods com imagens não assinadas por org/app'. Atacante que substitui imagem no registry não tem a chave privada — push é rejeitado no deploy.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__9",
    tags: ["OCI", "buildkit", "build-cache"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "Como o BuildKit melhora o sistema de build do Docker e quais recursos avançados ele oferece?",
    options: [
      "Build paralelo de stages independentes, cache semântico exportável (S3/registry), mount secrets sem vazar em layers, e build para múltiplas arquiteturas (--platform)",
      "Substitui completamente o Dockerfile por um formato YAML declarativo com validação de schema integrada",
      "Garante reproducibilidade total de builds usando hashes criptográficos de todas as instruções e dependências",
      "Comprime layers automaticamente com Zstandard durante o build, reduzindo tamanho de imagem em 60-70%",
    ],
    correctIndex: 0,
    explanation:
      "BuildKit (padrão desde Docker 23): (1) Paralelismo: stages independentes de multi-stage build rodam simultaneamente. (2) Cache avançado: --cache-from registry:tag importa cache de builds anteriores no CI. (3) RUN --mount=type=secret: passa segredo sem criar layer (ex: tokens npm). (4) RUN --mount=type=cache: monta cache persistente (ex: ~/.cache/pip). (5) --platform linux/amd64,linux/arm64: build multi-arch. (6) Buildx + QEMU: cross-compile para ARM no x86.",
    example:
      "Dockerfile com --mount=type=secret,id=npmrc,target=/root/.npmrc para instalar pacotes privados: o token NPM nunca aparece em docker history. CI: docker buildx build --cache-from type=registry,ref=ECR:cache --cache-to type=registry,ref=ECR:cache .",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__10",
    tags: ["rootless", "user-namespace", "privilege-escalation"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "O que é rootless Docker e como ele mitiga riscos de privilege escalation comparado ao modo root padrão?",
    options: [
      "Docker daemon e containers executam sem privilégios root no host via user namespaces; break do container não resulta em root do host",
      "Modo onde o processo dentro do container sempre é forçado a rodar como USER nobody, independente do Dockerfile",
      "Configuração de seccomp que bloqueia todas as syscalls de mudança de privilégio mesmo para o processo root do container",
      "Feature que remove automaticamente capabilities Linux SETUID/SETGID de todos os binários das imagens durante o build",
    ],
    correctIndex: 0,
    explanation:
      "Padrão: Docker daemon roda como root. Um exploit no daemon = root no host. Rootless Docker: daemon e containers rodam com UID do usuário comum via user namespaces (UID 1000 do host mapeado como root dentro do namespace). Limitações: algumas features de rede não disponíveis (portas < 1024 sem workaround), performance de I/O ligeiramente menor. Kubernetes rootless: Usernetes ou containerd com user namespace. Combinado com seccomp/AppArmor é a abordagem mais segura.",
    example:
      "Rootless: `dockerd-rootless-setuptool.sh install` configura daemon como usuário comum. Mesmo que atacante escape do container, ele tem apenas as permissões do usuário Linux comum — não root do sistema.",
  },
];

data.push(...newCards);
writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

const cat = data.filter((c: any) => c.category === "Docker e Containers");
console.log("Docker e Containers: total=" + cat.length);
console.log(
  "F:" +
    cat.filter((c: any) => c.difficulty === "Fácil").length +
    " M:" +
    cat.filter((c: any) => c.difficulty === "Médio").length +
    " D:" +
    cat.filter((c: any) => c.difficulty === "Difícil").length,
);
console.log("Total engenharia-de-software.json:", data.length);
