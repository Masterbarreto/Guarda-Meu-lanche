import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connection } from "./src/events/connection.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*", // Permitir qualquer origem (para desenvolvimento)
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const auth = socket.handshake.auth;
  const token = auth.token;

  if (!token) {
    next(new Error("token não fornecido."));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Falha na autenticação do token"));
    }

    socket.credentials = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  connection(io, socket);
});

server.listen(PORT, () => {
  const address = server.address();
  const url = `http://${address.address === "::" ? "localhost" : address.address}:${
    address.port
  }`;
  console.log(`servidor socket.io rodando em: ${url}`);
});
