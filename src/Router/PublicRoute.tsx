import { Navigate } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";

interface PublicRouteProps {
  RouteComponent: any;
}

export function PublicRoute({ RouteComponent }: PublicRouteProps) {
  return !AuthenticationService.isLogged() ? (
    <RouteComponent />
  ) : (
    <Navigate replace to="/home" />
  );
}
