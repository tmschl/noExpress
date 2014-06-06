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
    callback: callback
  };
};

route('/', '/public/index.html', 'html', function(req, res, currentRoute) {
  fs.readFile(__dirname + currentRoute, function (err, data) {
    if (err) console.log(err);
    res.write(data);
    res.end();
  });
});

route('/js/app.js', '/public/js/main.js', 'javascript', function(req, res, currentRoute) {
  fs.readFile(__dirname + currentRoute, function (err, data) {
    if (err) console.log(err);
    res.write(data);
    res.end();
  });
});

http.createServer(function (req, res) {
  if (routes[req.url]) {
    var currentRoute = routes[req.url].route;
    routes[req.url].header(res);
    routes[req.url].callback(req, res, currentRoute);
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

