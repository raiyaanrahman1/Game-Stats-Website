import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Game from './components/game/Game';
import Charts from './components/Charts.js';
import Login from './components/Login.js';
import Profile from './components/profile/Profile.js';
import Admin from './components/admin_dashboard/Admin.js';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
let gamesSet = false;
let gameList = [];
function App() {
	//let [page, setPage] = useState("home");
	let [loggedIn, setLoggedIn] = useState(0);	// 0 = not loggedIn, 1 = user, 2 = admin
  let [gameNames, setGameNames] = useState([]);
  let [games, setGames] = useState([]);
  
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
  if(!gamesSet){
    for(let i = 0; i < NUM_GAME_ICONS; i++){
      let gameID = (Math.random()*10000).toFixed(0);
      //game_icons.push(<GameIcon gameID={gameID} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
      names.push("Game " + gameID);
      gameList.push({name: "Game " + gameID, id: gameID});
    }
    setGameNames(names);
    setGames(gameList);
    gamesSet = true;
  }

	return (
		<main className="App" >
			<BrowserRouter>
				<NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} gameNames={gameNames} games={gameList}/>
			
				<Switch>
					<Route path="/game" component={Game} />	
					<Route path="/charts" component={Charts} />	
					<Route path="/login">	
						<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />	
					</Route>
					<Route path="/profile"> <Profile />	</Route>
					<Route path="/admin"> 	<Admin loggedIn={loggedIn}/>	</Route>
					<Route path="/">		<Home gameNames={gameNames} setGameNames={setGameNames} games={gameList} setGames={setGames}/>	</Route>
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
