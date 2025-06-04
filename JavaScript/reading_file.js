const fs = require("fs"); /// imports an external library, file system
const contents = fs.readFileSync("a.txt", "utf-8"); /// function same as used in an object and utf is an decoder fnc, like dcodeing hex, text
console.log(contents);
const data = fs.readFileSync("b.txt", "utf-8");
console.log(data) 
/// readFile - async reafFile("a.txt". utf-8, callback);