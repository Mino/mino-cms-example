var MinoDB = require('minodb');
var MinoCMS = require('minocms');
var MinoVal = require('minoval');

module.exports = function(callback){
	var username = process.env.MINO_USERNAME || "my_app";

	var minoval = new MinoVal({
		user: username
	});
	var minocms = new MinoCMS({
		"folder_name": "cms",
		"user": username
	});

	var mino = new MinoDB({
	    ui: true,
	    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/mino-example'
	}, username)

	mino.create_user({
		"username": username,
		"email": "email@example.com",
		"password": process.env.MINO_PASSWORD || "my_password"
	}, function(err, res){

		mino.add_plugin(minocms, minoval, function(){
			require('./initial_data')(mino, minoval, function(){
				callback(mino,minoval);
			});
		});

	});
};