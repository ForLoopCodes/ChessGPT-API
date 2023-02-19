// express.js
const express = require("express");
const app = express();

app.use(express.json());
const jsChessEngine = require("js-chess-engine");

let game = new jsChessEngine.Game();

const reset = () => {
  game = new jsChessEngine.Game();
};

app.get("/", (req, res) => {
  res.send(
    "ChessGPT API, ChessGPT is a chess engine that uses AI to play chess. Make a move by sending a post request to /move. Reset the game by sending a post request to /reset. Get the current fen by sending a get request to /fen."
  );
});

app.post("/move", (req, res) => {
  // {
  //	"from": "e2",
  //	"to": "e4"
  // }
  const { from, to } = req.body;
  game.move(from, to);
  game.aiMove(3);
  //
  console.log("player: " + from + to);
  // get the first move in the last history
  res.send(
    game.getHistory().reverse()[0].from.toLowerCase() +
      game.getHistory()[0].to.toLowerCase()
  );
  console.log(
    "ai: " +
      game.getHistory()[0].from.toLowerCase() +
      game.getHistory()[0].to.toLowerCase()
  );
  game.getHistory().reverse();
});

app.post("/reset", (req, res) => {
  reset();
  res.send("reset");
});

app.get("/fen", (req, res) => {
  res.send(game.exportFEN());
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
});
