# team61

## Third Party Libraries and Packages
- React
- React Router

How to run:
1. Clone the repo to your local machine.
2. navigate to the src folder in the terminal
3. execute: "npm install" to install all dependencies
4. execute: "npm start" to start the local development server

##-USING THE APP-##

#Homepage:

The homepage lists the games in the system, displaying their cover art, title, publisher, and overall rating on the website. Currently, no database is implemented, so ratings are randomly generated and title, publisher, and cover art are just placeholders. 

#Games page:

Clicking on a game in the homepage brings up a page providing more detail about the game such as genres, description, and a list of user reviews. Currently, there is only one example game page for clicking on any of the games on the homepage, but each game would get it's own page once the server and database are connected. You can click on the thumbs up and thumbs down button to like or dislike the game and the percentage will change accordingly. The test hardware and add to favourites buttons are currently unused due to requiring data from the server. Normally test hardware would get the user's hardware data from their profile and compare it to the hardware of the users who rated the game to determine if the user is likely to be able to run the game well. Pressing write a review will bring up a textbox where users can type out a review, but submitting currently does not work again due to not having anywhere to store the review and will be implemented once the server is setup. 

#Charts Page:

Clicking on the Charts button at the top of the website will bring up the charts page. Currently, there are a few example charts, but normally we would get data from the server to calculate the data for the graphs. The example charts are just there to show that we can have any number of charts with any number of games in them. 

#Login:

Clicking the login button at the top of the website brings up the login page. 

-Regular User Login: 

Logging in in with username: user and password: user will add a new button options on the top of the website. The MyProfile button will bring up an example user profile page displaying the user's information such as profile pic, username, their top games, and their top reviews. Currently, most features are non-functional due to requiring a server to get or store data. Clicking the logout button on the top will return to the regular view from before logging in.

-Admin Login: 

Logging in with username: admin and password: admin is similiar to the regular user login except that it also creates an Admin button at the top that would open up the admin dashboard. Admins would be able to use the dashboard to: add or remove games, reviews, and users, and they would be able to modify the charts page. 



