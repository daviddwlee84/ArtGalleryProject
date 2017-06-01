var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { name: req.session.name });
});

router.post('/login', function(req, res, next) {
    if (req.body.id === 'zzz' && req.body.pwd === '0000') {
        req.session.name = 'david lee';
        res.render('index', { name: req.session.name });
    } else {
        res.send('password error');
    }
});

router.get('/page*', function(req, res, next) {
    res.send(`Hello ${req.session.name}, this is ${req.originalUrl} <a href='/'>goback!</a>`)
});

// Logout function
router.post('/logout', function(req, res, next) {
	req.session.name = null;
    res.render('index', { name: req.session.name });
});


module.exports = router;



