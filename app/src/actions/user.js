// Functions to help with user actions.

// environment configutations
import ENV from "./../config.js";
const API_HOST = ENV.api_host;
// console.log('Current environment:', ENV.env)

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
  const url = `${API_HOST}/users/check-session`;

  if (!ENV.use_frontend_test_user) {
    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json && json.currentUser) {
          app.setState({ currentUser: json.currentUser });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    app.setState({ currentUser: ENV.user });
  }
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
  const value = field.value;
  const name = field.name;

  loginComp.setState({
    [name]: value,
  });
};

// A function to send a POST request with the user to be logged in
export const login = (username, password, setUser, setLoggedIn) => {
  // Create our request constructor with all the parameters we need
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
      if (json.currentUser !== undefined) {
        setUser(json.currentUser);
        setLoggedIn(1);
        console.log("Logged in!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
  const url = `${API_HOST}/users/logout`;

  fetch(url)
    .then((res) => {
      app.setState({
        currentUser: null,
        message: { type: "", body: "" },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signup = (username, password, setUser, setLoggedIn) => {
  // Create our request constructor with all the parameters we need
  const userObj = {
    username: username,
    password: password,
  };

  const request = new Request(`${API_HOST}/api/users`, {
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
        console.log("Signed Up!");
        return res.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateSignUpForm = () => {};