import { Login } from "../Login";
import AuthenticationService from "../../../Services/AuthenticationService";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../../Services/AuthenticationService");

const mockedAuthenticationService = AuthenticationService as jest.Mocked<
  typeof AuthenticationService
>;

describe(`<${Login.name} />`, () => {
  const factoryComponent = () => render(<Login />);

  test("renders correctly the component", () => {
    const component = factoryComponent();

    expect(component.asFragment()).toMatchSnapshot();
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

      expect(mockedAuthenticationService.login).toHaveBeenCalledWith({
        email: "test@email.com",
        password: "abcdef",
      });
    });
  });

  test("submit and show errors", async () => {
    mockedAuthenticationService.login.mockRejectedValue({
      error: "unauthorized",
    });

    const component = await factoryComponent();

    fireEvent.click(component.getByTestId("login-submit"));

    await waitFor(() => {
      expect(component.queryByTestId("login-error")).toBeTruthy();
    });

    expect(component.asFragment()).toMatchSnapshot("errors");
  });
});
