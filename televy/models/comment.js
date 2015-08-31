/* Author: Edward Tseng 
 * Date: 2015 Aug 31
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Comment Model
 */

// API routes addresses
var apiRequest = require("../utils/cronkiteAPI");


function Comment(params) {
  if (params != undefined) {
    null;
  }

  this.options = {
    hostname: "cronkiteapp.herokuapp.com",
    port: 80,
    path: "/api/comment",
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  };
};

Comment.prototype.listAll = function () {

  return apiRequest(this.options, {"op": "List"});

};

Comment.prototype.getByStory = function (sid) {

  var query = {"op": "List",
    "queryOptions": [{"type": "FilterPredicate", "field": "story_id", "value": sid},
                     {"type": "Order", "field": "timestamp", "isAsc": true}]
  }

  return apiRequest(this.options, query);

}

module.exports = Comment;
