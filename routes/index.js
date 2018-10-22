var express = require("express");

var app = express.Router();

app.get("/", function(req, res){
	res.sendFile(__basedir + '/public/view/index.html');
});

app.get("/ec-client", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-client.html');
});

app.get("/ec-server", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-server.html');
});

app.get("/client-orderv2", function(req, res){
	res.sendFile(__basedir + '/public/view/client-orderv2.html');
});

app.get("/ec-bt", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-bt.html');
});

app.get('/apple-app-site-association', function(req, res, next) {
	console.log("inside universal link");
    res.send('{"applinks":{"apps":[],"details":[{"appID":"87GA28WQTJ.com.reena.smysample","paths":["*"]}]}}');   
});

module.exports = app;