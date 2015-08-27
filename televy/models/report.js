/* Author: Edward Tseng 
 * Date: 2015 Aug 26
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Report Model
 */


// API routes addresses
var apiRequest = require("../utils/cronkiteAPI");


function Report(params) {
  if (params != undefined) {
    null;
  }

  this.options = {
    hostname: "cronkiteapp.herokuapp.com",
    port: 80,
    path: "/api/report",
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  };
};

Report.prototype.listAll = function (callback) {
  apiRequest(this.options, {"op": "List"}, callback);
};

Report.prototype.get = function (rid, callback) {
  var query = {"op": "List",
               "queryOptions": [{"type": "FilterPredicate", "field": "id", "value": rid}]
              };
  apiRequest(this.options, query, callback);
};

Report.prototype.getStory = function (sid, callback) {
  var query = {"op": "List",
               "queryOptions": [{"type": "FilterPredicate", "field": "story_id", "value": sid}]
              };
  apiRequest(this.options, query, callback);
};

module.exports = Report;
