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
    callback: function(req, res, currentRoute) {
      fs.readFile(__dirname + currentRoute, function (err, data) {
        if (err) console.log(err);
        res.write(data);
        res.end();
      });
    }
  };
};

route('/', '/public/index.html', 'html');

route('/js/app.js', '/public/js/main.js', 'javascript');

route('/bower_components/angular/angular.js', '/public/bower_components/angular/angular.js', 'javascript');

http.createServer(function (req, res) {
  console.log(req.url);
  if (routes[req.url]) {
    var currentRoute = routes[req.url].route;
    routes[req.url].header(res);
    routes[req.url].callback(req, res, currentRoute);
  }
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
