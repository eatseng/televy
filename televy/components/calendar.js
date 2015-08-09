var React = require("react")

var Calendar = React.createClass({displayName: "Calendar",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Calendar")
      )
    );
  }
});

module.exports = Calendar