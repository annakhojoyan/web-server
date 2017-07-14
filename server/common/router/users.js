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
    var newUser = new User(req.body);
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
    var newUser = new User(req.body);
    if (!req.body.id) {
        res.statusCode = 404;
        return res.send({ error: 'not found' });
    }
    User.updateOne({
            _id: ObjectID(req.body.id)
        }, { $set: body },
        function(err, user) {
            if (err) {
                res.end('err');
            } else {
                res.end('done');
            }
        });
    res.json({
        message: 'User info updated..!',
        updated: req.body
    });

});

router.delete('/', function(req, res) {
    var userId = req.body.id;
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
