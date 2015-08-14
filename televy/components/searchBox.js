/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Search Widget
 */

 var React = require("react")

var SearchBox = React.createClass({displayName: "SearchBox",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "SearchBox")
      )
    );
  }
});

module.exports = SearchBox