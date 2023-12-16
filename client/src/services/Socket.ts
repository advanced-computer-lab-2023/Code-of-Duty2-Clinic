// socket.js
import { io } from "socket.io-client";
import { config } from "../configuration";

const socket = io(config.socketServerUri);

export function establishSocketConnection(token: string, userId: string) {
  if (!token) return;

  socket.auth = { token, userId };

  socket.connect();
}

export default socket;
