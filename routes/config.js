var https = require("https");

var sanboxUrl = 'api.sandbox.paypal.com';
var clientId = "AcuuDiWgApKeQx7oY6wuGh2kbAIzy8B1NrruTzVl_vn3Dqv7a-EYGKlHRMb70fjc3eX3EP5rlM3VUp8g"; //india-business
var secret = "ELxGTdUhk3gGuO7nFv1sDF5waqAsUcKDoA0djtfIYgGVIXEjealGQvq93-vdWsc8rvHnNVOfeNdvngWE";
var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;

// router.get('/access-token', function(req, res){ 
//     var promise = initialize();
//     promise.then(function(access_token){
//         res.send("access_token: "+ access_token);
//     });
// });

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
                var access_token = JSON.parse(body).access_token; 
                console.log(access_token);
                resolve(access_token);
            });
        });
        http_request.write("grant_type=client_credentials&response_type=token&return_authn_schemes=true");
        http_request.end();
    });
};

module.exports = initialize;