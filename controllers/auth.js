const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //verficar si el email existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
        ok: false,
      });
    }

    //Verificar password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
        ok: false,
      });
    }

    //Verificar si el ususario es apto de usar mi sistema
    if (!usuario.check) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
        ok: false,
      });
    }
    usuario.password = null;
    //Generar token
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const register = async (req = request, res = response) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password });

  //Encrytar la contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  usuario.password = null;

  res.json({
    ok: true,
    usuario,
  });
};

const renewToken = async (req = request, res = response) => {
  const uid = req.uid;

  //Generar un nuevo JWT
  const token = await generarJWT(uid);

  //Obtener el usuario por uid
  const usuario = await Usuario.findById(uid);
  usuario.password = null;
  res.json({
    ok: true,
    usuario,
    token,
  });
};

module.exports = {
  login,
  register,
  renewToken,
};
