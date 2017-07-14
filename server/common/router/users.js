var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var url = require('url');

var User = require('../db/models/user');

router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (!err) {
            res.json(users);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/', function(req, res) {
    console.log();
    var name = req.param('name');
    var email = req.param('email');
    var username = req.param('username');

    var newUser = new User({
        name: name,
        email: email,
        username: username,
    });
    return newUser.save(function(err, user) {
        if (err) {
            console.log(err)
        }
        res.json({
            message: 'User Added to DB..!',
            added: req.body
        });
    });

});

router.put('/', function(req, res) {
    console.log('EDIT', req.param('name'), req.param('username'), req.param('email'), req.param('id'));
    var body = {
        name: req.param('name'),
        username: req.param('username'),
        email: req.param('email')
    };
    if (!req.param('id')) {
        res.statusCode = 404;
        return res.send({ error: 'not found' });
    }
    User.updateOne({
            _id: ObjectID(req.param('id'))
        }, { $set: body },
        function(err, user) {
            if (err) {
                res.end('err');
            } else {
                res.end('done');
            }
        });
    res.end('done');
    res.json({
        message: 'User info updated..!',
        updated: req.body
    });

});

router.delete('/', function(req, res) {
    console.log('DELETE', req.param('id'));
    var userId = req.param('id');
    if (!userId) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
    }
    User.deleteOne({ _id: ObjectID(userId) }, function(err, user) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json({ message: 'User deleted..!' });

        }
    });
});

module.exports = router;
