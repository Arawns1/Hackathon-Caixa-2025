# App Simulação de Empréstimos

<p align="center">App mobile para cadastrar produtos de empréstimo, simular financiamentos e visualizar resultados mês a mês. </p>

> **Código também disponível em:** [https://github.com/Arawns1/Hackathon-Caixa-2025](https://github.com/Arawns1/Hackathon-Caixa-2025)

# 🎯 Objetivo Principal

Permitir que usuários cadastrem produtos de empréstimo, simulem financiamentos e compreendam claramente os valores e prazos mensais, Além disso foi implementado um fluxo de CI/CD que passa por análise do SonarQube, garantindo a qualidade do código e estando tudo certo é feito o deploy na Vercel de forma contínua e integrada.

# 📱 Funcionalidades

- Simulação de empréstimos
- Cadastro de produtos
- Lista de produtos
- Detalhamento de parcelas
- Resumo de simulação
- Animações Lottie

## ♿ Acessibilidade

- **Conformidade com normas públicas**: Implementa padrões de acessibilidade conforme exigências para sites governamentais
- **Responsividade**: Design adaptável para todos os dispositivos
- **Navegação por teclado**: Suporte completo para navegação sem mouse
- **Screen readers**: Compatível com leitores de tela
- **Contraste**: Alto contraste para melhor legibilidade
- **Semântica HTML**: Estrutura semântica adequada
- **Padrão WCAG 2.1 do W3C**: O projeto conta com nota 8.3 de acordo com o site accessMonitor em acessibilidade. [Confira Aqui!](https://accessmonitor.acessibilidade.gov.pt/results/https%3A%2F%2Fhackathon-caixa-2025.vercel.app%2F)

# 📸 Visuais e Telas

🎨 [Link para o figma](https://www.figma.com/design/b4ZlK9P444YswDaCIQwfOD/HACKATHON-CAIXA---2025?node-id=0-1&t=gqtSSoOPRS5p5cdJ-1)

## 🛠️ Tecnologias

![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arawns1_Hackathon-Caixa-2025&metric=coverage)
![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Arawns1_Hackathon-Caixa-2025&metric=alert_status)
![Vercel](https://vercelbadge.vercel.app/api/arawns1/Hackathon-Caixa-2025)

- Angular 19
- Tailwind CSS
- Angular Material
- Lottie Animations
- RxJS
- Karma
- Github Actions
- Figma

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Scripts de Inicialização

#### `npm run start` - Produção

- Executa `ng serve --configuration production`
- Usa configurações de produção (otimizações ativadas)
- Conecta à API hospedada: `https://hackathon-caixa-2025.onrender.com`
- **Recomendado para demonstração**

#### `npm run dev` - Desenvolvimento Local

- Executa `ng serve --configuration development`
- Usa configurações de desenvolvimento (source maps, sem otimizações)
- Conecta à API local: `http://localhost:3000`
- **⚠️ Requer API local em execução**

### Executar o Projeto

#### 🚀 **Recomendado: Versão Deployada**

Para uso imediato, acesse a versão em produção: [https://hackathon-caixa-2025.vercel.app/](https://hackathon-caixa-2025.vercel.app/)

#### 💻 **Desenvolvimento Local**

**⚠️ IMPORTANTE**: Para desenvolvimento local, é necessário executar a API localmente. A API está disponível no repositório: [https://github.com/Arawns1/Hackathon-Caixa-2025](https://github.com/Arawns1/Hackathon-Caixa-2025)

```bash
# Primeira execução (produção)
npm start

# Desenvolvimento local
npm run dev
```

A aplicação estará disponível em: `http://localhost:4200`

## 🔧 Configurações

### Ambientes

- **Production**: `src/environments/environment.ts`
- **Development**: `src/environments/environment.development.ts`

### API

- **Hospedada**: `https://hackathon-caixa-2025.onrender.com`
- **Local**: `http://localhost:3000`

### Deploy

- **Vercel**: [https://hackathon-caixa-2025.vercel.app/](https://hackathon-caixa-2025.vercel.app/)
- **Local**: `http://localhost:4200`

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 📦 Build

```bash
# Build de produção
npm run build

# Build de desenvolvimento com watch
npm run watch
```
