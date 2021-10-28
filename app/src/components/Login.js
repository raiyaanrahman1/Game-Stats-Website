import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = (e) => {
        e.preventDefault();
    
        if (!username || !password) {
          alert("Please a username and password.");
          return;
        }
    
        setUsername(username);
        setPassword(password);
    
        if (username === "user" && password === "user") {
            //login to user view
        } else if (username === "admin" && password === "admin") {
            //login to admin view
        } else {
            alert("Incorrect username or password.");
            return;
        }
      };

    return (
        <form onSubmit={onLogin}>
            <label>Username: </label>
            <input type="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <p></p> {/*This is is just temporary until we do CSS*/}
            <label>Password: </label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <p></p> {/*This is is just temporary until we do CSS*/}
            <input type="submit" value="Login"/>
        </form>
    )
}

export default Login
