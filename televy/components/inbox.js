var React = require("react")

var Inbox = React.createClass({displayName: "Inbox",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Header"), 
        React.createElement("h1", null, "Inbox")
      )
    );
  }
});

module.exports = Inbox