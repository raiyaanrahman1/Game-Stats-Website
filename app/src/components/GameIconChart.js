import React from 'react';

const GameIconChart = (props) => {
    
    return (
        <div className="game-on-chart">
            <div className="chart-bar" style={{height: props.height}}> </div>
            <div className="game-icon-chart">
                <div className="sample-image-chart"> Sample Image </div>
                <div className="info-chart">
                    <div className="title-publisher-chart">
                        <h2> {props.title} </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameIconChart;