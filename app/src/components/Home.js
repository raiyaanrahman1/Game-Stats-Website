import React from 'react';
// import GameIcon from './GameIcon';
// import {useState} from 'react';

// let game_icons = [];

const Home = (props) => {

    return (
        <div className="page-content">
            <div>Browse Games:</div>
            {props.games}
        </div>
    );
};

export default Home;