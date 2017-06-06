var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root"
});

con.connect(function(err){
	if(err) throw err;
	console.log("Connected!");

	var sql_CreateDB = "CREATE DATABASE IF NOT EXISTS Gallery_DB"

	con.query(sql_CreateDB, function(err, result){
		if(err) throw err;
		console.log("Database Created");
	});
	con.end(function(err) {
	  // The connection is terminated now
	});
});


