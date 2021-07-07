class Sockets {
  constructor(io) {
    this.io = io;
  }

  socketEvents() {
    //On Connection
    this.io.on("connection", (socket) => {
      console.log("Cliente online");

      //   socket.emit("prueba-a", { msg: "HOla" });
    });
  }
}
module.exports = Sockets;
