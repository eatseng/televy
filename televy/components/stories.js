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
var SearchBox = require("./searchBox")
var VideoPlayer = require("./videoPlayer")
var StoryStore = require("../stores/storyStore")
var StoryAction = require("../actions/storyActions")

var Stories = React.createClass({displayName: "Stories",

  getInitialState: function () {
    return {
      stories: this.props.data.stories
    };
  },

  componentDidMount: function() {
    // console.log("stories mounted")
    // console.log(this.props)

    // Get new data from API if this page is being revisited
    if (window.value.server_rendering == true ){
      window.value.server_rendering = false
    } else {
      StoryAction.getAll()
    }

    StoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StoryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    
    var stories = null
    if (this.state.stories.length > 0) {
      stories = this.state.stories.map(function (story) {
        return (
          React.createElement(VideoPlayer, {key: story.id, story: story}
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
  _onChange: function() {
    this.setState({stories: StoryStore.getAll()});
  }

});

module.exports = Stories