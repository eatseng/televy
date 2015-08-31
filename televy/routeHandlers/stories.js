/* Author: Edward Tseng 
 * Date: 2015 Aug 26
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Stories route handlers
 */

var async = require('async');
var express = require('express');
var router = express.Router();
var reactRouter = require('../routeHandlers/reactRouter');

// Setup Logging
var log4js = require('log4js');
var logger = log4js.getLogger('stories')
logger.setLevel("INFO")

// Models
var StoryModel = require('../models/story');
var ReportModel = require('../models/report');

// Util functions
var write = require('../utils/write');


/* GET story index page. */
router.get('/', function (req, res) {

  logger.info("/stories index")

  Story = new StoryModel();
  Story.listAll()
    .then(function (response) {
      return reactRouter("/stories", {stories: response["content"], server_rendering: true}, res);    
    })
    .catch(function (err) {
      logger.error("Error - " + err["content"]);
      return write("Error - " + err["content"], "application/text", res);
    });
});

/* GET story page. */
router.get('/:storyId', function (req, res) {

  var storyId = req.params.storyId;

  Story = new StoryModel();
  Report = new ReportModel();

  if (storyId != undefined) {

    logger.info("/stories/" + storyId)

    async.series({
      stories: function (callback_next) {
        return Story.get(storyId)
                    .then(function (response) { return callback_next(null, response); })
                    .catch(function (err) { return callback_next(err, null); });
      },
      reports: function (callback_next) {
        return Report.getStory(storyId)
                    .then(function (response) { return callback_next(null, response); })
                    .catch(function (err) { return callback_next(err, null); });
      }
    }, function (err, results) {
      if (err) {
        logger.error("Error - " + err["content"])
        return write("Error - " + err["content"], "application/text", res);
      } else {

        var payload = {
          stories: results["stories"]["content"],
          reports: results["reports"]["content"],
          server_rendering: true
        };
        return reactRouter("/stories/" + storyId, payload, res);
      }
    });
  
  } else {
    return write("404 Something's gone wrong", "text/text", res);
  }
});

module.exports = router;
