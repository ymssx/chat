const DATABASE_NAME = 'CHAT-DATABASE';

const request = window.indexedDB.open(DATABASE_NAME);

let db;

request.onsuccess = () => {
  db = request.result;
};

request.onupgradeneeded = event => {
  db = event?.target?.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
};
