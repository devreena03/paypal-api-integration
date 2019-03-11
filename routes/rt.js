var express = require('express');
var request = require('request');
var initialize = require("./config");
var rtBody = require('../payload/craete-billing-token');

var router = express.Router();
var sanboxUrl = 'https://api.sandbox.paypal.com';

router.post('/create-agreement-token', function(req, res){
    console.log(rtBody);
    console.log("create-agreement-token");
    var options = {
        uri: sanboxUrl + '/v1/billing-agreements/agreement-tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: rtBody,
        json: true            
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(response.body);
            res.json(response.body);
        });
    }, function(err){
        console.log(err);
    });
});

router.get('/agreement-token/:id', function(req, res){
    console.log("get details :"+req.params.id);
    var options = {
        uri: sanboxUrl + '/v1/billing-agreements/agreement-tokens'+req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(response.body);
            res.json(response.body);
        });
    });
});

router.post('/create-agreement', function(req, res){
    var options = {
        uri: sanboxUrl + '/v1/billing-agreements/agreements',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: {
           "token_id": req.body.token
        },
        json: true
            
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(response.body);
            res.status(response.statusCode);
            res.send(response.body); 
        });
    }, function(err){
        console.log(err);
    });
});

module.exports = router;