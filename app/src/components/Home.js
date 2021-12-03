import React from 'react';
import GameIcon from './GameIcon';
import {useState} from 'react';
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


    // let [game_icons, setGameIcons] = useState([]);
    // if(!gamesSet){
    //     fetch("http://localhost:5000/api/games").then(res => {
    //         if(res.ok) return res.json();
    //         console.log("Couldn't get games");
    //     }).then(games => {
    //         // console.log(games);
    //         let i = 0;
    //         for(let game of games.games){
    //             let percent;
    //             if(game.numVotes === 0){
    //                 percent = 50;
    //             }
    //             else {
    //                 percent = game.numLikes / game.numVotes;
    //             }

    //             let colour;
    //             if(percent < 50){
    //                 colour = "red-percent";
    //             }
    //             else if(percent < 75){
    //                 colour = "yellow-percent";
    //             }
    //             else {
    //                 colour = "green-percent";
    //             }

    //             game_icons.push(<GameIcon gameID={game._id} size="game-icon-regular" percent={percent} percentColour={colour} key={i}/>);
    //             i++;
    //         }
    //         setGameIcons(game_icons);
    //         gamesSet = true;
    //         // console.log(game_icons);
    //     });
    // }
    

    return (
        <div className="page-content">
            <div>This is the homepage</div>
            {game_icons}
        </div>
    );
};

export default Home;