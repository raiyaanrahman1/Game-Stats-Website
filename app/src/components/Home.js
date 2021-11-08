import React from 'react';
import GameIcon from './GameIcon';
//import {useEffect} from 'react';
let gamesSet = false;
let game_icons = [];

const Home = (props) => {
    
    // We would get this list from the backend
    
    
        //console.log(props.games);
    if(!gamesSet){
        for(let i = 0; i < props.games.length; i++){
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
            
            game_icons.push(<GameIcon gameID={props.games[i].id} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
            
        }
        gamesSet = true;
    }  
    

    return (
        <div className="page-content">
            <div>This is the homepage</div>
            {game_icons}
        </div>
    );
};

export default Home;