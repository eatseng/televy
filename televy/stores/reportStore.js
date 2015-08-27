/* Author: Edward Tseng 
 * Date: 2015 Aug 27
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Report Store
 */

var Dispatcher = require('../dispatcher/televyDispatcher');
var EventEmitter = require('events').EventEmitter;
var ReportConstants = require('../constants/reportConstants');
var assign = require('object-assign');
var $ = require('jquery');

var BROADCAST_EVENT = 'report';
var BROADCAST_ERROR = 'report_error';

var _reports = [];
var _report = {};


function create(text) {
  // Send data to server
  // Get id from server response
  // Update private variables
};

function get(rid, callback) {
  // Get story from the server
  $.getJSON("/api/reports", {id: rid}, callback);
  // console.log("STORE LAUNCHED AJAX")
};

function getAll(callback) {
  // Get all the story from the server
  $.getJSON("/api/reports", callback);
  // console.log("STORE LAUNCHED AJAX")
};

function getStoryReports(sid, callback) {
  // Get story from the server
  $.getJSON("/api/reports", {storyId: sid}, callback);
  // console.log("STORE LAUNCHED AJAX")
};

function update(id, text) {
  // Send data to server
  // If resp == 200 update private variables
};

function destory(id) {
  // Send id to server
  // If resp == 200 update private variables
};

var ReportStore = assign({}, EventEmitter.prototype, {
  getAll: function () {
    return _reports;
  },

  get: function () {
    return _report;
  },

  emitChange: function () {
    this.emit(BROADCAST_EVENT);
  },

  emitError: function () {
    this.emit(BROADCAST_ERROR);
  },

  addChangeListener: function (callback) {
    this.on(BROADCAST_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(BROADCAST_EVENT, callback);
  }
});


// Register callback to dispatcher for story processing
ReportStore.dispatchToken = Dispatcher.register(function (action) {
  var text;

  switch(action.actionType) {
    case ReportConstants.REPORT_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        ReportStore.emitChange();
      }
      break;

    case ReportConstants.REPORT_GET:
      get(action.id, function getCallback(data) {
        _report = data["reports"][0];
        ReportStore.emitChange();
      });
      break;

    case ReportConstants.REPORT_GET_ALL:
      getAll(function getAllCallback(data) {
        _reports = data["reports"];
        ReportStore.emitChange();  
      });
      break;

    case ReportConstants.REPORT_GET_STORY:
      getStoryReports(action.storyId, function getStoryCallback(data) {
        _reports = data["reports"];
        ReportStore.emitChange();  
      });
      break;

    case ReportConstants.REPORT_UPDATE:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, text);
        ReportStore.emitChange();
      }
      break;

    case ReportConstants.REPORT_GET:
      destory(action.id);
      ReportStore.emitChange();
      break;

    default:
      // no ops
  }
});

module.exports = ReportStore;

