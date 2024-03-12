import axios from 'axios';
import qs from 'qs';

const token = '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'; // 2024/3/12 90 days
const baseApiURL = 'https://api.github.com/';
const instance = axios.create();
instance.defaults.baseURL = baseApiURL;
instance.defaults.headers.Authorization = `${token}`;

// 請求攔截
const requestInterceptors = (ite) => {
  ite.interceptors.request.use(
    (config) => {
      config.data = qs.stringify(config.data);
      return config;
    },
    (error) => {
      console.log('request error: ', error);
      return Promise.reject(error);
    },
  );
};

requestInterceptors(instance);

// 響應攔截
const responseInterceptors = (ite) => {
  ite.interceptors.response.use(
    (response) => {
      const {
        data,
      } = response;
      return Promise.resolve(data);
    },
    (error) => {
      console.log('server error: ', error);
      return Promise.reject(error);
    },
  );
};

responseInterceptors(instance);

const apiBase = (method, url, params) => method(url, params)
  .then((res) => res)
  .catch((err) => err);

const get = (url, params) => apiBase(instance.get, `${url}?${qs.stringify(params)}`);

const post = (url, params) => apiBase(instance.post, url, params);

export { get, post };
