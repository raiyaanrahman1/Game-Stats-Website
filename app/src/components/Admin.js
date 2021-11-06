import React from 'react';
import { useHistory } from "react-router-dom";


const Admin = props => {
    let history = useHistory();

    if ( props.loggedIn < 2) {
        
        console.log('You are not an admin')
        history.push("/");
        return <p>You are not an admin</p>;
    }

    return( <div className="admin-main">
        <h4> Welcome, Admin! </h4>
    </div>)
}

export default Admin