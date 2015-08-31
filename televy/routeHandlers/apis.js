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
var reactRouter = require('../routeHandlers/reactRouter');

// Setup Logging
var log4js = require('log4js');
var logger = log4js.getLogger('apis')
logger.setLevel("INFO")

// Models
var StoryModel = require('../models/story');
var ReportModel = require('../models/report');

// Util functions
var write = require('../utils/write');

var error = function (err) {
  logger.error("Error - " + err["content"]);
  return write("Error - " + err["content"], "application/text", res);
};

// /api/reports
router.get('/reports', function (req, res) {

  var reportId = req.query.id;
  var storyId = req.query.storyId;

  var success = function (response) {
    return write(JSON.stringify({reports: response["content"]}), "application/json", res);
  };

  Report = new ReportModel();

  if (storyId != undefined) {
    logger.info("/api/reports?storyId=" + storyId)
    return Report.getStory(storyId).then(success).catch(error);
  } else if (reportId != undefined) {
    logger.info("/api/reports?id=" + reportId)
    return Report.get(reportId).then(success).catch(error);
  } else {
    logger.info("/api/reports index endpoint")
    return Report.listAll().then(success).catch(error);
  }

});

// /api/stories
router.get('/stories', function (req, res) {

  var storyId = req.query.id;

  var success = function (response) {
    return write(JSON.stringify({stories: response["content"]}), "application/json", res);
  };

  Story = new StoryModel();
  if (storyId != undefined) {
    logger.info("/api/stories?storyId=" + storyId);
    return Story.get(storyId).then(success).catch(error);
  } else {
    logger.info("/api/stories index endpoint");
    return Story.listAll().then(success).catch(error);;
  }

});

module.exports = router;
