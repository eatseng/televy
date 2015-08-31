/* Author: Edward Tseng 
 * Date: 2015 Aug 26
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Story Model
 */

// API routes addresses
var apiRequest = require("../utils/cronkiteAPI");


function Story(params) {
  if (params != undefined) {
    null;
  }

  this.options = {
    hostname: "cronkiteapp.herokuapp.com",
    port: 80,
    path: "/api/story",
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  };
};

Story.prototype.listAll = function () {

  return apiRequest(this.options, {"op": "List"});

};

Story.prototype.redditHot = function () {

  var query = {"op": "List", "queryOptions": [{"type": "Order", "field": "reddit_hot", "isAsc": false}]};

  return apiRequest(this.options, query);

};

Story.prototype.get = function (id) {

  var query = {"op": "List", "queryOptions": [{"type": "FilterPredicate", "field": "id", "value": id}]};

  return apiRequest(this.options, query);

}

module.exports = Story;
