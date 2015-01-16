var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  var port = req.app.settings.port || 3003;
  var baseUrl = baseUrl = 'http://localhost:' + port + '/';    
  requests = Object.keys(req.query)
  index = 0;
  res.data = {}
  callRequest = function(){ 

    key = requests[index];
    requestUrl = baseUrl + req.query[key]

    request( requestUrl, function (error, response, body) {
      console.log(error, response, body)
      index++;
      if (!error && response.statusCode == 200) {
        res.data[key] = JSON.parse(body);
        if(index < requests.length){
          callRequest();
        } else {
          // All the requeast are made by now. We can continue.
          next()
        }
      }
    });
  }
  callRequest()
});

router.get('/', function(req, res) {
    res.json(res.data);
    });
module.exports = router;

