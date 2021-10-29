import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Games from './components/game/Games';
import Charts from './components/Charts.js';
import Login from './components/Login.js';
import Profile from './components/profile/Profile.js';

function App() {
  let [page, setPage] = useState("home");
  let [loggedIn, setLoggedIn] = useState(false);
  let mainComponent;
  switch(page){
    case "home":
      mainComponent = <Home />;
      break;
    case "games":
      mainComponent = <Games />;
      break;
    case "charts":
      mainComponent = <Charts />;
      break;
    case "login":
      mainComponent = <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setPage={setPage}/>;
      break;
    case "profile":
      mainComponent = <Profile />;
      break;
    default:
      mainComponent = <Home />;
  }
  return (
    <div className="App" >
      <ul className="navBar">
          <li> <button onClick={()=>{setPage("home");}}> Home </button>  </li>
          <li> <button onClick={()=>{setPage("games");}}> Games </button> </li>
          <li> <button onClick={()=>{setPage("charts");}}> Charts </button> </li>
          <li className="right"> <button className={loggedIn ? "hidden" : ""} onClick={()=>{setPage("login");}}> Login </button> </li>
          <li className="right"> <button className={loggedIn ? "" : "hidden"} onClick={()=>{setPage("profile");}}> My Profile </button> </li>
          <li> <button onClick={()=>{setLoggedIn(false); setPage("home");}} className={loggedIn ? "" : "hidden"}> Logout </button> </li>
      </ul>
      <div className="page-content">{mainComponent}</div>
    </div>
  );
}

export default App;
