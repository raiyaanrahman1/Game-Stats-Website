const { ObjectId } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Game } = require("./models/game");

const GameRoutes = require("express").Router();

const bodyParser = require("body-parser");
GameRoutes.use(bodyParser.json());

// get all games
GameRoutes.get("/", (req, res) => {
  Game.find().then(
    (games) => {
      res.send({ games });
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// get game by id
GameRoutes.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }

  Game.find({ _id: id }).then(
    (games) => {
      res.send(games);
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// add new game
/*
Request body expects: {
	"title": <game name, non-empty>,
    "publisher": <publisher name>,
	"genres": <a list of genres>,
	"description": <game description>,
    "coverArt": <a url to the cover art>
} */
GameRoutes.post("/", (req, res) => {
  console.log(req.body);
  const game = new Game({
    title: req.body.title,
    publisher: req.body.publisher,
    genres: req.body.genres,
    description: req.body.description,
    coverArt: req.body.coverArt,
    numVotes: req.body.numVotes,
    numLikes: req.body.numLikes,
    numReviews: req.body.numReviews,
    reviews: req.body.reviews,
  });

  game.save().then(
    (saveRes) => {
      res.send(saveRes);
    },
    (error) => {
      res.status(400).send(error); // 400 for bad request
    }
  );
});

// search by title, not used
GameRoutes.get("/search/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const games = await Game.find(
      { title: { $regex: title, $options: "i" } },
      function (err, docs) {}
    ).clone();

    console.log(games);
    res.send({ games });
  } catch (error) {
    console.log(error);
  }
});

// edit a game
/*
Request body expects: {
	"title": <game name, non-empty>,
    "publisher": <publisher name>,
	"genres": <a list of genres>,
	"description": <game description>,
    "coverArt": <a url to the cover art>
} */
GameRoutes.patch("/:id", async (req, res) => {
  console.log("patch", req.body);

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return; // so that we don't run the rest of the handler.
  }

  const game = await Game.findById(id);
  if (!game) {
    res.status(404).send("game not found"); // could not find this reservation
    return;
  }

  game.title = req.body.title;
  game.publisher = req.body.publisher;
  game.genres = req.body.genres;
  game.description = req.body.description;
  game.coverArt = req.body.coverArt;
  game.save();

  res.send({ game });
});

module.exports = GameRoutes;
