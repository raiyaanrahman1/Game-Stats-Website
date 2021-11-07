import React from "react";

const searchUsers = (e) => {
  e.preventDefault();
  //search games
};

function AdminUsers() {
  return (
    <div className="admin-games-settings">
      <form className="admin-users-search" onSubmit={searchUsers}>
        <label> Search Users: {/*We'd get the id here*/} </label>
        <input placeholder="Please Enter a Username" />
      </form>
      <div className="admin-cur-user-display">
        <div className="admin-profile-display-left">
          <div className="admin-user-display-profile-image"></div>
          <div className="profile-name-desc">
            <h4> Example User </h4>
            <h5> Example User Description</h5>
          </div>
        </div>
        <div>
          <button className="admin-ban-user-button"> Ban User </button>
          <button className="admin-ban-user-button"> Edit User Profile </button>
          <button className="admin-ban-user-button">
            {" "}
            Edit User's Reviews{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
