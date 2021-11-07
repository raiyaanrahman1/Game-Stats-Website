import React from 'react';
import { Link } from 'react-router-dom';

const GameIcon = (props) => {
    
    return (
        <Link to={'/game?ID='+ Math.round( props.percent  * 100)} > {/* we dont need game name, and use percent as example of game id */} 
        <div className={props.size}>
            <div className="sample-image"> Sample Image </div>
            <div className="info">
                <div className="title-publisher">
                    <h4> {props.gameName} </h4>
                    <h5 className="publisher"> Publisher </h5>
                </div>
                <div className="percent">
                    <h4 className={props.percentColour}> {props.percent}% </h4>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default GameIcon;