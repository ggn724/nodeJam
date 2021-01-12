var express = require('express');
var router = express.Router();
const loginPath = require('./loginRoutes');

router.use('/',loginPath);

module.exports = router;
