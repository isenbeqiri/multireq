var express = require('express');
var router = express.Router();
var request = require('request');

// create an endpoint for batching the http requests.
router.get( '/', function( req, res, next ) {
  var port = req.app.settings.port || 3003,
      baseUrl = 'http://localhost:' + port + '/', // the base url for the localhost request that we are about to make
      requests = Object.keys(req.query), // we create an array for all the 
      index = 0,
      res.data = {};

  var callRequest = function() {
    var key = requests[index],
        requestUrl = baseUrl + req.query[key]; // build the request URL for the first param. 
    // Reques
    request( requestUrl, function( error, response, body ) {
      index++;

      if ( !error && response.statusCode == 200 ) {
        res.data[key] = JSON.parse( body );

        if ( index < requests.length ) {
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

router.get( '/', function( req, res ) {
    res.json( res.data );
});

module.exports = router;
