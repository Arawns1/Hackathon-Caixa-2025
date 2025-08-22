# API de Empréstimos - Hackathon Caixa 2025

> **Código disponível em:** [https://github.com/Arawns1/Hackathon-Caixa-2025](https://github.com/Arawns1/Hackathon-Caixa-2025)

API REST para simulação de empréstimos com cálculo de parcelas pelo sistema Price.

## Tecnologias

- Node.js
- Express.js
- SQLite3 (better-sqlite3)
- CORS

## Instalação

1. Instale as dependências:

```bash
npm install
```

## Execução

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

A API estará disponível em `http://localhost:3000`

## Endpoints

### GET `/`

- **Descrição**: Health check
- **Resposta**: "Hello World!"

### GET `/produtos`

- **Descrição**: Lista todos os produtos disponíveis
- **Resposta**: Array de produtos com id, nome, taxa_anual e prazo_maximo

### POST `/produtos`

- **Descrição**: Cadastra novo produto
- **Body**: `{ "nome": "string", "taxa_anual": number, "prazo_maximo": number }`
- **Resposta**: Produto criado com id

### POST `/simulacoes`

- **Descrição**: Simula empréstimo com cálculo de parcelas
- **Body**: `{ "id_produto": number, "valor_solicitado": number, "prazo": number }`
- **Resposta**: Simulação com parcelas calculadas pelo sistema Price

## Banco de Dados

- SQLite com tabela `produto`
- Dados pré-populados com produtos padrão
- Arquivo: `db.sqlite` (criado automaticamente)

## Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `RENDER_EXTERNAL_URL`: URL externa para Render (opcional)
