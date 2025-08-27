# App Simulação de Empréstimos

<p align="center">App mobile para cadastrar produtos de empréstimo, simular financiamentos e visualizar resultados mês a mês. </p>

> **Código também disponível em:** [https://github.com/Arawns1/Hackathon-Caixa-2025](https://github.com/Arawns1/Hackathon-Caixa-2025)

> **Frontend em Produção:** [https://hackathon.damico.cloud/](https://hackathon.damico.cloud/)

> **API em Produção:** [https://hackathon-api.damico.cloud/](https://hackathon-api.damico.cloud/)

## 📋 Sumário

- [App Simulação de Empréstimos](#app-simulação-de-empréstimos)
  - [📋 Sumário](#-sumário)
  - [🎯 Objetivo Principal](#-objetivo-principal)
  - [📱 Funcionalidades](#-funcionalidades)
  - [♿ Acessibilidade](#-acessibilidade)
  - [📸 Visuais e Telas](#-visuais-e-telas)
  - [🛠️ Tecnologias](#️-tecnologias)
  - [🚀 Como Executar](#-como-executar)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
    - [Docker](#docker)
    - [Scripts de Inicialização](#scripts-de-inicialização)
      - [`npm run start:prod` - Produção](#npm-run-startprod---produção)
      - [`npm run start` - Desenvolvimento Local](#npm-run-start---desenvolvimento-local)
    - [Executar o Projeto](#executar-o-projeto)
      - [🚀 **Recomendado: Versão Deployada**](#-recomendado-versão-deployada)
      - [💻 **Desenvolvimento Local**](#-desenvolvimento-local)
    - [🔧 Configurações](#-configurações)
      - [Ambientes](#ambientes)
      - [API](#api)
    - [Deploy](#deploy)
    - [🧪 Testes](#-testes)
    - [📦 Build](#-build)
  - [❓ Ficou com alguma dúvida](#-ficou-com-alguma-dúvida)

## 🎯 Objetivo Principal

Permitir que usuários cadastrem produtos de empréstimo, simulem financiamentos e compreendam claramente os valores e prazos mensais, Além disso foi implementado um fluxo de CI/CD que passa por análise do SonarQube, garantindo a qualidade do código e estando tudo certo é feito o deploy na minha cloud de forma contínua e integrada.

## 📱 Funcionalidades

- Simulação de empréstimos
- Cadastro de produtos
- Lista de produtos
- Detalhamento de parcelas
- Resumo de simulação
- Animações Lottie
- Tema claro e escuro
- Busca por produtos de empréstimo
- Instalação como aplicativo mobile e desktop (PWA)

## ♿ Acessibilidade

- **Conformidade com normas públicas**: Implementa padrões de acessibilidade conforme exigências para sites governamentais e entidades públicas
- **VLibras**: Integra a ferramenta de tradução automática de Libras, permitindo que usuários surdos compreendam o conteúdo em linguagem de sinais.
- **Responsividade**: Design adaptável para todos os dispositivos
- **Navegação por teclado**: Suporte completo para navegação sem mouse
- **Screen readers**: Compatível com leitores de tela
- **Padrão WCAG 2.1 do W3C**: O projeto conta com nota 8.3 de acordo com o site accessMonitor em acessibilidade. [Confira Aqui!](https://accessmonitor.acessibilidade.gov.pt/results/https%3A%2F%2Fhackathon.damico.cloud%2F)

## 📸 Visuais e Telas

🎨 [Link para o figma](https://www.figma.com/design/b4ZlK9P444YswDaCIQwfOD/HACKATHON-CAIXA---2025?node-id=0-1&t=gqtSSoOPRS5p5cdJ-1)

## 🛠️ Tecnologias

![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arawns1_Hackathon-Caixa-2025&metric=coverage)
![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Arawns1_Hackathon-Caixa-2025&metric=alert_status)

- Angular 19
- Tailwind CSS
- Angular Material
- Lottie Animations
- RxJS
- Karma
- Github Actions
- Figma
- Gitflow e versionamento automático com semantic-release
- Progressive Web APP (PWA) - permite a instalação como aplicativo em desktops e dispositivos móveis

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker e Docker Compose (opcional)

### Instalação

```bash
# Instalar dependências
npm install
```

### Docker

O projeto inclui configurações Docker para facilitar o desenvolvimento e deploy:

```bash
# Executar toda a aplicação (frontend + backend) com Docker
docker-compose up -d

# Executar apenas o backend
docker-compose up server -d

# Executar apenas o frontend
docker-compose up app -d

# Parar todos os serviços
docker-compose down

# Reconstruir imagens
docker-compose build --no-cache
```

**Arquivos Docker incluídos:**

- `app/Dockerfile` - Frontend Angular
- `server/Dockerfile` - Backend Node.js
- `compose.yaml` - Orquestração dos serviços
- `nginx.conf` - Configuração do servidor web

### Scripts de Inicialização

#### `npm run start:prod` - Produção

- Executa `ng serve --configuration production`
- Usa configurações de produção (otimizações ativadas)
- É necessário alterar o valor da baseURL do environment para: `https://hackathon-api.damico.cloud/`
- **Recomendado para demonstração**

#### `npm run start` - Desenvolvimento Local

- Executa `ng serve --configuration development`
- Usa configurações de desenvolvimento (source maps, sem otimizações)
- Conecta à API local: `http://localhost:3000`
- **⚠️ Requer API local em execução**

### Executar o Projeto

#### 🚀 **Recomendado: Versão Deployada**

Para uso imediato, acesse a versão em produção: [https://hackathon.damico.cloud/](https://hackathon.damico.cloud/)

#### 💻 **Desenvolvimento Local**

**⚠️ IMPORTANTE**: Para desenvolvimento local, é necessário executar a API localmente. O passo a passo para rodar a local API está disponível no repositório: [https://github.com/Arawns1/Hackathon-Caixa-2025/tree/main/server](https://github.com/Arawns1/Hackathon-Caixa-2025/tree/main/server)

```bash
# Primeira execução (produção)
npm start:prod

# Desenvolvimento local
npm run start
```

A aplicação estará disponível em: `http://localhost:4200`

### 🔧 Configurações

#### Ambientes

- **Production**: `src/environments/environment.ts`
- **Development**: `src/environments/environment.development.ts`

#### API

- **Hospedada**: `https://hackathon-api.damico.cloud/`
- **Local**: `http://localhost:3000`

### Deploy

- **Frontend**: [https://hackathon.damico.cloud/](https://hackathon.damico.cloud/)
- **API**: [https://hackathon-api.damico.cloud/](https://hackathon-api.damico.cloud/)
- **Local**: `http://localhost:4200`

### 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### 📦 Build

```bash
# Build de produção
npm run build

# Build de desenvolvimento com watch
npm run watch
```

## ❓ Ficou com alguma dúvida

Se ficou com alguma dúvida, pode me contatar pelo Teams utilizando a matrícula **c158787**.
