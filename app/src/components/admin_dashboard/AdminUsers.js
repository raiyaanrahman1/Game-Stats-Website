import React, {useState} from "react";

const searchUsers = (e) => {
  e.preventDefault();
  //search games
  let username = document.getElementById("user-search-input").textContent;
  
};

function AdminUsers() {
  let [users, setUsers] = useState([]);
  let [username, setUsername] = useState("placeholder username");
  let [description, setDescription] = useState("placeholder description");
  fetch("api/users").then(res => {
    if(res.ok){
      return res.json();
    }
  }).then(users => {
    setUsers(users);
  }).catch(err => {console.log(err)});
  return (
    <div className="admin-settings">
      <form className="admin-users-search" onSubmit={(e)=> {
        e.preventDefault();
        //search games
        let username = document.getElementById("user-search-input").value;
        console.log(username);
        // console.log(e.target);
        for(let user of users){
          if(user.username === username){
            setUsername(user.username);
            setDescription(user.description);
          }
        }
      }}>
        <label> Search Users: {/*We'd get the id here*/} </label>
        <input id="user-search-input" placeholder="Please Enter a Username" />
      </form>
      <div className="admin-cur-user-display">
        <div className="admin-profile-display-left">
          <div className="admin-user-display-profile-image"></div>
          <div className="profile-name-desc">
            <h4> {username} </h4>
            <h5> {description} </h5>
          </div>
        </div>
        <div>
          {/* <button className="admin-ban-user-button"> Ban User </button>
          <button className="admin-ban-user-button"> Edit User Profile </button>
          <button className="admin-ban-user-button">
            {" "}
            Edit User's Reviews{" "}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
