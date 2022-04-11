import fetchInterceptor from "fetch-intercept";
import Cookies from "universal-cookie";

const authorizationToken: () => string = () => {
  const cookies = new Cookies();

  return String(cookies.get("contact-list-user")?.token);
};

class RestInterceptor {
  interceptor = fetchInterceptor.register({
    request: function (url, config) {
      config.headers.Authorization = authorizationToken();

      return [url, config];
    },

    response: function (response) {
      if ([401, 403, 404, 500].includes(response.status)) {
        window.location.href = `/error-${response.status}`;
      }

      return response;
    },
  });
}

export default new RestInterceptor();
