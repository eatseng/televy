/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Application routes
 */

var React = require('react')
var Router = require('react-router')

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Redirect = Router.Redirect
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var app = require('./components/app')
var story = require('./components/story')
var stories = require('./components/stories')

var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: app}, 
  	React.createElement(Route, {name: "stories", path: "/stories", handler: stories}),
    React.createElement(Route, {name: "story", path: "/story/:storyId", handler: story}),
    React.createElement(DefaultRoute, {handler: stories})
  )
  // React.createElement(Redirect, {from: "/", to: "stories"})
);

module.exports = routes
