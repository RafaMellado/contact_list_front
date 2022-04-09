import { LoginRequestBody, LoginResponse } from "../Interfaces/Login";
import RestService from "../RestService";

class LoginRepository {
  async login(data: LoginRequestBody) {
    const response: LoginResponse = await RestService.post<LoginResponse>(
      "/auth/login",
      data
    );

    const { token, username, exp } = response;

    return { token, username, exp };
  }
}

export default new LoginRepository();
