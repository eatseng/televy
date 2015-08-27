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
var reactRouter = require('../routes/reactRouter');

// Models
var StoryModel = require('../models/story');

// Util functions
var write = require('../utils/write');


/* GET index page. */
router.get('/', function (req, res) {

  Story = new StoryModel();
  Story.listAll(function (err, response) {
    if (err) {
      write("Error - " + response["content"], "application/text", res);
    } else {
      reactRouter("/stories", {stories: response["content"], server_rendering: true}, res);
    }
  });

});

module.exports = router;
