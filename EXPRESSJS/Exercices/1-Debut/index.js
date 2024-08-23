var express = require("express");
const { dirname, join, normalize } = require("path");

var app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome here !");
});

app.get("/fin", (req, res) => {
  res.send("Well done ! You are in a new page");
});

app.get("/img", express.static(join(__dirname, "public", "img")));

app.listen(1216, () => {
  console.log("Serveur demarré sur le port 1216");
});
