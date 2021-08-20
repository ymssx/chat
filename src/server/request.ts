import io from 'socket.io-client';
import { SERVER_URL } from './api';

const socket = io(SERVER_URL);

export const request = {
  get(url: string, data: { [key: string]: string | number }) {
    let reqUrl = url + '?';
    let params = [];
    for (const key in data) {
      params.push(`${key}=${data[key]}`);
    }
    reqUrl += params.join('&');
    return fetch(reqUrl).then(res => res.json());
  },

  post(url: string, data: { [key: string]: string }) {
    return fetch(url, {
      body: new URLSearchParams(data),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      mode: 'no-cors',
    });
  },
};

export default socket;
