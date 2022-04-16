import { Navigate } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";

export interface PublicRouteProps {
  RouteComponent: React.FC;
}

export function PublicRoute({ RouteComponent }: PublicRouteProps) {
  return AuthenticationService.isLogged() ? (
    <Navigate replace to="/home" />
  ) : (
    <RouteComponent />
  );
}
