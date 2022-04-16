import { PrivateRoute } from "../PrivateRoute";
import { act, render } from "@testing-library/react";
import { Login } from "../../Pages/Login/Login";
import { Router } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";
import { createMemoryHistory } from "history";
import type { PrivateRouteProps } from "../PrivateRoute";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../Services/AuthenticationService", () => ({
  isLogged: jest.fn(),
}));

describe(`<${PrivateRoute.name} />`, () => {
  const history = createMemoryHistory();
  const privateRouteProps: PrivateRouteProps = {
    RouteComponent: Login,
  };

  const factoryComponent = (props: PrivateRouteProps = privateRouteProps) =>
    render(
      <Router location="/" navigator={history}>
        <PrivateRoute {...props} />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("renders correctly the component when user is logged", () => {
    AuthenticationService.isLogged = () => true;

    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot("login");
    });
  });
});
