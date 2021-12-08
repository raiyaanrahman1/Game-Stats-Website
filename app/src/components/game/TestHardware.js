import React from 'react';
import { useState } from "react";

let reviewSet = false;
let reviews = [];
let avg = 0;

const TestHardware = (props) => {
    
    const [result, setResults] = useState("");

    //get reviews for this game
    if (!reviewSet) {
        fetch("/api/review/game/" + props.gameID) 
            .then((response) => { 
                 if (response.ok) {
                    return response.json()
                } else {
                    console.log("Invalid gameID")
                }
            })
            .then((data) => {
                console.log(data)
                
                reviews = data.review
                reviewSet = true
            })
            .catch(err => {
                 console.error("Failed to fetch", err)
            })
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user_mark = e.target[0].value
        console.log(e.target[0].value)
        console.log(reviews)

        let sum = 0
        let number = 0
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].cpuMark) {
                sum += reviews[i].cpuMark
                number++
            }
        }

        if (number > 0) {
            avg = sum / number
        } else {
            avg = 0
        }

        if (number == 0) {
            setResults("No reviews to determine an average CPU mark from")
        } else if (user_mark >= avg) {
            setResults("This game should work with your hardware!")
        } else {
            setResults("Might have difficulty running this game")
        }
    }

    return(<div className={props.showTHW ? "game-THW" : "game-THW hidden"}>

        <h3>Your Hardware:&nbsp;</h3>
        <form onSubmit={handleFormSubmit}>
            <label for="THW-CPU">CPU Mark:&nbsp;</label>
            <input type="text" id="THW-CPU" name="cpu"></input>
            <input type="submit" value="Submit"></input>
        </form>

        <h3>The average cpu mark for this game is: {avg}</h3>
        <h3>Result: {result}</h3>

        <button onClick={props.close}>Close</button>
        
    </div> );
}

export default TestHardware;