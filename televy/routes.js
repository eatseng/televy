var React = require('react')
var Router = require('react-router')

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var app = require('./components/app')
var inbox = require('./components/inbox')
var calendar = require('./components/calendar')
var dashboard = require('./components/dashboard')

var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: app}, 
  	React.createElement(Route, {name: "inbox", path: "/inbox", handler: inbox}), 
	React.createElement(Route, {name: "calendar", path: "/calendar", handler: calendar}), 
    React.createElement(DefaultRoute, {handler: dashboard})
    )
);

module.exports = routes