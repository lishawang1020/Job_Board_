const http = require("http");

const app = require("./App");
const port = "8000";

const server = http.createServer(app);
server.listen(port);

console.log("Server is running on: 127.0.0.1:" + port);
