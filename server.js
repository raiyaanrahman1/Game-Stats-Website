"use strict";

const log = console.log;
const path = require("path");

const express = require("express");
// starting the express server
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// enable CORS if in development, TODO: remove when deploy
const cors = require("cors");
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
//mongoose.set("useFindAndModify", false); // for some deprecation issues

const { User } = require("./models/user");

// import the mongoose models
// TODO:

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require("connect-mongo"); // to store session information on the database in production

function isMongoError(error) {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user)
      .then((user) => {
        if (!user) {
          return Promise.reject();
        } else {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(401).send("Unauthorized");
      });
  } else {
    res.status(401).send("Unauthorized");
  }
};

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store: null,
  })
);


//Get all users, for debugging purposes
app.get("/users", (req, res) => {
    if (mongoose.connection.readyState != 1) {
      log("Issue with mongoose connection");
      res.status(500).send("Internal server error");
      return;
    }
  
    User.find()
      .then((users) => {
        res.send(users);
      })
      .catch((error) => {
        log(error);
        res.status(500).send("Internal Server Error");
      });
  });

// A route to login and create a session
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // log(email, password);
  // Use the static method on the User model to find a user
  // by their email and password
  User.findByUserPassword(username, password)
    .then((user) => {
      // Add the user's id to the session.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      res.send({ currentUser: user.username });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

app.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

app.get("/users/check-session", (req, res) => {
    if (req.session.username) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** Actual API Routes below ************************************/
app.post("/api/users", mongoChecker, async (req, res) => {
  log(req.body);

  // TODO: Create a new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: 1,
    likedGames: [],
    dislikedGames: [],
  });

  try {
    // Save the user
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    if (isMongoError(error)) {
      // check for if mongo server suddenly disconnected before this request.
      res.status(500).send("Internal server error");
    } else {
      log(error);
      res.status(400).send("Bad Request"); // bad request for changing the student.
    }
  }
});

const GameRoute = require("./gameRouter.js");
app.use("/api/games", GameRoute);
/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/app/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/app/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
