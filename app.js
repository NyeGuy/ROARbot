var twilio = require('twilio'),
client = twilio('AC513e87066a1e90d73e86ea276a800804', 'f3145ed7b367bf8e00d474795036cc58'),
cronJob = require('cron').CronJob;


//initialize express into a variable called app
var express = require('express'),
bodyParser = require('body-parser'),
var request = require('request'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000))

//numbers we want to send to
var numbers = ['3108898908', '3104220639'];

//fire off cron to the numbers declared
var textJob = new cronJob( '50 09 * * *', function(){
for( var i = 0; i < numbers.length; i++ ) {
  client.sendMessage( { to:numbers[i], from:'4244656385', body:'Roar!'}, function( err, data ) {
    console.log( data.body );
  });
}},  null, true);


// Listen for server - tell me where it's running
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

//adding route for /message using TwiML
app.post('/message', function (req, res) {
  var resp = new twilio.TwimlResponse();
  if( req.body.Body.trim().toLowerCase() === 'roar' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You already subscribed!');
    } else {
      resp.message('Thank you, you will now be roared at! Reply "STOP" to stop receiving updates.');
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



