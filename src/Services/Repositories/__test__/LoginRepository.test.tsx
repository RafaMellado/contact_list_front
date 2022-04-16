import LoginRepository from "../LoginRepository";
import RestService from "../../RestService";

jest.mock("../../RestService");

const mockedRestService = RestService as jest.Mocked<typeof RestService>;

describe("LoginRepository", () => {
  test("LoginRepository login call is correct", async () => {
    mockedRestService.create.mockResolvedValue({
      token: "",
      username: "",
      exp: "",
    });

    const data = { email: "aaa", password: "111" };

    await LoginRepository.login(data);

    expect(RestService.create).toHaveBeenCalledWith("/auth/login", data);
  });
});
