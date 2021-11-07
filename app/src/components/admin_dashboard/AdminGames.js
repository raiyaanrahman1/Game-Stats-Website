import React, { useState } from "react";

const onSubmit = (e) => {
  e.preventDefault();
  //Send data to back-end
};

const searchGames = (e) => {
  e.preventDefault();
  //search games
};

function AdminGames() {
  let [showForm, setShowForm] = useState(false);
  const text1 = "Add a Game";
  const text2 = "Edit a Game";
  return (
    <div className="admin-games-settings">
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
          <input type="text" defaultValue="Example Title" />
          <label>Publisher: </label>{" "}
          <input type="text" defaultValue="Example Publisher" />
          <label>Genres: </label>{" "}
          <input type="text" defaultValue="Action, Fantasy" />
          <label>Description: </label>{" "}
          <input type="text" defaultValue="Example description goes here." />
          <input type="submit" value="Edit" className="admin-submit-game" />
        </form>
      )}
      {showForm && (
        <form className="admin-add-game-display" onSubmit={onSubmit}>
          <label>ID: </label>
          <label>Title: </label> <input type="text" />
          <label>Publisher: </label> <input type="text" />
          <label>Genres: </label> <input type="text" />
          <label>Description: </label> <input type="text" />
          <input type="submit" value="Submit" className="admin-submit-game" />
        </form>
      )}
    </div>
  );
}

export default AdminGames;
