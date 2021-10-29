import React from 'react';
import GameIconChart from './GameIconChart';

const Charts = (props) => {
    
    return (
        <div>
            This is the Charts page
            {/* Need to refactor this out into a seperate Chart component */}
            <div className="chart-back">
                Top 5 Hottest Games
                {/* Placeholders, would normally actually determine top 5 games using data from the database */}
                <ul>
                    <li><span className ="info-text"><GameIconChart height={200} title="game title"/></span></li>
                    <li><span className ="info-text"><GameIconChart height={175} title="game title"/></span></li>
                    <li><span className ="info-text"><GameIconChart height={150} title="game title"/></span></li>
                    <li><span className ="info-text"><GameIconChart height={130} title="game title"/></span></li>
                    <li><span className ="info-text"><GameIconChart height={50} title="game title"/></span></li>
 		        </ul>
                 
            </div>
        </div>
    );
};

export default Charts;