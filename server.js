import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.static('./'));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

const players = {}; 

io.on("connection", (socket) => {
  console.log("Nuevo jugador conectado:", socket.id);

  const initialData = { x: 0, y: 1.0, z: 0, ry: 0 }; 
  players[socket.id] = initialData;

  socket.emit("existingPlayers", players);

  socket.broadcast.emit("updatePlayer", { id: socket.id, ...initialData });

  socket.on("playerMove", (data) => {
    players[socket.id] = data; 
    socket.broadcast.emit("updatePlayer", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
    delete players[socket.id];
    socket.broadcast.emit("removePlayer", socket.id);
  });
});


httpServer.listen(3000, () => console.log("Servidor Socket.IO corriendo..."));