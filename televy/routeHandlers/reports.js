/* Author: Edward Tseng 
 * Date: 2015 Aug 27
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Reports route handlers
 */

var express = require('express');
var router = express.Router();
var reactRouter = require('../routeHandlers/reactRouter');
var async = require('async')

// Setup Logging
var log4js = require('log4js');
var logger = log4js.getLogger('reports')
logger.setLevel("INFO")

// Models
var ReportModel = require('../models/report');

// Util functions
var write = require('../utils/write');


// /* GET report index page. */
// router.get('/', function (req, res) {

//   console.log("/reports endpoint")
//   console.log(req.path)

//   Report = new ReportModel();
//   Report.listAll(function (err, response) {
//     if (err) {
//       write("Error - " + response["content"], "application/text", res);
//     } else {
//       reactRouter("/reports", {reports: response["content"], server_rendering: true}, res);    
//     }
//   });
// });

/* GET story page. */
router.get('/:reportId', function (req, res) {
  
  var reportId = req.params.reportId;

  Report = new ReportModel();

  if (reportId != undefined) {

    logger.info("/api/reports?reportId=" + reportId)

    Report.get(reportId)
      .then(function (response) {
        var payload = {reports: response["content"], server_rendering: true};
        return reactRouter("/reports/" + reportId, payload, res);
      })
      .catch(function (err) {
        logger.error("Error - " + err["content"])
        return write("Error - " + err["content"], "application/text", res);
      });
  
  } else {
    write("404 Something's gone wrong", "text/text", res);
  }
});

module.exports = router;
