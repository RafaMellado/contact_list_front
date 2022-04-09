import Cookies from "universal-cookie";
import { LoginRequestBody, LoginResponse } from "./Interfaces/Login";
import LoginRepository from "./Repository/LoginRepository";

class AuthenticationService {
  async login(data: LoginRequestBody) {
    const response = await LoginRepository.login(data);

    if (response.token) {
      this.setAuthCookie(response);

      window.location.href = "/home";
    }
  }

  setAuthCookie(data: LoginResponse) {
    const cookies = new Cookies();

    cookies.set(
      "user",
      { token: data.token, username: data.username },
      { expires: new Date(data.exp) }
    );
  }
}

export default new AuthenticationService();
