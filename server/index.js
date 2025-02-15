import express from "express";
//import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import pkg from 'colyseus';
const { Server } = pkg;

const app = express();
const server = createServer(app);

// Create Colyseus server
const gameServer = new Server({
  transport: new WebSocketTransport({
    server, // pass the HTTP server
  }),
});

// Define a room
gameServer.define("my_room", class MyRoom {
  onCreate(options) {
    console.log("Room created!", options);
  }

  onJoin(client, options) {
    console.log("Client joined!", client.sessionId);
  }

  onLeave(client, options) {
    console.log("Client left!", client.sessionId);
  }

  onDispose() {
    console.log("Room disposed!");
  }
});

// Start the server
const PORT = 3001;
gameServer.listen(PORT);
console.log(`Colyseus server is running on ws://localhost:${PORT}`);