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

var React = require("react")
var SearchBox = require("./searchBox")
var VideoPlayer = require("./videoPlayer")
var StoryStore = require("../stores/storyStore")
var StoryAction = require("../actions/storyActions")

var Story = React.createClass({displayName: "Story",
  getInitialState: function () {
    var id = this.props.params.storyId - 1
    return {
      story: this.props.data.stories[id]
    };
  },

  componentWillMount: function () {
    this.setState({story: {
        story_id: 0,
        uuid: 0,
        reporter_id: 0,
        timestamp: 0
      }
    });
  },

  componentDidMount: function() {
    // console.log("story mounted")
    // console.log(this.props)

    // Get new data from API if this page is being revisited
    if (window.value.server_rendering == true ){
      window.value.server_rendering = false
    } else {
      StoryAction.get(this.props.params.storyId)
    }

    StoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StoryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      React.createElement("div", {className: "story-container"}, 
        React.createElement("div", {className: "leftMenu"}, 
          React.createElement("p", null, "Left Menu"), 
          React.createElement("p", null, "Reporter")
        ), 
        React.createElement("div", {className: "main"}, 
          React.createElement(VideoPlayer, {story: this.state.story})
        ), 
        React.createElement("div", {className: "rightMenu"}, 
          React.createElement("p", null, "Right Menu"), 
          React.createElement("p", null, "Comments")
        )
      )
    );
  },

  /**
   * Event handler for 'change' events coming from the StoryStore
   */
  _onChange: function() {
    this.setState({story: StoryStore.get()});
    // console.log("STORY ON CHANGE")
    // console.log(this.state)
  }  
});

module.exports = Story