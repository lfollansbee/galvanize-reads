var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res, next) {
  queries.listBooks()
  .then(function(books){
  res.render('list-books', {book: books});
  });
});


module.exports = router;
