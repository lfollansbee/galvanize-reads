#Galvanize Reads

Galvanize Reads is a book catalog service that stores a list of recommended technology books.

##Installation

* Set up a postgres database
* Create a `.env` file.  Refer to env.example file to include your database url.
* `npm install -g knex`
* `npm install`
* `knex migrate:latest`
* `knex seed:run`
* `npm start`


heroku: https://shrouded-basin-77728.herokuapp.com/
