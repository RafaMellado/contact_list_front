import Cookies from "universal-cookie";

const authorizationToken: () => string = () => {
  const cookies = new Cookies();

  return String(cookies.get("contact-list-user")?.token);
};

const headers = {
  "Content-Type": "application/json",
};

const authorizationHeaders = {
  ...headers,
  Authorization: authorizationToken(),
};

class RestService {
  async index<T>(path: string): Promise<T> {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "GET",
      headers: authorizationHeaders,
    });

    return await response.json();
  }

  async show<T>(path: string, id: number): Promise<T> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "GET",
        headers: authorizationHeaders,
      }
    );

    return await response.json();
  }

  async create<T>(path: string, requestData: object): Promise<T> {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "POST",
      headers: authorizationHeaders,
      body: JSON.stringify({ ...requestData }),
    });

    return await response.json();
  }

  async update<T>(path: string, id: number, requestData: object): Promise<T> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "PUT",
        headers: authorizationHeaders,
        body: JSON.stringify({ ...requestData }),
      }
    );

    return await response.json();
  }

  async delete<T>(path: string, id: number): Promise<Response> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "DELETE",
        headers: authorizationHeaders,
      }
    );

    return await response;
  }
}

export default new RestService();
