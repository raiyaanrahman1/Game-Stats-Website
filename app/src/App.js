import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Game from './components/game/Game';
import Charts from './components/Charts.js';
import Login from './components/Login.js';
import Profile from './components/profile/Profile.js';
import Admin from './components/admin_dashboard/Admin.js';
import NavBar from './components/NavBar';
import SearchResults from './components/searchResults';
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameIcon from './components/GameIcon.js';
let gamesSet = false;
let gameList = [];
function App() {
	//let [page, setPage] = useState("home");
	let [loggedIn, setLoggedIn] = useState(0);	// 0 = not loggedIn, 1 = user, 2 = admin
  let [user, setUser] = useState(null);
  let [gameNames, setGameNames] = useState([]);
  let [games, setGames] = useState([]);
  let [matchedTerms, setMatchedTerms] = useState([]);
  
// 	let mainComponent;
//   switch(page){
//     case "home":
//       mainComponent = <Home />;
//       break;
//     case "game":
//       mainComponent = <Game />;
//       break;
//     case "charts":
//       mainComponent = <Charts />;
//       break;
//     case "login":
//       mainComponent = <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setPage={setPage}/>;
//       break;
//     case "profile":
//       mainComponent = <Profile />;
//       break;
//     default:
//       mainComponent = <Home />;
//   }

  const NUM_GAME_ICONS = 20;
      
  let names = [];
  
  //console.log(gamesSet);
  // if(!gamesSet){
  //   for(let i = 0; i < NUM_GAME_ICONS; i++){
  //     let gameID = (Math.random()*10000).toFixed(0);
  //     //game_icons.push(<GameIcon gameID={gameID} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
  //     names.push("Game " + gameID);
  //     gameList.push({name: "Game " + gameID, id: gameID});
  //   }
  //   setGameNames(names);
  //   setGames(gameList);
  //   gamesSet = true;
  // }

  let [game_icons, setGameIcons] = useState([]);
    
    if(!gamesSet){
      fetch("http://localhost:5000/api/games").then(res => {
        if(res.ok) return res.json();
        console.log("Couldn't get games");
      }).then(games => {
        console.log("got games");
        let i = 0;
        for(let game of games.games){
          let percent;
          if(game.numVotes === 0){
            percent = 50;
          }
          else {
            percent = game.numLikes / game.numVotes;
          }

          let colour;
          if(percent < 50){
            colour = "red-percent";
          }
          else if(percent < 75){
            colour = "yellow-percent";
          }
          else {
            colour = "green-percent";
          }

          let str_id = String(game._id);
          game_icons.push(<GameIcon gameID={str_id.substring(str_id.length - 4, str_id.length)} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
          i++;
        }
        gamesSet = true;
        setGameIcons([...game_icons]);
        
        // console.log(game_icons);
      });
    }

	return (
		<main className="App" >
			<BrowserRouter>
				<NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} gameNames={gameNames} games={gameList} setMatchedTerms={setMatchedTerms}/>
			
				<Switch>
					<Route path="/game" component={Game} />	
					<Route path="/charts" component={Charts} />	
          <Route path="/signup">	
						<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />	
					</Route>
					<Route path="/login">	
						<Login app={this} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />	
					</Route>
					<Route path="/profile"> <Profile />	</Route>
					<Route path="/admin"> 	<Admin loggedIn={loggedIn}/>	</Route>
					<Route path="/">		<Home gameNames={gameNames} setGameNames={setGameNames} games={game_icons} setGames={setGames}/>	</Route>
          <Route path="/searchresults"> <SearchResults matchedTerms={matchedTerms}/> </Route>
        </Switch>
			</BrowserRouter>
		{/* previous implementation
		<ul className="navBar">
          <li> <button onClick={()=>{setPage("home");}}> Home </button>  </li>
          <li> <button onClick={()=>{setPage("game");}}> Game </button> </li>
          <li> <button onClick={()=>{setPage("charts");}}> Charts </button> </li>
          <li className="right"> <button className={loggedIn ? "hidden" : ""} onClick={()=>{setPage("login");}}> Login </button> </li>
          <li className="right"> <button className={loggedIn ? "" : "hidden"} onClick={()=>{setPage("profile");}}> My Profile </button> </li>
          <li> <button onClick={()=>{setLoggedIn(false); setPage("home");}} className={loggedIn ? "" : "hidden"}> Logout </button> </li>
      </ul>
		<div className="page-content">{mainComponent}</div> */}
    </main>
  );
}

export default App;
