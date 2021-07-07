const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({ msg: "put API - controlador", id });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.json({ msg: "post API - controlador", nombre, edad });
};

const usuarioDelete = (req, res = response) => {
  res.json({ msg: "delete API - controlador" });
};

const usuarioPatch = (req, res = response) => {
  res.json({ msg: "Patch API - controlador" });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
  usuarioPatch,
};
