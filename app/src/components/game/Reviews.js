import React from 'react';

class Reviews extends React.Component {
    // Get reviews content based on list of review ids in props from server
    constructor(props) {
        super(props);

        this.state = {
            reviews:[]
        }
    }

    componentDidMount() {
        fetch("/api/review/game/" + this.props.gameID) 
                .then((response) => { 
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("Invalid gameID")
                    }
                })
                .then((data) => {
                    console.log(data)
                    this.setState({reviews:data.review})
                })
                .catch(err => {
                    console.error("Failed to fetch", err)
                })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameID != this.props.gameID || this.props.gameID === -1 ) {
            fetch("/api/review/game/" + this.props.gameID) 
                .then((response) => { 
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log("Invalid gameID")
                    }
                })
                .then((data) => {
                    console.log(data)
                    this.setState({reviews:data.review})
                })
                .catch(err => {
                    console.error("Failed to fetch", err)
                })
        }
    }
    

    render() {
        const renderReview = (review, index) => {
            return <div className="game-review" 
                        key={index} 
                        id={"game-review-"+index} >
                <h3>{review.user}</h3>
                
                {/*<h3 className={review.like ? 'game-review-rate like': 'game-review-rate dislike'}> {review.like ? '👍' :'👎'} </h3>*/}
                
                <p>{review.content}</p>

            </div>
        }

        return (
            <div className = "game-reviews">
                {this.state.reviews.map(renderReview) }
            </div>
        )
    }
}

export default Reviews;