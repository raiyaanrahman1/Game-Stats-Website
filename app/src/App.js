import './App.css';
import { useState, useEffect } from "react";
import Home from "./components/Home.js";
import Game from "./components/game/Game";
import Charts from "./components/Charts.js";
import Login from "./components/Login.js";
import Profile from "./components/profile/Profile.js";
import Admin from "./components/admin_dashboard/Admin.js";
import NavBar from "./components/NavBar";
import SearchResults from "./components/searchResults";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameIcon from "./components/GameIcon.js";
import { checkSession } from "./actions/user";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import ENV from "./config";
import { getAllGames } from "./actions/games";
const API_HOST = ENV.api_host;
let gamesSet = false;
let gameList = [];
function App() {
  //let [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(0); // 0 = not loggedIn, 1 = user, 2 = admin
  const [user, setUser] = useState("");
  let [gameNames, setGameNames] = useState([]);
  let [matchedTerms, setMatchedTerms] = useState([]);
  const [game_icons, setGameIcons] = useState([]);

  useEffect(() => {
    checkSession({ app: this, setLoggedIn: setLoggedIn, setUser: setUser });
    getAllGames({ setGameIcons: setGameIcons });
  }, []);

  console.log(user);
  console.log(loggedIn);

  return (
    <main className="App">
      <BrowserRouter>
        <NavBar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUser={setUser}
          user={user}
          gameNames={gameNames}
          games={gameList}
          setMatchedTerms={setMatchedTerms}
        />
        <Switch>
          <Route
            path="/game"
            render={(props) => <Game {...props} user={user} />}
          />
          <Route path="/charts" component={Charts} />
          <Route path="/signup">
            <SignUp
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/login">
            <Login
              app={this}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route
            path="/user/:username"
            render={() => (
              <Profile loggedIn={loggedIn} user={user} gameIcons={game_icons} />
            )}
          />
          <PrivateRouteAdmin
            path="/admin"
            component={Admin}
            loggedIn={loggedIn}
          />
          <Route path="/">
            <Home
              gameNames={gameNames}
              setGameNames={setGameNames}
              games={game_icons}
            />
          </Route>
          <Route path="/searchresults">
            <SearchResults matchedTerms={matchedTerms} />
          </Route>
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
