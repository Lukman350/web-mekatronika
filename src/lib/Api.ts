import axios, { AxiosRequestConfig } from "axios";

interface CallAPIProps extends AxiosRequestConfig {
  token?: string;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  let headers = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error) => error.response);

  if (response !== undefined) {
    if (response.status > 300) {
      const res = {
        success: false,
        message: response.data.message,
        data: null,
      };
      return res;
    }

    const res = {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };

    return res;
  } else {
    const res = {
      success: false,
      data: null,
      message: response,
    };
    return res;
  }
}
