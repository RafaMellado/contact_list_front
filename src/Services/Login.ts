import { LoginData, LoginResponse } from "./Interfaces/Login";
import RestService from "./RestService";
import Cookies from "universal-cookie";

class LoginService {
  async login(loginData: LoginData) {
    const response = await RestService.post("/auth/login", loginData);
    const data: LoginResponse = await response.json();

    if (data.token) {
      this.setCookie(data);
    }

    return !!data.token;
  }

  setCookie(data: LoginResponse) {
    const cookies = new Cookies();

    cookies.set(
      "user",
      { token: data.token, username: data.username },
      { expires: new Date(data.exp) }
    );
  }
}

export default new LoginService();
