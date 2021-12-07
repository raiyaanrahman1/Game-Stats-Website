import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import AdminOptions from "./AdminOptions";
import AdminStats from "./AdminStats";
import AdminGames from "./AdminGames";
import AdminUsers from "./AdminUsers";

const Admin = () => {
  let [mainFunctionality, setMainFunctionality] = useState("Stats");
  let page;

  switch (mainFunctionality) {
    case "Stats":
      page = <AdminStats />;
      break;
    case "Games":
      page = <AdminGames />;
      break;
    case "Users":
      page = <AdminUsers />;
      break;
    default:
      page = <AdminStats />;
      break;
  }

  return (
    <div className="admin-dashboard">
      <div>
        <ul className="admin-options">
          <li onClick={() => setMainFunctionality("Stats")}>Stats</li>
          <li onClick={() => setMainFunctionality("Games")}>Games</li>
          <li onClick={() => setMainFunctionality("Users")}>Users</li>
        </ul>
      </div>
      {page}
    </div>
  );
};

export default Admin;
