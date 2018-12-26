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
    console.log(response.clientToken);
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
    var saleRequest = {
        amount: req.body.amount,
        merchantAccountId: req.body.currency?req.body.currency:"INR",
        paymentMethodNonce: nonce,
       // orderId : "ABX1010987",
        options: {
          paypal: {
            customField: "Paypal test recipt",
            description: "Paypal test recipt"
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

  app.post("/vault", function (req, res) {
    console.log('vault');
      console.log(req.body.nonce);
      gateway.customer.create({
        firstName: "Reena",
        lastName: "Kumari",
        paymentMethodNonce: req.body.nonce
      }, function (err, result) {
        if (err) {
          res.status(500);
          console.log(err);
          res.send(err.message);
        } else if (result.success) {
          console.log('Customer created with customer id: '+ result.customer.id);
          console.log('Payment token: '+ result.customer.paymentMethods[0].token);
          res.send(result);
        } else {
          console.log(result);
          res.status(500);
          res.send("Error:  " + result.message);
        }
      });
});  

app.post("/vaultwithpayment", function (req, res) {
  console.log('vault with payment');
    var nonce = req.body.nonce;
    console.log(nonce);
    var saleRequest = {
       amount: req.body.amount?req.body.amount:"1.00",
       merchantAccountId: req.body.currency?req.body.currency:"USD",
       paymentMethodNonce: nonce,
       // orderId : req.body.invoice_id,
        options: {
          submitForSettlement: true,
          storeInVault: true 
        },
        // customer : {
        //   firstName :"Reena",
        //   lastName : "kumari",
        //   company : 'PayPal',
        //   'phone': '123123123',
        //   'website': 'http://www.example.com',
        //   'email':'some@testbt.com'
        // },
          "deviceData":req.device_data
      };
      gateway.transaction.sale(saleRequest, function (err, result) {
        if (err) {
          res.status(500);
          console.log(err);
          res.send(err.message);
        } else if (result.success) {
          console.log(result);
          console.log('payment sucess with result.transaction.id'+ result.transaction.id);
          res.send(result);
        } else {
          console.log(result);
          res.status(500);
          res.send("Error:  " + result.message);
        }
      });
});

app.post("/autopay", function (req, res) {
  console.log('autopay');
    console.log(req.body.amount);
    console.log(req.body.rt_token);
    console.log(req.body.currency);
    var saleRequest = {
        amount: req.body.amount,
        merchantAccountId: req.body.currency?req.body.currency:"USD",
        paymentMethodToken: req.body.rt_token,
       // orderId : req.body.invoice_id,
        options: {
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
          res.send(result);
        } else {
          console.log(result);
          res.status(500);
          res.send("Error:  " + result.message);
        }
      });
});

module.exports = app;
