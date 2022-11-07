const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// PARSING the json
const dataObj = JSON.parse(data);

// creating slugs, that is the last strings on the url used to identify what is displaying in the page
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

// Creating Server
const myFirstServer = http.createServer((request, response) => {
  // seting the second argument to true will allow us to get a query object with the query datas
  const { query, pathname } = url.parse(request.url, true);

  // Routes
  // OVERVIEW page ==========
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join('');

    const output = tempOverview.replace(/{%PRODUCT-CARDS%}/g, cardsHtml);

    // header
    response.writeHead(200, {
      'Content-type': 'text/html',
    });

    response.end(output);

    // PRODUCT page  ===========
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    response.writeHead(200, {
      'Content-type': 'text/html',
    });

    response.end(output);

    // API
  } else if (pathname === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' });

    response.end(data);

    // Not FOUND
  } else {
    // writing response header
    response.writeHead(404, {
      'Content-type': 'text/html',
      'My-own-header': 'this is a test',
    });

    response.end('<h1>Page not found!</h1>');
  }
});

// the first argument 8000 is the port we listen to requests, it is a sub address on a certain host
// the second argument is host, '127.0.0.1' is localhost or current computer
// the third argument is a call back function that will be called as soon as the server starts lisitning
myFirstServer.listen(8000, '127.0.0.1', () => {
  console.log('Listning to requests on port 8000');
});

// ROUTING
