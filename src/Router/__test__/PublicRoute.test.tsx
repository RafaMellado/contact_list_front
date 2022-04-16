import { PublicRoute } from "../PublicRoute";
import { act, render } from "@testing-library/react";
import { Login } from "../../Pages/Login/Login";
import { Router } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";
import { createMemoryHistory } from "history";
import type { PublicRouteProps } from "../PublicRoute";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../Services/AuthenticationService", () => ({
  isLogged: jest.fn(),
}));

describe(`<${PublicRoute.name} />`, () => {
  const history = createMemoryHistory();
  const publicRouteProps: PublicRouteProps = {
    RouteComponent: Login,
  };

  const factoryComponent = (props: PublicRouteProps = publicRouteProps) =>
    render(
      <Router location="/" navigator={history}>
        <PublicRoute {...props} />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot("login");
    });
  });

  test("renders correctly the component when user is logged", () => {
    AuthenticationService.isLogged = () => true;

    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot("home");
      expect(history.location.pathname).toBe("/home");
    });
  });
});
