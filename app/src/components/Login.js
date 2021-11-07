import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const onLogin = (e) => {
        e.preventDefault();
    
        if (!username || !password) {
          alert("Please enter a username and password.");
          return;
        }
    
        setUsername(username);
        setPassword(password);
    
        if (username === "user" && password === "user") {
            props.setLoggedIn(1);
            //props.setPage("home");
            history.push("/");
            //login to user view
        } else if (username === "admin" && password === "admin") {
            props.setLoggedIn(2);
            //props.setPage("home");
            history.push("/");
            //login to admin view
        } else {
            alert("Incorrect username or password.");
            return;
        }
      };

    return (
        <div className="page-content">
            <form className="loginForm" onSubmit={onLogin}>
                <input className="loginInput" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <p></p> 
                <input className="loginInput" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <p>Don't have an account? Sign Up</p> {/*This is is just temporary until we do CSS*/}
                <input className="loginBtn" type="submit" value="Login"/>
            </form>
        </div>
        
    )
}

export default Login
