# team61

URL: https://still-mountain-63393.herokuapp.com/

## Third Party Libraries and Packages
- React
- React Router

## How to run:
1. Clone the repo to your local machine.
2. navigate to the src folder in the terminal
3. execute: "npm install" to install all dependencies
4. execute: "npm start" to start the local development server

## Using the App

### Homepage:

The homepage lists the games in the system, displaying their cover art, title, publisher, and overall rating on the website. Currently, no database is implemented, so ratings are randomly generated and title, publisher, and cover art are just placeholders. 

### Games page:

Clicking on a game on the homepage brings up a page providing more detail about the game such as genres, description, and a list of user reviews. Currently, all game pages are using the same hard-coded example information, but they will use actual information once the server and database are connected. You can click on the thumbs up and thumbs down buttons to like or dislike the game and the percentage will change accordingly.   
Between the game description and the reviews, there are 3 buttons, of which "add to favourites" buttons are currently unused due to requiring data from the server, other two will bring up a window to show what users can expect to see. 
The test hardware will bring up a window for users to select and check whatever the hardware provided is capable of running the current game. Currently, the result is hardcoded, but once connected to the server, it will get the user's hardware data from their profile and compare it to the hardware of the users who rated the game to determine if the user is likely to be able to run the game well.
Pressing write a review will bring up a textbox where users can type out a review, but submitting currently does not work again due to not having anywhere to store the review and will be implemented once the server is set up. 

You can also access a game's page by typing its exact name in the search bar and clicking enter. Once we implement the backend we will have a search results page so we can filter users vs game names and so we can build a more robust search functionality (the search bar will also be used to find users).
   
### Charts Page:

Clicking on the Charts button at the top of the website will bring up the charts page. Currently, there are a few example charts, but normally we would get data from the server to calculate the data for the graphs. The example charts are just there to show that we can have any number of charts with any number of games in them. 

### Login:

Clicking the login button at the top of the website brings up the login page. 

#### Regular User Login: 

Logging in in with username: user and password: user will add a new button options on the top of the website. The MyProfile button will bring up an example user profile page displaying the user's information such as profile pic, username, their top games, and their top reviews. Currently, most features are non-functional due to requiring a server to get or store data. Clicking the logout button on the top will return to the regular view from before logging in.

#### Admin Login: 

Logging in with username: admin and password: admin is similiar to the regular user login except that it also creates an Admin button at the top that would open up the admin dashboard. Admins would be able to use the dashboard to: add or remove games, reviews, and users, and they would be able to modify the charts page. 



