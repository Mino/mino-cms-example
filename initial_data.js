var logger = require('tracer').console();

module.exports = function(mino, minoval, done){

	mino.save_type({
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

			mino.save([{
				"name": "emails",
				"folder": true,
				"path": "/my_app/"
			},{
				"name": "cms",
				"folder": true,
				"path": "/my_app/"
			}], function(err, res){
				logger.log(JSON.stringify(err,null,4), res);

				mino.save([{
					"name": "homepage",
					"path": "/my_app/cms/",
					"cms": {
						"headline": "THIS IS INITIAL HEADLINE",
						"body": "THIS IS INITIAL BODY",
						"some_html": "<img width=\"50\" height=\"50\" src=\"http://www.w3devcampus.com/wp-content/uploads/logoAndOther/logo_JavaScript.png\" /><div>This is <b>HTML</b></div>"
					}
				}], function(err, res){
					logger.log(JSON.stringify(err,null,4), res);

					if(done) done();
				});
			});
		});
	});
}