# CardMaster

App de flashcards inteligente para estudo de vestibular, certificações e provas técnicas de TI, com suporte a **mobile e web** via Expo.

## Stack

- Frontend: Expo + React Native + Expo Router + Tailwind (NativeWind)
- Backend: Express + Prisma
- Banco: MongoDB
- Auth: JWT

## Funcionalidades base

- Flashcards prontos por trilha:
  - Desenvolvimento (linguagens, frameworks, CSS, Tailwind)
  - Infraestrutura (cabeamento, redes, arquitetura de computadores)
  - Cloud (AWS, Azure, Google Cloud)
- Níveis de dificuldade: Júnior, Pleno e Sênior
- Criação de flashcards personalizados
- Progresso do usuário com pontos, sequência e recompensas
- Login e cadastro

## Estrutura

- App Expo: `./app`
- Dados mock de cards prontos: `./data/flashcards.ts`
- API: `./server`
- Prisma schema: `./server/prisma/schema.prisma`

## Como rodar o frontend (mobile + web)

1. Instale dependências:

```bash
npm install
```

2. Rode o app:

```bash
npm run start
```

3. Abra em:

- Android: `a`
- iOS: `i`
- Web: `w`

## Como rodar o backend (Express + Prisma + MongoDB)

1. Instale dependências da API:

```bash
npm --prefix server install
```

2. Crie o arquivo de ambiente:

```bash
copy server\.env.example server\.env
```

3. Ajuste `DATABASE_URL` e `JWT_SECRET` em `server/.env`.

4. Gere o client Prisma e sincronize schema:

```bash
npm --prefix server run prisma:generate
npm --prefix server run prisma:push
```

5. (Opcional) Popular cards iniciais:

```bash
npm --prefix server run seed
npm --prefix server run seed:all-cards
```

6. Suba a API:

```bash
npm run server:dev
```

API disponível em `http://localhost:4000/api`.

## Rotas principais da API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/ready-cards?track=DESENVOLVIMENTO&level=JUNIOR`
- `POST /api/custom-cards` (auth)
- `GET /api/custom-cards` (auth)
- `POST /api/study/attempt` (auth)
- `GET /api/progress/me` (auth)

## Próximos passos recomendados

- Conectar telas do app às rotas da API
- Persistir token JWT com armazenamento seguro
- Criar sessão de estudo com modo "virar card" e correção (acerto/erro)
- Adicionar ranking e objetivos semanais
