var express = require('express');
var router = express.Router();

/* MySQL */
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'Gallery_DB'
});
connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM Work', function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.render('index', { title: 'Express', name: req.session.name, data: renderView(result) });
	});
});

var renderView = function(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Array]')
        throw new Error('invalid data type, expected an array');
    var view = '';
    obj.map((o, i) => {
        view += `<div>
                     <div>標題:${o.Title}</div>
                     <div>作者:${o.Artist_SSN}</div>
                     <div>賣方:${o.Owner_SSN}</div>
                     <div>型態:${o.Type}</div>
                     <div>MED:${o.Medium}</div>
                     <div>STYLE:${o.Style}</div>
                     <div>大小:${o.Size}</div>
                     <div>價格:${o.Asking_Price}</div>
                     <div>日期:${o.Date_of_Show}</div>`;
        if (o.Sold != 0) {
            view += `<div><button id='${o.Title}__${o.Artist_SSN}' onclick='sendMe(this);'>購買</button></div></div>`;
        } else {
            view += `<input type='button' value='已售出' disabled></div>`;
        }
        view += '<hr>';
    });
    return view;
}


router.get('/buyIt', function(req, res, next) {
	
	var buyobj = req.query.id.split('__');
	
	connection.query(`SELECT Title, Artist_SSN, Asking_Price FROM Work WHERE Title = '${buyobj[0]}' AND Artist_SSN = ${buyobj[1]}`, function(err, result, fields) {
		if(err) throw err;
		console.log(result[0].Title, result[0].Artist_SSN, result[0].Asking_Price);
		res.render('bid', { title: result[0].Title, asking_price : result[0].Asking_Price});
		connection.query(`INSERT INTO Negotiate(N_Title, N_Artist, N_Asking_Price, N_User_SSH, N_Giving_Price) VALUES (${result[0].Title}, ${result[0].Artist_SSN}, ${result[0].Asking_Price}, NULL, NULL)`, function(err, result, fields) {
			if(err) throw err;
		});

		connection.query(`SELECT N_User_SSN AS user, N_Giving_Price AS price FROM Negotiate WHERE N_Title = ${result[0].Title} AND N_Artist = ${result[0].Artist_SSN}`, function (err, result, fields) {
			if(err) throw err;
			res.render('bid', {highest_user : result[0].user, highest_price : result[0].price});
		});
	});

	res.render('bid', {current_user: req.session.name});

});
	
	





/* Login */
router.post('/login', function(req, res, next) {

	connection.query('SELECT U_ID AS id, U_Password AS pwd, U_Name AS name FROM User WHERE U_ID = ? AND U_Password = ?',[req.body.id, req.body.pwd], function (err, result, fields) {
		if (err) throw err;
		console.log("userid = " + result[0].id + "userpwd = " + result[0].pwd);
		console.log(result);
		for(var i in result){
			console.log(result[i]);
		}
    	if (req.body.id === result[0].id && req.body.pwd === result[0].pwd) {
    	    req.session.name = result[0].name;
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


/* Logout */
router.post('/logout', function(req, res, next) {
	req.session.name = null;
    res.render('index', { name: req.session.name });
});


router.get('/page*', function(req, res, next) {
    res.send(`Hello ${req.session.name}, this is ${req.originalUrl} <a href='/'>goback!</a>`)
});


// Register Page
router.get('/register', function(req, res, next) {
	res.render('register', { title: "FUCK ME BITCH"});
});



module.exports = router;



