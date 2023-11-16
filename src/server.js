import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("<h1>hola mundo desde express<h1>");
});

app.listen(8080, () => console.log("server listening on port 8080"));