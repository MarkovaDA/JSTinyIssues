async function asyncZip(fn1, fn2) {
  const arr1 = await fn1();
  const arr2 = await fn2();
  
  if (arr1.length !== arr2.length) {
    throw "Массивы разной длины";
  }

  return arr1.map((_, i) => [arr1[i], arr2[i]]);
}


async function asyncZip2(fn1, fn2) {
  return new Promise((resolve, reject) => {
    Promise.all(fn1, fn2).then((array1, array2) => {
      if (array1.length !== array2.length) {
        reject('Массивы разной длины')
      }

      resolve(array1.map((_, i) => [array1[i], array2[i]]));
    });
  });
}

async function asyncZip3(fn1, fn2) {
  const [arr1, arr2] = await Promise.all([fn1(), fn2()]);

  if (arr1.length !== arr2.length) {
    throw 'Массивы разной длины'
  }

  return arr1.map((_, i) => [arr1[i], arr2[i]])
}