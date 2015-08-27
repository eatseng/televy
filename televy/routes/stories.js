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

var express = require('express');
var router = express.Router();
var reactRouter = require('../routes/reactRouter');
var async = require('async')

// Models
var StoryModel = require('../models/story');
var ReportModel = require('../models/report');

// Util functions
var write = require('../utils/write');


/* GET story index page. */
router.get('/', function (req, res) {

  console.log("/stories endpoint")
  console.log(req.path)

  Story = new StoryModel();
  Story.listAll(function (err, response) {
    if (err) {
      write("Error - " + response["content"], "application/text", res);
    } else {
      reactRouter("/stories", {stories: response["content"], server_rendering: true}, res);    
    }
  });
});

/* GET story page. */
router.get('/:storyId', function (req, res) {

  console.log("/stories/:storyId endpoint")
  console.log(req.path)
  
  var storyId = req.params.storyId;

  Story = new StoryModel();
  Report = new ReportModel();

  if (storyId != undefined) {

    async.series({
      stories: function (callback_next) {
        Story.get(storyId, callback_next);
      },
      reports: function (callback_next) {
        Report.getStory(storyId, callback_next);
      }
    }, function (err, results) {
      if (err) {
        write("Error - " + storyResponse["content"], "application/text", res);
      } else {

        var payload = {
          stories: results["stories"]["content"],
          reports: results["reports"]["content"],
          server_rendering: true
        };
        reactRouter("/stories/" + storyId, payload, res);
      }
    });
  
  } else {
    write("404 Something's gone wrong", "text/text", res);
  }
});

module.exports = router;
