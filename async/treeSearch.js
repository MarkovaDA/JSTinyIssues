// поиск дерева
function Folder(files) {
  const rand = () => Math.random() * 500;

  return {
    read: (index, cb) => void setTimeout(cb, rand(), files[index]),
    size: (cb) => void setTimeout(cb, rand(), files.length),
  };
}

const root = Folder([
  "1.js",
  "2.js",
  Folder([
    Folder([
      "3.txt",
    ]),
    "4.js",
  ]),
  Folder([
    "5.png",
    "6.js",
    Folder([
      "7.txt",
    ]),
  ]),
  "8.html",
]);

/* root.size((s) => {
  console.log(s); // s === 5
});

// root.size ничего не возвращает,
// но принимает колбэк в качестве аргумента 
root.size((s) => {
  console.log(s); // s === 5
});

// т.к. размер root равен 5,
// валидными индексами являются числа от 0 до 4 
root.read(4, (x) => {
  console.log(x); // x === "8.html"
});

*/

function isFile() {
  
}

findAllJavascriptFiles(root, arr => {
  root.size((s) => {
    for (let i = 0; i < s; i++) {
      root.read(i, (x) => {
        if (isFile(x)) {
          arr.push(x);
        } else {
          findAllJavascriptFiles(x, arr);
        }
      })
    }
  });
});
//   findAllJavascriptFiles(x, arr); // arr === ["1.js", "2.js", "4.js", "6.js"]


