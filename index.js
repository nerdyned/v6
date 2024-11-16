const http = require('node:http');
const { createBareServer } = require('@tomphttp/bare-server-node');
const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory (CSS, JS, images, etc.)
app.use(express.static('public'));

// Create a Bare server instance to handle requests starting with "/bare/"
const bareServer = createBareServer("/bare/");

// Create an HTTP server and handle requests
const httpServer = http.createServer((req, res) => {
  // If the request is for a bare route, route it with the bareServer
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    // Otherwise, handle it with Express (including static files)
    app(req, res);
  }
});

// Handle WebSocket upgrades with Bare server
httpServer.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

// Catch-all for 404 errors, serving only the 404.html page
app.use((req, res) => {
  // Send the 404.html only when no route matches
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the HTTP server
const port = 2100;

httpServer.on("listening", () => {
  console.log(`HTTP server listening`);
  console.log(`View your server at http://localhost:${port}`);
});

httpServer.listen({ port: port });
