import React from 'react';
import GameIcon from './GameIcon';

const Home = (props) => {

    // We would get this list from the backend
    const NUM_GAME_ICONS = 20;
    let game_icons = [];

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
        game_icons.push(<GameIcon percent={percent} percentColour={colour}/>);
    }
    
    return (
        <div>
            <div>This is the homepage</div>
            {game_icons}
        </div>
    );
};

export default Home;