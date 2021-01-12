var express = require('express');
var router = express.Router();
const boardPath = require('./boardRoutes');

// 메인 페이지
router.get('/', function (req, res, next) {
    res.send('환영합니다~');
});

router.use('/board', boardPath);

module.exports = router;
