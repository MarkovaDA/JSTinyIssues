async function sum(a, b) {
  if (Math.random() < .5) {
    return a + b;
  }

  throw 'error'; // bad luck
}

function callbackify(originalFunction) {
  return function(...args) {
  
    const callback = args.pop();

    originalFunction(...args).then(result => {
      callback(null, result);
    }).catch(error => {
      callback(error);
    })}
}

function callbackifyNew(originalFunction) {
  if (typeof originalFunction !== 'function') {
    throw new TypeError('The first argument must be a function');
  }

  return function(...args) {
    const lastArg = args[args.length - 1];
    
    if (typeof lastArg !== 'function') {
      throw new TypeError('The last argument must be a callback function');
    }
  }

  // коллбэк - это последний аргумент
  const callback = args.pop();

  Promise.resolve()
    .then(() => originalFunction(...args))
    .then(result => {
      try {
        callback(null, result)
      } catch(callbackError) {
        throw callbackError;
      }
    })
    .catch(error => {
      try {
        callback(error)
      } catch (callbackError) {
        throw callbackError;
      }
    })
}

failingCallback((err, result) => {
  if (err) {
    console.error('Error caught:', err.message); // Error caught: Something went wrong
    return;
  }
  
  console.log('Result:', result);
});