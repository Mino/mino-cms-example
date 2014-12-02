var logger = require('tracer').console();
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var MinoDB = require('minodb');
var MinoVal = require('minoval');
var MinoCMS = require('minocms');
var MinoSDK = require('minosdk');

var sendgrid  = require('sendgrid')("bestan", "C2sEws3FIUdEK83GBD5a");

var server = express();
server.set('port', process.env.PORT || 5002);
server.use(errorHandler());
server.use(bodyParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'bower_components')));

var db_address = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/minodb';
var mino = new MinoDB({
    api: true,
    ui: true,
    db_address: db_address
})
server.use('/mino/', mino.server())

var sdk = new MinoSDK("testuser");
logger.log(sdk);
sdk.set_local_api(mino.api);
logger.log(sdk);

var minoval = new MinoVal({user: "testuser"})
mino.add_plugin(minoval);
mino.add_plugin(new MinoCMS({
	"folder_name": "cms",
	"user": "testuser"
}));


server.post("/send_email", function(req, res) {
	var body = req.body;
	logger.log(sdk);
	minoval.validate("contact_form", body, function(validator) {
		var error = validator.end();
		if (error) {
			res.json(error)
			return;
		}

		body.contact.finished = false;
		body.contact.notes = "Sent";

		sdk.call({
	        "function": "save",
	        "parameters": {
	            "objects" : [{
	                "name": body.contact.email + "_" + body.contact.subject + "_" + new Date().getTime(),
	                "path":"/testuser/emails/",
	                "contact": body.contact
	            }]
	        }
	    }, function(error, response) {
	    	if (error) {
	    		res.json(error)
	    	} else {

	    		sendgrid.send({
	    		  to:       'bestan93@gmail.com',
	    		  from:     body.contact.email,
	    		  subject:  body.contact.subject,
	    		  text:     body.contact.message
	    		}, function(err, json) {
	    		  if (err) { return console.error(err); }
	    		  console.log(json);
	    		});
	    		
	    		res.json({success:true})
	    	}
		});
	});
})

http.createServer(server).listen(server.get('port'), function() {
    console.log('Server started on port ' + server.get('port'));
});