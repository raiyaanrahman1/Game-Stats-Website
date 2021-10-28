import React from 'react';


class LikeBar extends React.Component {
    render() {
        return(<div className="game-likebar">
            <button>👍</button>
            <h3 className="game-rate"> {this.props.numLikes / this.props.numVotes}% </h3>
            <button>👎</button>
        </div>
            
        )
    }

}

export default LikeBar