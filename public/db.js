window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const request = window.indexedDB.open("budget", 1);
    let db;

request.onerror = function(event) {
  console.log('[onerror]', request.error);
};

// Create an object store inside the onupgradeneeded method.
request.onupgradeneeded = ({ target }) => {
  const db = target.result;
  const objectStore = db.createObjectStore("transactions");
};

request.onsuccess = function(event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  // create a transaction on the transactions db with readwrite access
  // https://javascript.info/indexeddb#transactions
  const transaction = db.transaction(["transactions"], "readwrite");
  // access your transactions object store

  const store = transaction.objectStore("transactions");
  // add record to your store with add method.
  store.add(record);
}

function checkDatabase() {
  // open a transaction on your transactions db
  const transaction = db.transaction(["transactions"], "readwrite");
  // access your transactions object store
  const store = transaction.objectStore("transactions");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your transactions db
          const transaction = db.transaction(["transactions"], "readwrite");
          // access your transactions object store
          const store = transaction.objectStore("transactions");
          // clear all items in your store
          store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
