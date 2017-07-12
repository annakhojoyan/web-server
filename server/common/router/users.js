var express = require('express');
var router = express.Router();

var User = require('../db/models/user');

router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        res.render('index', {
            users: users
        })
    });
});

router.post('/users/index', function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;

    var newUser = new User({
        name: name,
        email: email,
        username: username
    });
    return newUser.save(function(err, user) {
        res.redirect('/');
    });
});

module.exports = router;
