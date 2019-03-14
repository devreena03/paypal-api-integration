var express = require('express');
var request = require('request');

var router = express.Router();

router.post("/", function(req,res,next){
    console.log("IPN received");
    res.sendStatus(200);


    var body = 'cmd=_notify-validate' + constructNameValuePair(req.body);
    console.log(body);
    var options = {
        uri: 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr',
        method: 'POST',
        headers: {
         'user-agent': 'Javascript-IPN-Verification-Script'},    
        body: body        
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("body...:", body);
            if (body.substring(0, 8) === 'VERIFIED') {
                console.log('Verified IPN!');
            } else if (body.substring(0, 7) === 'INVALID') {
                console.log('Invalid IPN!');
            } else {
                console.log('Unexpected response body!');
                console.log(body);
            }
        }else{
            console.log('Unexpected response!');
            console.log(response);
        }
    });
  });
  
function constructNameValuePair(jsonBody){
    var stringBody='';
    for (var name in jsonBody) {
        stringBody += "&" + name + "=" + jsonBody[name]; 
    }
 return stringBody;
}
  module.exports = router;

