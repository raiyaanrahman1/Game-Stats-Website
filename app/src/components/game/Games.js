import React from 'react';
import './game.css';
import LikeBar from './LikeBar.js';
import Reviews from './Reviews.js';

class Games extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameData: {
                gameID: 0,
                title: 'Title',
                publisher: 'publisher',
                genres: ['G1', 'G2', 'G3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
                numVotes: 0,
                numLikes: 0,
                numReviews: 1,
                reviews: [0],   // review ids
            }
        }
    }
     
    
    render() {
        return (
            <div className="game-main">
                <img src={this.state.gameData.coverArt} alt="Cover" className = "game-cover"/>
                <LikeBar numLikes={this.state.gameData.numLikes} numReviews={this.state.gameData.numReviews} />
                <div className="game-info">
                    <h2 className = "game-title">{this.state.gameData.title}</h2>
                    <h3 className = "game-publisher">{this.state.gameData.publisher}</h3>
                    <div className = "game-genre">{this.state.gameData.genres.map((genres) => (<span>{genres} </span>) )} </div>
                    <hr></hr>
                    <p className = "game-description">{this.state.gameData.description}</p>
                
                    
                </div>
                <div className = "game-buttoms">

                </div>
                
                <Reviews />
            </div>
            
        )
    }
    
};

export default Games;