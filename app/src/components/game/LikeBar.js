import React from 'react';


class LikeBar extends React.Component {
    // No server connection required 
    voteMessages = (userVoted) => {
        if (userVoted === 0) { return " "}
        else if (userVoted === 1) { return "Liked"}
        else if (userVoted === -1) { return "Disliked"}
    }

    render() {
        let percentage = 0;
        if(this.props.numVotes > 0){
            percentage = Math.round(this.props.numLikes / this.props.numVotes * 100);
        }
        return(<div className="game-likebar">
            <button onClick={this.props.like}>👍</button>
            <h3 className="game-rate"> {percentage}% </h3>
            <button onClick={this.props.dislike}>👎</button>
            <p className="game-voteMessages">{this.voteMessages(this.props.userVoted)}</p>
        </div>
            
        )
    }

}

export default LikeBar