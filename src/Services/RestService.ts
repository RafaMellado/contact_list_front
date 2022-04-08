import Cookies from "universal-cookie";

class RestService {
  index(path: string) {
    return fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorizationToken(),
      },
    });
  }

  post(path: string, requestData: object) {
    return fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...requestData }),
    });
  }

  authorizationToken() {
    const cookies = new Cookies();

    return cookies.get("user").token;
  }
}

export default new RestService();
