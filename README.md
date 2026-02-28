# CardMaster

App de Cards inteligentes para estudo de certificações e provas técnicas de TI, com suporte a **Android (APK)** e **Web** via Expo.

## Stack

| Camada   | Tecnologia                                                   |
| -------- | ------------------------------------------------------------ |
| Frontend | Expo 54 · React Native · Expo Router · NativeWind (Tailwind) |
| Backend  | Express · Prisma · MongoDB                                   |
| Auth     | JWT (bcrypt)                                                 |
| Infra    | EC2 (API via PM2) · Netlify (Web) · EAS Build (APK)          |

## Funcionalidades

### Autenticação

- Login, cadastro e redefinição de senha
- Toggle de visibilidade da senha
- Sessão persistida com AsyncStorage + JWT

### Temas de estudo (cards prontos)

Cinco temas com milhares de questões geradas por seed, cada um com categorias e 4 níveis progressivos:

| Tema                    | Exemplos de categorias                               |
| ----------------------- | ---------------------------------------------------- |
| Desenvolvimento         | Linguagens, frameworks, CSS, Tailwind, boas práticas |
| Infraestrutura          | Cabeamento, redes, arquitetura de computadores       |
| Cloud                   | AWS, Azure, Google Cloud — cenários de prova         |
| Machine Learning        | IA aplicada, MLOps/LLMOps, governança de ML          |
| Segurança da Informação | Cibersegurança, identidade, nuvem segura, regulação  |

### Níveis progressivos

Cada categoria possui 4 níveis avaliáveis por desempenho:

**Iniciante → Júnior → Pleno → Sênior**

Regra de nivelamento atual:

- Você pode iniciar diretamente em qualquer nível
- A avaliação usa uma janela de **30 tentativas** no nível escolhido
- Com **80% ou mais de acerto** (24/30), o nível é liberado
- Com **100%** (30/30), o nível é marcado como concluído

### Modo de estudo

- Questões de múltipla escolha com 4 alternativas
- Justificativa contextual exibida após cada resposta
- Badge indicando origem da questão (ex.: "AWS SAA-C03")
- Cronômetro por sessão com tempo médio no progresso
- Opções deduplicadas para evitar alternativas quase idênticas

### Criação de cards personalizados

- Cadastro de novas questões direto pelo app
- Suporte a tema, categoria, nível e descrições

### Progresso e recompensas

- Painel com total de tentativas, acertos, taxa de acerto e tempo médio
- Sequência de dias consecutivos (streak)
- Badges desbloqueáveis por marcos atingidos
- Barra de progresso por nível em cada categoria (janela de 30 tentativas)
- Reset de progresso disponível

### Pesquisa de temas

- Tela de pesquisa contextual por categoria com resumo, aplicações e exemplo básico

### Interface

- Dark mode automático (segue preferência do sistema)
- Navegação por gestos (swipe back) em todas as telas
- Tab bar fixa na web com 4 abas: Início, Cards, Criar, Progresso
- Home com resumo de cards e temas ativos

## Estrutura do projeto

```
app/                → Telas (Expo Router file-based routing)
  (tabs)/           → Abas: Início, Cards, Criar, Progresso
  ready/            → Categorias, estudo e pesquisa por tema
  login.tsx         → Login / Cadastro / Redefinir senha
components/         → Componentes reutilizáveis
constants/          → Tema de cores
data/               → Tipos e definições de flashcards
hooks/              → Hooks customizados (color scheme, theme color)
lib/                → Cliente HTTP da API
providers/          → AuthProvider (contexto global de autenticação)
server/             → Backend Express
  prisma/           → Schema Prisma (MongoDB)
  src/              → Rotas, auth, seeds, config
```

## Como rodar

### Frontend (mobile + web)

```bash
npm install
npm run start
```

- Android: `a` | iOS: `i` | Web: `w`

### Backend (Express + Prisma + MongoDB)

```bash
npm --prefix server install
```

Crie `server/.env` com:

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="sua-chave-secreta"
PORT=4000
```

```bash
npm --prefix server run prisma:generate
npm --prefix server run prisma:push
```

Popular cards iniciais (seeds):

```bash
npm --prefix server run seed
npm --prefix server run seed:all-cards
```

Subir a API:

```bash
npm run server:dev
```

API disponível em `http://localhost:4000/api`.

### Rodar tudo junto (frontend + backend)

```bash
npm run dev
```

## Build e deploy

### APK Android (EAS Build)

```bash
npx eas-cli build --profile preview --platform android
```

A variável `EXPO_PUBLIC_API_URL` é configurada no `eas.json` (profile `preview`).

### Web (Netlify)

```bash
npm run web:build
```

O deploy na Netlify usa proxy reverso (`/api/*` → EC2:4000) configurado em `netlify.toml`.

### Servidor (EC2)

A API roda em produção via PM2 na instância EC2, porta 4000.

## Rotas da API

| Método | Rota                                   | Auth | Descrição                              |
| ------ | -------------------------------------- | ---- | -------------------------------------- |
| GET    | `/api/health`                          |      | Health check                           |
| POST   | `/api/auth/register`                   |      | Cadastro de usuário                    |
| POST   | `/api/auth/login`                      |      | Login                                  |
| POST   | `/api/auth/reset-password`             |      | Redefinir senha                        |
| GET    | `/api/ready-cards`                     |      | Cards prontos (filtro por track/level) |
| GET    | `/api/ready-cards/categories`          |      | Categorias por tema                    |
| GET    | `/api/ready-cards/categories-progress` | JWT  | Categorias com progresso do usuário    |
| GET    | `/api/ready-cards/summary`             |      | Contagem total de cards por tema       |
| GET    | `/api/ready-themes`                    |      | Lista de temas                         |
| GET    | `/api/ready-themes/insight`            |      | Resumo/insight de uma categoria        |
| POST   | `/api/ready-cards` (admin)             | JWT  | Criar card pronto                      |
| POST   | `/api/custom-cards`                    | JWT  | Criar card personalizado               |
| GET    | `/api/custom-cards`                    | JWT  | Listar cards do usuário                |
| POST   | `/api/study/attempt`                   | JWT  | Registrar tentativa de estudo          |
| GET    | `/api/progress/me`                     | JWT  | Progresso do usuário                   |
| POST   | `/api/progress/reset`                  | JWT  | Resetar progresso                      |

## Modelos de dados (Prisma/MongoDB)

- **User** — email, nome, senha (hash), pontos, streak
- **ReadyFlashcard** — card pronto com track, categoria, nível, pergunta, resposta e descrições
- **ReadyTheme** — temas de estudo por track
- **CustomFlashcard** — card criado pelo usuário
- **SessionAttempt** — registro de cada tentativa (acerto, pontos, duração)
- **UserRewardProgress** — badges conquistados pelo usuário
- Persistir token JWT com armazenamento seguro
- Criar sessão de estudo com modo "virar card" e correção (acerto/erro)
- Adicionar ranking e objetivos semanais
