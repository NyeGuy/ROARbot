var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var twilio = require('twilio'),
    client = twilio('AC513e87066a1e90d73e86ea276a800804', 'f3145ed7b367bf8e00d474795036cc58'),
    cronJob = require('cron').CronJob;

//Static App use - for Website
//app.use(express.static(__dirname + '/public'));
//var port= process.env.PORT || 8000;
//app.listen(port);

var textJob = new cronJob( '55 18 * * *', function(){
  client.sendMessage( { to:'3108898908', from:'4244656385', body:'Roar!' }, function( err, data ) {});
},  null, true);

var server = app.listen(8000, function() {
  console.log('Listening on port %d', server.address().port);
});

