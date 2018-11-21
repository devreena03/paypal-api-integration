var express = require("express");
var bodyParser = require('body-parser');
var braintree = require("braintree");

var app = express.Router();

var gateway = braintree.connect({
  accessToken: "access_token$sandbox$vw8dh7hp79kqtr63$5bc87804a77eaafb170382a7a5b45c7d" // india-bussiness-bt@test.com
});

app.get("/client_token", function (req, res) {
  console.log('client_token');
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.post("/refund", function(req, res){
  console.log(req.body);
  gateway.transaction.refund(req.body.id,req.body.amount, function (err, result) {
    if (err) {
      console.log('error');
      console.log(err);
      res.status(500);
      res.send(err);
    }  else if (result.success) {
      console.log('refund scuccess with id: '+ result.transaction.id);
      console.log(result);
      res.send(result);
  } else {
    console.log('failed with id:  '+ result.transaction.id);
    console.log(result);
    res.status(500);
    res.send(result);
  }
  });
});

app.get("/:id", function(req, res){
  console.log("get payment information: "+req.params.id);
  gateway.transaction.find(req.params.id, function (err, result) {
    if (err) {
      console.log('error');
      res.status(500);
      res.send(err);
    } else  {
      console.log('success '+ req.params.id);
      console.log(result);
      res.send(result);
  } 
  });
});

app.get("/order/:id", function(req, res){
  console.log("get order information: "+req.params.id);
  var stream = gateway.transaction.search(function (search) {
    search.orderId().is(req.params.id);
  }, function (err, response) {
    response.each(function (err, result) {
      console.log(result);
      res.send(result);
    });
  });
});

app.post("/checkout", function (req, res) {
  console.log('checkout');
    var nonce = req.body.nonce;
    console.log(req.body.amount);
    console.log(nonce);
    var saleRequest = {
        amount: req.body.amount,
        merchantAccountId: "INR",
        paymentMethodNonce: nonce,
       // orderId : "ABX1010987",
        options: {
          paypal: {
            customField: "BOX2012JHGFDkjkkjkljjj jhflkjs",
            description: "Paypal test recipt jlkjoiuoi hgjh"
          },
          submitForSettlement: true
        }
      };
      
      gateway.transaction.sale(saleRequest, function (err, result) {
        if (err) {
          res.status(500);
          console.log(err);
          res.send(err.message);
        } else if (result.success) {
          console.log(result);
            console.log('payment sucess with result.transaction.id'+ result.transaction.id);
          res.send("Success! Transaction ID: " + result.transaction.id);
        } else {
          console.log(result);
          res.status(500);
          res.send("Error:  " + result.message);
        }
      });
    
  });

  module.exports = app;
