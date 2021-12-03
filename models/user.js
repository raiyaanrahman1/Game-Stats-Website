const mongoose = require('mongoose')


// TODO: see: https://github.com/csc309-fall-2021/react-express-authentication/blob/master/models/user.js for reference


const User = mongoose.model('User', {
	
	// TODO: add more info
	name: String,
	psssword: String,
	role: int,  			// 1 = user, 2 = admin

	likedGames: [object.ID],
	dislikedGames: [object.ID]

})

module.exports = { User }