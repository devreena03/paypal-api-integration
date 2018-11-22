var express = require("express");
var bodyParser = require('body-parser');

var index = require('./routes/index')
var ecbt = require('./routes/ecbt');
var ec = require('./routes/ec');
var isu = require('./routes/isu');
var order = require('./routes/orderv2');
var p2p = require('./routes/p2p');

var app = express();

global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

app.use(express.static(__dirname+'/public'));

app.use('/', index);
app.use('/api/paypal/ecbt', ecbt);
app.use('/api/paypal/ec', ec);
app.use('/api/paypal/isu', isu);
app.use('/api/paypal/order/v2',order);
app.use('/api/paypal/p2p',p2p);

var port = process.env.PORT || '8080';
app.listen(port, function(){
	console.log('server started at port '+ port);
});

