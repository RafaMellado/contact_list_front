import Cookies from "universal-cookie";
import { LoginRequestBody, LoginResponse } from "./Interfaces/Login";
import { SignUpRequestBody, SignUpResponse } from "./Interfaces/SignUp";
import LoginRepository from "./Repository/LoginRepository";
import SignUpRepository from "./Repository/SignUpRepository";

class AuthenticationService {
  async login(data: LoginRequestBody): Promise<void> {
    const response = await LoginRepository.login(data);

    if (response.token) {
      this.setAuthCookie(response);

      window.location.reload();
    }
  }

  async signUp(data: SignUpRequestBody): Promise<SignUpResponse> {
    return SignUpRepository.signUp(data);
  }

  logout(): void {
    const cookies = new Cookies();

    cookies.remove("contact-list-user");

    window.location.href = "/";
  }

  isLogged(): Boolean {
    const cookies = new Cookies();

    return !!cookies.get("contact-list-user");
  }

  setAuthCookie(data: LoginResponse): void {
    const cookies = new Cookies();

    cookies.set(
      "contact-list-user",
      { token: data.token, username: data.username },
      { expires: new Date(data.exp) }
    );
  }
}

export default new AuthenticationService();
