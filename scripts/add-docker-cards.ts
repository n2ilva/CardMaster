/**
 * Adiciona 20 cards de Docker e Containers ao engenharia-de-software.json
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
    id: "engenharia-de-software__Docker e Containers__Fácil__5",
    tags: ["docker-hub", "registry", "image"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question: "O que é o Docker Hub e qual sua função no ecossistema Docker?",
    options: [
      "Registro público de imagens Docker onde você pode baixar imagens oficiais e publicar as suas",
      "Ferramenta de orquestração de containers similar ao Kubernetes da própria Docker Inc.",
      "Dashboard web para monitorar containers rodando em produção em tempo real",
      "CLI alternativa ao docker que oferece comandos simplificados para iniciantes",
    ],
    correctIndex: 0,
    explanation:
      "Docker Hub é o registro padrão de imagens Docker. Oferece imagens oficiais (nginx, postgres, node, python) verificadas pela comunidade, imagens de publishers verificados, e repositórios privados. Ao rodar `docker pull nginx`, o Docker busca automaticamente no Docker Hub. Alternativas privadas: Amazon ECR, Google Artifact Registry, GitHub Container Registry.",
    example:
      "docker pull node:20-alpine — baixa imagem oficial do Node.js versão 20 baseada em Alpine Linux (~50MB vs 900MB da versão full). docker push meuusuario/minha-app:1.0 — publica sua imagem para compartilhar com o time.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Fácil__6",
    tags: ["container", "image", "difference"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question: "Qual a diferença entre uma imagem Docker e um container Docker?",
    options: [
      "Imagem é o template estático (read-only) com o código e dependências; container é a instância rodando da imagem (processo em execução)",
      "Imagem é o container em execução salvo em disco; container é a imagem após ser compilada pelo Docker daemon",
      "Imagem é usada apenas em desenvolvimento; container é o equivalente de produção com variáveis de ambiente configuradas",
      "Imagem e container são sinônimos — a distinção é apenas semântica na documentação do Docker",
    ],
    correctIndex: 0,
    explanation:
      "Analogia: imagem é a receita/molde (classe), container é o produto em execução (instância). Uma mesma imagem pode gerar N containers simultâneos. Containers adicionam uma camada de escrita sobre a imagem read-only. Ao remover o container, as escritas são perdidas; a imagem permanece intacta.",
    example:
      "docker run -d --name app1 nginx e docker run -d --name app2 nginx — dois containers rodando a partir da mesma imagem nginx. app1 e app2 são independentes: o que acontece em um não afeta o outro nem a imagem original.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Fácil__7",
    tags: ["port-mapping", "expose", "networking"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question:
      "Como funciona o mapeamento de portas no Docker (-p) e por que é necessário?",
    options: [
      "Mapeia porta do host para porta do container (host:container), pois containers têm rede isolada e não são acessíveis externamente sem isso",
      "Expõe a porta do container para outros containers na mesma rede, sem necessidade de especificar porta do host",
      "Reserva a porta no firewall do sistema operacional para uso exclusivo do container especificado",
      "Define a porta que o container usa internamente; sem -p o container usa porta aleatória automaticamente",
    ],
    correctIndex: 0,
    explanation:
      "Containers são isolados por rede. Sem -p, mesmo que o app escute na porta 3000 dentro do container, ninguém de fora consegue acessar. O flag -p 8080:3000 faz: requisições na porta 8080 do host são redirecionadas para porta 3000 do container. Múltiplos containers da mesma imagem podem rodar com portas do host diferentes (-p 8081:3000, -p 8082:3000).",
    example:
      "docker run -p 8080:80 nginx — site nginx acessível em localhost:8080 no host. O container escuta internamente na 80, mas você acessa pela 8080. Útil para rodar múltiplas apps sem conflito de porta.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Fácil__8",
    tags: ["env", "environment-variables", "config"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question:
      "Como passar variáveis de ambiente para um container Docker e por que isso é uma boa prática?",
    options: [
      "Via -e ou --env-file; separa configuração do código (12-factor app), permitindo a mesma imagem em dev/staging/prod",
      "Via camada extra no Dockerfile com ARG; as variáveis ficam embutidas na imagem e imutáveis após o build",
      "Via volumes montados em /etc/environment; o container lê automaticamente ao iniciar sem configuração extra",
      "Via labels no Dockerfile; as labels são lidas pelo entrypoint do container antes de iniciar a aplicação",
    ],
    correctIndex: 0,
    explanation:
      "12-factor app: configuração pertence ao ambiente, não ao código. Com Docker: -e DATABASE_URL=postgres://... injeta na execução. --env-file .env lê arquivo de variáveis. Assim, a mesma imagem roda em dev (banco local) e prod (banco cloud) sem rebuild. NUNCA embutir segredos na imagem — eles ficam visíveis no `docker history`.",
    example:
      "docker run -e NODE_ENV=production -e DB_HOST=prod-db.exemplo.com minha-app:latest — mesma imagem, configuração diferente. Em dev: -e NODE_ENV=development -e DB_HOST=localhost.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Fácil__9",
    tags: ["docker-exec", "inspect", "logs"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question:
      "Quais comandos Docker são usados para inspecionar e debugar containers em execução?",
    options: [
      "docker logs (ver saída), docker exec -it (entrar no container), docker inspect (metadados JSON), docker stats (uso de recursos)",
      "docker debug, docker trace, docker monitor e docker analyze são os comandos padrão de diagnóstico",
      "docker ps --verbose lista todo o estado interno; docker check valida a saúde do container automaticamente",
      "Somente docker status fornece informações completas; os outros comandos são apenas para criação e remoção",
    ],
    correctIndex: 0,
    explanation:
      "`docker logs meu-container` — stdout/stderr do processo. `docker exec -it meu-container sh` — abre shell interativo dentro do container. `docker inspect meu-container` — JSON com toda configuração (IPs, volumes, env vars). `docker stats` — CPU/memória/rede em tempo real. `docker top meu-container` — processos rodando dentro.",
    example:
      "App crashando silenciosamente: docker logs app --tail 50 -f mostra os últimos 50 logs em modo follow. Para investigar: docker exec -it app sh e checar arquivos de config, conexões de rede com curl, etc.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Fácil__10",
    tags: [".dockerignore", "build-context", "optimization"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Fácil",
    question:
      "O que é o .dockerignore e qual seu impacto no processo de build?",
    options: [
      "Arquivo que exclui arquivos do build context enviado ao Docker daemon, reduzindo tamanho e evitando que node_modules/segredos entrem na imagem",
      "Arquivo de configuração que define quais instruções do Dockerfile devem ser ignoradas em ambientes de produção",
      "Lista de imagens base que não devem ser usadas por questões de segurança ou compatibilidade",
      "Cache de camadas Docker que o daemon ignora para forçar rebuild completo das instruções COPY e ADD",
    ],
    correctIndex: 0,
    explanation:
      "O build context é enviado inteiro ao Docker daemon antes do build. Sem .dockerignore, node_modules (200MB+), .git, .env e arquivos de teste vão junto, tornando o build lento. O .dockerignore funciona como .gitignore: lista padrões de exclusão. Resultado: build mais rápido, imagem menor, sem vazar segredos (.env) acidentalmente.",
    example:
      ".dockerignore típico: node_modules/, .git/, .env, *.log, dist/, coverage/. Reduz build context de 500MB para 2MB e evita que variáveis de dev entrem na imagem de produção.",
  },

  // ── Médio 4-10 ──────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Docker e Containers__Médio__4",
    tags: ["kubernetes", "orchestration", "pods"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "O que é Kubernetes e quais problemas ele resolve que o Docker Compose não resolve?",
    options: [
      "Orquestrador de containers em escala: auto-healing, autoscaling, rolling updates, service discovery e gestão multi-nó em produção",
      "Versão empresarial do Docker com suporte comercial, interface gráfica e integração com Active Directory",
      "Ferramenta de monitoramento de containers que substitui Prometheus/Grafana com dashboards built-in",
      "Sistema de build de imagens que otimiza camadas automaticamente, gerando imagens menores que o Docker padrão",
    ],
    correctIndex: 0,
    explanation:
      "Docker Compose é para desenvolvimento local (single host). Kubernetes resolve produção em escala: distribui containers em múltiplos nós, reinicia containers que morrem (auto-healing), escala horizontal via HPA, faz rolling updates sem downtime, e tem service discovery embutido (DNS interno). Abstrações: Pod (1+ containers), Deployment (gerencia pods), Service (networking), Ingress (HTTP externo).",
    example:
      "App com 20 instâncias em 5 nós: uma VM morre às 3h. Kubernetes detecta em segundos, recria os pods no nó com mais recursos disponíveis — sem intervenção humana. Docker Compose não têm essa capacidade.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__5",
    tags: ["volumes", "bind-mount", "tmpfs"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "Quais são os tipos de armazenamento do Docker (volume, bind mount, tmpfs) e quando usar cada um?",
    options: [
      "Volume: gerenciado pelo Docker (dados persistentes em produção). Bind mount: mapeia diretório do host (dev, código-fonte). tmpfs: memória RAM (dados temporários/sensíveis)",
      "Volume: para bancos de dados apenas. Bind mount: para todos os dados de aplicação. tmpfs: para logs e arquivos de auditoria em produção",
      "Volume e bind mount são equivalentes com nomes diferentes; tmpfs é um tipo especial de volume criptografado",
      "Volumes são para Linux, bind mounts para Windows e tmpfs para macOS — escolha depende do sistema operacional do host",
    ],
    correctIndex: 0,
    explanation:
      "Volumes (-v mydata:/data): gerenciados pelo Docker em /var/lib/docker/volumes, portáveis, fáceis de backup. Ideais para bancos de dados em produção. Bind mounts (-v /host/path:/container/path): o host controla o conteúdo, perfeito para montar código-fonte em dev (live reload). tmpfs (--tmpfs /app/tmp): em memória RAM, desaparece com o container — ideal para dados sensíveis temporários ou cache em memória.",
    example:
      "Dev: docker run -v $(pwd):/app node — alterações no código refletem imediatamente no container. Prod: docker run -v postgres-data:/var/lib/postgresql/data postgres — dados do banco sobrevivem ao restart do container.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__6",
    tags: ["docker-network", "bridge", "overlay"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "Como funcionam as redes Docker e qual a diferença entre bridge e overlay networks?",
    options: [
      "Bridge: rede local em single-host onde containers se comunicam por nome. Overlay: rede multi-host para containers em diferentes máquinas (Swarm/Kubernetes)",
      "Bridge: conecta container diretamente à rede física do host sem isolamento. Overlay: encriptação TLS entre containers em qualquer configuração",
      "Bridge: rede padrão com acesso à internet bloqueado. Overlay: rede que permite acesso externo para containers de frontend",
      "Bridge e overlay têm a mesma funcionalidade; a diferença é apenas de performance: bridge é mais rápida em single-host",
    ],
    correctIndex: 0,
    explanation:
      "Bridge network (padrão): containers no mesmo host comunicam por nome de container como DNS (http://db:5432). Isolamento entre diferentes networks. Overlay network: usa VXLAN para criar rede virtual sobre múltiplos hosts físicos — containers em máquinas diferentes comunicam como se na mesma LAN. Essencial para Docker Swarm e Kubernetes. Host network: remove isolamento, container usa rede do host diretamente (máxima performance).",
    example:
      "docker-compose cria automaticamente uma bridge network. frontend pode acessar backend pelo hostname 'backend' e postgres pelo hostname 'db' — sem IPs hardcoded, DNS interno resolve.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__7",
    tags: ["entrypoint", "cmd", "dockerfile"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "Qual a diferença entre ENTRYPOINT e CMD no Dockerfile e como eles interagem?",
    options: [
      "ENTRYPOINT define o executável principal (não sobrescrito facilmente). CMD define argumentos padrão passados ao ENTRYPOINT, podendo ser sobrescritos no docker run",
      "ENTRYPOINT executa durante o build da imagem (compile-time). CMD executa quando o container inicia (runtime)",
      "ENTRYPOINT é para imagens base; CMD é para imagens de aplicação. Usar ambos numa mesma imagem está correto apenas com --override",
      "CMD é executado antes do ENTRYPOINT; ENTRYPOINT define o shell a usar e CMD o script principal da aplicação",
    ],
    correctIndex: 0,
    explanation:
      "ENTRYPOINT exec form: ['node', 'server.js'] — o container sempre executa node como processo principal, difícil sobrescrever. CMD fornece defaults que o usuário pode substituir: `docker run minha-imagem --porta 8080` passa --porta 8080 como argumento ao ENTRYPOINT. Combinação comum: ENTRYPOINT ['python'] CMD ['app.py'] — usuário pode rodar docker run img script.py e sobrescreve apenas o CMD.",
    example:
      "Imagem de ferramentas git: ENTRYPOINT ['git'] CMD ['--help']. docker run minha-git log --oneline — executa git log --oneline. O ENTRYPOINT (git) permanece; o CMD (--help) é substituído por (log --oneline).",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__8",
    tags: ["container-registry", "ECR", "private-registry"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "Quais são as opções de registro privado de imagens Docker e como escolher em ambiente corporativo?",
    options: [
      "Amazon ECR, Google Artifact Registry, Azure ACR (integram ao cloud nativo) ou Harbor self-hosted; escolha conforme cloud provider e requisitos de compliance",
      "Apenas Docker Hub Enterprise é adequado para ambientes corporativos; alternativas carecem de suporte oficial",
      "Registros privados são necessários apenas para imagens acima de 1GB; imagens menores podem usar Docker Hub gratuito sem risco",
      "Qualquer servidor com Nginx configurado como proxy reverso serve como registro privado com as mesmas funcionalidades do ECR",
    ],
    correctIndex: 0,
    explanation:
      "Registros privados garantem: (1) imagens proprietárias não expostas publicamente, (2) vulnerability scanning automático (ECR, GAR fazem isso nativamente), (3) integração com IAM/permissões do cloud, (4) latência menor em deploys (imagens no mesmo datacenter). Harbor (open-source) oferece registry auto-hospedado com scan, replicação e controle de acesso. Produção corporativa: nunca use Docker Hub público para imagens internas.",
    example:
      "Pipeline CI/CD: build → push para ECR → ECS/EKS faz pull do ECR (mesma VPC AWS). O pull é gratuito dentro da mesma região e seguro — imagem nunca sai da rede da AWS.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__9",
    tags: ["resource-limits", "memory", "cpu"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "Por que é importante definir limites de CPU e memória para containers e como fazer isso?",
    options: [
      "Sem limites, um container pode consumir todos os recursos do host derrubando outros serviços; usa-se --memory e --cpus no docker run ou resources.limits no Kubernetes",
      "Limites são necessários apenas para containers de banco de dados; apps stateless não precisam de restrições de recursos",
      "Docker aplica limites automáticos baseados no número de containers — configuração manual é redundante em versões modernas",
      "Limites só podem ser configurados no Dockerfile via a instrução RESOURCE; não é possível defini-los em runtime",
    ],
    correctIndex: 0,
    explanation:
      "Por padrão, um container usa tudo que o host oferece. Um memory leak pode derrubar o nó inteiro. `docker run --memory=512m --cpus=0.5` limita a 512MB RAM e meio core de CPU. No Kubernetes: resources.requests (garantia mínima) e resources.limits (teto máximo). OOM Killer derruba o container ao atingir limite de memória. CPU throttling reduz ciclos quando atinge o limite de CPU.",
    example:
      "Kubernetes: request cpu=100m, limit cpu=500m significa: garantido 0.1 core, mas pode burstar até 0.5 core se disponível. request memory=128Mi, limit memory=256Mi: evita que um pod com memory leak derrube o nó.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Médio__10",
    tags: ["docker-swarm", "orchestration", "replicas"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Médio",
    question:
      "O que é Docker Swarm e em quais cenários ele é preferível ao Kubernetes?",
    options: [
      "Orquestrador nativo do Docker, mais simples de operar; preferível em equipes pequenas, apps menos complexas ou quem já usa docker-compose e quer produção simples",
      "Substituto do Docker Compose para ambientes de desenvolvimento com hot-reload e debugging integrados",
      "Ferramenta de load balancing exclusiva para APIs REST, sem suporte a outros tipos de workloads",
      "Modo experimental do Docker que habilita features de Kubernetes dentro de um único daemon Docker",
    ],
    correctIndex: 0,
    explanation:
      "Swarm: docker swarm init converte um host em manager. docker service create --replicas 3 nginx cria 3 réplicas distribuídas. Curva de aprendizado baixa — quem conhece docker-compose aprende em horas. Limitações: ecossistema menor, sem HPAs avançados, menos opções de networking. Kubernetes tem mais poder mas exige muito mais conhecimento e operação. Para pequenas empresas/times Swarm pode ser suficiente.",
    example:
      "Startup com 5 devs sem time de infra: Docker Swarm em 3 VMs direto, deploy em minutos. Uma empresa de 500 engenheiros com 200 microsserviços: Kubernetes com EKS/GKE vale o investimento.",
  },

  // ── Difícil 4-10 ─────────────────────────────────────────────────────────
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__4",
    tags: ["container-runtime", "containerd", "OCI"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "Quais são os componentes internos do Docker (containerd, runc, shim) e como interagem ao criar um container?",
    options: [
      "Docker CLI → Docker Daemon → containerd (gerencia ciclo de vida) → containerd-shim → runc (cria o container via OCI/namespaces/cgroups) → processo do container",
      "Docker CLI → containerd → Docker Daemon → kubelet → runc; o Daemon é intermediário entre a CLI e o runtime de baixo nível",
      "Docker CLI compila o Dockerfile em bytecode que o containerd executa diretamente via JIT sem chamar runc ou criar processos separados",
      "Docker Daemon gerencia tudo internamente sem delegar ao containerd; runc é usado apenas em modo experimental --experimental-oci",
    ],
    correctIndex: 0,
    explanation:
      "Arquitetura atual: (1) CLI envia comando ao Daemon via Unix socket. (2) Daemon delega ao containerd (alto nível: pull, push, snapshots, ciclo de vida). (3) containerd cria um shim por container (processo lightweight que sobrevive ao restart do containerd). (4) shim chama runc que cria namespaces (pid, net, mnt, uts, ipc) e cgroups (limites de recursos) via syscalls Linux. (5) runc sai após criar o container; shim fica como pai do processo. Kubernetes pode usar containerd diretamente sem o Docker Daemon.",
    example:
      "docker run nginx: CLI → daemon → containerd pull nginx → snapshot do filesystem → containerd-shim criado → runc fork+exec o processo nginx nos namespaces → runc sai → shim reporta I/O e exit code de volta ao containerd.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__5",
    tags: ["image-scanning", "CVE", "security"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "Como implementar uma pipeline de segurança de imagens Docker em CI/CD para detectar vulnerabilidades antes de produção?",
    options: [
      "Build → scan com Trivy/Grype (CVEs) → gate com política de severity → push para registry → scan periódico em produção + renovação automática de imagens base",
      "Verificar apenas o Dockerfile estaticamente com hadolint; vulnerabilidades em dependências não são responsabilidade do time de infra",
      "Usar somente imagens oficiais do Docker Hub garante segurança — scan adicional é redundante e aumenta o tempo de pipeline",
      "Assinar imagens com Docker Content Trust (DCT) elimina a necessidade de scan por CVEs, pois garante integridade e origem",
    ],
    correctIndex: 0,
    explanation:
      "Pipeline completa: (1) Lint do Dockerfile com hadolint. (2) Build da imagem. (3) Scan com Trivy ou Grype — analisa OS packages e libs de linguagem. (4) Policy gate: bloquear se há CVE CRITICAL sem fix disponível. (5) Push para registry (ECR, GAR com scan nativo). (6) Runtime: scan periódico para novas CVEs em imagens já deployadas. (7) Renovação automática: Dependabot/Renovate atualiza imagens base. Assinatura com Cosign (Sigstore) garante que apenas imagens do seu pipeline vão a produção.",
    example:
      "GitHub Actions: steps: build → trivy image --exit-code 1 --severity CRITICAL (falha o pipeline se crítico) → push ECR. Notificação Slack se novas CVEs aparecem em imagens já em produção.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__6",
    tags: ["distroless", "scratch", "minimal-image"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "O que são imagens distroless e scratch e por que reduzem a superfície de ataque em produção?",
    options: [
      "Imagens sem shell, package managers ou utilitários desnecessários; menor superfície de ataque (sem bash para explorar), CVEs reduzidos e imagens menores",
      "Imagens comprimidas com algoritmo proprietário do Google que reduz tamanho em disco sem alterar o conteúdo do filesystem",
      "Padrão do OCI para imagens sem layers — todo conteúdo em arquivo flat binary, mais eficiente para distribuição",
      "Imagens que rodam sem root user e sem capabilities por padrão; o nome refere-se à ausência de permissões elevadas",
    ],
    correctIndex: 0,
    explanation:
      "FROM scratch: imagem completamente vazia. Usada com binários staticamente compilados (Go, Rust). FROM gcr.io/distroless/: contém apenas runtime necessário (ex: libc, OpenSSL, CA certs) sem bash, sh, apt, pip. Benefícios: (1) Sem shell = atacante não consegue executar comandos mesmo com RCE. (2) Menos packages = menos CVEs. (3) Imagem menor. Desvantagem: não dá para fazer docker exec -it para debug — use imagens de debug separadas com sufixo :debug ou imagens efêmeras.",
    example:
      "App Go: FROM scratch com binário compilado com CGO_DISABLED=1 gera imagem de 8MB. FROM golang:1.22 geraria 800MB. Em caso de breach, atacante encontra apenas o binário — sem curl, wget nem bash para movimentação lateral.",
  },
  {
    id: "engenharia-de-software__Docker e Containers__Difícil__7",
    tags: ["cgroups", "namespaces", "linux-kernel"],
    track: "engenharia-de-software",
    category: "Docker e Containers",
    difficulty: "Difícil",
    question:
      "Quais são as tecnologias do kernel Linux que tornam containers possíveis e como cada uma contribui?",
    options: [
      "Namespaces (isolamento de visibilidade: pid/net/mnt/uts/ipc/user) + cgroups (limites de recursos: CPU/memória) + Union FS (layers de sistema de arquivos)",
      "Hypervisor Type-2 integrado ao kernel + VirtIO para I/O otimizado + KVM para virtualização assistida por hardware",
      "eBPF (filtragem de syscalls) + seccomp (sandboxing de processos) + AppArmor (MAC); os namespaces são opcionais no Linux moderno",
      "POSIX capabilities + chroot (isolamento de filesystem) + iptables (isolamento de rede); cgroups são uma abstração dessas três tecnologias",
    ],
    correctIndex: 0,
    explanation:
      "Namespaces criam 'bolhas' de isolamento: PID (processo vê apenas seus próprios processos), NET (interface de rede própria), MNT (filesystem próprio), UTS (hostname próprio), IPC (memória compartilhada isolada), USER (mapeamento de UIDs). cgroups v2 impõem limites: CPU shares, memory limit, I/O bandwidth. OverlayFS (Union FS) empilha camadas read-only + write layer por container. Nenhuma virtualização de hardware — todos compartilham o kernel do host, por isso são muito mais leves que VMs.",
    example:
      "Container PID namespace: dentro do container, seu processo tem PID 1. No host, ele tem PID 47823. Namespace NET: container tem eth0 com IP 172.17.0.2, invisível para outros containers sem configuração explicita de rede.",
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
