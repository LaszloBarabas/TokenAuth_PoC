var express = require('express');
var bodyParser = require('body-parser'); 
var router = express.Router();
router.use(bodyParser.json()); 

var verify = require('./verify');



router.get('/', verify.verifyOrdinaryUser,   function (req, res, next ) {

        return res.status(200).json({status: 'Student  query succesfull'}); 
}); 




module.exports = router;
