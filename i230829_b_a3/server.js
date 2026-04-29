const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const rateLimit = require('express-rate-limit');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50, 
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.url.includes('/admin') 
});

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    limiter(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  });

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  global.io = io;

  httpServer.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});