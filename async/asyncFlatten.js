async function _flatten(value) {
  const chunks = [];

  for (const element of await value.read()) {
    if (element instanceof AA) {
      chunks.push(flatten(element)); 
    } else {
      chunks.push([element]); 
    }
  }

  const results = await Promise.all(chunks);

  return results.flat();
}

async function __flatten(value) {
  const result = [];
  const queue = [value]; 

  while (queue.length > 0) {
    const current = queue.shift();

    const elements = await current.read();

    for (const element of elements) {
      if (element instanceof AA) {
        queue.push(element); 
      } else {
        result.push(element);
      }
    }
  }

  return result;
}

// flatten и вариации функций