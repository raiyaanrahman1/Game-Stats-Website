import React from 'react';
import './charts.css';

const GameIcon_Chart = (props) => {
    
    return (
        <div className="game-on-chart">
            <div className="chart-bar" style={{height: props.height}}> </div>
            <div className="game-icon-chart">
                <div className="sample-image-chart"> Sample Image </div>
                <div className="info-chart">
                    <div className="title-publisher-chart">
                        <h4> {props.title} </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameIcon_Chart;