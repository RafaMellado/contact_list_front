import { Header } from "../Header";
import { act, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import AuthenticationService from "../../Services/AuthenticationService";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../Services/AuthenticationService", () => ({
  isLogged: jest.fn(),
}));

describe(`<${Header.name} />`, () => {
  const history = createMemoryHistory();
  const factoryComponent = () =>
    render(
      <Router location="/" navigator={history}>
        <Header />
      </Router>
    );

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("renders logged menu header when is logged", () => {
    AuthenticationService.isLogged = () => true;

    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });
});
