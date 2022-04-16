import Cookies from "universal-cookie";
import SignUpRepository from "../Repositories/SignUpRepository";
import LoginRepository from "../Repositories/LoginRepository";
import AuthenticationService from "../AuthenticationService";

jest.mock("../Repositories/LoginRepository");
jest.mock("../Repositories/SignUpRepository");

const mockedLoginRepository = LoginRepository as jest.Mocked<
  typeof LoginRepository
>;
const mockedSignUpRepository = SignUpRepository as jest.Mocked<
  typeof SignUpRepository
>;

const cookies = new Cookies();

describe("AuthenticationService", () => {
  test("setAuthCookie call is correct", () => {
    AuthenticationService.setAuthCookie({
      token: "test",
      username: "test",
      exp: "",
    });

    expect(cookies.get("contact-list-user")).toBeTruthy();
  });

  test("logout call is correct", () => {
    AuthenticationService.setAuthCookie({
      token: "test",
      username: "test",
      exp: "",
    });

    expect(cookies.get("contact-list-user")).toBeTruthy();

    AuthenticationService.logout();

    expect(cookies.get("contact-list-user")).toBeFalsy();
  });

  test("isLogged call is correct", () => {
    AuthenticationService.setAuthCookie({
      token: "test",
      username: "test",
      exp: "",
    });

    expect(AuthenticationService.isLogged()).toBeTruthy();

    AuthenticationService.logout();

    expect(AuthenticationService.isLogged()).toBeFalsy();
  });

  test("login call is correct", async () => {
    // Redefine window.location to check reload call, because window.location
    // is a readonly property
    Object.defineProperty(window, "location", {
      writable: true,
      value: { reload: jest.fn() },
    });

    AuthenticationService.setAuthCookie = jest.fn();

    mockedLoginRepository.login.mockResolvedValue({
      token: "test",
      username: "test",
      exp: "test",
    });

    const data = { email: "", password: "" };

    await AuthenticationService.login(data);

    expect(LoginRepository.login).toHaveBeenCalledWith(data);
    expect(AuthenticationService.setAuthCookie).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  test("signUp call is correct", async () => {
    mockedSignUpRepository.signUp.mockResolvedValue({
      username: "",
      email: "",
    });

    const data = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    await AuthenticationService.signUp(data);

    expect(SignUpRepository.signUp).toHaveBeenCalledWith(data);
  });
});
