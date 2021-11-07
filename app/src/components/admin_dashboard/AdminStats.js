import React from "react";

function AdminStats() {
	// TODO: Get stats from server.
	const userCount = 2
	const newUserCount = 2
	const gameCount = 20
	const newGameCount = 3

	const visitCount = 1;	// Don't know how to get this info, maybe through external library?
	const newVisitCount = 1;

	return (<div className="admin-settings admin-stats">
		<p>Users Count: {userCount} <br/>
			&emsp;+{newUserCount} new users today</p>
		<p>Games Count: {gameCount} <br/>
			&emsp;+{newGameCount} new games today</p>
		<p>Visiter Count: {visitCount} <br/>
			&emsp;+{newVisitCount} new visiter today</p>
		
		{/* maybe add line graphs below ? */}
		
	</div>);
}

export default AdminStats;
