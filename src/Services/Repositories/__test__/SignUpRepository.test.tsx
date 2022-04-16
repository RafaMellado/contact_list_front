import SignUpRepository from "../SignUpRepository";
import RestService from "../../RestService";

jest.mock("../../RestService");

const mockedRestService = RestService as jest.Mocked<typeof RestService>;

describe("SignUpRepository", () => {
  test("SignUpRepository signUp call is correct", async () => {
    mockedRestService.create.mockResolvedValue({
      username: "",
      email: "",
    });

    const data = {
      username: "aaa",
      email: "bbb",
      password: "111",
      password_confirmation: "111",
    };

    await SignUpRepository.signUp(data);

    expect(RestService.create).toHaveBeenCalledWith("/users", data);
  });
});
