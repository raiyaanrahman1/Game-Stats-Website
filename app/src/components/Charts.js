import React from 'react';
import Chart from './Chart';

// the URL for the request
const url = "api/games/";

const Charts = (props) => {

    let games = [];
    //let topHottestGames = [];

    function getGames () {
        console.log("getting games")
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    console.log("could not get games from server")
                    return Promise.reject("could not get games from server")
                }
            })
            .then(json => {
                // the resolved promise with the JSON body
                console.log('got games')
                console.log(json.games);
                games = json.games;
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    function getHottestGames () {
        console.log("getting top 5 hottest games games")
        let top5Hottest = games.sort((a,b) => b.numLikes-a.numLikes).slice(0,5);
        console.log(top5Hottest)
    };

    getGames();
    
    //testing
    games = [
    {
        gameID: 1,
        title: "Game",
        publisher: 'publisher',
        genres: ['Genre 1', 'Genre 2', 'Genre 3'],
        description: 'description',
        coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', // sample image
        numVotes: 5,    // we dont need numDislikes because it can be calculated
        numLikes: 3,
        numReviews: 1,
        reviews: [0],   // review ids
    },
    {
        gameID: 2,
        title: "Game2",
        publisher: 'publisher',
        genres: ['Genre 1', 'Genre 2', 'Genre 3'],
        description: 'description',
        coverArt: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg', // sample image
        numVotes: 5,    // we dont need numDislikes because it can be calculated
        numLikes: 5,
        numReviews: 1,
        reviews: [0],   // review ids
    }
    
    ]
    getHottestGames();
    
    return (
        <div>
            <h1 className="page-content"> This is the Charts page </h1>
            {/* Placeholders, would normally actually determine heights and titles */}
            {/* Note: max height is 325. Need to use percentage of likes/votes to find percentage of height to use */}
            <Chart key={0} title={"Top 5 Hottest Games"} numBars={5} heights={[325, 275, 255, 150, 50]} titles={new Array(5).fill("game title")}></Chart>
            <Chart key={1} title={"Newest Games"} numBars={6} heights={[275, 325, 150, 225, 50, 100]} titles={new Array(6).fill("game title")}></Chart>
            <Chart key={2} title={"Worst Games"} numBars={15} heights={[200, 300, 150, 25, 50]} titles={new Array(15).fill("game title")}></Chart>
        </div>
    );
};

export default Charts;