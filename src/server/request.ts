import { getUserId } from '@/utils/id';
import { getUserInfo } from '@/utils/user';
import io from 'socket.io-client';
import { SERVER_URL } from './api';

let socket: SocketIOClient.Socket;
export const getSocket = (): Promise<SocketIOClient.Socket> => {
  if (socket !== undefined) {
    return Promise.resolve(socket);
  }
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      getUserInfo()
        .then(({ name }) => {
          socket = io(SERVER_URL, {
            query: {
              userName: name,
              userId: getUserId(),
              hashList: JSON.stringify(['*']),
            },
          });
          resolve(socket);
        })
        .catch(err => reject(err));
    })
  });
};

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

export default getSocket;
