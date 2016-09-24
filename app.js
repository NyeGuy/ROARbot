//Server set up and parsing
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    res.send('This is the page for RoarBot.')
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});

// use twilio, connect with user keys and use cron
//var twilio = require('twilio'),
   // client = twilio('AC513e87066a1e90d73e86ea276a800804', //'f3145ed7b367bf8e00d474795036cc58'),
   // cronJob = require('cron').CronJob;

// cron - fire off at 7:15
//var textJob = new cronJob( '09 19 * * *', function(){
 // client.sendMessage( { to:'3108898908', from:'4244656385', body:'Roar!' }, //function( err, data ) {});
//},  null, true);

