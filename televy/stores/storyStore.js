/* Author: Edward Tseng 
 * Date: 2015 Aug 13
 * Copyright (c) 2015, Edward Tseng
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Story Store
 */

var Dispatcher = require('../dispatcher/televyDispatcher');
var EventEmitter = require('events').EventEmitter;
var StoryConstants = require('../constants/storyConstants');
var assign = require('object-assign');
var $ = require('jquery');

var BROADCAST_EVENT = 'story';
var BROADCAST_ERROR = 'story_error';

var _stories = [];
var _story = {};


function create(text) {
  // Send data to server
  // Get id from server response
  // Update private variables
  

}

function get(sid, callback) {
  // Get story from the server
  $.getJSON("/api/stories", {id: sid}, callback)
  // console.log("STORE LAUNCHED AJAX")
}

function getAll(callback) {
  // Get all the story from the server
  $.getJSON("/api/stories", callback)
  // console.log("STORE LAUNCHED AJAX")
}

function update(id, text) {
  // Send data to server
  // If resp == 200 update private variables
}

function destory(id) {
  // Send id to server
  // If resp == 200 update private variables
}

var StoryStore = assign({}, EventEmitter.prototype, {
  getAll: function () {
    return _stories;
  },

  get: function () {
    return _story;
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
Dispatcher.register(function (action) {
  var text;

  switch(action.actionType) {
    case StoryConstants.STORY_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        StoryStore.emitChange();
      }
      break;

    case StoryConstants.STORY_GET_ALL:
      getAll(function getAllCallback(data) {
        _stories = data["stories"];
        StoryStore.emitChange();  
      });
      break;
    
    case StoryConstants.STORY_GET:
      get(action.id, function getCallback(result) {
        _story = result;
        StoryStore.emitChange();
      });
      break;

    case StoryConstants.STORY_UPDATE:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, text);
        StoryStore.emitChange();
      }
      break;

    case StoryConstants.STORY_GET:
      destory(action.id);
      StoryStore.emitChange();
      break;

    default:
      // no ops
  }
});

module.exports = StoryStore;

