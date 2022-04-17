import { SignUp } from "../SignUp";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import AuthenticationService from "../../../Services/AuthenticationService";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService");

const mockedAuthenticationService = AuthenticationService as jest.Mocked<
  typeof AuthenticationService
>;

describe(`<${SignUp.name} />`, () => {
  const history = createMemoryHistory();

  const factoryComponent = () => {
    return render(
      <Router location="/" navigator={history}>
        <SignUp />
      </Router>
    );
  };

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("fill correctly and call signUp", () => {
    const component = factoryComponent();

    act(() => {
      fireEvent.input(component.getByTestId("sign-up-username"), {
        target: {
          value: "user",
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

      expect(mockedAuthenticationService.signUp).toHaveBeenCalledWith({
        email: "test@email.com",
        password: "abcdef",
        password_confirmation: "abcdef",
        username: "user",
      });
    });
  });

  test("submit and show errors", async () => {
    mockedAuthenticationService.signUp.mockRejectedValue({
      errors: {
        password_confirmation: [
          { error: "confirmation", attribute: "password" },
        ],
        email: [{ error: "taken", value: "test@email.com" }],
      },
    });

    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("sign-up-submit"));

    await waitFor(() => {
      expect(component.queryByTestId("error-box-email")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
