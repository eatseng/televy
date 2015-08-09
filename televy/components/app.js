var React = require("react")
var Router = require('react-router')

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var app = require('./app')
var inbox = require('./inbox')
var calendar = require('./calendar')
var dashboard = require('./dashboard')

var About = React.createClass({displayName: "About",
  render: function () {
    return React.createElement("h2", null, "About");
  }
});

var Inbox = React.createClass({displayName: "Inbox",
  render: function () {
    return React.createElement("h2", null, "Inbox");
  }
});

var Home = React.createClass({displayName: "Home",
  render: function () {
    return React.createElement("h2", null, "Home");
  }
});

var App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("header", null, 
          React.createElement("ul", null, 
            React.createElement("li", null, React.createElement(Link, {to: "app"}, "Dashboard")), 
            React.createElement("li", null, React.createElement(Link, {to: "inbox"}, "Inbox")), 
            React.createElement("li", null, React.createElement(Link, {to: "calendar"}, "Calendar"))
          ), 
          "Logged in as Jane"
        ), 

        React.createElement(RouteHandler, null)
      )
    );
  }
});

// function render () {
//   var route = window.location.hash.substr(1);
//   React.render(<App route={route} />, document.getElementById('televy'));
// }

// window.addEventListener('hashchange', render);
// render(); // render initially

module.exports = App