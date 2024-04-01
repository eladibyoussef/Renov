import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Application = express();

const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; 

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket: Socket) => {
  console.log("a user connected", socket.id);

  const userId: string = socket.handshake.query.userId as string;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
