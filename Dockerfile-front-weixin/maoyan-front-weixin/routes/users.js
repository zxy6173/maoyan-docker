var express = require('express');
var router = express.Router();
var HttpClient = require("../tools/HttpClient");

/* 查询手机号是否已注册 */
router.get('/findByPhone', function(req, res, next) {
    let phone = req.query.phone;
    let response = {};
    HttpClient.get("back:8080/maoyan-back/validatePhone",{phone:phone}).then(function(data){
        if(data.phone){
            response.status = 0;
        }else{
            response.status = 1;
        }
        res.send(response);
    });

});

/* 注册功能 */
router.post('/reg', function(req, res, next) {
    let phone = req.body.phone;
    let pwd = req.body.pwd;
    HttpClient.post("back:8080/maoyan-back/reg",{phone:phone,pwd:pwd}).then(function(data){
        res.redirect("/login");
    });
});

/* 登录功能 */
router.post('/login', function(req, res, next) {
    HttpClient.post("back:8080/maoyan-back/login",{phone:req.body.phone,pwd:req.body.pwd}).then(function(data){
        if(data.phone){
            req.session.user = data;
            res.redirect("/");
        }else{
            res.render('login.ejs', {
                error:1
           });
        }
    });

});
/* 退出功能 */
router.get('/logout', function(req, res, next) {
    req.session.user = {};
    res.redirect("/");

});

module.exports = router;
