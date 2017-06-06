var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'Gallery_DB'
});

connection.connect();



// Register Function
router.post('/', function(req, res, next) {
	console.log(req.body);
	var sql = `INSERT INTO User(U_ID, U_Password, U_SSN, U_Name, U_Address, U_Phone) VALUES (${req.body.id}, ${req.body.psw},${req.body.ssn}, ${req.body.name}, ${req.body.addr}, ${req.body.phone})`;
	
	connection.query(sql, function (err, result) {
    	if (err) throw err;
   		console.log("1 user registed");
	}); 
	res.redirect('/');
});

module.exports = router;



