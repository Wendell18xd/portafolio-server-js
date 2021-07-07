const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    req.uid = uid;

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido - usuario no existe",
      });
    }

    if (!usuario.check) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido - usuario invalido",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
