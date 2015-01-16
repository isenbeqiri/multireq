### Multireq 
=============

A very simple express middleware for batching HTTP requests. The idea is to make http request from the client in one batch, so we reduce the number of HTTP request coming from the SPA and return all the requested information into a single JSON object. The middleware will take the request to a defined path (e.g 'api/multi?[params]) and then it will make the app do the request localy. By doing this, we do not need to know anything about the express app, just the endpoints where we can get the information from. 

For example. If we have an express app that has the following endpoints:

    GET api/users
    GET api/customers/:id
    GET api/countries

And we want to make only one HTTP request to get all the information in a batch, then this middleware will allow us to do the following:

		GET api/multi?users=api/users&customer=api/customers/23&countries=api/countries

This above request will have a return that looks like this:

    {
    	users: { ... }, // the list of users returned by the endpoint 'api/users'
    	customer: { ... }, // the customer with id 23
    	countries: { ... } // the list of the countries returned by the endpoint 'api/countries'
    }

We assume it has been run through some middleware like express.bodyParser() or express.json() to parse the requests



[![Build Status](https://travis-ci.org/isenbeqiri/multireq.svg?branch=master)](https://travis-ci.org/isenbeqiri/multireq)


### Installing

Install with:

    npm install multireq

### Usage

After you install, just include the module in your express app with the follwing line:

    var multireq = require('multireq');

And then after your app has been run thorugh the required middlewares, run:

    app.use('/api/multi', multireq);

The line above will generate the '/api/multi' route for your express app which will batch the request send as params



