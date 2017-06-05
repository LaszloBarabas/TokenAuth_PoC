

// load express module
var express = require('express'); 
//load path module 
//
var path = require('path'); 

// load logging module 
var morgan = require('morgan'); 

// load cookie module  
var cookieParser = require('cookie-parser'); 


// load different middleware to handle teh reqs
//
var bodyParser = require ('body-parser'); 

var passport  = require ('passport'); 

var localStrategy = require('passport-local').Strategy; 


// set the host name 
var hostname 	= 'localhost'; 
//set the port nr
var port 	= 3030; 

// load the configuration 
//
var config = require('./config'); 
// load the mongoose 
//
//
var mongoose = require ('mongoose'); 
mongoose.connect(config.mongourl); 

// create the connection handler 
var db = mongoose.connection; 

// register the callbacks for different events like on or once
db.on('error', function () { 
	console.error.bind(console, 'connection error:'); 

}); 

db.once('open', function () { 

	console.log('Connected correctly to the DB server '); 
}); 




// load the predefined routes 
var users = require ('./routes/users'); 
var students = require ('./routes/students'); 
var index = require('./routes/index'); 




// create the general app context 
var app		= express(); 

// start the middleware 

app.use(morgan('dev'));
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 
//app.use(express.static(path.join(__dirname, 'public')));

// passport config 
var User = require('./models/user'); 
app.use(passport.initialize()); 
passport.use(new localStrategy(User.authenticate())); 
//passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());








app.use('/index',  index); 
app.use('/users', users); 
app.use('/students', students); 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
});

if ( app.get('env') === 'development') {
	app.use (function (err, req, res, next ) { 
		res.status(err.status || 500 ); 
		res.json({
			message: err.message, 
			error: err
		});

	});
}
// error handler
app.use(function(err, req, res, next) {

    // render the error page
    res.status(err.status || 500);
    
    res.json({
	    message: err.message, 
	    error: {} 
    });
});

// start the app 
app.listen( port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`); 
}); 


