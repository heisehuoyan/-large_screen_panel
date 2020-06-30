import axios from "axios";
import { API } from "@/api/index";
import config from "@/sevice/config.js";
const httpGet = (url, params = {}, options) => {
  const [key1, key2] = url.split("/");
  return axios({
    url: API[key1][key2],
    params,
    method: "GET",
    ...options
  });
};

const httpPost = (url, params = {}) => {
  const [key1, key2] = url.split("/");
  return axios({
    url: API[key1][key2],
    params,
    method: "POST"
  });
};
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true
axios.defaults.baseURL = config.hosts.api[config.mode];
// request拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => Promise.reject(err)
);
// response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  err => Promise.reject(err)
);
export default {
  httpGet,
  httpPost
};
