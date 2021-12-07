import React, { useState } from "react";
import Search from "../search"



function AdminGames() {
  let [showForm, setShowForm] = useState(false);

  let [gameId, setGameId] = useState("");
  let [title, setTitle] = useState("");
  let [publisher, setPublisher] = useState("")
  let [genres, setGenres] = useState("")
  let [description, setDescription] = useState("")
  let [coverArt, setCoverArt] = useState("")

  const text1 = "Add a Game";
  const text2 = "Edit a Game";

  const onSubmit = (e) => {
    e.preventDefault();
    const gameData = {
      title: title,
      publisher: publisher,
      genres: genres.split(/\s*,\s*/),
      description: description,
      coverArt: coverArt
    }
    console.log(gameData);
    if (!gameData.title) {
      window.alert("game title must not be empty")
      return
    }
    if (showForm) { // Add

      fetch("http://localhost:5000/api/games", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gameData)}) 
        .then((response) => {
          console.log(response.json());
          window.alert("Game has been added")
        })

    } else {        // Edit

      if (!gameId) {
        console.log("Invalid gameID")
        return
      }
      fetch("http://localhost:5000/api/games/"+gameId, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gameData)}) 
        .then((response) => {
          if (response.ok) {
            console.log(response.json());
            window.alert("Game has been updated")
            setGameId("")
            setTitle("")
            setPublisher("")
            setGenres("")
            setDescription("")
            setCoverArt("")
        } else {
            console.log("update failed")
        }
          
        })
    }
  };

  const searchCallback = (gameSelected) => {
    setGameId(gameSelected.value)
    console.log(gameId)
    fetch("http://localhost:5000/api/games/" + gameSelected.value) 
      .then((response) => { 
          if (response.ok) {
              return response.json()
          } else {
              console.log("Invalid gameID")
              return Promise.reject("Invalid gameID")
          }
      })
      .then((data) => {
          console.log(data)
          if (data) {
            setTitle(data[0].title)
            setPublisher(data[0].publisher)
            setGenres(data[0].genres.join(", "))
            setDescription(data[0].description)
            setCoverArt(data[0].coverArt)
          }
      })
      .catch(err => {
          console.error("Failed to fetch", err)
      })
      
  }

  return (
    <div className="admin-settings">
      <span title="Switch Between Add and Edit">
      <button
        className="admin-add-game-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? text2 : text1}
      </button>
      </span>
      <div className="admin-select-bar">
      {!showForm && (
        <Search 
          callback={searchCallback}
        />
      )}
      </div>
      {!showForm && (
        <form className="admin-add-game-display" onSubmit={onSubmit}>
          <label>ID: {gameId}</label><br/>
          <label>Title: </label>{" "}
          <input type="text" name="title"      value={title}       onChange={e => setTitle(e.target.value)} />
          <label>Publisher: </label>{" "}
          <input type="text" name="publisher"  value={publisher}   onChange={e => setPublisher(e.target.value)}/>
          <label>Genres: </label>{" "}
          <input type="text" name="genres"      value={genres}     onChange={e => setGenres(e.target.value)}/>
          <label>Description: </label>{" "}
          <input type="text" name="description" value={description}onChange={e => setDescription(e.target.value)}/>
          <label>Cover Art: </label>{" "}
          <input type="text" name="coverArt"    value={coverArt}   onChange={e => setCoverArt(e.target.value)}/>
          <input type="submit" value="Edit" className="admin-submit-game" />
        </form>
      )}
      {showForm && (
        <form className="admin-add-game-display" onSubmit={onSubmit}>
          {/* <label>ID: </label> */}
          <label>Title: </label> <input type="text" name="title"      value={title}       onChange={e => setTitle(e.target.value)} />
          <label>Publisher: </label> <input type="text" name="publisher"  value={publisher}   onChange={e => setPublisher(e.target.value)}/>
          <label>Genres: </label> <input type="text" name="genres"      value={genres}     onChange={e => setGenres(e.target.value)}/>
          <label>Description: </label> <input type="text" name="description" value={description}onChange={e => setDescription(e.target.value)}/>
          <label>Cover Art: </label> <input type="text" name="coverArt"    value={coverArt}   onChange={e => setCoverArt(e.target.value)}/>
          <input type="submit" value="Submit" className="admin-submit-game" />
        </form>
      )}
    </div>
  );
}

export default AdminGames;
