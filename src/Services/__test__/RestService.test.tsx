import RestService from "../RestService";
import RestInterceptor from "../Interceptors/RestInterceptor";

jest.mock("../Interceptors/RestInterceptor");
jest.mock("universal-cookie", () => {
  class MockCookies {
    get() {
      return { token: "token test" };
    }
  }

  return MockCookies;
});

const requestParams = (action: string, params: object = {}) => {
  return {
    headers: {
      Authorization: "token test",
      "Content-Type": "application/json",
    },
    method: action,
    ...params,
  };
};

const requestUrl = (path: string) => {
  return `${process.env.REACT_APP_API_HOST}${path}`;
};

describe("RestService", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({ test: "test" }),
      })
    );
  });

  test("index call is correct", async () => {
    const response = await RestService.index("/test", {});

    expect(fetch).toHaveBeenCalledWith(
      requestUrl("/test"),
      requestParams("GET")
    );

    expect(RestInterceptor.interceptor).toHaveBeenCalled();

    expect(response).toStrictEqual({ test: "test" });
  });

  test("show call is correct", async () => {
    const response = await RestService.show("/test", 1);

    expect(fetch).toHaveBeenCalledWith(
      requestUrl("/test/1"),
      requestParams("GET")
    );

    expect(RestInterceptor.interceptor).toHaveBeenCalled();

    expect(response).toStrictEqual({ test: "test" });
  });

  test("create call is correct", async () => {
    const response = await RestService.create("/test", { body: "body test" });

    expect(fetch).toHaveBeenCalledWith(
      requestUrl("/test"),
      requestParams("POST", { body: JSON.stringify({ body: "body test" }) })
    );

    expect(RestInterceptor.interceptor).toHaveBeenCalled();

    expect(response).toStrictEqual({ test: "test" });
  });

  test("update call is correct", async () => {
    const response = await RestService.update("/test", 1, {
      body: "body test",
    });

    expect(fetch).toHaveBeenCalledWith(
      requestUrl("/test/1"),
      requestParams("PUT", { body: JSON.stringify({ body: "body test" }) })
    );

    expect(response).toStrictEqual({ test: "test" });
  });

  test("delete call is correct", async () => {
    await RestService.delete("/test", 1);

    expect(fetch).toHaveBeenCalledWith(
      requestUrl("/test/1"),
      requestParams("DELETE")
    );
  });

  test("convertPath returns the correct queryString", () => {
    const path = RestService.convertPath(requestUrl("/test"), {
      test: { query: "query test" },
    });

    expect(path).toBe(`${requestUrl("/test")}?test%5Bquery%5D=query%20test`);
  });
});
