const { request, response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req = request, res = response, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json(erros);
  }
  next();
};

module.exports = {
  validarCampos,
};
