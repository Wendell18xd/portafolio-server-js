const { Router } = require("express");
const { check } = require("express-validator");

//Controllers
const { login, register, renewToken } = require("../controllers/auth");
//helper - middlewares
const { emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Login
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe ser como minimo 6 caracteres").isLength(
      { min: 6 }
    ),
    validarCampos,
  ],
  login
);

//Register
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe ser String").isString(),
    check(
      "nombre",
      "El nombre debe de tener 3 caracteres como minimo"
    ).isLength({ min: 3 }),
    check("email").custom(emailExiste),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe ser como minimo 6 caracteres").isLength(
      { min: 6 }
    ),
    validarJWT,
    validarCampos,
  ],
  register
);

//Revalidar Token
router.get("/renew", validarJWT, renewToken);

module.exports = router;
