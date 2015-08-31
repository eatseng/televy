var React = require('react');
var Router = require('react-router');
var routes = require('../routes');

var reactRouter = module.exports = function (path, data, res) {
  // console.log("From routes/react-router")
  // console.log(data)
  // console.log(path)
  // console.log("From routes/react-router END")
  var router = Router.create({location: path, routes: routes});
  router.run(function(Handler, state) {
    var html = React.renderToString(React.createElement(Handler, data));
    return res.render('index', {jsonValue: data, html: html});
  })
};
