const models = require("../../models");
const crypto = require('crypto');   // 암호화 모듈 (단방향)

exports.SignupPage = (req, res, next) => {
    res.render("user/signup");
}

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
            res.redirect("/users/sign_up");
        })
        .catch(err => {
            console.log("[ERR][LOGIN][SIGNUP] sign up..........fail");
            console.log("장애) " + err);
        })
};

exports.LoginPage = (req, res, next) => {
    res.render("user/login");
}

exports.Login = async (req, res, next) => {
    let body = req.body;

    let result = await models.user.findOne({
        where: {
            email: body.userEmail
        }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if (dbPassword === hashPassword) {
        console.log("[LOG][LOGIN][LOGIN] user login..........ok");
        res.redirect("/");
    }
    else {
        console.log("[ERR][LOGIN][LOGIN] user login..........fail");
        console.log("장애) " + err);
        res.redirect("/user/login");
    }
}