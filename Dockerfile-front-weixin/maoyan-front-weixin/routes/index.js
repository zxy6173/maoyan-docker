var express = require('express');
var router = express.Router();
var HttpClient = require("../tools/HttpClient");
var StringUtil = require("../tools/StringUtil");


/* GET home page. */
router.get('/hot', function(req, res, next) {
    HttpClient.get(HttpClient.url+"/hot").then(function(data){
        res.send(data);
        
    });
    
});
router.get('/cinema', function(req, res, next) {
    HttpClient.get(HttpClient.url+"/cinema",{filmId:req.query.filmId,date:req.query.date}).then(function(data){
        res.send(data);

    });
    
});
router.get('/screening', function(req, res, next) {
    HttpClient.get(HttpClient.url+"/screening",{filmId:req.query.filmId,cinemaId:req.query.cinemaId,date:req.query.date}).then(function(data){
        res.send(data);

    });
    
});
router.get('/seat', function(req, res, next) {
    HttpClient.get(HttpClient.url+"/seat",{
            filmId:req.query.filmId,
            cinemaId:req.query.cinemaId,
            screeningId:req.query.screeningId,
            time:req.query.time,
            date:req.query.date}).then(function(data){
                console.log("data.tickets",typeof data.tickets);
                if(data.tickets != null){
                    data.tickets = JSON.parse("[" + data.tickets + "]")
                }
                
        res.send(data);

    });
    
});
router.post('/updateSeat', function(req, res, next) {
    let tickets = req.body.tickets;
    tickets = tickets.replace(/[\[\]]/g,"");
    HttpClient.get(HttpClient.url+"/updateSeat",{
                id:req.body.id, 
                tickets:tickets
            }).then(function(){
        res.send("success");

    });
    
});

router.get('/pf', function(req, res, next) {
    HttpClient.get("piaofang.maoyan.com/?ver=normal").then(function(data){
        
        //获取猫眼网站指定的字体
        let fontMath = data.match(/<style id=["']js-nuwa["']>[\s\S]+?<\/style>/g);
        //截取总票房信息
        let indentOutMatch = data.match(/<div class="indentOut hollow" id="desc-wrap"[\S\s]+<div class="ticketList">/g);
        //截取各电影票房信息
        let contentMath = data.match(/<div class=["']content strip["'][\s\S]+?<\/div>/g);

        if(!fontMath || !indentOutMatch || !contentMath){
            return res.render('piaofang.ejs',{font:"",indentOut:"",content:""});
        }
        let font = fontMath[0];
        let indentOut = indentOutMatch[0];
        let content = contentMath[0]; 

        
        indentOut = indentOut.substring(0,indentOut.length - "<div class=\"ticketList\">".length);
        

        
        res.render('piaofang.ejs',{font,indentOut,content});

    });
    
});
module.exports = router;
