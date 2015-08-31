/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Top level route wrapper
 */

var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var NavBar = require("./navMain");

module.exports = React.createClass({displayName: "exports",
  render: function () {
    return (
      React.createElement(RouteHandler, {data: this.props.data})
    );
  }
});
