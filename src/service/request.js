import axios from 'axios';

const http = axios.create({
  withCredentials: false,
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return error;
  }
);

http.interceptors.request.use((config) => {
  if (config.method.toLocalLowerCase === 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params,
    };
  }
  return config;
});

const contentTypeMap = {
  json: 'application/json;charset=UTF-8',
  file: 'multipart/form-data',
  formData: 'application/x-www-form-urlencoded',
};

export const $http = ({ method = 'GET', url, data, type = 'json', ...rest }) => {
  method = method.toLocaleUpperCase();
  return http({
    // baseURL: url.startsWith('/mock') ? "" : process.env.base,
    // baseURL: process.env.base,
    url,
    method,
    data: method === 'POST' || method === 'PUT' ? data : null,
    params: method === 'GET' || method === 'DELETE' ? data : null,
    headers: {
      'Content-Type': contentTypeMap[type],
      'X-Access-Token': sessionStorage.getItem('X-Access-Token'),
    },
    ...rest,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return Promise.resolve({ success: false, message: '请求失败', ...error });
    });
};

export const $handleResponse = (result) => {
  console.log(result);
  
  if (result.success) {
    return [result.result, undefined];
  } else {
    return [undefined, result];
  }
};

export class HttpRequest {
  constructor() {
    this.$http = $http;
    this.$handleResponse = $handleResponse;
  }
}
