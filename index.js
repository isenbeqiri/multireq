var express = require('express');
var router = express.Router();
var request = require('request');

// create an endpoint for batching the http requests.
router.get( '/', function( req, res, next ) {
  var port = req.app.settings.port || 80, // this should get the port number if its set with app.set( 'port', #### ), otherwise takes port 80
      baseUrl = req.protocol + '://' + req.get('host') + '/', // the base url for the localhost request that we are about to make
      requests = Object.keys(req.query), // we create an array for all the 
      index = 0;

      // Empty data object. Here we will collect the response from every local request and throw it to the user.
      res.data = {};
  
  // Now that we have all the endpoints, we call them locally and store them into res.data object
  var callRequest = function() {
    var key = requests[index],
        requestUrl = baseUrl + req.query[key]; // build the request URL for the first param. 
    // Reques
    request( requestUrl, function( error, response, body ) {
      index++;

      if ( !error && response.statusCode == 200 ) {
        // If we get a response from the express app, we attach the body to the res.data with the key being the param from the request. 
        res.data[key] = JSON.parse( body );

        // make the next call 
        if ( index < requests.length ) {
          callRequest();
        // or call next() so we can move on.
        } else {
          // All the requeast are made by now. We can continue.
          next()
        }
      }
    });
  }
  // call the next request (recursively)
  callRequest()
});

router.get( '/', function( req, res ) {
    // Send the collected data to the client
    res.json( res.data );
});

module.exports = router;
