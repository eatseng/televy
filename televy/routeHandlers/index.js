/* Author: Edward Tseng 
 * Date: 2015 Aug 26
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Landing page route handlers
 */

var express = require('express');
var router = express.Router();
var reactRouter = require('../routeHandlers/reactRouter');

// Setup Logging
var log4js = require('log4js');
var logger = log4js.getLogger('index')
logger.setLevel("INFO")

// Models
var StoryModel = require('../models/story');

// Util functions
var write = require('../utils/write');


/* GET index page. */
router.get('/', function (req, res) {

  Story = new StoryModel();
  logger.info("/")
  Story.redditHot()
    .then(function (response) {
      return reactRouter("/stories", {stories: response["content"], server_rendering: true}, res);
    })
    .catch(function (err) {
      logger.error("Error - " + err["content"])
      return write("Error - " + err["content"], "application/text", res);
    });
    
});

module.exports = router;
