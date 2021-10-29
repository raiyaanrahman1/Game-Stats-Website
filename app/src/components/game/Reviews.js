import React from 'react';

class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews:[{username: 'user1', content: 'content1 content1 content1 content1 content1 content1', like: 1, numLikes: 0, numDislikes: 0},
                     {username: 'user2', content: ' content2 content2 content2 content2 content2 content2', like: 1, numLikes: 0, numDislikes: 0},
                     {username: 'user3', content: ' content3 content3 content3 content3 content3 content3', like: 1, numLikes: 0, numDislikes: 0},
                     {username: 'user4', content: ' content4 content4 content4 content4 content4 content4', like: 1, numLikes: 0, numDislikes: 0},
                     {username: 'user5', content: ' content5 content5 content5 content5 content5 content5', like: 1, numLikes: 0, numDislikes: 0},
                        ]
        }
    }

    

    render() {
        // const renderReview = (review) => {
        //     return <div className="game-review">
        //         <h3>{review.username}</h3>
        //         <p>{review.content}</p>
        //     </div>
        // }
        let reviews = [];
        for(let i = 0; i < this.state.reviews.length; i++){
            reviews.push(<div key={i} className="game-review"> <h3>{this.state.reviews[i].username}</h3> <p>{this.state.reviews[i].content}</p></div>);
        }

        return (
            <div className = "game-reviews">
                {reviews}
            </div>
        )
    }
}

export default Reviews;