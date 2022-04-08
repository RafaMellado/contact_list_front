import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface PublicRouteProps {
  RouteComponent: any;
}

export function PublicRoute({ RouteComponent }: PublicRouteProps) {
  const notLogged = () => {
    const cookies = new Cookies();

    return !cookies.get("user");
  };

  return notLogged() ? <RouteComponent /> : <Navigate replace to="/home" />;
}
