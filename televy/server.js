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
var path = require('path');
var reactRouter = require('./routes/reactRouter');

// Setup environmental properties
require('./configs/env');
console.log(process.env['CONSUMER_KEY'])

// Model Routes
apiRoute = require('./routes/apis');
reportRoute = require('./routes/reports');
storyRoute = require('./routes/stories');
indexRoute = require('./routes/index');

// Models
var reportModel = require('./models/report');

// Util functions
var write = require('./utils/write');
var testData = require('./tests/scaffolds');

// webpack js files for client/server isomorphic sync
var bundleJS = fs.readFileSync(__dirname + '/public/js/bundle.js');

// Setup express
var app = express();

// Setup Favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicomatic/favicon.ico'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
app.use("/", indexRoute);
app.use("/api", apiRoute);
app.use("/reports", reportRoute);
app.use("/stories", storyRoute);

// Load package and 404
app.use(function(req, res, next) {
  switch (req.path) {

    case "/public/js/bundle.js":
      return write(bundleJS, 'text/javascript', res);
    
    default:
      return write("404 The page you request for is somewhere out there..", 'text/text', res); 
  }
})

// For web servering through Heroku
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});