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

                <table className="y-axis">
                    <tbody>
                        <tr><th>100</th></tr>
                        <tr><th>90</th></tr>
                        <tr><th>80</th></tr>
                        <tr><th>70</th></tr>
                        <tr><th>60</th></tr>
                        <tr><th>50</th></tr>
                        <tr><th>40</th></tr>
                        <tr><th>30</th></tr>
                        <tr><th>20</th></tr>
                        <tr><th>10</th></tr>
                        <tr><th>0</th></tr>
                    </tbody>
                </table>

                {/* Placeholders, would normally actually determine top 5 games using data from the database */}
                <ul>
                    
                    {bars}
 		        </ul>
                 
            </div>
    );
};

export default Chart;