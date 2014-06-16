var http  = require('http');
var fs    = require('fs');

// HTTP server that serve static files under `test/fixtures`.
http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(42002);
