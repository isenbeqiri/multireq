var request = require('supertest')
  , express = require('express');

var app = express();

request(app)
  .get('/api/multi')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res){
  	console.log (err, res)
    if (err) throw err;
  });