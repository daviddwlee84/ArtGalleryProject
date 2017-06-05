var express = require('express');
var router = express.Router();

/* MySQL */
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'ArtGallery'
});
connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { name: req.session.name });
});

router.post('/login', function(req, res, next) {

	connection.query('SELECT ID AS id, Password AS pwd, Name FROM User WHERE ID = ? AND Password = ?',[req.body.id, req.body.pwd], function (err, result, fields) {
		if (err) throw err;
		console.log("userid = " + result[0].id + "userpwd = " + result[0].pwd);
		console.log(result);
		for(var i in result){
			console.log(result[i]);
		}
    	if (req.body.id === result[0].id && req.body.pwd === result[0].id) {
    	    req.session.name = result[0].Name;
    	    res.render('index', { name: req.session.name });
    	} else {
    	    res.send('password error');
    	}
	});

	// Bad writting style will cause SQL Injection
	// connection.query(`SELECT ID, Password FROM User WHERE ID = ${req.body.id} AND Password = ${req.body.pwd}`, function (err, result, fields) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });

});

router.get('/page*', function(req, res, next) {
    res.send(`Hello ${req.session.name}, this is ${req.originalUrl} <a href='/'>goback!</a>`)
});

// Logout function
router.post('/logout', function(req, res, next) {
	req.session.name = null;
    res.render('index', { name: req.session.name });
});



// Register Page
router.get('/register', function(req, res, next) {
	res.render('register', { title: "FUCK ME BITCH"});
});



module.exports = router;



