import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, loggedIn: loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn === 0) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
