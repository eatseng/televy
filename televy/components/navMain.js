/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Navigation Bar
 */

var React = require("react")
var Router = require('react-router')

var Link = Router.Link;
var app = require('./app')

var NavMain = React.createClass({displayName: "NavMain",
  render: function () {
    return (
      React.createElement("ul", {className: "televy-navbar"}, 
        React.createElement("li", null, React.createElement(Link, {to: "app"}, "Brand")), 
        React.createElement("li", {className: "center"}), 
        React.createElement("li", null, "Action")
      )
    );
  }
});

module.exports = NavMain