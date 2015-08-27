/* Author: Edward Tseng 
 * Date: 2015 Aug 26
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * API route handlers
 */

var express = require('express');
var router = express.Router();
var reactRouter = require('../routes/reactRouter');

// Models
var StoryModel = require('../models/story');
var ReportModel = require('../models/report');

// Util functions
var write = require('../utils/write');


// /api/reports
router.get('/reports', function (req, res) {

  console.log("/api/reports endpoint")
  console.log(req.path)

  var reportId = req.query.id;
  var storyId = req.query.storyId;

  var callback = function (err, response) {
    if (err) {
      write("Error - " + response["content"], "application/text", res)
    } else {
      write(JSON.stringify({reports: response["content"]}), "application/json", res)
    }
  }

  Report = new ReportModel();

  if (storyId != undefined) {
    Report.getStory(storyId, callback);
  } else if (reportId != undefined) {
    Report.get(reportId, callback);
  } else {
    Report.listAll(callback);
  }

});

// /api/stories
router.get('/stories', function (req, res) {

  console.log("/api/stories endpoint")
  console.log(req.path)

  var storyId = req.query.id;

  var callback = function (err, response) {
    if (err) {
      write("Error - " + response["content"], "application/text", res)
    } else {
      write(JSON.stringify({stories: response["content"]}), "application/json", res)
    }
  }

  Story = new StoryModel();

  if (storyId != undefined) {
    Story.get(storyId, callback);
  } else {
    Story.listAll(callback);
  }

});

module.exports = router;
