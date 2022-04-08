import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface PrivateRouteProps {
  RouteComponent: any;
}

export function PrivateRoute({ RouteComponent }: PrivateRouteProps) {
  const loggedIn = () => {
    const cookies = new Cookies();

    return !!cookies.get("user");
  };

  return loggedIn() ? <RouteComponent /> : <Navigate replace to="/" />;
}
