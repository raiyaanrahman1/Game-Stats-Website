import React, { useState } from "react";



const searchGames = (e) => {
  e.preventDefault();
  //search games
};

function AdminGames() {
  let [showForm, setShowForm] = useState(false);

  let [title, setTitle] = useState("");
  let [publisher, setPublisher] = useState("")
  let [genres, setGenres] = useState("")
  let [description, setDescription] = useState("")
  let [coverArt, setCoverArt] = useState("")

  const text1 = "Add a Game";
  const text2 = "Edit a Game";

  const onSubmit = (e) => {
    e.preventDefault();
    if (showForm) { // Add

      const gameData = {
        title: title,
        publisher: publisher,
        genres: genres.split(/\s*,\s*/),
        description: description,
        coverArt: coverArt
      }
      console.log(gameData);

      fetch("/api/games", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gameData)}) 
        .then((response) => {
          console.log(response.json());
        })

    } else {        // Edit
      console.log("Edit: Not yet implemented")
    }
  };

  return (
    <div className="admin-settings">
      <button
        className="admin-add-game-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? text2 : text1}
      </button>

      {!showForm && (
        <form className="admin-games-search" onSubmit={searchGames}>
          <label>{/*We'd get the id here*/} </label>
          <input placeholder="Search Exisiting Games" />
        </form>
      )}
      {!showForm && (
        <form className="admin-add-game-display" onSubmit={onSubmit}>
          <label>ID: XXX</label>
          <label>Title: </label>{" "}
          <input type="text" name="title"      defaultValue={title}       onChange={e => setTitle(e.target.value)} />
          <label>Publisher: </label>{" "}
          <input type="text" name="publisher"  defaultValue={publisher}   onChange={e => setPublisher(e.target.value)}/>
          <label>Genres: </label>{" "}
          <input type="text" name="genres"      defaultValue={genres}     onChange={e => setGenres(e.target.value)}/>
          <label>Description: </label>{" "}
          <input type="text" name="description" defaultValue={description}onChange={e => setDescription(e.target.value)}/>
          <label>Cover Art: </label>{" "}
          <input type="text" name="coverArt"    defaultValue={coverArt}   onChange={e => setCoverArt(e.target.value)}/>
          <input type="submit" value="Edit" className="admin-submit-game" />
        </form>
      )}
      {showForm && (
        <form className="admin-add-game-display" onSubmit={onSubmit}>
          {/* <label>ID: </label> */}
          <label>Title: </label> <input type="text" name="title"      defaultValue={title}       onChange={e => setTitle(e.target.value)} />
          <label>Publisher: </label> <input type="text" name="publisher"  defaultValue={publisher}   onChange={e => setPublisher(e.target.value)}/>
          <label>Genres: </label> <input type="text" name="genres"      defaultValue={genres}     onChange={e => setGenres(e.target.value)}/>
          <label>Description: </label> <input type="text" name="description" defaultValue={description}onChange={e => setDescription(e.target.value)}/>
          <label>Cover Art: </label> <input type="text" name="coverArt"    defaultValue={coverArt}   onChange={e => setCoverArt(e.target.value)}/>
          <input type="submit" value="Submit" className="admin-submit-game" />
        </form>
      )}
    </div>
  );
}

export default AdminGames;
