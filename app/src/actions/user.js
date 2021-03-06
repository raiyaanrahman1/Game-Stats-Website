// Functions to help with user actions.

// environment configutations
import ENV from "./../config.js";
const API_HOST = ENV.api_host;
// console.log('Current environment:', ENV.env)

// Send a request to check if a user is logged in through the session cookie
export const checkSession = ({ app, setLoggedIn, setUser }) => {
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
          console.log(json.role);
          console.log(json.currentUser);
          setLoggedIn(json.role);
          setUser(json.currentUser); //check if this is right later
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setUser(ENV.user);
    setLoggedIn(1);
  }
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
      if (json.currentUser !== undefined && json.role !== undefined) {
        setUser(json.currentUser);
        setLoggedIn(json.role);
        console.log("Logged in!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to send a GET request to logout the current user
export const logout = ({ setUser, setLoggedIn }) => {
  const url = `${API_HOST}/users/logout`;

  fetch(url)
    .then((res) => {
      setUser("");
      setLoggedIn(0);
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

  return fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log("Signed Up!");
        return res.json();
      }
    })
    // .catch((error) => {
    //   console.log(error);
    // });
};

export const getUserProfile = (username, setUserProfile) => {
  console.log(username);
  const request = new Request(`${API_HOST}/api/users/${username}`, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        console.log(json);
        setUserProfile(json);
        return json;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateDescription = (username, description) => {
  const userObj = {
    username: username,
    description: description,
  };

  const request = new Request(`${API_HOST}/api/users/${username}/updateDesc`, {
    method: "post",
    body: JSON.stringify(userObj),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        console.log(json);
        return json;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likeGame = ({ user, gameId }) => {
  if (!user) {
    return;
  }

  const obj = { username: user, gameId: gameId };

  const request = new Request(`${API_HOST}/api/users/${user}/likeGame`, {
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log(obj);

  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
