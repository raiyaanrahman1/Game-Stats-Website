import React from 'react';
import { BarRankingChart } from './BarRankingChart.js';

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

function getReviews(game) {
    return game.numReviews
}

//-------


const Charts = (props) => {
    
    return (
        <div>
            <h1 className="page-content"> Statistics on the games in the system: </h1>
            
            <BarRankingChart 
                games={props.games} 
                metric={'Rating'} 
                amount={10} 
                title={'Top 10 Best Rated Games'} 
                color={'rgba(0, 173, 217, 0.5)'}
                getMetric={getRating}
            />

            <BarRankingChart 
                games={props.games} 
                metric={'Likes'} 
                amount={10} 
                title={'Top 10 Most Liked Games'} 
                color={'rgba(0, 173, 217, 0.5)'}
                getMetric={getLikes}
            /> 

            <BarRankingChart 
                games={props.games} 
                metric={'Dislikes'} 
                amount={10} 
                title={'Top 10 Most Disliked Games'} 
                color={'rgba(237, 121, 40, 0.5)'}
                getMetric={getDislikes}
            /> 

            <BarRankingChart 
                games={props.games} 
                metric={'Reviews'} 
                amount={5} 
                title={'Top 5 Most Reviewed Games'} 
                color={'rgba(0, 205, 92, 0.5)'}
                getMetric={getReviews}
            /> 
        </div>
    );
};

export default Charts;
