const http = require('node:http');
const { createBareServer } = require('@tomphttp/bare-server-node');
const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const httpServer = http.createServer();

const bareServer = createBareServer("/bare/");

httpServer.on("request", (req, res) => {
  
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
  
    app(req, res);
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

app.use((req, res) => {
 
  res.status(404).sendFile(path.join(__dirname, 'public', '/public/404.html'));
});
const port = 2100;

httpServer.on("listening", () => {
  console.log("HTTP server listening");
  console.log(`View your server at http://localhost:${port}`);
});

httpServer.listen({
  port: port,
});
