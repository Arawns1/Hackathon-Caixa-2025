const express = require("express");
const cors = require("cors");
const database = require("./database");
const errorHandler = require("./errorHandler");
const Decimal = require("decimal.js");

const app = express();
const port = process.env.PORT || 3000;
const host = "http://localhost:" + port;

app.use(cors());
app.use(express.json());

const db = database.init("./db.sqlite");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Lista produtos
app.get("/produtos", (req, res, next) => {
  try {
    const produtos = db.prepare("SELECT * FROM produto").all();
    res.json(produtos);
  } catch (err) {
    next(err);
  }
});

// Cadastra Produtos
app.post("/produtos", (req, res, next) => {
  try {
    const { nome, taxa_anual, prazo_maximo } = req.body;

    if (!nome || taxa_anual == null || prazo_maximo == null) {
      return res.status(400).json({ detalhe: "Dados inválidos" });
    }

    const taxa_anual_em_decimal = taxa_anual / 100;

    const db = database.getDB();
    const stmt = db.prepare(
      "INSERT INTO produto (nome, taxa_anual, prazo_maximo) VALUES (?, ?, ?)"
    );
    const result = stmt.run(nome, taxa_anual_em_decimal, prazo_maximo);

    res.status(201).json({
      id: result.lastInsertRowid,
      nome,
      taxa_anual,
      prazo_maximo,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/simulacoes", (req, res, next) => {
  try {
    const { id_produto, valor_solicitado, prazo } = req.body;

    if (!id_produto || valor_solicitado == null || prazo == null) {
      return res.status(400).json({ detalhe: "Dados inválidos" });
    }

    const db = database.getDB();
    const stmt = db.prepare("SELECT * FROM produto WHERE id = ?");
    const produto = stmt.get(id_produto);

    if (!produto)
      return res.status(404).json({ detalhe: `Produto não encontrado` });

    if (prazo > produto.prazo_maximo)
      return res.status(400).json({
        detalhe:
          "Prazo solicitado excede o prazo máximo permitido para este produto.",
      });

    // Calculo Price
    const valorSolicitado = new Decimal(valor_solicitado);
    const taxaMensal = new Decimal(produto.taxa_anual).div(12);
    const parcela = calcularParcelaPriceDecimal(
      valorSolicitado,
      taxaMensal,
      prazo
    );

    let saldo_devedor = valorSolicitado;
    let valor_total_em_juros = new Decimal(0);
    let valor_total_amortizado = new Decimal(0);
    let valor_total_com_juros = new Decimal(0);

    const parcelas = [];

    for (let i = 1; i <= prazo; i++) {
      const valor_juros = saldo_devedor.mul(taxaMensal);
      const valor_amortizacao = parcela.sub(valor_juros);
      saldo_devedor = saldo_devedor.sub(valor_amortizacao);
      valor_total_em_juros = valor_total_em_juros.add(valor_juros);
      valor_total_amortizado = valor_total_amortizado.add(valor_amortizacao);
      valor_total_com_juros = valor_total_com_juros.add(parcela);
      parcelas.push({
        numero: i,
        valor_amortizacao: valor_amortizacao.toFixed(2),
        valor_juros: valor_juros.toFixed(2),
        valor_prestacao: parcela.toFixed(2),
        saldo_devedor: saldo_devedor.toFixed(2),
      });
    }

    const idSimulacao = `${produto.id}${valorSolicitado
      .toFixed(2)
      .replace(/[.,-]/g, "")}${prazo}`;

    res.status(200).json({
      id: idSimulacao,
      produto,
      resultado_simulacao: {
        valor_solicitado: valorSolicitado.toFixed(2),
        prazo,
        taxa_efetiva_mensal: taxaMensal.toFixed(6),
        parcela_mensal: parcela.toFixed(2),
        valor_total_com_juros: parcela.mul(prazo).toFixed(2),
        valor_total_amortizado: valorSolicitado.toFixed(2),
        valor_total_em_juros: valor_total_em_juros.toFixed(2),
        parcelas,
      },
    });
  } catch (err) {
    next(err);
  }
});

function calcularParcelaPriceDecimal(valorSolicitado, taxa, prazo) {
  if (taxa.eq(0)) return valorSolicitado.div(prazo);
  const fator = taxa.add(1).pow(prazo);
  return valorSolicitado.mul(taxa.mul(fator)).div(fator.sub(1));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 API rodando em ${host}`);
});
