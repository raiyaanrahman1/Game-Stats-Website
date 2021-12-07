const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// TODO: see: https://github.com/csc309-fall-2021/react-express-authentication/blob/master/models/user.js for reference

const UserSchema = new mongoose.Schema({
  // TODO: add more info
  username: {
    type: String,
    unique: true,
    maxlength: 10,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  password: String,
  role: Number, // 1 = user, 2 = admin
  likedGames: [],
  dislikedGames: [],
});

UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByUserPassword = function (username, password) {
  const User = this; // binds this to the User model

  // First find the user by their username
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject(); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
