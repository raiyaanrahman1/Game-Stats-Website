import React from 'react';
import './game.css';
import LikeBar from './LikeBar.js';
import Reviews from './Reviews.js';
import AddReview from './AddReview.js';
import TestHardware from './TestHardware.js';

class Game extends React.Component {

    constructor(props) {
        super(props);


        // Get game info based on gameID from server
        // Check userVoted

        this.state = {
            user: this.props.user,
            //gameData: {
                gameID: -1,
                title: "Game -1",
                publisher: 'publisher',
                genres: ['Genre 1', 'Genre 2', 'Genre 3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', // sample image
                numVotes: 5,    // we dont need numDislikes because it can be calculated
                numLikes: 3,
                numReviews: 1,
            //},
            userVoted: 0, // 0: not yet voted, 1: like, -1: dislike
            showReview: 0,
            showTHW: 0,
        }
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.componentDidUpdate()
    }

    componentDidUpdate(prevProps) {
        if (!this.state.user && this.props.user) {
            this.setState({user: this.props.user})
        }

        const query = new URLSearchParams(this.props.location.search);
        const gameID = query.get('ID');
        
        if (this.state.gameID !== gameID || this.state.gameID === -1) {
            console.log(gameID)
            fetch("api/games/" + gameID) 
                .then((response) => { 
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("Invalid gameID")
                        return Promise.reject("Invalid gameID")
                    }
                })
                .then((data) => {
                    console.log(data)
                    if (data) {
                        this.setState({
                            gameID: gameID,
                            title: data[0].title,
                            publisher: data[0].publisher,
                            genres: data[0].genres,
                            description: data[0].description,
                            coverArt: data[0].coverArt,
                            numVotes: data[0].numVotes,
                            numLikes: data[0].numLikes,
                            numReviews: data[0].numReviews,
                            //reviews: data[0].reviews,
                        })
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch", err)
                })
                }
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
        console.log(e.target)
    }

    
    render() {
        console.log(this.state.user)
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
                    <div className = "game-genre">{this.state.genres.map((genres, i) => (<span key={i}>'{genres}' </span>) )} </div>
                    <hr></hr>
                    <p className = "game-description">{this.state.description}</p>
                
                    
                </div>
                {this.state.user && (
                    <div className = "game-buttons"> 
                        <button className = "game-button" onClick={this.ShowReviewToggle}> <span title="Write a Review">✎ Write a Review</span></button>
                        <button className = "game-button" onClick={this.showTHWToggle}><span title="Test my Hardware">☑ Test My Hardware</span></button>
                        <button className = "game-button"onClick={()=>{console.log("Not implemented")}}><span title="Add to Favourites">✰ Add to Favorites</span></button>
                    </div>
                )}
                <Reviews gameID={this.state.gameID}/>


                <AddReview showReview={this.state.showReview} gameId={this.state.gameID} user={this.state.user} close={this.ShowReviewToggle}/>

                <TestHardware showTHW={this.state.showTHW} userID={this.state.userID} close={this.showTHWToggle}/>

            </div>
            
        )
    }
    
};

export default Game;