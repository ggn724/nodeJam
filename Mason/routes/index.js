var express = require('express');
var router = express.Router();
const boardPath = require('./boardRoutes');

router.use('/board',boardPath);

module.exports = router;
