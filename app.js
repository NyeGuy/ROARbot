var twilio = require('twilio'),
    client = twilio('AC513e87066a1e90d73e86ea276a800804', 'f3145ed7b367bf8e00d474795036cc58'),
    cronJob = require('cron').CronJob;

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

//firebase
var Firebase = require('firebase'),
    usersRef = new Firebase('https://gamebotdb.firebaseio.com/Users/');

//numbers we want to send - will be stored in firebase
var numbers = [];

//adding new users to firebase
usersRef.on('child_added', function(snapshot) {
  numbers.push( snapshot.val() );
  console.log( 'Added number ' + snapshot.val() );
});

//fire off cron to the numbers declared
var textJob = new cronJob( '50 09 * * *', function(){
for( var i = 0; i < numbers.length; i++ ) {
  client.sendMessage( { to:numbers[i], from:'4244656385', body:'Roar!'}, function( err, data ) {
    console.log( data.body );
  });
}},  null, true);


//adding route for /message using TwiML
app.post('/message', function (req, res) {
  var resp = new twilio.TwimlResponse();
  if( req.body.Body.trim().toLowerCase() === 'roar' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You already subscribed!');
    } else {
      resp.message('Thank you, you will now be ROARed at! Reply "STOP" to stop receiving updates.');
      usersRef.push(fromNum);
    }
  } else {
    resp.message('Welcome to ROARbot. Text "ROAR" to begin.');
  }
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})



