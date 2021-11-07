import React from 'react';
import './game.css';
import LikeBar from './LikeBar.js';
import Reviews from './Reviews.js';
import AddReview from './AddReview.js';
import TestHardware from './TestHardware.js';

class Game extends React.Component {

    constructor(props) {
        super(props);
        
        const query = new URLSearchParams(this.props.location.search);
        const gameID = query.get('ID');
        //console.log(gameID)  

        this.state = {
            userID: -1,
            //gameData: {
                gameID: gameID,
                title: "the game with ID " + gameID,
                publisher: 'publisher',
                genres: ['Genre 1', 'Genre 2', 'Genre 3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
                numVotes: 5,    // we dont need numDislikes because it can be calculated
                numLikes: 3,
                numReviews: 1,
                reviews: [0],   // review ids
            //},
            userVoted: 0, // 0: not yet voted, 1: like, -1: dislike
            showReview: 0,
            showTHW: 0,
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

    ShowReviewToggle = () => {this.setState({showReview: 1 - this.state.showReview}) }
    showTHWToggle = () => {this.setState({showTHW: 1 - this.state.showTHW}) }

    ReviewSubmit = (e) => {
        e.preventDefault();
        this.setState({showReview: 0})
        // pass to server TODO
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
                <div className = "game-buttons">    {/* TODO: only shown if user is logged in */}
                    <button className = "game-button" onClick={this.ShowReviewToggle}> Write a Review</button>
                    <button className = "game-button" onClick={this.showTHWToggle}>Test My Hardware</button>
                    <button className = "game-button"onClick={()=>{console.log("Not implemented")}}>Add tto Favorite</button>
                </div>
                
                <Reviews reviewIDs={this.state.reviews}/>


                <AddReview showReview={this.state.showReview} ReviewSubmit={this.ReviewSubmit} close={this.ShowReviewToggle}/>

                <TestHardware showTHW={this.state.showTHW} userID={this.state.userID} close={this.showTHWToggle}/>

            </div>
            
        )
    }
    
};

export default Game;