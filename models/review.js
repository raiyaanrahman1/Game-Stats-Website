const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    user: String,
	game: mongoose.Schema.Types.ObjectId,
    content: String,
    cpuMark: Number,
}, { timestamps: true } );

const Review = mongoose.model('Review', ReviewSchema)

module.exports = { Review }