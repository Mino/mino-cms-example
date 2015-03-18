var logger = require('tracer').console();

module.exports = function(mino, minoval, done){
	var username = process.env.MINO_USERNAME || "my_app";
	mino.save_type({
		"name":"contact_entry",
		"display_name":"Contact Entry",
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

		minoval.save_rule({
			"name": "contact_form",
			"mino_type" : {
			    "name" : "contact_form",
			    "display_name" : "Contact form",
			    "type" : "object",
			    "fields" : [ 
			        {
			            "name" : "email",
			            "display_name" : "Email",
			            "type" : "mino_field",
			            "mino_field" : "contact_entry.email"
			        }, 
			        {
			            "name" : "subject",
			            "display_name" : "Subject",
			            "type" : "mino_field",
			            "mino_field" : "contact_entry.subject"
			        }, 
			        {
			            "name" : "message",
			            "display_name" : "Message",
			            "type" : "mino_field",
			            "mino_field" : "contact_entry.message"
			        }
			    ]
			}
		}, function(err, res){
			logger.log(JSON.stringify(err,null,4), res);

			mino.save([{
				"name": "contact_entries",
				"folder": true,
				"path": "/" + username + "/"
			},{
				"name": "cms",
				"folder": true,
				"path": "/" + username + "/"
			}], function(err, res){
				logger.log(JSON.stringify(err,null,4), res);

				mino.save([{
					"name": "homepage",
					"path": "/" + username + "/cms/",
					"cms_content": {
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