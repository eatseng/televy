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

Story.prototype.listAll = function (callback) {

  apiRequest(this.options, {"op": "List"}, callback);

};

Story.prototype.redditHot = function (callback) {

  var query = {"op": "List", "queryOptions": [{"type": "Order", "field": "reddit_hot", "isAsc": false}]};

  apiRequest(this.options, query, callback);

};

Story.prototype.get = function (id, callback) {

  var query = {"op": "List", "queryOptions": [{"type": "FilterPredicate", "field": "id", "value": id}]};

  apiRequest(this.options, query, callback);

}

module.exports = Story;
