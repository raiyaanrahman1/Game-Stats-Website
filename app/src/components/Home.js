import React from 'react';
import GameIcon from './GameIcon';
//import {useEffect} from 'react';

const Home = (props) => {
    
    // We would get this list from the backend
    const NUM_GAME_ICONS = 20;
    let game_icons = [];
    let games = [];

    for(let i = 0; i < NUM_GAME_ICONS; i++){
        let percent = (Math.random()*100).toFixed(2);
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
        let gameID = (Math.random()*10000).toFixed(0);
        game_icons.push(<GameIcon gameID={gameID} gameName={"Game " + (i+1)} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
        games.push({gameName:"Game " + (i+1), gameID:gameID});
    }
    
    return (
        <div className="page-content">
            <div>This is the homepage</div>
            {game_icons}
        </div>
    );
};

export default Home;