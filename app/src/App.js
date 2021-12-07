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

  checkSession({ app: this, setLoggedIn: setLoggedIn, setUser: setUser });

  // useEffect(() => {
  //   /******************Check Session**************************/
  //   const url = `${API_HOST}/users/check-session`;

  //   fetch(url)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return res.json();
  //       }
  //     })
  //     .then((json) => {
  //       if (json && json.currentUser && json.role) {
  //         console.log(json.role);
  //         console.log(json.currentUser);
  //         setLoggedIn(json.role);
  //         setUser(json.currentUser);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Not logged in.");
  //     });
  //   /********************************************/
  // }, []);

  if (!gamesSet) {
    fetch("api/games")
      .then((res) => {
        if (res.ok) return res.json();
        console.log("Couldn't get games");
      })
      .then((games) => {
        let new_game_icons = [];
        console.log("got games");
        let i = 0;
        for (let game of games.games) {
          let percent;
          if (game.numVotes === 0) {
            percent = 50;
          } else {
            percent = ((game.numLikes / game.numVotes) * 100).toFixed(0);
          }

          let colour;
          if (percent < 50) {
            colour = "red-percent";
          } else if (percent < 75) {
            colour = "yellow-percent";
          } else {
            colour = "green-percent";
          }

          new_game_icons.push(
            <GameIcon
              gameID={String(game._id)}
              title={game.title}
              publisher={game.publisher}
              cover={game.coverArt}
              size="game-icon-regular"
              percent={percent}
              percentColour={colour}
              key={i}
            />
          );
          i++;
        }
        gamesSet = true;
        setGameIcons(new_game_icons);

        // console.log(game_icons);
      })
      .catch((err) => console.log("Couldn't get games from db " + err));
  }

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
          <Route path="/game" component={Game} />
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
            render={() => <Profile loggedIn={loggedIn} user={user} />}
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
