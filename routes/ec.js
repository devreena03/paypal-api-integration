var express = require('express');
var https = require("https");
var initialize = require("./config");

var router = express.Router();

router.get('/payment/:id', function(req, res){
    console.log("get details :"+req.params.id);
    var options = {
        host: sanboxUrl,
        path: '/v1/payments/payment'+req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
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
                res.status(response.statusCode);
                res.send(JSON.parse(body));          
           });
           response.on('error', function(e){
               console.log('response error');
               console.log(e);
           });
        });
    });
});

router.post('/create-payment', function(req, res){
    console.log("create");
    var options = {
        host: sanboxUrl,
        path: '/v1/payments/payment',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
                res.status(response.statusCode);
                res.send(JSON.parse(body));          
           });
           response.on('error', function(e){
               console.log('response error');
              console.log(e);
           });
        });
        http_request.write(JSON.stringify(req.body));
        http_request.end();
    });
});

//comming from checkout.js execute 
router.post('/execute-payment', function(req, res){
    executePayment(req.body,function(response){
        console.log(response.body);
        res.status(response.statusCode);
        res.send(response.body); 
    })
});

//coming from ios
router.get('/success', function(req, res){
    console.log("success");
    var value = {
        paymentID: req.query.paymentId,
        payerID:   req.query.PayerID
    }
    executePayment(value,function(response){
        console.log(response.body);
        console.log(response.body.id);
        if(response.statusCode == 200 && response.body.state == "approved"){
            res.writeHead(302,{'Location':("com.reena.ec-rest://success/?paymentId="+response.body.id)});       
        } else {
            res.writeHead(302,{'Location':("com.reena.ec-rest://error/?token="+req.query.token)});
        }      
        res.end();
    })
});

var executePayment = function(payment, callback){
    var options = {
        host: sanboxUrl,
        path: '/v1/payments/payment/'+payment.paymentID+'/execute',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
            response.body = JSON.parse(body);
            callback(response);         
        });
        response.on('error', function(e){
            console.log('response error');
            console.log(e);
        });
    });
    http_request.write(JSON.stringify({
        "payer_id": payment.payerID
    }));
    http_request.end();
};

module.exports = router;