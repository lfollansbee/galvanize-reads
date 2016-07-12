var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res, next) {
  queries.listBooksWithGenres()
  .then(function(books){
  res.render('list-books', {book: books});
  });
});

router.get('/new', function(req, res, next) {
  queries.getGenres()
  .then(function(genres){
    res.render('add-book',{genre: genres});
  })
});

router.post('/new', function(req, res){
  queries.addBook(req.body)
  .then(function(){
    res.redirect('/books');
  })
})

module.exports = router;
