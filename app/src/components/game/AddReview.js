import React from 'react';

const AddReview = (props) => {



    return (<div className={props.showReview ? "game-addReview" : "game-addReview hidden"}>
        <form onSubmit={props.ReviewSubmit}>
            <label>
                Write your review here: <br/>
                <textarea type="text" name="review" className="game-addReview-input"/>
            </label> <br/>
            <input type="submit" value="Submit" />
            <button onClick={props.close}> Cancel </button>
        </form>
    </div>)

}

export default AddReview