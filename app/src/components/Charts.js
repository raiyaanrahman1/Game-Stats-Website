import React from 'react';
import Chart from './Chart';

const Charts = (props) => {
    
    return (
        <div>
            <h1> This is the Charts page </h1>
            {/* Placeholders, would normally actually determine heights and titles */}
            {/* Note: max height is 325. Need to use percentage of likes/votes to find percentage of height to use */}
            <Chart key={0} title={"Top 5 Hottest Games"} numBars={5} heights={[325, 275, 225, 150, 50]} titles={new Array(5).fill("game title")}></Chart>
            <Chart key={1} title={"Newest Games"} numBars={6} heights={[275, 325, 150, 225, 50, 100]} titles={new Array(6).fill("game title")}></Chart>
            <Chart key={2} title={"Worst Games"} numBars={15} heights={[200, 300, 150, 25, 50]} titles={new Array(15).fill("game title")}></Chart>
        </div>
    );
};

export default Charts;