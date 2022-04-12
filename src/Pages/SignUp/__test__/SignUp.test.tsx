import { SignUp } from "../SignUp";
import { act, fireEvent, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { useState as useStateMock } from "react";
import AuthenticationService from "../../../Services/AuthenticationService";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService", () => ({
  signUp: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();

describe(`<${SignUp.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () => {
    return render(
      <Router location="/" navigator={history}>
        <SignUp />
      </Router>
    );
  };

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation(() => [null, setState]);
  });

  test("renders correctly the component", () => {
    const component = factoryComponent();

    act(() => {
      expect(component.asFragment()).toMatchSnapshot();
    });
  });

  test("fill correctly and call signUp", () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.input(component.getByTestId("sign-up-username"), {
        target: {
          value: "abcdef",
        },
      });

      fireEvent.input(component.getByTestId("sign-up-email"), {
        target: {
          value: "test@email.com",
        },
      });

      fireEvent.input(component.getByTestId("sign-up-password"), {
        target: {
          value: "abcdef",
        },
      });

      fireEvent.input(component.getByTestId("sign-up-password-confirmation"), {
        target: {
          value: "abcdef",
        },
      });

      fireEvent.click(component.getByTestId("sign-up-submit"));

      expect(AuthenticationService.signUp).toHaveBeenCalled();
    });
  });
});
