import React from 'react'
import GameIcon from '../GameIcon';
import { useState, useEffect } from "react";
import ENV from "../../config.js";
import { getGame } from "../../actions/games";
const API_HOST = ENV.api_host;

function ProfileGames({ userProfile, myProfile, gameIcons }) {
  const [topGames, setTopGames] = useState([]);
  useEffect(() => {
    const getTopGameIcons = async () => {
      const topGameIcons = [];
      let i = 0;
      userProfile.likedGames.forEach((gameId) => {
        console.log(gameId);
        const fetchGameData = async () => {
          const game = await getGame({ gameId: gameId });
          console.log(game);

          let percent;
          if (game.numVotes === 0) {
            percent = 50;
          } else {
            percent = ((game.numLikes / game.numVotes) * 100).toFixed(0);
          }

          let colour;
          if (percent < 50) {
            colour = "red-percent";
          } else if (percent < 75) {
            colour = "yellow-percent";
          } else {
            colour = "green-percent";
          }

          topGameIcons.push(
            <GameIcon
              gameID={String(game._id)}
              title={game.title}
              publisher={game.publisher}
              cover={game.coverArt}
              size="game-icon-small"
              percent={percent}
              percentColour={colour}
              key={i}
            />
          );
        };
        fetchGameData();
        i++;
      });
      return topGameIcons;
    };
    getTopGameIcons().then((top) => {
      setTopGames([...top]);
    });
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
