import Cookies from "universal-cookie";
import { LoginRequestBody, LoginResponse } from "./Interfaces/Login";
import LoginRepository from "./Repository/LoginRepository";

class AuthenticationService {
  async login(data: LoginRequestBody): Promise<void> {
    const response = await LoginRepository.login(data);

    if (response.token) {
      this.setAuthCookie(response);

      window.location.href = "/home";
    }
  }

  logout() {
    const cookies = new Cookies();

    cookies.remove("contact-list-user");

    window.location.href = "/";
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
