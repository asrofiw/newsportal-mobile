import {default as axios} from 'axios';

import {APP_URL} from '@env';

const http = (token = null) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: APP_URL,
    headers,
  });
};
export default http;
