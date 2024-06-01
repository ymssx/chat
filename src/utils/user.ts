import { generateKeyPair } from "./secret";

export enum Events {
  OPEN_SET_NAME_USERNAME = 'open-set-name-dialog',
  SET_USERNAME = 'set-username',
  FAILED_GET_USERNAME = 'failed-get-user-name',
}

export const USER_NAME_KEY = 'user-name';
export const USER_PUB_TOKEN_KEY = 'user-pub-token';
const USER_PRI_TOKEN_KEY = 'user-pri-token';

export const getUserInfo = (): Promise<{
  token: string;
  name?: string;
}> => {
  const localToken = localStorage.getItem(USER_PUB_TOKEN_KEY);
  const localPriToken = localStorage.getItem(USER_PRI_TOKEN_KEY);
  if (localToken && localPriToken) {
    return Promise.resolve({
      token: localToken,
      name: localStorage.getItem(USER_NAME_KEY) || '',
    });
  }

  return new Promise((resolve, reject) => {
    window.dispatchEvent(new Event(Events.OPEN_SET_NAME_USERNAME));
    window.addEventListener(Events.SET_USERNAME, async (e: any) => {
      const name = e?.detail?.name;
      if (!name) return;
      const { publicKey, privateKey } = await generateKeyPair();
      console.log('privateKey is', privateKey);
      localStorage.setItem(USER_NAME_KEY, name);
      localStorage.setItem(USER_PUB_TOKEN_KEY, publicKey);
      localStorage.setItem(USER_PRI_TOKEN_KEY, privateKey);
      resolve({
        token: publicKey,
        name,
      });
    });

    window.addEventListener(Events.FAILED_GET_USERNAME, reject);
  });
};


export async function getPrivateKey() {
  await getUserInfo();
  return localStorage.getItem(USER_PRI_TOKEN_KEY) as string;
}