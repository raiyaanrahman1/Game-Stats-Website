"use strict";

const log = console.log;
const path = require("path");

const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== "production" && process.env.TEST_USER_ON; // option to turn on the test user.
const TEST_USER_ID = "61adf86ceee1afe5ce7e988f"; // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USERNAME = "test";
const TEST_ROLE = 1;

const express = require("express"); // starting the express server
const app = express();

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// enable CORS if in development, TODO: remove when deploy
const cors = require("cors");
if (env !== "production") {
  app.use(cors());
}

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
const { ObjectID } = require("mongodb");

const { User } = require("./models/user");

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

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store:
      env === "production"
        ? MongoStore.create({
            mongoUrl:
              process.env.MONGODB_URI || "mongodb://localhost:27017/API",
          })
        : null,
  })
);

const authenticate = (req, res, next) => {
  if (env !== "production" && USE_TEST_USER) req.session.user = TEST_USER_ID; // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

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
      req.session.username = user.username;
      req.session.role = user.role;
      res.send({ currentUser: user.username, role: user.role });
    })
    .catch((error) => {
      res.status(400).send();
    });
});

app.get("/users/logout", authenticate, (req, res) => {
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
  if (env !== "production" && USE_TEST_USER) {
    // test user on development environment.
    req.session.user = TEST_USER_ID;
    req.session.username = TEST_USERNAME;
    res.send({ currentUser: TEST_USERNAME, role: TEST_ROLE });
    return;
  }

  if (req.session.username) {
    res.send({ currentUser: req.session.username, role: req.session.role });
  } else {
    res.status(401).send();
  }
});

/*** Actual API Routes below ************************************/
app.post("/api/users", mongoChecker, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  const user = new User({
    username: username,
    password: password,
    description: "",
    role: role ? role : 1,
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
    } else if (error.name === "MongoError" && error.code === 11000) {
      res.status(400).send("User already exist!");
    } else {
      res.status(400).send(error);
    }
  }
});

//Get all users, for debugging purposes
app.get("/api/users", (req, res) => {
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

app.get(("/api/users/:username") , (req, res) => {
  const username = req.params.username;

  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  User.findOne({username: username})
    .then((user) => {
      if (!user) {
        res.status(400).send("Resource not found");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
  });

//delete all users... need to get rid of this later lmao
app.delete("/api/users", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  User.collection.drop();
  res.status(200).send("Deleted.");
});

app.post("/api/users/:username/updateDesc", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  const username = { username: req.body.username };
  const newDescription = { description: req.body.description };

  console.log(username);
  console.log(newDescription);
  User.findOne(username, { new: true })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(400).send("Resource not found");
      } else {
        user.description = req.body.description;
        user.save();
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/api/users/:username/likeGame", (req, res) => {
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  }

  const gameId = String(req.body.gameId);
  const username = { username: req.body.username };

  console.log(gameId);
  console.log(username);

  User.findOne(username)
    .then((user) => {
      if (!user) {
        res.status(400).send("Resource not found");
      } else {
        const likedGames = user.likedGames;
        likedGames.push(gameId);
        user
          .save()
          .then(() => {
            res.send({ likedGames: likedGames });
          })
          .catch((error) => {
            log(error);
            res.status(500).send("Internal Server Error");
          });
      }
    })
    .catch((error) => {
      log(error);
      res.status(500).send("Internal Server Error");
    });
});

const GameRoute = require("./gameRouter.js");
const { Game } = require("./models/game");
app.use("/api/games", GameRoute);
/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/app/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/app/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
