var logger = require('tracer').console();

module.exports = function(sdk){
	sdk.save_type({
		"name":"contact_form",
		"display_name":"Contact Form",
		"type":"object",
		"fields":[
			{
				"name":"body",
				"display_name":"Body",
				"type":"text"
			},{
				"name":"email",
				"display_name":"Email",
				"type":"email"
			},{
				"name":"subject",
				"display_name":"Subject",
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
		logger.log(err, res);
	});

	sdk.save([{
		"name": "emails",
		"folder": true,
		"path": "/testuser/"
	},{
		"name": "cms",
		"folder": true,
		"path": "/testuser/"
	}], function(err, res){
		logger.log(err, res);

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
			logger.log(err, res);
		});
	})
}