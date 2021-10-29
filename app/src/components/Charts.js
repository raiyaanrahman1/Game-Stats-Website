import React from 'react';
import Chart from './Chart';

const Charts = (props) => {
    
    return (
        <div>
            This is the Charts page
            {/* Need to refactor this out into a seperate Chart component */}
            <Chart key={0} title={"Top 5 Hottest Games"} numBars={5} heights={[325, 275, 225, 150, 50]} titles={new Array(5).fill("game title")}></Chart>
            <Chart key={1} title={"Newest Games"} numBars={5} heights={[275, 325, 150, 225, 50]} titles={new Array(5).fill("game title")}></Chart>
            
        </div>
    );
};

export default Charts;