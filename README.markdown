### Multireq 
=============

A very simple express middleware for batching HTTP requests. 

We assume it has been run through some middleware like express.bodyParser() or express.json() to parse the requests


[![Build Status](https://travis-ci.org/isenbeqiri/multireq.svg?branch=master)](https://travis-ci.org/isenbeqiri/multireq)


### Installing

Install with:
    
    npm install multireq

### Usage

After you install, just include the module in your express app with the follwing line:
    
    var multi = require('multireq');

And then after your app has been run thorugh the required middlewares, run:

    app.use('/api/multi', multi);

The line above will generate the '/api/multi' route for your express app which will batch the request send as params



