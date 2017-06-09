var mysql = require('mysql');
var fs = require('fs');
	readline = require('readline');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "Gallery_DB"
});

var stdin = process.openStdin();

stdin.addListener("data", function(d) {

	var rd = readline.createInterface({
		input: fs.createReadStream(d.toString().trim()),
		console: false
	})
	rd.on('line', (line)=> {
		var sql = line;

		con.query(sql, function(err, result){
			if(err) throw err;
			console.log("Data_Insert");
		});
	});
});

con.connect(function(err){
    if(err) throw err;
	console.log("Connected!");
});

// rd.on('line', (line) => {
// 	var sql = line;

// 	con.query(sql, function(err, result){
// 		if(err) throw err;
// 		console.log("Data_Insert");
// 	});
// });
