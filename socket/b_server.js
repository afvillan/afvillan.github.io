import express from "express";
import { log } from "node:console";

import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  //   res.send("<h1>Hello world</h1>");
  res.sendFile("b_client.html", { root: __dirname });
});

server.listen(3000, () => {
  console.log("\nServer running at http://localhost:3000");
  console.log("__dirname:", __dirname);
});
