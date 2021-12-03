const mongoose = require('mongoose')

// const GenreSchema = new mongoose.Schema({
//     genre: String,
// });

const Game = mongoose.model('Game', {
	
	title: String,
	publisher: String,
	genres: String,
	description: String,
	coverArt: String, // image url
	numVotes: Integer,  
	numLikes: Integer,
	numReviews: Integer,
	reviews: [], // TODO: TBD
})

module.exports = { Game }