/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Video player widget
 */

var React = require("react")
var Router = require('react-router')
var story = require("./story")

var Link = Router.Link;
var ReactPropTypes = React.PropTypes;

var VideoPlayer = React.createClass({displayName: "VideoPlayer",

  propTypes: {
    story: ReactPropTypes.object.isRequired
  },

  render: function () {
    return (
      React.createElement("div", {className: "videoPlayer"}, 
        React.createElement("h5", null, "VideoPlayer"), 
        React.createElement("p", null, React.createElement(Link, {to: "stories", params: {storyId: this.props.story.id}}, this.props.story.id, ": ", this.props.story.uuid)), 
        React.createElement("p", null, "Reporter: ", this.props.story.reporter_id), 
        React.createElement("p", null, "Date: ", this.props.story.timestamp)
      )
    );
  }
});

module.exports = VideoPlayer