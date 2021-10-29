import { useState } from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = (e) => {
        e.preventDefault();
    
        if (!username || !password) {
          alert("Please enter a username and password.");
          return;
        }
    
        setUsername(username);
        setPassword(password);
    
        if (username === "user" && password === "user") {
            props.setLoggedIn(true);
            props.setPage("home");
            //login to user view
        } else if (username === "admin" && password === "admin") {
            props.setLoggedIn(true);
            props.setPage("home");
            //login to admin view
        } else {
            alert("Incorrect username or password.");
            return;
        }
      };

    return (
        <form className="loginForm"onSubmit={onLogin}>
            <input className="loginInput" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <p></p> 
            <input className="loginInput" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <p>Don't have an account? Sign Up</p> {/*This is is just temporary until we do CSS*/}
            <input className="loginBtn" type="submit" value="Login"/>
        </form>
    )
}

export default Login
