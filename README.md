# team61

## Accessing Web App
Can use web app online with the following link:
URL: https://still-mountain-63393.herokuapp.com/

## Third Party Libraries and Packages
- React
- React Router
- Chart.js
- MongoDB/Mongoose

## How to run locally if needed
1. Clone the repo to your local machine.
2. navigate to the team61 folder and make a folder called 'mkdir mongo-data' and then 'mongod --dbpath mongo-data' to set up database
3. open a new terminal and navigate to team61 folder and run 'npm install' and then navigate to app folder and run 'npm install' to install all dependencies
4. navigate to team61 folder and run 'npm start' to start the server on local host
5. open another terminal and navigate to the app folder and run 'npm run build' to create the production build
6. go to http://localhost:5000/ to use the web app locally
7. can connect with MongoDB Compass to see and manage the database if needed

## -Using the App-

### Homepage:

The homepage lists the games in the system, displaying their cover art, title, publisher, and overall rating on the website. We have some example games set up in the database
that you should be able to see on the homepage

### Games page:

Clicking on a game on the homepage brings up a page providing more detail about the game such as genres, description, and a list of user reviews. You can click on the thumbs up and thumbs down buttons to like or dislike the game and the percentage will change accordingly.   
Between the game description and the reviews, there are 3 buttons:
The 'test my hardware' will bring up a window for users to select and check whatever the hardware provided is capable of running the current game.
Pressing 'write a review' will bring up a textbox where users can type out a review for the game and submit it to the website.
Pressing 'add to favourites' will add the game to the user's favourite games list.

You can also access a game's page by typing its name in the search bar on the home page and clicking enter.
   
### Charts Page:

Clicking on the Charts button at the top of the website will bring up the charts page. There are a few charts there displaying information about games in the system such as
most liked games, most reviewed games, etc. You can hover over a bar in a chart to see it's exact value. 

### Login:

Clicking the login button at the top of the website brings up the login page. Users can login with an existing profile's username and password, or create a new one by pressing sign up. 

#### Regular User Login: 

Can log in with username: user and password: user to sign in as an example regular user. The MyProfile button will bring up the user's profile page displaying the user's information such as profile pic, username, description, their top games, and their top reviews. 

#### Admin Login: 

Can log in with username: admin and password: admin to see admin funcitonality. Is similiar to the regular user login except that it also creates an Admin button at the top that opens up the admin dashboard. Admins have 3 options on the dashboard: 
-Stats:
Clicking the Stats button displays some current website statistics
-Games:
Clicking Games button will allow the Admin to add or edit a game. It starts on Edit mode where the admin can use the search bar to find a game in the system and then modify it's data fields. Clicking on 'add a game' will switch to Add mode where the admin can fill in the info for a game and then add it to the database. 
-Users:
Clicking Users button will allow the Admin to manage users. The admin can search up a user with the search bar. "Ban User' will remove the user from the database. 'Edit user profile' will let the Admin edit the User's profile information such as profile picture, username, and description. 'Edit User's reviews' will let the admin edit a review the user made. 

### Sign Up:
Signing up with a username and password adds a new regular user to the database and automatically logs you in as that user. Usernames have a maximum length of 10 characters

## -Server routes-

# Session Routes

/users/login:  ***************

Method: POST

Request:

Response:


/users/logout:  *************

Method: GET

Request:

Response:


/users/check-session: ************

Method: GET

Request:

Response:


# API routes

### /api/users

Add a new user to the database 

Method: POST

Request: { 'username': <username>, 'password': <password>, 'role': <1 for reg user, 2 for admin> }

Response: JSON of the database document added


### /api/users
	
Get all users in the database
	
Method: GET
	
Request: No body
	
Response: A list of all User database documents in the database
	

### /api/users/:username
	
Get a single user by username
	
Method: GET
	
Request: No body
	
Response: The user database document for this username

### /api/games
	
Get all games in the database 
	
Method: GET
	
Request: No body
	
Response: A list of all Game database documents in the database
	

### /api/games/:id
	
Get game by id
	
Method: GET
	
Request: No body
	
Response: The Game database document for this id
	

### /api/games **************************** should the request body have numVotes, numLikes etc.? uses them in route
	
Add a game to the database
	
Method: POST
	
Request: {
	"title": <game name, non-empty>,
    "publisher": <publisher name>,
	"genres": <a list of genres>,
	"description": <game description>,
    "coverArt": <a url to the cover art>,
   "numVotes: <total number of likes + dislikes>,
   "numLikes": <number of likes>,
   "numreviews": <number of reviews>,
   "reviews": <list of reviews on this game>,
}
	
Response:
	

### /api/games/search/:title  ************** unused?
	
?
	
Method: GET
	
Request: 
	
Response: 
	

### /api/games/:id
	
Updated the game with the given id
	
Method: PATCH
	
Request: {
	"title": <game name, non-empty>,
    "publisher": <publisher name>,
	"genres": <a list of genres>,
	"description": <game description>,
    "coverArt": <a url to the cover art>
}
	
Response: The updated Game database document 
	





