var logger = require('tracer').console();
var express = require('express');
var sendgrid  = require('sendgrid')("bestan", "C2sEws3FIUdEK83GBD5a");

require('./mino_setup')(function(mino,minoval){
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
			
			mino.save([{
	            "name": req.body.contact_form.email + "_" + req.body.contact_form.subject + "_" + new Date().getTime(),
	            "path":"/my_app/emails/",
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
});