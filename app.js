//Server set up and parsing
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// use twilio, connect with user keys and use cron
var twilio = require('twilio'),
    client = twilio('AC513e87066a1e90d73e86ea276a800804', 'f3145ed7b367bf8e00d474795036cc58'),
    cronJob = require('cron').CronJob;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

// Index route
app.get('/', function (req, res) {
    res.send('This is the page for RoarBot.')
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port',app.get('port'))
});

//adding route for /message using TwiML
//app.post('/message', function (req, res) {
//  var resp = new twilio.TwimlResponse();
//  if( req.body.Body.trim().toLowerCase() === 'roar' ) {
//    var fromNum = req.body.From;
//    if(numbers.indexOf(fromNum) !== -1) {
//      resp.message('You already subscribed!');
//    } else {
//      resp.message('Thank you, you will now be ROARed at! Reply "STOP" to stop //receiving updates.');
  //    usersRef.push(fromNum);
//    }
//  } else {
//    resp.message('Welcome to ROARbot. Text "ROAR" to begin.');
//  }
//  res.writeHead(200, {
//    'Content-Type':'text/xml'
//  });
//  res.end(resp.toString());
//});


// cron - fire off at 7:15
var textJob = new cronJob('35 19 * * *', function(){
    client.sendMessage({to:'3108898908',from:'4244656385',body:'Roar!'}, function(err, data ) {});
},  null, true);

