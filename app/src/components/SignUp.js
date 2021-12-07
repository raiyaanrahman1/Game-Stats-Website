import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { /*updateSignUpForm,*/ signup } from "./../actions/user";
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

const SignUp = ({ user, setUser, loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSignUp = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    setUsername(username);
    setPassword(password);

    signup(username, password, setUser, setLoggedIn).then((json) => {
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
            if (json.role !== 0) {
              history.push("/");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }).catch(err => console.log(err));
  };
  return (
    <div className="page-content">
      <p>Please enter a new username:</p>
      <form className="loginForm" onSubmit={(e) => onSignUp(e)}>
        <input
          className="loginInput"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Please enter a new password:</p>
        <input
          className="loginInput"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Already have an account? <Link to="/login"> Login </Link>{" "}
        </p>{" "}
        <input className="loginBtn" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
