var express = require('express');
var router = express.Router();
const controllers = require('./controller');

router.get('/sign_up', controllers.SignupPage);
router.post('/sign_up', controllers.Signup);

router.get('/login', controllers.LoginPage);
router.post('/login', controllers.Login);

router.get('/logout', controllers.logout);

module.exports = router;
