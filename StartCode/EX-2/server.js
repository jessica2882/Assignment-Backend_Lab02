// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
  }
  // Implement more routes here
  else if (method === "GET" && url === "/about") {
    res.write("About us: at CADT, we love node.js!");
    res.end();
  } else if (method === "GET" && url === "/contact-us") {
    res.write("You can reach us vai email…");
    res.end();
  } else if (method === "GET" && url === "/products") {
    res.write("Buy one get one");
    res.end();
  } else if (method === "GET" && url === "/projects") {
    res.write("Here is awsome project");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
