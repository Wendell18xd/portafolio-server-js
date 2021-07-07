const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const { rewrite } = require("../controllers/rewrite");
const Sockets = require("./Sockets");

const authRouter = require("../routers/auth");
const mensajesRouter = require("../routers/mensajes");

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
    //http server
    this.server = http.createServer(this.app);
    //Conexion socket
    this.io = socketio(this.server, {});
    //Inicializar server socket
    this.sockets = new Sockets(this.io);
    this.sockets.socketEvents();
    //Middlewares
    this.middlewares();
    //Rutas de nu aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
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
    this.server.listen(this.port, () => {
      console.log("Servidor Corriendo en", this.port);
    });
  }
}

module.exports = Server;
