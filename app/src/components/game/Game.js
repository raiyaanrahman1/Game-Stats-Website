import React from 'react';
import './game.css';
import LikeBar from './LikeBar.js';
import Reviews from './Reviews.js';
import AddReview from './AddReview.js';
import TestHardware from './TestHardware.js';
import { likeGame } from '../../actions/user';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            userInfo: "",
            //gameData: {
                gameID: -1,
                title: "Game -1",
                publisher: 'publisher',
                genres: ['Genre 1', 'Genre 2', 'Genre 3'],
                description: 'description description description description description description description description description description description description description description description description description description description description',
                coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', // sample image
                numVotes: 5,    // we dont need numDislikes because it can be calculated
                numLikes: 3,
                // numReviews: 1,
            //},
            userVoted: 0, // 0: not yet voted, 1: like, -1: dislike
            showReview: 0,
            showTHW: 0,
        }
        this.setState = this.setState.bind(this);

    }

    componentDidMount() {
        // get the game info
        const query = new URLSearchParams(this.props.location.search);
        const gameID = query.get('ID');
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
                        // numReviews: data[0].numReviews,
                        //reviews: data[0].reviews,
                    })
                }
            })
            .catch(err => {
                console.error("Failed to fetch", err)
            })

        // Get get user info if it available
        if (this.props.user) {
            const userName = this.props.user
            
            fetch("/api/users/"+userName).then((response) => { 
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Invalid user name")
                    return Promise.reject("Invalid user name")
                }
            }).then((data) => {
                console.log(data)
                let userVoted = 0;
                if (data.likedGames.includes(gameID)) {userVoted = 1}
                else if (data.dislikedGames.includes(gameID)) {userVoted = -1}
                this.setState({userName: userName, userInf: data, userVoted: userVoted})
            })

        }

    }

    componentDidUpdate(prevProps) {
        if (this.state.userName !== this.props.user) {
            console.log(this.state.userName, this.props.user)
            const userName = this.props.user
            console.log(userName)
            fetch("/api/users/"+userName).then((response) => { 
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Invalid user name")
                    return Promise.reject("Invalid user name")
                }
            }).then((data) => {
                let userVoted = 0;
                if (data.likedGames.includes(gameID)) {userVoted = 1}
                else if (data.dislikedGames.includes(gameID)) {userVoted = -1}
                this.setState({userName: userName, userInf: data, userVoted: userVoted})
            })

        }

        const query = new URLSearchParams(this.props.location.search);
        const gameID = query.get('ID');

        if (this.state.gameID !== gameID ) {
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
                        let userVoted = 0;
                        if (this.state.userInfo) {
                            if (data.likedGames.includes(gameID)) {userVoted = 1}
                            else if (data.dislikedGames.includes(gameID)) {userVoted = -1}
                        }
                        
                        this.setState({
                            gameID: gameID,
                            title: data[0].title,
                            publisher: data[0].publisher,
                            genres: data[0].genres,
                            description: data[0].description,
                            coverArt: data[0].coverArt,
                            numVotes: data[0].numVotes,
                            numLikes: data[0].numLikes,
                            userVoted: userVoted
                            // numReviews: data[0].numReviews,
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
        if (!this.state.userName) {return}

        console.log('like')
        fetch("/api/rate/"+this.state.gameID, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({user: this.state.userName, rate: 1})
        }).then(response => {console.log(response.json())})
        if (this.state.userVoted === 0) {
            this.setState({numVotes: this.state.numVotes+1, numLikes: this.state.numLikes+1, userVoted: 1});

        } else if (this.state.userVoted === -1) {
            this.setState({ numLikes: this.state.numLikes+1, userVoted: 1});
        }
    }
    
    onClickDislike = () => {
        if (!this.state.userName) {return}
        console.log('dislike')

        fetch("/api/rate/"+this.state.gameID, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({user: this.state.userName, rate: -1})
        }).then(response => {console.log(response.json())})

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
        console.log(this.state.userName)
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
                {this.state.userName && (
                    <div className = "game-buttons"> 
                        <button className = "game-button" onClick={this.ShowReviewToggle}> <span title="Write a Review">✎ Write a Review</span></button>
                        <button className = "game-button" onClick={this.showTHWToggle}><span title="Test my Hardware">☑ Test My Hardware</span></button>
                        {/* <button className = "game-button"onClick={()=>{console.log("Not implemented")}}><span title="Add to Favourites">✰ Add to Favorites</span></button> */}
                    </div>
                )}
                <Reviews gameID={this.state.gameID}/>


                <AddReview showReview={this.state.showReview} gameId={this.state.gameID} user={this.state.userName} close={this.ShowReviewToggle}/>

                <TestHardware gameID={this.state.gameID} showTHW={this.state.showTHW} userID={this.state.userName} close={this.showTHWToggle}/>

            </div>
            
        )
    }
    
};

export default Game;