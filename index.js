var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var db = require('./server/common/db/index');
var router = require('./server/common/router/index');
var users = require('./server/common/router/users');
var User = require('./server/common/db/models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('api', function(req, res) {
    res.send('Api is running');
});

db();

app.use('/', router);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
