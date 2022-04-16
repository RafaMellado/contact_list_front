import { Routes } from "../Routes";
import { act, render } from "@testing-library/react";
import { Login } from "../../Pages/Login/Login";
import { Router } from "react-router-dom";
import AuthenticationService from "../../Services/AuthenticationService";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../Services/AuthenticationService", () => ({
  isLogged: jest.fn(),
}));

describe(`<${Routes.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <Routes />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
