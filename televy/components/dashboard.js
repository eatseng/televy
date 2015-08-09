var React = require("react")

var Header = React.createClass({displayName: "Header",
  render: function () {
    return (
      React.createElement("header", null, 
        React.createElement("ul", null, 
          React.createElement("li", null, React.createElement("a", {href: "/"}, "Dashboard")), 
          React.createElement("li", null, React.createElement("a", {href: "/inbox"}, "Inbox")), 
          React.createElement("li", null, React.createElement("a", {href: "/calendar"}, "Calendar"))
        ), 
        "Logged in as Jane"
      )
    );
  }
});


var Dashboard = React.createClass({displayName: "Dashboard",
  handleClick: function () {
    alert('You clicked!')
  },

  getInitialState: function () {
    console.log("getInitialState")
    return {}
  },

  componentDidMount: function () {
    console.log("componentDidMount")
    // this.intervalID = setInterval(this.loadServerData, 3000)
  },

  componentWillUnmount: function() {
    console.log("componentWillUnmount")
    // clearInterval(this.intervalID)
  },

    
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement("h1", {onClick: this.handleClick}, "Dashboard")
      )
    );
  }
});

module.exports = Dashboard