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

app.get("/orderv2-client", function(req, res){
	res.sendFile(__basedir + '/public/view/orderv2-client.html');
});

app.get("/orderv2-server", function(req, res){
	res.sendFile(__basedir + '/public/view/orderv2-server.html');
});

app.get("/orderv1-server", function(req, res){
	res.sendFile(__basedir + '/public/view/orderv1-server.html');
});

app.get("/nvp", function(req, res){
	res.sendFile(__basedir + '/public/view/nvp.html');
});

app.get("/ec-bt", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-bt.html');
});

app.get("/apm", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-apm.html');
});

app.get("/ec-fullpage", function(req, res){
	res.sendFile(__basedir + '/public/view/ec-fullpage.html');
});

app.get("/bt-rt", function(req, res){
	res.sendFile(__basedir + '/public/view/bt-rt.html');
});

app.get("/downloads", function(req, res){
	res.sendFile(__basedir + '/public/view/app/downloads.html');
});

app.get("/isu", function(req, res){
	res.sendFile(__basedir + '/public/view/isu.html');
});

app.get("/wps", function(req, res){
	res.sendFile(__basedir + '/public/view/wps.html');
});

app.get("/webhook", function(req, res){
	res.sendFile(__basedir + '/public/view/webhooks.html');
});

app.get("/callback-api", function(req, res){
	res.sendFile(__basedir + '/public/view/callback-api.html');
});

app.get("/callback-api/server", function(req, res){
	res.sendFile(__basedir + '/public/view/callback-api-server.html');
});



// app.get("/p2p", function(req, res){
// 	res.sendFile(__basedir + '/public/view/p2p.html');
// });
//iOS universal linking
app.get('/apple-app-site-association', function(req, res, next) {
	console.log("inside universal link new");
	var applinks = {
		"applinks": {
			"apps": [],
			"details": [{
				"appID": "87GA28WQTJ.com.reena.nativexo-integration-objective-c",
				"paths": ["/nativexo-objec"]
				},
				{
				"appID": "87GA28WQTJ.com.reena.smysample",
				"paths": ["/sdkuniversalLink"]
				},
				{
				"appID": "87GA28WQTJ.com.reena.nativexo-integration-swift",
				"paths": ["/nativexo-swift"]
				},
				{
				"appID": "87GA28WQTJ.com.reena.ps-demo1",
				"paths": ["/ps-demo"]
				},
				{
				"appID": "87GA28WQTJ.com.reena.webview-session",
				"paths": ["/webview-session"]
				}]
			}
	}
    res.send(applinks);   
});

// app.get('/apple-app-site-association', function(req, res, next) {
// 	console.log("inside universal link");
//    res.send('{"applinks":{"apps":[],"details":[{"appID":"87GA28WQTJ.com.reena.ps-demo1","paths":["*"]}]}}');   
// });

//Android APP linking
app.get("/nativexo-android", function(req, res){
	res.sendFile(__basedir + '/public/view/app/thankyou.html');
});
module.exports = app;
