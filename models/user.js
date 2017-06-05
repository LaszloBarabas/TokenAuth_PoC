// load the mongoose module 
var mongoose = require('mongoose'); 
// create a Schema
var Schema = mongoose.Schema; 

// load the passport local mongoose 
var passportLocalMongoose = require ('passport-local-mongoose'); 

// define the User Schema 
 var User = new Schema ({
	 username: String, 
	 password: String, 
	 lastname: {
  			 type: String,
   			 default: ''
 	 },
 	 firstname: {
   			 type: String,
   			 default: ''
  	},
	 admin: {
		 type:Boolean, 
		 default:false
	 }

 }); 
//  make the passport local to use the schema 
User.plugin(passportLocalMongoose); 
module.exports = mongoose.model('user', User); 
