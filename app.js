var http = require('http'),
    fs = require('fs');

var routes = {};

function route(url, route, headType, callback){
  routes[url] = {
    url: url,
    route: route,
    header: function(res) {
      res.writeHead(200, {'Content-Type': 'text/' + headType});
    },
    callbackStatic: function(req, res, currentRoute) {
      fs.readFile(__dirname + currentRoute, function (err, data) {
        if (err) console.log(err);
        res.write(data);
        res.end();
      });
    },
    callback: callback
  };
};

route('/', '/public/index.html', 'html');

route('/js/app.js', '/public/js/main.js', 'javascript');

route('/bower_components/angular/angular.js', '/public/bower_components/angular/angular.js', 'javascript');

route('/new', '', 'GET', function(req, res) {
  console.log(req, res);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  console.log('hi')
  res.write()
  res.end();
});

http.createServer(function (req, res) {
  console.log(req.url);

  if (routes[req.url]) {
    var currentRoute = routes[req.url].route;
    routes[req.url].header(res);

    // only call this if the location of static file has been defined
    if (routes[req.url].route){
      routes[req.url].callbackStatic(req, res, currentRoute);
    } else {
      routes[req.url].callback(req, res);
    }
  }
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
