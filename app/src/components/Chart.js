import React from 'react';
import GameIconChart from './GameIconChart.js';

const Chart = (props) => {

    let bars = [];

    function getStats() {
        // get the chart's info from database - hardcoded here
        for(let i = 0; i < props.numBars; i++){
            bars.push(<li key={i}><span className ="info-text"><GameIconChart height={props.heights[i]} title={props.titles[i]}/></span></li>);
        }
    }

    getStats();
    
    return (
        <div className="chart-back">
                <h2 className="chart-title">{props.title}</h2>
                
                {/* Placeholders, would normally actually determine top 5 games using data from the database */}
                <ul>
                    {bars}
 		        </ul>
                 
            </div>
    );
};

export default Chart;