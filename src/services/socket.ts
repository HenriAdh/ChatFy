import { io } from "socket.io-client";
import { API_URL } from "../settings";

const socket = io(API_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
  autoConnect: true,
  path: "",
});

console.log("SOCKET URL:", API_URL);

socket.on("connect", () => console.log("Conectado ao WebSocket"));

export default socket;
