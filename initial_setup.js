var logger = require('tracer').console();

module.exports = function(sdk, minoval, done){

	sdk.save_type({
		"name":"contact_form",
		"display_name":"Contact Form",
		"type":"object",
		"fields":[
			{
				"name":"email",
				"display_name":"Email",
				"type":"email"
			},{
				"name":"subject",
				"display_name":"Subject",
				"type":"text"
			},{
				"name":"message",
				"display_name":"Message",
				"type":"text"
			},{
				"name":"notes",
				"display_name":"Notes",
				"type":"text"
			},{
				"name":"finished",
				"display_name":"Finished",
				"type":"boolean"
			}
		]
	}, function(err, res){
		logger.log(JSON.stringify(err,null,4), res);

		minoval.save_endpoint("contact_form", {
			"contact_form" :{
				"email": true,
				"subject": true,
				"message": true,
				"notes": false,
				"finished": false
			}
		}, function(err, res){
			logger.log(JSON.stringify(err,null,4), res);

			sdk.save([{
				"name": "emails",
				"folder": true,
				"path": "/testuser/"
			},{
				"name": "cms",
				"folder": true,
				"path": "/testuser/"
			}], function(err, res){
				logger.log(JSON.stringify(err,null,4), res);

				sdk.save([{
					"name": "homepage",
					"path": "/testuser/cms/",
					"mino_user": {
						"username": "THIS IS INITIAL",
						"email": "t@t.com",
						"salted_password": "SALTEDPASSWORDFTW",
						"password_salt": "PASSWORDSALTFTW"
					}
				}], function(err, res){
					logger.log(JSON.stringify(err,null,4), res);

					if(done) done();
				});
			});
		});
	});
}