const SERVER_URL = 'http://127.0.0.1:7001';

const PATH: { [key: string]: string } = {
  getSessionList: '/api/chat/sessions/',
};

const API: { [key: string]: string } = {};
for (const key in PATH) {
  API[key] = SERVER_URL + PATH[key];
}

export default API;
