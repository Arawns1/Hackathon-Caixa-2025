module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  if (err.status === 400) {
    return res
      .status(400)
      .json({ detalhe: err.detalhe || "Erro ao validar dados" });
  }

  if (err.status === 404) {
    return res
      .status(404)
      .json({ detalhe: err.detalhe || "Erro ao validar dados" });
  }

  res.status(500).json({ erro: "Erro interno. Tente novamente mais tarde." });
};
