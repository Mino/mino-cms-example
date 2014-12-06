var logger = require('tracer').console();
var MinoDB = require('minodb');
var MinoCMS = require('minocms');
var MinoVal = require('minoval');

module.exports = function(callback){

	var minoval = new MinoVal({
		user: "my_app"
	});
	var minocms = new MinoCMS({
		"folder_name": "cms",
		"user": "my_app"
	});

	var mino = new MinoDB({
	    ui: true,
	    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/mino-example'
	}, "my_app")

	mino.create_user({
		"username": "my_app",
		"email": "marcus+test@minocloud.com",
		"password": "my_password"
	}, function(err, res){

		logger.log("CREATED USER");

		mino.add_plugin(minocms, minoval, function(){
			logger.log("FINISHED PLUGINS");
			require('./initial_data')(mino, minoval, function(){
				callback(mino,minoval);
			});
		});

	});
};