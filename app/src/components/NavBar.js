import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    
    return (
        <div className="nav">
            <ul className="navBar">
                <li className="navRegEl"> <Link to="/">Home</Link> </li>
                {/* <li> <Link to="/game">Game</Link> </li> */}
                <li className="navRegEl"> <Link to="/charts">Charts</Link> </li>
                <li className={props.loggedIn ? "hidden right" : "navRegEl"}> <Link  to="/login"> Login </Link>  </li>
                <li className={props.loggedIn ? "navRegEl" : "right hidden"}> <Link  to="/profile"> My Profile </Link> </li>
                <li className={props.loggedIn > 1 ? "navRegEl" : "hidden"}> <Link to="/admin" > Admin </Link> </li>
                <li className={props.loggedIn ? "navRegEl" : "hidden"}> <Link onClick={()=>{props.setLoggedIn(0)}} to="/" > Logout </Link> </li>
			</ul>

            <input type="search" placeholder="Search for games or users" className="game-search-bar"/>
        </div>
    );
};

export default NavBar;