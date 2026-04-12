const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/* const asyncCompose = (...functions) => {
  return (initialValue, finalCallback) => {
    const execute = (index, currentValue) => {
      // Если все функции выполнены, вызываем финальный коллбэк
      if (index >= functions.length) {
        return finalCallback(null, currentValue);
      }

      const currentFunction = functions[index];

      currentFunction(currentValue, (err, result) => {
        if (err) {
          return finalCallback(err, null);
        }

        execute(index + 1, result);
      });
    };

    execute(0, initialValue);
  };
}; */

/*
пример использования функции 
const composedFunction = asyncCompose(multiplyByTwo, addFive, square);

composedFunction(3, (error, result) => {
  if (error) {
    console.error('Ошибка:', error);
  } else {
    console.log('Результат:', result); // Выведет: 121
  }
}); */

// insert

/* const asyncComposeIterative = (...functions) => {
  return (initialValue, finalCallback) => {
    let currentValue = initialValue;
    let index = 0;

    const next = (err, value) => {
      if (err) return finalCallback(err, null);

      currentValue = value;
      index++;

      if (index < functions.length) {
        functions[index](currentValue, next);
      } else {
        finalCallback(null, currentValue);
      }
    };

    functions[0](initialValue, next);
  };
}; */