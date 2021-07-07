const { request, response } = require("express");
const Mensaje = require("../models/Mensaje");

const addMensaje = async (req = request, res = response) => {
  const { nombre, email, mensaje } = req.body;
  const message = new Mensaje({ nombre, email, mensaje });

  await message.save();

  res.json({
    ok: true,
    message,
  });
};

const getMensaje = async (req = request, res = response) => {
  const { limite = 0, desde = 0 } = req.query;

  const mensajes = await Mensaje.find()
    .sort({ createdAt: "desc" })
    .skip(parseInt(desde.toString()))
    .limit(parseInt(limite.toString()));

  // const uid = (req as any).uid;
  // const user = (req as any).usuario;

  res.json({
    mensajes,
  });
};

module.exports = {
  getMensaje,
  addMensaje,
};
