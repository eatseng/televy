var apiRequest = require("./televy/utils/cronkiteAPI")

// var dataStory = {
//   "op": "List",
//   "queryOptions": [{
//     "type": "FilterPredicate",
//     "field": "id",
//     "value": "1"}]
// }

var dataStory = {
  "op": "List",
  "queryOptions": [
    {
      "type": "Order",
      "field": "reddit_hot",
      "isAsc": false
    }
  ]
}

var dataStory1 = {
  "op": "List",
  "queryOptions": [
    {
      "type": "FilterPredicate",
      "field": "id",
      "value": "1"
    }
  ]
}

var optionsStory = {
  hostname: "cronkiteapp.herokuapp.com",
  port: 80,
  path: "/api/story",
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  }
};

var dataReport = {
  "op": "List",
  "queryOptions": [
    {
      "type": "FilterPredicate",
      "field": "story_id",
      "value": "6"
    }
  ]
}

var optionsReport = {
  hostname: "cronkiteapp.herokuapp.com",
  port: 80,
  path: "/api/report",
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  }
};

var callback = function (err, response) {
  if (err) {
    console.log("error")
    console.log(response["content"])
  } else {
    console.log(response["content"])
  }
};

// apiRequest(optionsStory, dataStory, callback)
apiRequest(optionsReport, dataReport, callback)

// var http = require('http')
// var querystring = require('querystring');

// data = JSON.stringify({
//   "op": "List",
//   "queryOptions": [{
//     "type": "FilterPredicate",
//     "field": "id",
//     "value": "1"}]
// });

// var options = {
//   hostname: "cronkiteapp.herokuapp.com",
//   port: 80,
//   path: "/api/story",
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json"
//   }
// };

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// req.write(data);
// req.end();