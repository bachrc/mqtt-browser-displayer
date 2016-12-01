var http = require('http'),
  express = require('express'),
  port = 1234,
  host = '0.0.0.0';

// create a new HTTP server to deal with low level connection details (tcp connections, sockets, http handshakes, etc.)
var server = http.createServer();

// create a new HTTP framework to deal with high level details (routing, cookies, forms data, etc.)
var app = express();

// Configure the express (the http framework) to serve static files located in the 'public/' folder
app.use(express.static('public'));
server.on('request', app);

// http sever starts listenning on given host and port.
server.listen(port, host, function() {
  console.log('Listening on ' + server.address().address + ':' + server.address().port);
});
