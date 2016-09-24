var twilio = require('twilio'),
    client = twilio('AC513e87066a1e90d73e86ea276a800804', 'f3145ed7b367bf8e00d474795036cc58'),
    cronJob = require('cron').CronJob;
 
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
var Firebase = require('firebase'),
    usersRef = new Firebase('https://gamebotdb.firebaseio.com/Users/');
 
var numbers = ['3108898908'];
 
usersRef.on('child_added', function(snapshot) {
  numbers.push( snapshot.val() );
  console.log( 'Added number ' + snapshot.val() );
});
 
var textJob = new cronJob( '10 20 * * *', function(){
  for( var i = 0; i < numbers.length; i++ ) {
    client.sendMessage( { to:numbers[i], from:'4244656385', body:'Roar!'}, function( err, data ) {
      console.log( data.body );
    });
  }
},  null, true);
 
app.post('/message', function (req, res) {
  var resp = new twilio.TwimlResponse();
  if( req.body.Body.trim().toLowerCase() === 'subscribe' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You already subscribed!');
    } else {
      resp.message('Thank you, you are now subscribed. Reply "STOP" to stop receiving updates.');
      usersRef.push(fromNum);
    }
  } else {
    resp.message('Welcome to Daily Updates. Text "Subscribe" receive updates.');
  }
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});
 
var server = app.listen(8000, function() {
  console.log('Listening on port %d', server.address().port);
});


