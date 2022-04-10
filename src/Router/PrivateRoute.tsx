import { Navigate } from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";

interface PrivateRouteProps {
  RouteComponent: any;
}

export function PrivateRoute({ RouteComponent }: PrivateRouteProps) {
  return AuthenticationService.isLogged() ? (
    <RouteComponent />
  ) : (
    <Navigate replace to="/" />
  );
}
