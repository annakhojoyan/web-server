var express = require('express');
var users = require('./users');
var router = express.Router();

router.use('/', users);

module.exports = router;
