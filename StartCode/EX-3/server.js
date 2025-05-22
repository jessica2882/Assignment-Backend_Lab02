// server.js
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(`Received ${method} request for ${url}`);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Welcome to the Home Page");
  }
  // Serve the contact form
  if (url === "/contact" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
          </form>
        `);
    return;
  }
  // Handle form submission
  if (url === "/contact" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const name = new URLSearchParams(body).get("name");
      console.log("Submitted name:", name);
      // Append to file
      fs.appendFile("submissions.txt", name + "\n", (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end();
        }
        // Send success response
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
                    <h2>Thank you, ${name}!</h2>
                `);
      });
    });

    return;
  }

  // Handle unknown routes
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
