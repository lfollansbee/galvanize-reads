var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res) {
  queries.listAuthors()
  .then(function(authors){
    res.render('authors/list-authors', {author: authors});
  });
});

module.exports = router;
