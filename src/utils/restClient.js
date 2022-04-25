import axios from "axios";
export const BASE_URL = "http://localhost:8080/api/v1";

export const HTTPS_METHODS = {
  GET: "get",
  PUT: "put",
  POST: "post",
  DELETE: "delete",
};

export const restClient = async ({ method, url, body = {} }) => {

  return await axios({
    method,
    baseURL: `${BASE_URL}`,
    url,
    data: body,
    headers: {
      Authorization: ``,
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};