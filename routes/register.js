var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'ArtGallery'
});

connection.connect();



// Register Function
router.post('/', function(req, res, next) {
	console.log(req.body);
	var sql = `INSERT INTO User (ID, Password, Name, Phone, Addr, SSN) VALUES (${req.body.id}, ${req.body.psw}, ${req.body.name}, ${req.body.phone}, ${req.body.addr}, ${req.body.ssn})`;
	
	connection.query(sql, function (err, result) {
    	if (err) throw err;
   		console.log("1 user registed");
	}); 
	res.redirect('/');
});

module.exports = router;



