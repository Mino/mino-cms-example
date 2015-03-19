MinoDB CMS example
======

Example using [MinoDB](https://github.com/MarcusLongmuir/MinoDB/), [MinoVal](https://github.com/MarcusLongmuir/MinoVal/) and [MinoCMS](https://github.com/bestan/minocms).

##Features
* Setting text and html values from CMS storage
* Contact form created with MinoVal

##Live example
http://mino-cms-example.herokuapp.com

Login details:
* username: my_app
* password: my_password

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/Mino/mino-cms-example)

##Installation
```
npm install
node server.js
```
You also need [MongoDB](http://www.mongodb.org/) running on ```mongodb://127.0.0.1:27017/mino-example``` (URL can be changed in [mino_setup.js](mino_setup.js)).

##Things to try
* Go to the [homepage](http://mino-cms-example.herokuapp.com), fill in the contact form and submit it. At this point you would normally send an email, but for the sake of the example we're just storing the entry in ```emails``` folder.
* Log in to the [Browser](http://mino-cms-example.herokuapp.com/mino/browser/) using credentials above.
* Navigate to the ```emails``` folder and check one of the items that you've just submitted.
* Navigate to the ```cms``` folder and edit the ```homepage``` item. Refresh the homepage to see changes immediately.

##Code to read
* [server.js](server.js) - backend code with all endpoints (**38 lines in total**)
* [index.html](public/index.html) - frontend code with CMS values and contact form (**33 lines in total**)
* [initial_data.js](initial_data.js) - creates initial data such as types and MinoVal rule. All of it can be created using Browser and MinoVal UI.
* [mino_setup.js](mino_setup.js) - sets up Mino with all its dependencies (**34 lines in total**)
