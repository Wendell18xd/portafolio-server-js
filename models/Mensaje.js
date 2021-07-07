const { Schema, model } = require("mongoose");

const MensajeSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombres obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
    },
    mensaje: {
      type: String,
      required: [true, "El mensaje es obligatorio"],
    },
  },
  {
    timestamps: true,
  }
);

MensajeSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  return { ...rest, uid: _id };
};

module.exports = model("Mensaje", MensajeSchema);
