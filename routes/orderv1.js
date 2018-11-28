var express = require("express");
var https = require("https");

var router = express.Router(); 
var sanboxUrl = 'api.sandbox.paypal.com';
var basicAuth = "QWZndmpVMkV4VE5LcnA0UkVjUUpXd2VWRVFzdWF2dUZ3ZlJzNktqTDZuOHFTYUwwTnRkX0tCOVMwVTVBdU9nT252SVVJakVhNVN2dUxBcUk6RUxjS19XdzkzRU9UM3l0a1hMcmhvbXh5RnBOUkIyeko5OENGeE5vQndaei1hR25KczRGeHdsVGl4dVhOZjEwZVhUc08tNUluUlhLZjFrWkI=";
var access_token='';

router.post("/create", function(req, res){
    console.log('create order v1 call....');
    var reqBody = req.body;
    console.log(reqBody);
   
    var options = {
        host: sanboxUrl,
        path: '/v1/checkout/orders/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Partner-Attribution-Id' : 'AliExpress_MP'
          }
    };

    initialize().then(function(){
        options.headers.Authorization = 'Bearer '+access_token;
        var http_request = https.request(options , function(response){
            var body = '';
            if (response.setEncoding) {
                response.setEncoding('utf8');
            }
            response.on('data', function(chunk){
                body+=chunk;
            });
            response.on('end', function(){
                res.send(body);   
            });
        });
        http_request.write(JSON.stringify(reqBody));
        http_request.end();
    });
});

router.post("/pay", function(req, res){
    console.log(req.body);
    console.log('payer id:'+req.body.payerId);
	var reqBody = {
        "disbursement_mode": "INSTANT",
        "payer_id": req.body.payerId
    };
    var options = {
        host: sanboxUrl,
        path: '/v1/checkout/orders/'+req.body.orderId+'/pay',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Partner-Attribution-Id' : 'AliExpress_MP',
            'Authorization': 'Bearer '+ access_token
          }
    };
    var http_request = https.request(options , function(response){
        console.log('statusCode:', response.statusCode);
        var body = '';
        if (response.setEncoding) {
            response.setEncoding('utf8');
        }
        response.on('data', function(chunk){
            body+=chunk;
        });
        response.on('end', function(){
            res.send(body);
        });
        response.on('error', function(e){
            console.log('response error');
            console.log(e);
        });
    });
    http_request.write(JSON.stringify(reqBody));
    http_request.end();
});

var initialize = function(){  
    var options = {
        host: sanboxUrl,
        path: '/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+basicAuth
          }
    };
    return new Promise(function(resolve, reject) {
        var http_request = https.request(options , function(response){
            var body = '';
            if (response.setEncoding) {
                response.setEncoding('utf8');
            }
            response.on('data', function(chunk){
                body+=chunk;
            });
            response.on('end', function(){
                access_token = JSON.parse(body).access_token; 
                resolve();
            });
        });
        http_request.write("grant_type=client_credentials&response_type=token&return_authn_schemes=true");
        http_request.end();
    });
}

module.exports = router;


