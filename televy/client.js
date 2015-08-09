require('./public/css/style.css')

var React = require('react')
var Router = require('react-router')
var routes = require('./routes')

var props

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(React.createElement(Handler, props), document.getElementById('container'))
})