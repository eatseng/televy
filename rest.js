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
      "value": "2"
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

var optionsComment = {
  hostname: "cronkiteapp.herokuapp.com",
  port: 80,
  path: "/api/comment",
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  }
};

var dataComment = {
  "op": "List",
  "queryOptions": [
    {
      "type": "Order",
      "field": "id",
      "isAsc": true
    }
  ]
}

var optionsVote = {
  hostname: "cronkiteapp.herokuapp.com",
  port: 80,
  path: "/api/vote",
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  }
};

var dataVote = {
  "op": "List",
  "queryOptions": [
    {
      "type": "Order",
      "field": "id",
      "isAsc": true
    }
  ]
}

var dataVote1 = {
  "op": "new",
  "report_id": 11,
  "location": { "latitude": 37.35202924229696, "longitude": -121.99974886124 },
  "timestamp": 1440879374629,
  "vote_value": 'Up',
  "user_id": '4kQRUZSF6K',
  "story_id": 6
}

// apiRequest(optionsStory, dataStory, callback)
apiRequest(optionsVote, dataVote)
  .then(function (response) {
    console.log(response["content"])
    console.log(response)
  })
  .catch(function (err) {
    console.log("error")
    console.log(err["content"])
  });

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