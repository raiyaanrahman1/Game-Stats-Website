import React from 'react'
import GameIcon from '../GameIcon';

function ProfileGames() {
    let game_icons = [];

    for(let i = 0; i < 3; i++){
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
        game_icons.push(<GameIcon key={i} size="game-icon-small" percent={percent} percentColour={colour}/>);
    }

    return (
        <div className="games-container">
            Top Games:
            {game_icons}
        </div>
    )
}

export default ProfileGames
