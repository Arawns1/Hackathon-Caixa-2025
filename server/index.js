const express = require("express");
const cors = require("cors");
const database = require("./database");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = database.init(); // opcional: database.init("meu_banco.sqlite");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Lista produtos

app.get("/produtos", (req, res) => {
  const produtos = db.prepare("SELECT * FROM produto").all();
  res.json(produtos);
});

// Cadastra Produtos
app.post("/produtos", (req, res) => {
  const { nome, taxa_anual, prazo_maximo } = req.body;

  if (!nome || taxa_anual == null || prazo_maximo == null) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }
  const db = database.getDB();
  const stmt = db.prepare(
    "INSERT INTO produto (nome, taxa_anual, prazo_maximo) VALUES (?, ?, ?)"
  );
  const result = stmt.run(nome, taxa_anual, prazo_maximo);

  res.status(201).json({
    id: result.lastInsertRowid,
    nome,
    taxa_anual,
    prazo_maximo,
  });
});

// Realizar simulações
app.post("/simulacoes", (req, res, next) => {
  const { id_produto, valor_solicitado, prazo } = req.body;

  if (!id_produto || valor_solicitado == null || prazo == null) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const db = database.getDB();
  const stmt = db.prepare("SELECT * FROM produto WHERE id = ?");
  const produto = stmt.get(id_produto);

  if (!produto)
    return res
      .status(404)
      .json({ erro: `Produto com id: ${id_produto} não encontrado` });

  if (prazo > produto.prazo_maximo)
    return res.status(400).json({
      error:
        "Prazo solicitado excede o prazo máximo permitido para este produto.",
    });

  // Calcula taxa efetiva mensal
  const taxa_efetiva_mensal =
    Math.pow(1 + produto.taxa_anual / 100, 1 / 12) - 1;

  // Calcula parcela mensal (PRICE)
  const parcela_mensal =
    (valor_solicitado *
      taxa_efetiva_mensal *
      Math.pow(1 + taxa_efetiva_mensal, prazo)) /
    (Math.pow(1 + taxa_efetiva_mensal, prazo) - 1);

  // Calcula valor total com juros
  const valor_total_com_juros = parcela_mensal * prazo;

  // Monta parcelas detalhadas
  let saldo_devedor = valor_solicitado;
  const parcelas = [];
  for (let i = 1; i <= prazo; i++) {
    const valor_juros = saldo_devedor * taxa_efetiva_mensal;
    const valor_amortizacao = parcela_mensal - valor_juros;
    saldo_devedor -= valor_amortizacao;
    parcelas.push({
      numero: i,
      valor_amortizacao: Number(valor_amortizacao.toFixed(2)),
      valor_juros: Number(valor_juros.toFixed(2)),
      valor_prestacao: Number(parcela_mensal.toFixed(2)),
      saldo_devedor: Number(saldo_devedor.toFixed(2)),
    });
  }
  setTimeout(() => {
    res.status(200).json({
      produto,
      resultado_simulacao: {
        valor_solicitado,
        prazo,
        taxa_efetiva_mensal: Number(taxa_efetiva_mensal.toFixed(6)),
        parcela_mensal: Number(parcela_mensal.toFixed(2)),
        valor_total_com_juros: Number(valor_total_com_juros.toFixed(2)),
        parcelas,
      },
    });
  }, 2000);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
