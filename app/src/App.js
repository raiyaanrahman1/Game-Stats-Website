import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Game from './components/game/Game';
import Charts from './components/Charts.js';
import Login from './components/Login.js';
import Profile from './components/profile/Profile.js';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
	//let [page, setPage] = useState("home");
	let [loggedIn, setLoggedIn] = useState(false);
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

	return (
		<main className="App" >
			<BrowserRouter>
				<ul className="navBar">
					<li> <Link to="/">Home</Link> </li>
					<li> <Link to="/game">Game</Link> </li>
					<li> <Link to="/charts">Charts</Link> </li>
					<li className={loggedIn ? "hidden right" : "right"}> <Link  to="/login"> Login </Link>  </li>
					<li className={loggedIn ? "right" : "right hidden"}> <Link  to="/profile"> My Profile </Link> </li>
					<li className={loggedIn ? "" : "hidden"}> <Link onClick={()=>{setLoggedIn(false)}} to="/" > Logout </Link> </li>
				</ul>
			
				<Switch>
					<Route path="/game">	<Game />	</Route>
					<Route path="/charts">	<Charts />	</Route>
					<Route path="/login">	
						<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />	
					</Route>
					<Route path="/profile"> <Profile />	</Route>
					<Route path="/">		<Home />	</Route>
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
