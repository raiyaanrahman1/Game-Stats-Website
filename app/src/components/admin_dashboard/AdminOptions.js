import React from "react";

function AdminOptions({ onClick }) {
  return (
    <div>
      <ul className="admin-options">
        <li onClick={(e = "Stats") => onClick(e)}>Stats</li>
        <li onClick={(e = "Games") => onClick(e)}>Games</li>
        <li onClick={(e = "Users") => onClick(e)}>Users</li>
      </ul>
    </div>
  );
}

export default AdminOptions;
