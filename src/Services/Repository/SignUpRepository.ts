import { SignUpRequestBody, SignUpResponse } from "../Interfaces/SignUp";
import RestService from "../RestService";

class SignUpRepository {
  async signUp(data: SignUpRequestBody) {
    const response: SignUpResponse = await RestService.create<SignUpResponse>(
      "/users",
      data
    );

    const { username, email } = response;

    return { username, email };
  }
}

export default new SignUpRepository();
