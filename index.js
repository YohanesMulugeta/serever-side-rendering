const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// const textO = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textO);
