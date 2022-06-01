import axios from "axios";
export const BASE_URL = "http://localhost:8090";

export const HTTPS_METHODS = {
  GET: "get",
  PUT: "put",
  POST: "post",
  DELETE: "delete",
};

export const restClient = async ({ method, url, body = {}, contentType = "application/json" }) => {
  const token = sessionStorage.getItem('token')

  return await axios({
    method,
    baseURL: `${BASE_URL}`,
    url,
    data: body,
    headers: {
      "auth-token": `Bearer ${token}`,
      Accept: contentType,
    },
  }).then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};