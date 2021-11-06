import React from 'react';
import './game.css';
import LikeBar from './LikeBar.js';
import Reviews from './Reviews.js';

class Game extends React.Component {

    constructor(props) {
        super(props);
        
        const query = new URLSearchParams(this.props.location.search);
        const gameID = query.get('ID')
        //console.log(gameID)  

        this.state = {
            //gameData: {
                gameID: gameID,
                title: 'The game with ID ' + gameID ,
                publisher: 'publisher',
                genres: ['Genre 1', 'Genre 2', 'Genre 3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
                numVotes: 0,    // we dont need numDislikes because it can be calculated
                numLikes: 0,
                numReviews: 1,
                reviews: [0],   // review ids
            //},
            userVoted: 0, // 0: not yet voted, 1: like, -1: dislike
        }
        this.setState = this.setState.bind(this);
    }
    
    onClickLike = () => {
        console.log('like')
        if (this.state.userVoted === 0) {
            this.setState({numVotes: this.state.numVotes+1, numLikes: this.state.numLikes+1, userVoted: 1});

        } else if (this.state.userVoted === -1) {
            this.setState({ numLikes: this.state.numLikes+1, userVoted: 1});
        }
    }
    
    onClickDislike = () => {
        console.log('dislike')
        if (this.state.userVoted ===0) {
            this.setState({numVotes: this.state.numVotes+1, userVoted: -1});
        } else if (this.state.userVoted === 1) {
            this.setState({ numLikes: this.state.numLikes-1, userVoted: -1});
        }

    }
    
    render() {
        return (
            <div className="game-main">
                <img src={this.state.coverArt} alt="Cover" className = "game-cover"/>
                <LikeBar    numLikes={this.state.numLikes} 
                            numVotes={this.state.numVotes}
                            userVoted={this.state.userVoted} 
                            like={this.onClickLike} 
                            dislike={this.onClickDislike} />
                <div className="game-info">
                    <h2 className = "game-title">{this.state.title}</h2>
                    <h3 className = "game-publisher">{this.state.publisher}</h3>
                    <div className = "game-genre">{this.state.genres.map((genres, i) => (<span key={i}>{genres}, </span>) )} </div>
                    <hr></hr>
                    <p className = "game-description">{this.state.description}</p>
                
                    
                </div>
                <div className = "game-buttoms">

                </div>
                
                <Reviews />
            </div>
            
        )
    }
    
};

export default Game;