/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Story actions
 */

var Dispatcher = require('../dispatcher/televyDispatcher');
var StoryConstants = require('../constants/storyConstants');

var StoryActions = {
  get: function(id) {
    // console.log("STORY ACTION GET")
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_GET,
      id: id
    });
  },

  getAll: function() {
    // console.log("STORYACTION GET ALL")
    Dispatcher.dispatch({
      actionType: StoryConstants.STORY_GET_ALL
    });
  }
};

module.exports = StoryActions;
