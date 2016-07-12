var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res) {
  queries.listBooksWithGenres()
  .then(function(books){
  res.render('list-books', {book: books});
  });
});

router.get('/new', function(req, res) {
  queries.getGenres()
  .then(function(genres){
    res.render('add-book',{genre: genres});
  })
});

router.get('/:id/delete', function(req,res){
  queries.getBookById(req.params.id)
  .then(function(book){
    res.render('delete-book', {book:book[0]})
  })
})

router.post('/new', function(req, res){
  queries.addBook(req.body)
  .then(function(){
    res.redirect('/books');
  })
})

router.get('/:id/delete-book', function(req,res){
  queries.deleteBook(req.params.id)
  .then(function(){
    res.redirect('/books')
  })
})

module.exports = router;
