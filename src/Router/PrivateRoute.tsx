import { Navigate } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";

export interface PrivateRouteProps {
  RouteComponent: React.FC;
}

export function PrivateRoute({ RouteComponent }: PrivateRouteProps) {
  return AuthenticationService.isLogged() ? (
    <RouteComponent />
  ) : (
    <Navigate replace to="/" />
  );
}
