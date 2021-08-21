export const getUserName = () => {
  if (localStorage.getItem('user-name')) {
    return localStorage.getItem('user-name');
  }
  return new Promise((resolve, reject) => {
    if (window.location.pathname !== '/welcome') {
      window.location.replace('/welcome');
    }
    window.$getUserNameCallback = {
      resolve: (name: string) => {
        window.location.replace('/');
        localStorage.setItem('user-name', name);
        resolve(name);
      },
      reject,
    };
  });
};
