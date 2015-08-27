/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Story page
 */

var React = require("react");
var Router = require('react-router');
var ReportAction = require("../actions/reportActions");
var ReportStore = require("../stores/reportStore");
var StoryAction = require("../actions/storyActions");
var StoryStore = require("../stores/storyStore");

var Link = Router.Link;

var Story = React.createClass({displayName: "Story",
  getInitialState: function () {
    if (this.props.data.server_rendering == true ){
      return {
        story: this.props.data.stories[0],
        reports: this.props.data.reports
      };
    } else {
      return {
        story: {},
        reports: []
      };
    }
  },

  componentDidMount: function () {
    // console.log("STORY COMPONENT DID MOUNT")
    // console.log(this.props)
    StoryStore.addChangeListener(this._onChange);
    ReportStore.addChangeListener(this._onChange);

    // Get new data from API if this page is being revisited
    if (window.value.server_rendering == true ){
      window.value.server_rendering = false;
    } else {
      StoryAction.get(this.props.params.storyId);
      ReportAction.getStory(this.props.params.storyId);
    }

  },

  componentWillUnmount: function () {
    StoryStore.removeChangeListener(this._onChange);
    ReportStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var self = this;

    var reportCardStyle = {
      cursor: 'pointer'
    }
    
    var reports = null
    if (this.state.reports.length > 0) {
      reports = this.state.reports.map(function (report) {
        return (
          React.createElement("div", {key: report.id, className: "report-card"}, 
            React.createElement("div", {className: "report-card-image", style: reportCardStyle}, 
              React.createElement("p", null, React.createElement(Link, {to: "reportid", params: {reportId: report.id}}, report.reporter_id))
            ), 
            React.createElement("div", {className: "report-card-footer"}, 
              React.createElement("div", {className: "firstPane"}, "Votes"), 
              React.createElement("div", {className: "secondPane"}, 
                React.createElement("p", null, "#izzyjames"), 
                React.createElement("p", null, "#cocahella #indo #OVO")
              ), 
              React.createElement("div", {className: "thirdPane"}, 
                React.createElement("p", null, "Lots of Comments")
              ), 
              React.createElement("div", {className: "fourthPane"}, "CiPan")
            )
          )
        );
      });
    }

    return (
      React.createElement("div", {className: "story-container"}, 
        React.createElement("div", {className: "leftMenu"}, 
          React.createElement("p", null, "Left Menu"), 
          React.createElement("p", null, "Search Box")
        ), 
        React.createElement("div", {className: "main"}, 
          reports
        ), 
        React.createElement("div", {className: "rightMenu"}, 
          React.createElement("p", null, "Right Menu"), 
          React.createElement("p", null, "Activities")
        )
      )
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function () {
    this.setState({
      reports: ReportStore.getAll(),
      story: StoryStore.get()
    });
    // console.log("REPORT ON CHANGE")
    // console.log(this.state)
  }  
});

module.exports = Story;