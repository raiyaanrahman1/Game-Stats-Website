import React from 'react';

class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews:[{reviewID: 1, username: 'user1', timestamp: "", content: 'content1 content1 content1 content1 content1 content1', like: 1, numLikes: 0, numDislikes: 0},
                     {reviewID: 2, username: 'user2', timestamp: "", content: ' content2 content2 content2 content2 content2 content2', like: 1, numLikes: 0, numDislikes: 0},
                     {reviewID: 3, username: 'user3', timestamp: "", content: ' content3 content3 content3 content3 content3 content3', like: 1, numLikes: 0, numDislikes: 0},
                     {reviewID: 4, username: 'user4', timestamp: "", content: ' content4 content4 content4 content4 content4 content4', like: 1, numLikes: 0, numDislikes: 0},
                     {reviewID: 5, username: 'user5', timestamp: "", content: ' content5 content5 content5 content5 content5 content5', like: 1, numLikes: 0, numDislikes: 0},
                    ]
        }
    }

    

    render() {
        const renderReview = (review, index) => {
            return <div className="game-review" 
                        key={index} 
                        id={"game-review-"+index} >
                <h3>{review.username}</h3>
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