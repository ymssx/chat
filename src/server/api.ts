export const SERVER_URL = 'http://47.100.197.192:7001';
// export const SERVER_URL = 'http://localhost:7001';

const PATH: { [key: string]: string } = {
  getSessionList: '/api/chat/sessions/',
  sendMessage: '/api/message/send', // POST
};

const API: { [key: string]: string } = {};
for (const key in PATH) {
  API[key] = SERVER_URL + PATH[key];
}

export default API;
