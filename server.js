import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";

const app = express();
app.use(express.static('./'));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const players = {};

function saveUsername(username) {
    fs.appendFileSync('usernames.txt', username + '\n', 'utf8');
}

io.on("connection", (socket) => {
    console.log("🔗 Nuevo jugador conectado:", socket.id);

    // 💡 CORRECCIÓN CLAVE: Datos iniciales en una posición segura (5, 5) 
    // y altura de suelo corregida (y: 0) para evitar colisiones iniciales y desincronización de altura.
    players[socket.id] = { x: 5, y: 0, z: 5, ry: 0, username: 'Player_'+Math.floor(Math.random()*1000) };

    // Mandar jugadores existentes
    socket.emit("existingPlayers", players);

    // Mandar al resto del server
    socket.broadcast.emit("updatePlayer", { id: socket.id, ...players[socket.id] });

    // Guardar username enviado por cliente
    socket.on("setUsername", (username) => {
        players[socket.id].username = username;
        saveUsername(username);
        console.log(`Jugador ${socket.id} registró username: ${username}`);
        // Actualizar a otros jugadores
        socket.broadcast.emit("updatePlayer", { id: socket.id, ...players[socket.id] });
    });

    socket.on("playerMove", (data) => {
        // Asegurarse de que el username no se pierda
        players[socket.id] = { ...data, username: players[socket.id].username };
        // Esto envía la posición a todos los demás clientes
        socket.broadcast.emit("updatePlayer", { id: socket.id, ...players[socket.id] }); 
    });

    socket.on("disconnect", () => {
        console.log("❌ Jugador desconectado:", socket.id);
        delete players[socket.id];
        socket.broadcast.emit("removePlayer", socket.id);
    });
});

httpServer.listen(3000, () => console.log("Servidor Socket.IO corriendo..."));