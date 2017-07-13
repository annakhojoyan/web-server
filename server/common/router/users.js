var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var User = require('../db/models/user');

router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        res.render('index', {
            users: users
        })
    });
});

router.post('/users/index', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;

    var newUser = new User({
        name: name,
        email: email,
        username: username,
    });
    return newUser.save(function(err, user) {
        if (err) {
            console.log(err)
        }
        res.redirect('/');
    });
});

router.post('/users/edit/:id', function(req, res) {
    console.log('EDIT');
    res.render('index');
});

router.post('/users/delete/:id', function(req, res) {
    console.log('DELETE', req.params.id);
    var userId = req.params.id;
    User.deleteOne({ _id: ObjectID(userId) }, function(err, user) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
