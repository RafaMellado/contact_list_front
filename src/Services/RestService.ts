import Cookies from "universal-cookie";

const authorizationToken = () => {
  const cookies = new Cookies();

  return cookies.get("user")?.token;
};

const headers = {
  "Content-Type": "application/json",
};

const authorizationHeaders = {
  ...headers,
  Authorization: authorizationToken(),
};

class RestService {
  async index<T>(path: string) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "GET",
      headers: authorizationHeaders,
    });

    return (await response.json()) as T;
  }

  async post<T>(path: string, requestData: object) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "POST",
      headers: authorizationHeaders,
      body: JSON.stringify({ ...requestData }),
    });

    return (await response.json()) as T;
  }
}

export default new RestService();
