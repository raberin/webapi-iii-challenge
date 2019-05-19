const express = require("express");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());

//custom middleware
server.use(logger);

//routers
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request - ${req.url} `
  );
  next();
}

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Err err errror",
    err
  });
});

module.exports = server;
