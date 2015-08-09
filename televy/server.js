var express = require('express');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes')
var path = require('path');
var write = require('./utils/write');

// webpack js files for client/server sync
var bundleJS = fs.readFileSync(__dirname+'/public/js/bundle.js');

// Setup express
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var props;

// Link-up express handler with react-router
app.use(function(req, res, next) {
  switch (req.url) {
    case "/name":
      return res.send("Paul, " + new Date().toString());
    case "/public/js/bundle.js":
      return write(bundleJS, 'text/javascript', res);
    default:
      
      console.log(req.url + " " + new Date().toString());
      
      var router = Router.create({location: req.url, routes: routes});
      router.run(function(Handler, state) {
        var html = React.renderToString(React.createElement(Handler, props));
        return res.render('index', {html: html});
      })
  }
})

// For web servering through Heroku
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});