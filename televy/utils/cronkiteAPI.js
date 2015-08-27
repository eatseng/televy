/* Author: Edward Tseng 
 * Date: 2015 Aug 24
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Wrapper for node http request
 */

var http = require('http')
var querystring = require('querystring');

var apiCall = module.exports = function (endPointOptions, payload, callback) {

  var data = JSON.stringify(payload);

  var req = http.request(endPointOptions, function(resp) {
    var str;

    resp.setEncoding('utf8');
    resp.on('data', function (chunk) {
      str += chunk;
    });

    resp.on('end', function () {
      callback(null, {
        statusCode: resp.statusCode,
        content: JSON.parse(str.slice(str.indexOf('[')))
      });
    });
  });

  req.on('error', function (e) {
    callback(e, {
      statusCode: 520,
      content: e
    })
  });

  // write data to request body
  req.write(data);
  req.end();
};
