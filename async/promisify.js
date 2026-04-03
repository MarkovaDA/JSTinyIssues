// разбери функцию promisify
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };

      
      fn.call(this, ...args, callback);
    });
  };
}