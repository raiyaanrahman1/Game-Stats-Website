import React, {useState} from "react";

function AdminStats() {
	// TODO: Get stats from server.
	const [userCount, setUserCount] = useState(0);
	// const newUserCount = 2
	const [gameCount, setGameCount] = useState(0);
	// const newGameCount = 3

	// const visitCount = 1;	// Don't know how to get this info, maybe through external library?
	// const newVisitCount = 1;

	fetch("api/games").then(res => {
		if(res.ok){
			return res.json();
		}
	}).then(json => {
		if(json.games && json.games.length > -1){
			setGameCount(json.games.length);
		}
		
	}).catch(err => {console.log(err)});

	fetch("api/users").then(res => {
		if(res.ok){
			return res.json();
		}
	}).then(json => {
		if(json.length && json.length > -1){
			setUserCount(json.length);
		}
	})

	return (<div className="admin-settings admin-stats">
		<p>Users Count: {userCount} <br/>
			{/* &emsp;+{newUserCount} new users today  */} </p>
		<p>Games Count: {gameCount} <br/>
			{/* &emsp;+{newGameCount} new games today */}
			</p>
		{/* <p>Visiter Count: {visitCount} <br/>
			&emsp;+{newVisitCount} new visiter today</p> */}
		
		{/* maybe add line graphs below ? */}
		
	</div>);
}

export default AdminStats;
