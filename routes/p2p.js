var express = require('express');
var request = require('request');
var router = express.Router();

var access_token = {
    india : {
        email: 'india-business@test.com',
        access_token: 'A21AAGbLCF9neDxazwd24IUkv0QalVHuwTcjBneJqhyoXtiBkPCvB7XhK52X1NLo6OTLsH4Lf1o8LAA3iXe6j6T1fN2nm_VZg'
    },
    us : {
        email: 'reena-us-business@test.com',
        access_token: 'A21AAGDxiwWqmvjM4UnOUJ8AnMObhkTgkJJHajcIY14GdYcAMTtJPKENHfdHo7VGgORx8mf2EP2JyWgaPtaR1h1dvZWDGMnfQ'
    },
    japan : {
        email: 'japan-business@test.com',
        access_token: 'A21AAGfwci9jQ03NqraJiGvuVZY_A5UJZbo6rsB9z-q3d7NB7xcdRyQzyhZ1K7Jg-tyFhu0YiUBoorQ7JuAvcywA-qKFF4eVQ'
    }
}

var sanboxUrl = 'https://api.sandbox.paypal.com';

router.post('/payment-token/', function(req, res) {
    console.log("indise payment token");
    console.log(req.body);
    var payload = {
        "amount": {
            "value": req.body.amount,
            "currency": req.body.currency
        },
        "payee": {
            "id": req.body.email,
            "type": "EMAIL"
        },
        "redirect_context": {
            "return_url": "http://amazon.com/"
        },
        "payment_type": req.body.paymentType,
        "note_to_payee": "Japan p2p test"
    };
    var options = {
        uri: 'https://api.sandbox.paypal.com/v1/payments/personal-payment-tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+access_token[req.body.apicaller].access_token
          },
        body: payload,
        json: true
            
    };  
    request(options, function (err, response) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        console.log(response.statusCode);
        console.log(response.body);
        res.json({
            status: response.statusCode,
            body: response.body
        });
    });
    
});

module.exports = router;