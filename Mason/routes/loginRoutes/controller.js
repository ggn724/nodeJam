const models = require("../../models");
const crypto = require('crypto');   // 암호화 모듈 (단방향)
const { join } = require("path");
const session = require("express-session");

// 가입 GET
exports.SignupPage = (req, res, next) => {
    res.render("user/signup", {
        title: 'signup',
        "name": req.session.name
    });
}

// 가입 POST
exports.Signup = (req, res, next) => {
    let body = req.body;

    let inputPw = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPw = crypto.createHash("sha512").update(inputPw + salt).digest("hex");  // digest => hex, base64(선호), latin1

    let result = models.user.create({
        name: body.userName,
        email: body.userEmail,
        password: hashPw,
        salt: salt
    })
        .then(result => {
            res.render("user/login", {
                title: 'login',
                pass: true,
                join: true,
                "name": req.session.name
            });
        })
        .catch(err => {
            console.log("[ERR][LOGIN][SIGNUP] sign up..........fail");
            console.log("장애) " + err);
        })
};

// 로그인 GET
exports.LoginPage = (req, res, next) => {
    res.render("user/login", {
        title: 'login',
        pass: true,
        join: false,
        "name": req.session.name
    });
}

// 로그인 POST
exports.Login = async (req, res, next) => {
    let body = req.body;
    let results = await models.user.findOne({
        where: {
            email: body.userEmail
        }
    })
        .then(result => {
            let dbPassword = result.dataValues.password;
            let inputPassword = body.password;
            let salt = result.dataValues.salt;
            let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

            if (dbPassword === hashPassword) {
                console.log("[LOG][LOGIN][LOGIN] user login..........ok");
                req.session.email = body.userEmail;
                req.session.name = result.dataValues.name;
                console.log("세션 :" + req.session.email);
                console.log("이름 :" + req.session.name);
                req.session.save(() => {
                    res.render('main', {
                        "name": req.session.name
                    });
                });
                // res.render("main", {
                //     session: req.session
                // });
            }
            else {
                console.log("[ERR][LOGIN][LOGIN] user login..........fail");
                console.log("장애) " + err);
                res.render("user/login", {
                    title: 'login',
                    pass: false,
                    join: false,
                    "name":req.session.name
                });
            }
        })
        .catch(err => {
            console.log("[ERR][LOGIN][LOGIN] DB 조회 실패..........fail");
            console.log("장애) " + err);
            res.render("user/login", {
                title: 'login',
                pass: false,
                join: false,
                "name": req.session.name
            });
        })
};

// 로그아웃
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.clearCookie('sid');

    res.render("user/login", {
        title: 'login',
        pass: true,
        join: false,
        "name": false
    });
};