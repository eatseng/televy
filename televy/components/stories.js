/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Story index page
 */

var React = require("react")
var Router = require('react-router')
var SearchBox = require("./searchBox")
var VideoPlayer = require("./videoPlayer")
var StoryStore = require("../stores/storyStore")
var StoryAction = require("../actions/storyActions")

var Link = Router.Link;

var Stories = React.createClass({displayName: "Stories",

  getInitialState: function () {
    return {
      stories: this.props.data.stories
    };
  },

  componentDidMount: function () {
    // console.log("stories mounted")
    // console.log(this.props)
    StoryStore.addChangeListener(this._onChange);

    // Get new data from API if this page is being revisited
    if (window.value.server_rendering == true ){
      window.value.server_rendering = false
    } else {
      StoryAction.getAll()
    }
  },

  componentWillUnmount: function () {
    StoryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var self = this;

    var storyCardStyle = {
      cursor: 'pointer'
    }
    
    var stories = null
    if (this.state.stories.length > 0) {
      stories = this.state.stories.map(function (story) {
        return (
          React.createElement("div", {key: story.id, className: "story-card"}, 
            React.createElement("div", {className: "story-card-image", style: storyCardStyle}, 
              React.createElement("p", null, React.createElement(Link, {to: "storyid", params: {storyId: story.id}}, story.headline))
            ), 
            React.createElement("div", {className: "story-card-footer"}, 
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
      React.createElement("div", {className: "stories-container"}, 
          React.createElement("div", {className: "leftMenu"}, 
            React.createElement("p", null, "Left Menu"), 
            React.createElement("p", null, "Search Box")
          ), 
          React.createElement("div", {className: "main"}, 
            stories
          ), 
          React.createElement("div", {className: "rightMenu"}, 
            React.createElement("p", null, "Right Menu"), 
            React.createElement("p", null, "Activities")
          )
      )
    );
  },

  /**
   * Event handler for 'change' events coming from the StoryStore
   */
  _onChange: function () {
    this.setState({stories: StoryStore.getAll()});
  }

});

module.exports = Stories