var express = require('express');
var https = require("https");
var prefill_payload = require('../payload/prefill-payload');

var router = express.Router();
var sanboxUrl = 'api.sandbox.paypal.com';
var clientId = "AdEhkNO4a3F4J65NbHFKcZbRCiaZhVUh3chvqPMFzIDp4QmOzKiPIZwnNr_c_BHnVt_VmYgxNSbzkn5_";
var secret = "EIwZnpPiMWQmnF4DcwNGYPvbFdKZkH-BlQzxIlVtGk5_t85KgZB9qX4SKdNko1W-dRG4e--87kWACORs";
var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;
var access_token='';
var partner_id = "VUMVKBYF5EVNC";

router.get('/access-token', function(req, res){
    var promise = initialize();
    console.log("access "+access_token);
    promise.then(function(){
        console.log("access after: "+ access_token);
        res.send("access_token: "+ access_token);
    });
});

router.get('/create-referal', function(req, res){
    var trackingId = 'track002';
    var options = {
        host: sanboxUrl,
        path: '/v1/customer/partner-referrals',
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
                res.status(200);
                res.send(JSON.parse(body));   
            });
        });
        console.log(prefill_payload);
        prefill_payload.requested_capabilities[0].api_integration_preference.rest_third_party_details.partner_client_id = clientId;
        prefill_payload.customer_data.partner_specific_identifiers[0].value = trackingId;
        http_request.write(JSON.stringify(prefill_payload));
        http_request.end();
    });
});

router.get('/success', function(req, res){
    console.log(req.query);
    var merchant_id = req.query.merchantIdInPayPal;
    var options = {
        host: sanboxUrl,
        path: '/v1/customer/partners/'+partner_id+'/merchant-integrations/'+merchant_id,
        method: 'GET',
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
            res.status(response.statusCode);
            res.redirect('/success');         
        });
        response.on('error', function(e){
            console.log('response error');
            console.log(e);
        });
    });
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