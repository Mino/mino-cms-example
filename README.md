MinoDB CMS example
======

Example using [MinoDB](https://github.com/MarcusLongmuir/MinoDB/) and [MinoCMS](https://github.com/bestan/minocms).

##Features
* Setting text and html values from CMS storage
* Contact form created with MinoVal that is sending an email

##Important files
* [server.js](server.js) - backend code with all endpoints (**52 lines in total**)
* [index.html](public/index.html) - frontend code with CMS values and contact form (**33 lines in total**)
* [initial_data.js](initial_data.js) - creates initial data such as types and MinoVal rule and first event. All of it can be created using Browser and MinoVal UI.
* [mino_setup.js](mino_setup.js) - sets up Mino with all its dependencies (**37 lines in total**)

##Live example
http://mino-cms-example.herokuapp.com

http://mino-cms-example.herokuapp.com/mino/

Login details:
* username: my_app
* password: my_password


##Heroku 
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/bestan/mino-cms-example)
