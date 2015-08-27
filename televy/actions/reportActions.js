/* Author: Edward Tseng 
 * Date: 2015 Aug 27
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Report actions
 */

var Dispatcher = require('../dispatcher/televyDispatcher');
var ReportConstants = require('../constants/reportConstants');

var ReportActions = {
  get: function(id) {
    // console.log("REPORT ACTION GET")
    Dispatcher.dispatch({
      actionType: ReportConstants.REPORT_GET,
      id: id
    });
  },

  getAll: function() {
    // console.log("REPORT ACTION GET ALL")
    Dispatcher.dispatch({
      actionType: ReportConstants.REPORT_GET_ALL
    });
  },

  getStory: function(storyId) {
    // console.log("REPORT ACTION GET STORY")
    Dispatcher.dispatch({
      actionType: ReportConstants.REPORT_GET_STORY,
      storyId: storyId
    });
  },
};

module.exports = ReportActions;
