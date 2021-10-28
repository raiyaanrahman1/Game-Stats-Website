import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Games from './components/game/Games';
import Charts from './components/Charts.js';
import Login from './components/Login.js';

function App() {
  let [page, setPage] = useState("home");
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
      mainComponent = <Login />;
      break;
    default:
      mainComponent = <Home />;
  }
  return (
    <div className="App">
      <ul className="navBar">
          <li> <button onClick={()=>{setPage("home");}}> Home </button>  </li>
          <li> <button onClick={()=>{setPage("games");}}> Games </button> </li>
          <li> <button onClick={()=>{setPage("charts");}}> Charts </button> </li>
          <li> <button onClick={()=>{setPage("login");}}> Login </button> </li>
      </ul>
      {mainComponent}
    </div>
  );
}

export default App;
