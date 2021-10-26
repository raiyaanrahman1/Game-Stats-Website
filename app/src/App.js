import './App.css';
import React, {useState} from 'react';
import Home from './components/Home.js';
import Games from './components/Games.js';
import Charts from './components/Charts.js';

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
    default:
      mainComponent = <Home />;
  }
  return (
    <div className="App">
      <nav>
        <ul>
            <li> <button onClick={()=>{setPage("home");}}> Home </button>  </li>
            <li> <button onClick={()=>{setPage("games");}}> Games </button> </li>
            <li> <button onClick={()=>{setPage("charts");}}> Charts </button> </li>
        </ul>
      </nav>
      {mainComponent}
    </div>
  );
}

export default App;
