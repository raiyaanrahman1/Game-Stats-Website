import React from 'react';

const GameIcon = (props) => {
    
    return (
        <div className={props.size}>
            <div className="sample-image"> Sample Image </div>
            <div className="info">
                <div className="title-publisher">
                    <h4> Title </h4>
                    <h5 className="publisher"> Publisher </h5>
                </div>
                <div className="percent">
                    <h4 className={props.percentColour}> {props.percent}% </h4>
                </div>
            </div>
        </div>
    );
};

export default GameIcon;