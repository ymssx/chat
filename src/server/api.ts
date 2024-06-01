// export const SERVER_URL = 'http://localhost:7001';
export const SERVER_URL = '';

const PATH: { [key: string]: string } = {
  getSessionList: '/chat/sessions/',
  sendMessage: '/message/send', // POST
};

const API: { [key: string]: string } = {};
for (const key in PATH) {
  API[key] = SERVER_URL + '/api' + PATH[key];
}

export default API;
