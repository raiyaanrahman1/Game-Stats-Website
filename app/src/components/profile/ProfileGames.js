import React from 'react'
import GameIcon from '../GameIcon';
import { useState, useEffect } from "react";
import ENV from "../../config.js";
import { getGame } from "../../actions/games";
const API_HOST = ENV.api_host;

function ProfileGames({ userProfile, myProfile, gameIcons }) {
  const [topGames, setTopGames] = useState([]);
  useEffect(() => {
    const icons = [];
    gameIcons.forEach((icon) => {
      if (userProfile.likedGames.includes(icon.props.gameID)) {
        icons.push(icon);
      }
    });

    setTopGames(...icons);
  }, []);

  console.log(topGames);

  return (
    <div className="games-container">
      Top Games:
      {topGames}
    </div>
  );
}

export default ProfileGames
