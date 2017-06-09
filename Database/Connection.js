var mysql = require('mysql');

var con = mysql.createConnection({
	host: "123.193.61.174",
	user: "webadmin"
});

con.connect(function(err){
    if(err) throw err;
	console.log("Connected!");
});