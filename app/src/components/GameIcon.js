import React from 'react';
import { Link } from 'react-router-dom';

const GameIcon = (props) => {
    
    return (
        <Link to={'/game?ID='+ props.gameID} >
        <div className={props.size}>
            <img className="sample-image" src={props.cover} alt=""/>
            <div className="info">
                <div className="title-publisher">
                    <h4> {props.title} </h4>
                    <h5 className="publisher"> {props.publisher} </h5>
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