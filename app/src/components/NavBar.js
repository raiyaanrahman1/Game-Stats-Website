import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from './search'
import { logout } from "../actions/user";

const NavBar = (props) => {
  let history = useHistory();

  const searchCallback = (gameSelected) => {
    history.push("/game?ID=" + gameSelected.value);
  };

  const onLogout = () => {
    logout({ setUser: props.setUser, setLoggedIn: props.setLoggedIn });
  };

  return (
    <div className="nav">
      <ul className="navBar">
        <li className="navRegEl">
          {" "}
          <Link to="/">Home</Link>{" "}
        </li>
        {/* <li> <Link to="/game">Game</Link> </li> */}
        <li className="navRegEl">
          {" "}
          <Link to="/charts">Charts</Link>{" "}
        </li>
        <li className={props.loggedIn ? "hidden right" : "navRegEl"}>
          {" "}
          <Link to="/login"> Login </Link>{" "}
        </li>
        <li className={props.loggedIn ? "navRegEl" : "right hidden"}>
          {" "}
          <Link to={`/user/${props.user}`}> My Profile </Link>{" "}
        </li>
        <li className={props.loggedIn > 1 ? "navRegEl" : "hidden"}>
          {" "}
          <Link to="/admin"> Admin </Link>{" "}
        </li>
        <li className={props.loggedIn ? "navRegEl" : "hidden"}>
          {" "}
          <Link onClick={() => onLogout()} to="/">
            {" "}
            Logout{" "}
          </Link>{" "}
        </li>
      </ul>

      {/* <div className="search-area">
                <div className="dialogue-text">{searchDialogue}</div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    //console.log("Hi");
                    //console.log(props.games);

                    let foundGame = false;
                    let containedIn = [];
                    for(let game of props.games){
                        //console.log(game);
                        if(game.name === e.target[0].value){
                            resetSearchArea();
                            foundGame = true;
                            history.push("/game?ID=" + game.id);
                            break;
                        }
                        else if(game.name.includes(e.target[0].value)){
                            containedIn.push(game);
                        }
                    }
                    // console.log(containedIn);
                    if(containedIn.length > 0){
                        // console.log("got here");
                        props.setMatchedTerms(containedIn);
                        history.push("/searchresults");
                    }
                    if(!foundGame){
                        setSearchDialogue("could not match the search term");
                    }
                        
                    
                    }}>
                    <input id="searchBar" type="text" className="game-search-bar" placeholder="search for a game"/>
                    <button type="submit" className="game-button" ></button> 
                </form>
            
                
            </div> */}
      <Search callback={searchCallback} width={200} />
    </div>
  );
};

export default NavBar;