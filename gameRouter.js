const { ObjectId } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Game } = require('./models/game')

const GameRoutes = require('express').Router();

const bodyParser = require('body-parser')
GameRoutes.use(bodyParser.json());

// get all games
GameRoutes.get('/', (req, res) => {
    Game.find().then(
        games => {
            res.send({ games }); 
        },
        error => {
            res.status(500).send(error); 
        }

    )
});

// get game by id
GameRoutes.get('/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    Game.find({_id: id}).then(
        games => {
            res.send(games); 
        },
        error => {
            res.status(500).send(error); 
        }

    )
});


// add new game
/*
Request body expects: {
	"title": <game name>,
    "publisher": <publisher name>,
	"genres": <a list of genres>,
	"description": <game description>,
    "coverArt": <a url to the cover art>
} */
GameRoutes.post('/', (req, res) => {
    console.log(req.body)
    const game = new Game({
        title: req.body.title,
        publisher: req.body.publisher,
        genres: req.body.genres,
        description: req.body.description,
        coverArt: req.body.coverArt, // TODO: add this to admin dashboard
        numVotes: 0,  
        numLikes: 0,
        numReviews: 0,
        reviews: []
	})

    game.save().then(
        saveRes => {
            res.send(saveRes);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    )

});


module.exports = GameRoutes;