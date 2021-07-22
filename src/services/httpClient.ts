import axios from "axios";
import { createBrowserHistory } from "history";


const API_URL = process.env.REACT_APP_API_BASE_URL;
export const history = createBrowserHistory();


// 2xx
export const HTTP_OK = 200;
// 4xx
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
// 5xx
export const HTTP_INTERNAL_SERVER_ERROR = 500;

// handle error codes
const addErrorInterceptor = (client: any) =>
  client.interceptors.response.use(null, (err: any) => {

    return Promise.reject(err);
  });

export const httpClient = () => {

  const client = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: API_URL,
  });

  addErrorInterceptor(client);

  return client;
};
