// express.js
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const jsChessEngine = require("js-chess-engine");

const game = new jsChessEngine.Game();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/move", (req, res) => {
  // {
  //	"from": "e2",
  //	"to": "e4"
  // }
  const { from, to } = req.body;
  game.move(from, to);
  game.aiMove(3);
  console.log("player: " + from + to);
  // get the first move in the last history
  res.send(
    game.getHistory().reverse()[0].from.toLowerCase() +
      game.getHistory()[0].to.toLowerCase()
  );
  game.getHistory().reverse();
  console.log(
    "ai: " +
      game.getHistory()[0].from.toLowerCase() +
      game.getHistory()[0].to.toLowerCase()
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});