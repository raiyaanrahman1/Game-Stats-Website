import { useState } from "react";
import { Link } from "react-router-dom";
import { /*updateSignUpForm,*/ signup } from "./../actions/user";

const SignUp = ({ user, setUser, loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = (e) => {
    e.preventDefault();
    console.log("TESTING SIGNUP");

    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    setUsername(username);
    setPassword(password);

    signup(username, password, setUser, setLoggedIn);
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
        <input className="loginBtn" type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default SignUp;
