# CardMaster

App de Cards inteligentes para estudo, com suporte a **Android (APK)** e **Web** via Expo.

## Stack

| Camada   | Tecnologia                                                   |
| -------- | ------------------------------------------------------------ |
| Frontend | Expo 54 · React Native · Expo Router · NativeWind (Tailwind) |
| Auth     | Firebase Authentication                                      |
| Database | Firebase Firestore                                           |

## Funcionalidades

### Autenticação

- Login, cadastro e redefinição de senha via Firebase Auth
- Toggle de visibilidade da senha
- Sessão persistida automaticamente pelo Firebase

### Interface

- Dark mode automático (segue preferência do sistema)
- Navegação por gestos (swipe back) em todas as telas
- Tab bar fixa na web com 4 abas: Início, Cards, Criar, Progresso
- Home com resumo geral

## Estrutura do projeto

```
app/                → Telas (Expo Router file-based routing)
  (tabs)/           → Abas: Início, Cards, Criar, Progresso
  ready/            → Estudo e pesquisa por tema
  login.tsx         → Login / Cadastro / Redefinir senha
components/         → Componentes reutilizáveis
constants/          → Tema de cores
hooks/              → Hooks customizados (color scheme, theme color)
lib/                → Firebase config e API (placeholder)
providers/          → AuthProvider (contexto global de autenticação)
```

## Como rodar

```bash
npm install
npm run start
```

- Android: `a` | iOS: `i` | Web: `w`

## Build e deploy

### APK Android (EAS Build)

```bash
npx eas-cli build --profile preview --platform android
```

### Web (GitHub Pages)

```bash
npm run web:build:ghpages
```
