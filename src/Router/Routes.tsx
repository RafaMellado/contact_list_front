import { Routes as Switch, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Home } from "../Pages/Home/Home";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<PublicRoute RouteComponent={Login} />} />
      <Route path="/home" element={<PrivateRoute RouteComponent={Home} />} />
    </Switch>
  );
}
