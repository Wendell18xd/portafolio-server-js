const { Router } = require("express");
const { check } = require("express-validator");

const { addMensaje, getMensaje } = require("../controllers/mensajes");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/add",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email es incorrecto").isEmail(),
    check("mensaje", "El mensaje es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  addMensaje
);

router.get("/list", validarJWT, getMensaje);

module.exports = router;
