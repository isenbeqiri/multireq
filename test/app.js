var request = require('supertest')
  , express = require('express')
  , multireq = require('../index')
  , should = require('should')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , path = require('path');


var app = express();

var port = parseInt(process.env.PORT, 10) || 3003;

app.set('port', port);


app.use('/api/multi', multireq);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/users', function(req, res){
	console.log("Hello world")
  res.send([
  	{id:'1', name: 'Alan'},
		{id:'2', name: 'Jacob'},
		{id:'3', name: 'Isen'}
 	])
});

app.get('/api/customers', function(req, res){
  res.json([
  	{id:'21', name: 'Alpha Client'},
  	{id:'22', name: 'Mister X'},
  	{id:'23', name: 'Dummy Customer'}
	])
});

app.get('/api/customers/:id', function(req, res){
  res.end({
  	id:'23', name: 'Dummy Customer'
  })
});

app.get('/api/countries', function(req, res){
  res.json([
  	{id:'1', name: 'Denmark'},
  	{id:'2', name: 'Sweden'},
  	{id:'3', name: 'Norway'}
  ])
});

describe('GET /api/users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/users')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.have.length(3)
        done()
      });
  })
})

// describe('GET ?users=api/users&customer=api/customers/21&countries=api/countries', function(){
//   this.timeout(15000);
//   it('respond with multi', function(done){
//     request(app)
//       .get('/api/multi?users=api/users&customer=api/customers/21&countries=api/countries')
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         console.log(res.body)
//         res.body.should.have.properties('users', 'customers', 'countries');
//         done()
//       });
//   })
// })