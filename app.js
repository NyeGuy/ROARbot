var twilio = require('twilio'),
client = twilio('ACCOUNTSID', 'AUTHTOKEN'),
cronJob = require('cron').CronJob;

var textJob = new cronJob( '0 18 * * *', function(){
  client.sendMessage( { to:'YOURPHONENUMBER', from:'YOURTWILIONUMBER', body:'Hello! Hope you’re having a good day!' }, function( err, data ) {});
},  null, true);
