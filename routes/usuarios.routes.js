const { Router } = require("express");
const router = Router();

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuarioDelete,
  usuarioPatch,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuarioDelete);

router.patch("/", usuarioPatch);

module.exports = router;
