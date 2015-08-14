/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * React client application entry point
 */

require('./styles/app.css')
require('./styles/navbar.css')

var React = require('react')
var Router = require('react-router')
var routes = require('./routes')

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(React.createElement(Handler, window.value), document.getElementById('container'))
})