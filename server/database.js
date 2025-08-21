const Database = require("better-sqlite3");

let db;

function init(path = "db.sqlite") {
  db = new Database(path);

  // cria tabela
  db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      nome varchar(200) NOT NULL,
      taxa_anual numeric(10,9) NOT NULL,
      prazo_maximo smallint NOT NULL
    );
  `);

  // popula tabela se vazia
  const count = db.prepare("SELECT COUNT(*) AS c FROM produto").get().c;
  if (count === 0) {
    const stmt = db.prepare(
      "INSERT INTO produto (nome, taxa_anual, prazo_maximo) VALUES (?, ?, ?)"
    );
    const produtos = [
      ["Empréstimo Pessoal", 0.23236, 48],
      ["Crédito Consignado", 0.122, 72],
      ["Financiamento Imobiliário", 0.9, 360],
      ["Crédito Automotivo", 0.147, 60],
      ["Empréstimo Empresarial", 0.163, 120],
    ];
    const insertMany = db.transaction((produtos) => {
      for (const p of produtos) stmt.run(...p);
    });
    insertMany(produtos);
  }

  return db;
}

function getDB() {
  if (!db) throw new Error("Database not initialized. Call init() first.");
  return db;
}

module.exports = { init, getDB };
