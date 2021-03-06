import { Route, Redirect } from "react-router-dom";

function PrivateRouteAdmin({
  component: Component,
  loggedIn: loggedIn,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn < 2) {
          return <Redirect to={{ pathname: "/" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRouteAdmin;
