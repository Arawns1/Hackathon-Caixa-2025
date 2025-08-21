const express = require("express");
const cors = require("cors");
const database = require("./database");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.RENDER_EXTERNAL_URL || "http://localhost:" + port;

app.use(cors());
app.use(express.json());

const db = database.init("./db.sqlite");

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

  const taxa_anual_em_decimal = truncarCasasDecimais(taxa_anual / 100);

  const db = database.getDB();
  const stmt = db.prepare(
    "INSERT INTO produto (nome, taxa_anual, prazo_maximo) VALUES (?, ?, ?)"
  );
  const result = stmt.run(nome, taxa_anual_em_decimal, prazo_maximo);

  // return res.status(500).send();

  res.status(201).json({
    id: result.lastInsertRowid,
    nome,
    taxa_anual,
    prazo_maximo,
  });
});

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

  // Calculo Price
  const taxaMensal = produto.taxa_anual / 12;
  const parcela = calcularParcelaPrice(valor_solicitado, taxaMensal, prazo);

  let saldo_devedor = valor_solicitado;
  let valor_total_em_juros = 0;
  let valor_total_amortizado = 0;
  let valor_total_com_juros = 0;

  const parcelas = [];

  for (let i = 1; i <= prazo; i++) {
    const valor_juros = saldo_devedor * taxaMensal;
    const valor_amortizacao = parcela - valor_juros;
    saldo_devedor -= valor_amortizacao;
    valor_total_em_juros += valor_juros;
    valor_total_amortizado += valor_amortizacao;
    valor_total_com_juros += truncarCasasDecimais(parcela);
    parcelas.push({
      numero: i,
      valor_amortizacao: truncarCasasDecimais(valor_amortizacao),
      valor_juros: truncarCasasDecimais(valor_juros),
      valor_prestacao: truncarCasasDecimais(parcela),
      saldo_devedor: truncarCasasDecimais(saldo_devedor),
    });
  }

  setTimeout(() => {
    res.status(200).json({
      id: `${produto.id}-${valor_solicitado}-${prazo}`,
      produto,
      resultado_simulacao: {
        valor_solicitado,
        prazo,
        taxa_efetiva_mensal: taxaMensal,
        parcela_mensal: truncarCasasDecimais(parcela),
        valor_total_com_juros: truncarCasasDecimais(parcela * prazo),
        valor_total_amortizado: parseFloat(valor_solicitado.toFixed(2)),
        valor_total_em_juros: truncarCasasDecimais(valor_total_em_juros),
        parcelas,
      },
    });
  }, 2500);
});

function calcularParcelaPrice(valorSolicitado, taxa, prazo) {
  const fator = Math.pow(1 + taxa, prazo);
  return (valorSolicitado * (taxa * fator)) / (fator - 1); // sem truncar aqui
}

function truncarCasasDecimais(valor, casas = 2) {
  const multiplicador = 10 ** casas;
  return Math.trunc(valor * multiplicador) / multiplicador;
}

app.listen(port, () => {
  console.log(`🚀 API rodando em ${host}`);
});
