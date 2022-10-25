const fs = require("fs");
const http = require("http");
const url = require("url");

// IMPORTANT CONCEPT
// All top level codes are excuted only at first that is at the begining
// of runing nodejs that is it will not be re-excuted every time a user hits
// out server with a new requrest

// ////////////////////////////////////
// FILES

// ===========================
// Blocking, SYNCHRONOUS way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// const textO = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textO);

// =======================
// Non-blocking, ASYNCHRONOUS way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.error("SOMETHING HAPPEN ");

//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     console.log(data1);

//     fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
//       console.log(data2);

//       fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
//         console.log("your file is written");
//       });
//     });
//   });
// });

// ////////////////////////////
// SERVER
// TOP LEVEL READING
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(productData);

// Creating Server
const myFirstServer = http.createServer(async (request, response) => {
  const pathName = request.url;
  // console.log(pathName);

  // Routes
  if (pathName === "/" || pathName === "/overview") {
    // header
    response.writeHead(200, {
      "Content-type": "text/html",
    });

    response.end("<h1>Hello from the server this is OVERVIEW</h1>");
  } else if (pathName === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });

    response.end(data);
  } else if (pathName === "/product") response.end("This is the PRODUCT");
  else {
    // writing response header
    response.writeHead(404, {
      "Content-type": "text/html",
      "My-own-header": "this is a test",
    });

    response.end("<h1>Page not found!</h1>");
  }
});

// the first argument 8000 is the port we listen to requests, it is a sub address on a certain host
// the second argument is host, '127.0.0.1' is localhost or current computer
// the third argument is a call back function that will be called as soon as the server starts lisitning
myFirstServer.listen(8000, "127.0.0.1", () => {
  console.log("Listning to requests on port 8000");
});

// ROUTING
