/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Node/Express server
 */

var express = require('express');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes')
var path = require('path');
var favicon = require('serve-favicon');

// Util functions
var write = require('./utils/write');
var testData = require('./tests/scaffolds')

// webpack js files for client/server sync
var bundleJS = fs.readFileSync(__dirname + '/public/js/bundle.js');

// Setup express
var app = express();
app.use(favicon(__dirname + '/public/favicomatic/favicon.ico'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Link-up express handler with react-router
app.use(function(req, res, next) {
  switch (req.path) {
    case "/api/stories":

      // Log on terminal
      console.log(req.path + " " + new Date().toString());
      if (req.query.id == undefined) {
        props = testData["api"]
      } else {
        var id = req.query.id - 1
        props = testData["api"]["stories"][id]
      }
      props["server_rendering"] = false;
      return res.status(200).send(JSON.stringify(props));

    case "/name":
      return res.send("Paul, " + new Date().toString());
    
    case "/favicon.ico":
      // TODO: Add favicon
      return
    
    case "/public/js/bundle.js":
      return write(bundleJS, 'text/javascript', res);
    
    case "/story/public/js/bundle.js":
      return write(bundleJS, 'text/javascript', res);
    
    default:
      // Log on terminal
      console.log(req.path + " " + new Date().toString());
      if (req.path == "/story/4") {
        props = testData["api"]
      } else {
        props = testData["initial"]
      }
      // Add custom server side data rendering identifier
      props["server_rendering"] = true;
      
      var router = Router.create({location: req.path, routes: routes});
      router.run(function(Handler, state) {
        var html = React.renderToString(React.createElement(Handler, props));
        return res.render('index', {jsonValue: props, html: html});
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