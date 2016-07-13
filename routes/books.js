var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res) {
  queries.listBooksWithGenres()
  .then(function(books){
  res.render('books/list-books', {book: books});
  });
});

router.get('/new', function(req, res) {
  queries.getGenres()
  .then(function(genres){
    res.render('books/add-book',{genre: genres});
  })
});

router.post('/new', function(req, res){
  queries.addBook(req.body)
  .then(function(){
    res.redirect('/books');
  })
})

router.get('/:id', function(req,res){
  queries.getBookById(req.params.id)
  .then(function(book){
    res.render('books/read-book', {book:book[0]})
  })
})

router.get('/:id/edit', function(req, res) {
  queries.getBookById(req.params.id)
  .then(function(book){
    res.render('books/edit-book', {book:book[0]})
  })
});

router.post('/:id/edit', function(req, res){
  queries.editBook(req.body, req.params.id)
  .then(function(){
    res.redirect('/books');
  })
})

router.get('/:id/delete', function(req,res){
  queries.getBookById(req.params.id)
  .then(function(book){
    res.render('books/delete-book', {book:book[0]})
  })
})

router.get('/:id/delete-book', function(req,res){
  queries.deleteBook(req.params.id)
  .then(function(){
    res.redirect('/books')
  })
})

module.exports = router;
