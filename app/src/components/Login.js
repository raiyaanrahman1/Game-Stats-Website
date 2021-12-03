import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "./../actions/user";

function Login({ user, setUser, loggedIn, setLoggedIn }) {
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

    if (username === "admin" && password === "admin") {
      setLoggedIn(2);
      //props.setPage("home");
      history.push("/");
      //login to admin view
    } else {
      login(username, password, setUser, setLoggedIn);
      if (loggedIn === 1) {
        history.push("/");
      }
    }
  };

  return (
    <div className="page-content">
      <form className="loginForm" onSubmit={onLogin}>
        <input
          className="loginInput"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p></p>
        <input
          className="loginInput"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Don't have an account? <Link to="/signup"> Sign Up </Link>{" "}
        </p>
        <input className="loginBtn" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
