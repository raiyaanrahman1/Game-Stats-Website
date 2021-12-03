const mongoose = require('mongoose')

// const GenreSchema = new mongoose.Schema({
//     genre: String,
// });

const Game = mongoose.model('Game', {
	
	title: String,
	publisher: String,
	genres: [String],
	description: String,
	coverArt: String, // image url
	numVotes: Number,  
	numLikes: Number,
	numReviews: Number,
	reviews: [], // TODO: TBD
})

module.exports = { Game }