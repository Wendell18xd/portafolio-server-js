const Usuario = require("../models/Usuario");

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ email: correo });
  if (existeEmail) {
    throw new Error(`El Correo ${correo} ya existe`);
  }
};

module.exports = {
  emailExiste,
};
