var express = require('express');
const session = require('express-session');
var router = express.Router();
const boardPath = require('./boardRoutes');

router.get('/',function (req,res,next){
    res.redirect('/users/login');
})
// 메인 페이지
router.get('/main', function (req, res, next) {
    res.render('main',{
        "name": req.session.name
    });
});

router.use('/board', boardPath);

module.exports = router;
