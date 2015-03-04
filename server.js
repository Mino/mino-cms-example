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

		minoval.validate("contact_form", req.body, function(err, validator) {
			var error = validator.end();
			if (error) {
				return res.json(error)
			}

			req.body.finished = false;
			req.body.notes = "Sent";
			
			mino.save([{
	            "name": req.body.email + "_" + req.body.subject + "_" + new Date().getTime(),
	            "path":"/my_app/emails/",
	            "contact_form": req.body
	        }], function(error, response) {

		    	if (error) {
		    		return res.json(error)
		    	} else {

		    		sendgrid.send({
						to: 'bestan93@gmail.com',
						from: req.body.email,
						subject: req.body.subject,
						text: req.body.message
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