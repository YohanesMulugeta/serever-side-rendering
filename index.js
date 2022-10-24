const fs = require("fs");

// Blocking, Synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

const textOut = `This is what we know about avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// const textO = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textO);

// Non-blocking, ASYNCHRONOUS way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return console.error("SOMETHING HAPPEN ");

  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    console.log(data1);

    fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
      console.log(data2);

      fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
        console.log("your file is written");
      });
    });
  });
});
