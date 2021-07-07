const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombres obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  check: {
    type: Boolean,
    required: [true, "Esto obligatorio"],
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  return { ...rest, uid: _id };
};

module.exports = model("Usuario", UsuarioSchema);
