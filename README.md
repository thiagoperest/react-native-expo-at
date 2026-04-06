# React Native Expo - INFNET - AT

![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-54-000020.svg?logo=expo&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E.svg?logo=supabase&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Local-003B57.svg?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Ativo-success.svg)

Aplicação mobile desenvolvida como projeto prático com React Native e Expo, implementando autenticação com Supabase, catálogo de filmes com paginação e busca, favoritos offline com SQLite, perfil de usuário com câmera e galeria, e suporte a temas claro, escuro e do sistema.

## Sobre o Projeto

Este projeto foi desenvolvido como parte do **AT: Desenvolvimento de Aplicativos Mobile com React Native** do Instituto Infnet, implementando um sistema completo com autenticação, consumo de API REST, persistência local com SQLite.

**Instituto Infnet** - Projeto de Bloco  
**Disciplina:** Desenvolvimento de Aplicativos Mobile com React Native  
**Aluno:** Thiago Teodoro Peres

## Arquitetura

A aplicação implementa uma arquitetura em camadas com separação clara de responsabilidades, seguindo os princípios do React moderno:

```
Presentation Layer (Screens + Components)
        ↓
State Layer (Context API — Session, Theme)
        ↓
Navigation Layer (React Navigation — Stack + Bottom Tabs)
        ↓
Data Layer (Supabase Auth / JSONPlaceholder API / SQLite)
```

O estado global é dividido entre o **SessionContext**, responsável pela autenticação via Supabase, e o **ThemeContext**, que gerencia o tema visual (claro/escuro/sistema) com persistência via AsyncStorage.

### Decisões Arquiteturais

As decisões arquiteturais estão documentadas no formato [ADR](docs/adr) (Architecture Decision Records).

## Funcionalidades Implementadas

- **Autenticação** — Login e cadastro com e-mail e senha via Supabase Auth, com validação de campos e mensagens de erros
- **Catálogo de Filmes** — Listagem paginada consumindo a API JSONPlaceholder com busca em tempo real e carregamento incremental
- **Favoritos Offline** — Favoritar/desfavoritar filmes com persistência local via SQLite, acessível mesmo sem internet
- **Perfil do Usuário** — Tela de perfil com avatar, nome de usuário, seleção de foto via câmera ou galeria
- **Tematização Dinâmica** — Suporte a temas claro, escuro e automático (seguindo o sistema), com persistência da preferência via AsyncStorage
- **Configurações** — Tela de configurações com seleção de tema e botão de logout

## Como Executar

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Expo Go instalado no dispositivo ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Execução

1. **Clone e instale as dependências:**
   ```bash
   git clone https://github.com/thiagoperest/react-native-expo-at.git
   cd react-native-expo-at
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Preencha EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_KEY
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npx expo start
   ```

4. **Abra no dispositivo:**
   - Escaneie o QR code com o app Expo Go
   - Ou pressione `a` para Android / `i` para iOS Simulator

### Scripts disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Inicia direto no Android
npm run ios        # Inicia direto no iOS
npm run web        # Inicia no navegador (SQLite indisponível na web)
```

## Estrutura do Projeto

```
react-native-expo-at/
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── snack-icon.png
│   └── splash-icon.png
├── components/
│   └── MovieItem.js
├── context/
│   ├── SessionContext.js
│   └── ThemeContext.js
├── docs/
│   └── adr/
│       ├── 000-modelo.md
│       └── 001-substituicao-thumbnailurl-lorem-picsum.md
├── hooks/
│   ├── useImage.js
│   └── useMovie.js
├── lib/
│   └── supabase.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── FavoritesScreen.js
│   ├── LoginScreen.js
│   ├── MoviesScreen.js
│   ├── ProfileScreen.js
│   ├── RegisterScreen.js
│   └── SettingsScreen.js
├── services/
│   └── database.js
├── utils/
│   └── imageHelper.js
├── App.js
├── app.json
├── index.js
└── package.json
```

## Navegação

| Tela | Acesso | Descrição |
|---|---|---|
| `LoginScreen` | Público | Autenticação com e-mail e senha |
| `RegisterScreen` | Público | Cadastro de novo usuário |
| `MoviesScreen` | Autenticado | Catálogo de filmes com busca e paginação |
| `FavoritesScreen` | Autenticado | Lista de filmes favoritados (SQLite offline) |
| `ProfileScreen` | Autenticado | Perfil com avatar, câmera e galeria |
| `SettingsScreen` | Autenticado | Seleção de tema e logout |

## Gerenciamento de Estado

| Context | Responsabilidade |
|---|---|
| `SessionContext` | Sessão do usuário via Supabase (`signIn`, `signUp`, `signOut`) |
| `ThemeContext` | Tema visual (`light`, `dark`, `system`) com persistência em AsyncStorage |

## Decisões Arquiteturais (ADRs)

| ADR | Decisão |
|---|---|
| [001](docs/adr/001-substituicao-thumbnailurl-lorem-picsum.md) | Substituição da `thumbnailUrl` do JSONPlaceholder pelo Lorem Picsum |

## Tecnologias Utilizadas

- **React Native ** — Framework principal para desenvolvimento mobile
- **Expo SDK 54** — Plataforma de desenvolvimento e acesso a APIs nativas
- **Supabase** — Autenticação e backend de auth
- **React Navigation ** — Navegação com stack e bottom tabs
- **expo-sqlite** — Banco de dados local para favoritos offline
- **expo-image-picker** — Acesso à câmera e galeria do dispositivo
- **AsyncStorage** — Persistência de preferências do usuário
- **@expo/vector-icons** — Ícones via MaterialIcons
- **Context API** — Gerenciamento de estado global

## Contato

**Thiago Teodoro Peres**  
Email: thiago.peres@al.infnet.edu.br  
Instituto Infnet - Desenvolvimento de Aplicativos Mobile com React Native

---

**Projeto desenvolvido para o Instituto Infnet - AT**
