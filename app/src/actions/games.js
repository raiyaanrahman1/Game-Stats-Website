import GameIcon from "../components/GameIcon.js";
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

export const getAllGames = ({ setGameIcons, setGames }) => {
  let gameIcons = [];
  const gamesrequest = new Request(`${API_HOST}/api/games/`, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(gamesrequest)
    .then((res) => {
      if (res.ok) return res.json();
      console.log("Couldn't get games");
    })
    .then((games) => {
      console.log("got games");
      let i = 0;
      for (let game of games.games) {
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

        gameIcons.push(
          <GameIcon
            gameID={String(game._id)}
            title={game.title}
            publisher={game.publisher}
            cover={game.coverArt}
            size="game-icon-regular"
            percent={percent}
            percentColour={colour}
            key={i}
          />
        );
        i++;
      }
      setGameIcons([...gameIcons]);
      setGames(games.games);
    })
    .catch((err) => console.log("Couldn't get games from db " + err));
};

export const getGame = async ({ gameId }) => {
  try {
    const request = new Request(`${API_HOST}/api/games/${gameId}`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const res = await fetch(request);
    const game = await res.json();
    return game;
  } catch (error) {
    console.log("Couldn't get game: " + error);
  }
};
