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
                genres: ['Genre 1', 'Genre 2', 'Genre 3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
                numVotes: 0,
                numLikes: 0,
                numDislikes: 0,
                numReviews: 1,
                reviews: [0],   // review ids
            }
        }
        this.setState = this.setState.bind(this);
    }
    
    
    render() {
        let genres = "";
        for(let i = 0; i < this.state.gameData.genres.length; i++){
            genres += this.state.gameData.genres[i];
            if(i < this.state.gameData.genres.length-1){
                genres += ", "
            }
        }
        return (
            <div className="game-main">
                <img src={this.state.gameData.coverArt} alt="Cover" className = "game-cover"/>
                <LikeBar numLikes={this.state.gameData.numLikes} numDislikes={this.state.gameData.numDislikes} numVotes={this.state.gameData.numVotes} setGameState={this.setState} gameState={this.state}/>
                <div className="game-info">
                    <h2 className = "game-title">{this.state.gameData.title}</h2>
                    <h3 className = "game-publisher">{this.state.gameData.publisher}</h3>
                    <div className = "game-genre">{genres}</div>
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