import React from 'react';


class LikeBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numLikes: this.props.numLikes,
            numDislikes: this.props.numDislikes,
            numVotes: this.props.numVotes
        }
    }
    render() {
        // let percentage = 0;
        // if(this.state.numVotes > 0){
        //     percentage = this.state.numLikes / this.state.numVotes;
        // }
        return(<div className="game-likebar">
            <button onClick={()=>{
                this.props.setGameState({...this.props.gameState, gameData: {...this.props.gameState.gameData, numVotes: this.state.numVotes+1,numLikes: this.state.numLikes+1}});
                this.setState({...this.state, numVotes: this.state.numVotes+1, numLikes: this.state.numLikes+1});
                console.log(`likes: ${this.state.numLikes}, votes:${this.state.numVotes}`);
            }}>👍</button>
            <h3 className="game-rate"> {`${this.state.numLikes}-${this.state.numDislikes}`} </h3>
            <button onClick={()=>{
                this.props.setGameState({...this.props.gameState, gameData: {...this.props.gameState.gameData, numVotes: this.state.numVotes+1,numLikes: this.state.numDislikes+1}});
                this.setState({...this.state, numVotes: this.state.numVotes+1, numDislikes: this.state.numDislikes+1});
                console.log(`likes: ${this.state.numLikes}, votes:${this.state.numVotes}`);
            }}>👎</button>
        </div>
            
        )
    }

}

export default LikeBar