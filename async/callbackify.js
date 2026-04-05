async function sum(a, b) {
  if (Math.random() < .5) {
    return a + b;
  }

  throw 'error'; // bad luck
}

function callbackify(originalFunction) {
  return function(...args) {
    // последний аргумент - callback, извлекаем его
    const callback = args.pop();

     originalFunction(...args).then(result => {
      callback(null, result);
     }).catch(error => {
        callback(error);
     })}
}

