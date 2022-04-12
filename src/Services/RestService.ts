import RestInterceptor from "./Interceptors/RestInterceptor";
import * as qs from "qs";
import Cookies from "universal-cookie";

const authorizationToken: () => string = () => {
  const cookies = new Cookies();

  return String(cookies.get("contact-list-user")?.token);
};

const headers = {
  "Content-Type": "application/json",
  Authorization: authorizationToken(),
};

class RestService {
  async index<T>(path: string, params: object): Promise<T> {
    const newPath = this.convertPath(
      `${process.env.REACT_APP_API_HOST}${path}`,
      params
    );

    const response = await fetch(newPath, {
      method: "GET",
      headers: headers,
    });

    RestInterceptor.interceptor();

    return await response.json();
  }

  async show<T>(path: string, id: number): Promise<T> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    RestInterceptor.interceptor();

    return await response.json();
  }

  async create<T>(path: string, requestData: object): Promise<T> {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${path}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ ...requestData }),
    });

    RestInterceptor.interceptor();

    const json = await response.json();

    if (response.status === 422) {
      return Promise.reject(json);
    }

    return json;
  }

  async update<T>(path: string, id: number, requestData: object): Promise<T> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ ...requestData }),
      }
    );

    const json = await response.json();

    if (response.status === 422) {
      return Promise.reject(json);
    }

    return json;
  }

  async delete<T>(path: string, id: number): Promise<Response> {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}${path}/${id}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );

    if (response.status === 422) {
      return Promise.reject({ errors: await response.json() });
    }

    return await response;
  }

  convertPath(path: string, params: object) {
    if (Object.keys(params).length) {
      return `${path}?${qs.stringify(params)}`;
    }

    return path;
  }
}

export default new RestService();
