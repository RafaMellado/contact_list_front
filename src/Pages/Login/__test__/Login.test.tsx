import { Login } from "../Login";
import { useState as useStateMock } from "react";
import AuthenticationService from "../../../Services/AuthenticationService";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService", () => ({
  login: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();

describe(`<${Login.name} />`, () => {
  const factoryComponent = () => render(<Login />);

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation(() => [null, setState]);
  });

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("fill correctly and call login", () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.input(component.getByTestId("login-email"), {
        target: {
          value: "test@email.com",
        },
      });

      fireEvent.input(component.getByTestId("login-password"), {
        target: {
          value: "abcdef",
        },
      });

      fireEvent.click(component.getByTestId("login-submit"));

      expect(AuthenticationService.login).toHaveBeenCalled();
    });
  });
});
