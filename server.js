var logger = require('tracer').console();
var express = require('express');

var username = process.env.MINO_USERNAME || "my_app";

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
	            "path":"/" + username + "/contact_entries/",
	            "contact_entry": req.body
	        }], function(error, response) {
		    	if (error) {
		    		return res.json(error);
		    	} else {
		    		//Send email here
		    		return res.json({success:true});
		    	}
			});

		});
	}).listen(process.env.PORT || 5002);
});