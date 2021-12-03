"use strict";

const log = console.log;
const path = require('path')

const express = require("express");
// starting the express server
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

// enable CORS if in development, TODO: remove when deploy
const cors = require('cors')
app.use(cors())

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
// mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
// TODO:


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: null,
    })
);


// A route to login and create a session
app.post("/users/login", (req, res) => {
    // TODO: 
});

app.get("/users/check-session", (req, res) => {
    // I don't think we need this
} )

/*********************************************************/

/*** Actual API Routes below ************************************/
app.post('/api/users', mongoChecker, async (req, res) => {
    log(req.body)

    // TODO: Create a new user
    let user 

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

const GameRoute = require('./gameRouter.js');
app.use('/api/games', GameRoute);
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