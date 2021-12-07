import React from 'react';
import { BarRankingChart } from './charts/BarRankingChart';

// the URL for the request
//const url = "http://localhost:5000/api/games/";
const url = "/api/games";

//------- Function to get various metrics. Will be passed into chart props

//determines rating of a game
function getRating(game) {
    let rating = 0
    if (game.numVotes != 0) {
        rating = game.numLikes / game.numVotes
    }
    return rating
}

function getLikes(game) {
    return game.numLikes
}

function getDislikes(game) {
    return game.numVotes - game.numLikes
}

//-------


const Charts = (props) => {

    let games = [];
    //let topHottestGames = [];

    function getGames () {
        console.log("getting games")
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    console.log("could not get games from server")
                    return Promise.reject("could not get games from server")
                }
            })
            .then(json => {
                // the resolved promise with the JSON body
                console.log('got games')
                console.log(json.games);
                games = json.games;
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    getGames();
    
    return (
        <div>
            <h1 className="page-content"> Statistics on the games in the system: </h1>
            
            <BarRankingChart 
                games={games} 
                metric={'Rating'} 
                amount={10} 
                title={'Top 10 Best Rated Games'} 
                color={'rgba(0, 173, 217, 0.5)'}
                getMetric={getRating}
            />

            <BarRankingChart 
                games={games} 
                metric={'Likes'} 
                amount={10} 
                title={'Top 10 Most Liked Games'} 
                color={'rgba(0, 173, 217, 0.5)'}
                getMetric={getLikes}
            /> 

            <BarRankingChart 
                games={games} 
                metric={'Dislikes'} 
                amount={10} 
                title={'Top 10 Most Disliked Games'} 
                color={'rgba(237, 121, 40, 0.5)'}
                getMetric={getDislikes}
            /> 
        </div>
    );
};

export default Charts;