export enum Events {
  OPEN_SET_NAME_USERNAME = 'open-set-name-dialog',
  SET_USERNAME = 'set-username',
  FAILED_GET_USERNAME = 'failed-get-user-name',
}

const USER_NAME_KEY = 'user-name';

export const getUserName = (): Promise<string> => {
  const localName = localStorage.getItem(USER_NAME_KEY);
  if (localName) {
    return Promise.resolve(localName);
  }

  return new Promise((resolve, reject) => {
    window.dispatchEvent(new Event(Events.OPEN_SET_NAME_USERNAME));
    window.addEventListener(Events.SET_USERNAME, (e: any) => {
      const name = e?.detail?.name;
      if (!name) return;
      localStorage.setItem(USER_NAME_KEY, name);
      resolve(name);
    });

    window.addEventListener(Events.FAILED_GET_USERNAME, reject);
  });
};
