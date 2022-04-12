import fetchInterceptor from "fetch-intercept";

class RestInterceptor {
  interceptor = fetchInterceptor.register({
    response: function (response) {
      if ([401, 403, 404, 500].includes(response.status)) {
        window.location.href = `/error-${response.status}`;
      }

      return response;
    },
  });
}

export default new RestInterceptor();
