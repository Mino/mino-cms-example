var logger = require('tracer').console();
var express = require('express');
var sendgrid  = require('sendgrid')("bestan", "C2sEws3FIUdEK83GBD5a");

var minoval = new (require('minoval'))({user: "testuser"})
var mino = new (require('minodb'))({
    ui: true,
    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/minodb_tests'
})
.add_plugin(minoval)
.add_plugin(new (require('minocms'))({
	"folder_name": "cms",
	"user": "testuser"
}))

var sdk = new (require('minosdk'))("testuser").set_local_api(mino.api);
require('./initial_setup')(sdk);

express()
.use(require('errorhandler')())
.use(require('body-parser')())
.use(express.static('./public'))
.use('/mino/', mino.server())
.post("/send_email", function(req, res) {
	minoval.validate("contact_form", req.body, function(validator) {
		var error = validator.end();
		if (error) {
			return res.json(error)
		}
		req.body.contact_form.finished = false;
		req.body.contact_form.notes = "Sent";
		sdk.save([{
            "name": req.body.contact_form.email + "_" + req.body.contact_form.subject + "_" + new Date().getTime(),
            "path":"/testuser/emails/",
            "contact_form": req.body.contact_form
        }], function(error, response) {
	    	if (error) {
	    		return res.json(error)
	    	} else {
	    		sendgrid.send({
					to: 'marcus@minocloud.com',
					from: req.body.contact_form.email,
					subject: req.body.contact_form.subject,
					text: req.body.contact_form.message
	    		}, function(err, json) {
	    		 	if (err) { 
	    		 		logger.error(err)
	    		 		return res.json(err);
					}
					res.json({success:true})
	    		});
	    	}
		});
	});
}).listen(process.env.PORT || 5002);