
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const request = window.indexedDB.open("transactions", 1);
    let db;
    // On success console the result.
    request.onsuccess = event => {
      console.log(request.result);
      db = event.target.result;
    };

    request.onerror = function(event) {
      console.log('[onerror]', request.error);
  };

    // Create an object store inside the onupgradeneeded method.
    request.onupgradeneeded = ({ target }) => {
      const db = target.result;
      const objectStore = db.createObjectStore("transactions");
      console.log(objectStore);
    };

    // function saveRecord(record){
    //   const tx = 1

    // }

    // export function useIndexedDb(databaseName, storeName, method, object) {
    //   return new Promise((resolve, reject) => {
    //     const request = window.indexedDB.open(databaseName, 1);
    //     let db,
    //       tx,
    //       store;
    
    //     request.onupgradeneeded = function(e) {
    //       const db = request.result;
    //       db.createObjectStore(storeName, { keyPath: "_id" });
    //     };
    
    //     request.onerror = function(e) {
    //       console.log("There was an error");
    //     };
    
    //     request.onsuccess = function(e) {
    //       db = request.result;
    //       tx = db.transaction(storeName, "readwrite");
    //       store = tx.objectStore(storeName);
    
    //       db.onerror = function(e) {
    //         console.log("error");
    //       };
    //       if (method === "put") {
    //         store.put(object);
    //       }
    //       if (method === "get") {
    //         const all = store.getAll();
    //         all.onsuccess = function() {
    //           resolve(all.result);
    //         };
    //       }
    //       tx.oncomplete = function() {
    //         db.close();
    //       };
    //     };
    //   });
    // }
