import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "./../actions/user";
import ENV from "../config";
const API_HOST = ENV.api_host;

function Login({ app, user, setUser, loggedIn, setLoggedIn }) {
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

    const userObj = {
      username: username,
      password: password,
    };

    const request = new Request(`${API_HOST}/users/login`, {
      method: "post",
      body: JSON.stringify(userObj),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json.currentUser !== undefined && json.role !== undefined) {
          setUser(json.currentUser);
          setLoggedIn(json.role);
          console.log("Logged in!");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (loggedIn !== 0) {
      history.go("/");
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
          Don't have an account? <Link to="/signup"> Sign Up </Link>
        </p>
        <input className="loginBtn" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
