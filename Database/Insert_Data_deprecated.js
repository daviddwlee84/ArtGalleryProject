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
		input: fs.createReadStream("Index.txt"),
		console: false
	})
	rd.on('line', (line_file)=> {

		var rd_in = readline.createInterface({
			input: fs.createReadStream(line_file),
			console: false
		})

		rd_in.on('line', (line)=> {
			var sql = line;

			con.query(sql, function(err, result){
				if(err) throw err;
				console.log("Data_Insert");
			});
		});
	});
});

// con.connect(function(err){
//     if(err) throw err;
// 	console.log("Connected!");
// });
// var mysql = require('mysql');
// var fs = require('fs');
// 	readline = require('readline');

// var rd = readline.createInterface({
// 	input: fs.createReadStream("salesperson_Data.txt"),
// 	console: false
// })

// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "root",
// 	database: "Gallery_DB"
// });


// con.connect(function(err){
//     if(err) throw err;
// 	console.log("Connected!");
// });

// rd.on('line', (line) => {
// 	var sql = line;

// 	con.query(sql, function(err, result){
// 		if(err) throw err;
// 		console.log("Data_Insert");
// 	});
// });
