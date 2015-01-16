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

app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/api/users', function( req, res ) {
	res.send ([
  	{ id: '1', name: 'Allan' },
		{ id: '2', name: 'Jacob'},
		{ id: '3', name: 'Isen'}
 	])
});

app.get( '/api/customers', function( req, res ) {
  res.json ([
  	{ id: '21', name: 'Alpha Client' },
  	{ id: '22', name: 'The Mysterious One' },
  	{ id:'23',  name: 'Dummy Customer' }
	])
});

app.get( '/api/customers/:id', function( req, res ) {
  res.json ({
   id:'23', name: 'Dummy Customer'
  })
});

app.get( '/api/countries', function( req, res ) {
  res.json ([
  	{ id: '1', name: 'Denmark' },
  	{ id:'2',  name: 'Sweden' },
  	{ id:'3',  name: 'Norway' }
  ])
});

app.listen( 3003 );

request = request( 'http://localhost:3003' );

describe( 'GET /api/users', function() {
  it( 'respond with json', function(done) {
    request.get( '/api/users' )
      .expect( 200 )
      .end( function( err, res ) {
        if ( err ) return done( err );
        res.body.should.have.length( 3 )
        done()
      });
  })
})

describe( 'GET ?users=api/users&customer=api/customers/21&countries=api/countries' , function() {
  it( 'respond with multi', function( done ) {
    request.get( '/api/multi?users=api/users&customer=api/customers/21&countries=api/countries' )
      .expect( 200 )
      .end( function( err, res ){
        if ( err ) return done( err );
        
        res.body.should.have.properties( 'users', 'customer', 'countries' );
        res.body.customer.should.be.an.instanceOf( Object ).and.have.property( 'name' );
        res.body.users.should.be.an.instanceOf( Object );
        res.body.countries.should.be.an.instanceOf( Object );
        done()
      });
  })
})