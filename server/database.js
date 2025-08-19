const Database = require("better-sqlite3");

let db;

function init(path = "db.sqlite") {
  db = new Database(path);

  // cria tabela
  db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      taxa_anual REAL,
      prazo_maximo INTEGER
    );
  `);

  // popula tabela se vazia
  const count = db.prepare("SELECT COUNT(*) AS c FROM produto").get().c;
  if (count === 0) {
    const stmt = db.prepare(
      "INSERT INTO produto (nome, taxa_anual, prazo_maximo) VALUES (?, ?, ?)"
    );
    const produtos = [
      ["Empréstimo Pessoal", 23.236, 48],
      ["Crédito Consignado", 12.2, 72],
      ["Financiamento Imobiliário", 9.0, 360],
      ["Crédito Automotivo", 14.7, 60],
      ["Empréstimo Empresarial", 16.3, 120],
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
