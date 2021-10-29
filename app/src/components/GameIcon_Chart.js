import React from 'react';

const GameIcon_Chart = (props) => {
    
    return (
        <div className="game-on-chart">
            <div className="chart-bar" style={{height: props.height}}> </div>
            <div className="game-icon">
                <div className="sample-image"> Sample Image </div>
                <div className="info">
                    <div className="title-publisher">
                        <h4> {props.title} </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameIcon_Chart;