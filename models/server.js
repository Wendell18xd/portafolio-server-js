const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      mensajes: "/api/mensajes",
      proyectos: "/api/proyectos",
    };

    //Conectar a base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de nu aplicacion
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.mensajes, mensajesRouter);

    //Declarar que el index.html maneje las rutas
    this.app.get("/*", rewrite);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo en", this.port);
    });
  }
}

module.exports = Server;
