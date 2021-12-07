import React, { useState } from 'react';

const AddReview = (props) => {
    const { showReview, close, gameId, user} = props;
    const [reviewText, setReviewText] = useState("");
    


    const ReviewSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            user: user,
            game: gameId,
            content: reviewText
        }
        console.log(reviewData);

        fetch("api/review", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reviewData)}) 
        .then((response) => {
            if (response.ok) {
                console.log(response.json());
                window.alert("Review has been added")
            } else {
                window.alert("Review was not added successfully")
            }
        })

        setReviewText("")
        close()
    }

    return (
    <div className={showReview ? "game-addReview" : "game-addReview hidden"}>
        {showReview && (
        <form onSubmit={ReviewSubmit}>
            <label>
                Write your review here: <br/>
                <textarea 
                    type="text" 
                    name="review" 
                    className="game-addReview-input"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)} />
            </label> <br/>
            <input type="submit" value="Submit" />
            <button onClick={props.close}>Cancel</button>
        </form>)}
    </div>)

}

export default AddReview