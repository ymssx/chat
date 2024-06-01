import { USER_PUB_TOKEN_KEY, getUserInfo } from "./user";

export const uuid = () => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c,
  ) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getUserId = () => {
  const token = localStorage.getItem(USER_PUB_TOKEN_KEY) || '';
  if (!token) {
    getUserInfo();
  }
  return token;
};
