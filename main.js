var express = require("express");
var bodyParser = require('body-parser');

var index = require('./routes/index')
var ecbt = require('./routes/ecbt');
var ec = require('./routes/ec');
var isu = require('./routes/isu');
var orderv2 = require('./routes/orderv2');
var orderv1 = require('./routes/orderv1');
var nvp = require('./routes/nvp');
var p2p = require('./routes/p2p');
var webhook = require('./routes/webhook');
var rt = require('./routes/rt');

var ec_pd = require('./routes/pd/ec');

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
app.use('/api/paypal/order/v2',orderv2);
app.use('/api/paypal/order/v1',orderv1);
app.use('/api/paypal/nvp',nvp);
app.use('/api/paypal/p2p',p2p);
app.use('/webhook',webhook);
app.use('/api/paypal/rt',rt);

app.use('/api/paypal/ec/pd', ec_pd);

var port = process.env.PORT || '8080';
app.listen(port, function(){
	console.log('server started at port '+ port);
});

