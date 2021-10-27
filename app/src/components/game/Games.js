import React from 'react';
import './game.css';

const Games = (props) => {

    const gameData = {
        gameID: 0,
        title: 'Title',
        publisher: '',
        genres: ['G1', 'G2', 'G3'],
        description: '',
        coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
        numVotes: 0,
        numLikes: 0,
        numReviews: 1,
        reviews: [0],   // review ids
    }
    

    return (
        <div className="game-main">
            <img src={gameData.coverArt} alt="Cover" className = "game-cover"/>
            <div className="game-info">
                <h2 className = "game-title">{gameData.title}</h2>
                <h3 className = "game-publisher">{gameData.publisher}</h3>
                <div className = "game-genre">{gameData.genres.map((genres) => (<span>{genres} </span>) )} </div>
                <hr></hr>
                <p className = "game-description">{gameData.description}</p>
            
                
            </div>    
            <h3 className="game-rate"> {gameData.numLikes / gameData.numVotes} </h3>
        </div>
    );
    
};

export default Games;