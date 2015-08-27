/* Author: Edward Tseng 
 * Date: 2015 Aug 27
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Report page
 */

var React = require("react")
var Router = require('react-router')
var ReportAction = require("../actions/reportActions")
var ReportStore = require("../stores/reportStore")

var Link = Router.Link;

var Report = React.createClass({displayName: "Report",
  getInitialState: function () {
    if (this.props.data.server_rendering == true ){
      return {
        report: this.props.data.reports[0]
      };
    } else {
      return {
        report: {}
      };
    }
  },

  componentDidMount: function () {
    // console.log("REPORT COMPONENT DID MOUNT")
    // console.log("story mounted")
    // console.log(this.props)
    ReportStore.addChangeListener(this._onChange);

    // Get new data from API if this page is being revisited
    if (window.value.server_rendering == true ){
      window.value.server_rendering = false;
    } else {
      ReportAction.get(this.props.params.reportId);
    }

  },

  componentWillUnmount: function () {
    ReportStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      React.createElement("div", {className: "story-container"}, 
        React.createElement("div", {className: "leftMenu"}, 
          React.createElement("p", null, "Left Menu"), 
          React.createElement("p", null, "Reporter")
        ), 
        React.createElement("div", {className: "main"}, 
          React.createElement("p", null, React.createElement("b", null, "Video Player")), 
          React.createElement("p", null, this.state.report.uuid)
        ), 
        React.createElement("div", {className: "rightMenu"}, 
          React.createElement("p", null, "Right Menu"), 
          React.createElement("p", null, "Comments")
        )
      )
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function () {
    this.setState({
      report: ReportStore.get()
    });
    // console.log("REPORT ON CHANGE")
    // console.log(this.state)
  }  
});

module.exports = Report;