var http = require('http'),
    fs = require('fs');



http.createServer(function (req, res) {
  var indexFile;

  if (req.url.indexOf('.html') !== -1 || req.url === '/') {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
      console.log(data)
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  };

  if (req.url.indexOf('.css') !== -1) {
    fs.readFile(__dirname + '/public/styles.css', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.write(data);
      res.end()
    });
  };

  if (req.url.indexOf('main.js') !== -1) {
    fs.readFile(__dirname + '/public/main.js', function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/javascript'})
      res.write(data);
      res.end()
    });
  };

  if (req.url.indexOf('angular.js') !== -1) {
    fs.readFile(__dirname + '/public/bower_components/angular/angular.js', function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/javascript'})
      res.write(data);
      res.end()
    });
  };


}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
