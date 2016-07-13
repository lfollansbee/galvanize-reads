var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res) {
  queries.Books.listBooksWithAuthors()
    .then(function (data) {
      return Promise.all(data);
    })
    .then(function(books) {
      res.render('books/list-books', {book: books});
    });
});

//CREATE
router.get('/new', function(req, res) {
  queries.Books.getGenres()
  .then(function(genres){
    res.render('books/add-book',{genre: genres});
  })
});

router.post('/new', function(req, res){
  queries.Books.addBook(req.body)
  .then(function(){
    res.redirect('/books');
  })
})

//READ
router.get('/:id', function(req, res, next) {
  Promise.all([
    queries.Books.getBookById(req.params.id),
    queries.Books.getAuthorsByBookId(req.params.id)
  ]).
  then(function(data) {
    // console.log('BOOK DATA:', data[0], 'AUTHOR DATA:',data[1]);
    res.render('books/read-book', {book: data[0], authors: data[1]});
  });
});

//UPDATE
router.get('/:id/edit', function(req, res) {
  queries.Books.getBookById(req.params.id)
  .then(function(book){
    res.render('books/edit-book', {book:book[0]})
  })
});

router.post('/:id/edit', function(req, res){
  queries.Books.editBook(req.body, req.params.id)
  .then(function(){
    res.redirect('/books');
  })
})

//DELETE
router.get('/:id/delete', function(req,res){
  Promise.all([
    queries.Books.getBookById(req.params.id),
    queries.Books.getAuthorsByBookId(req.params.id)
  ]).
  then(function(data) {
    res.render('books/delete-book', {book: data[0], authors: data[1]});
  });
});

router.get('/:id/delete-book', function(req,res){
  queries.Books.deleteBook(req.params.id)
  .then(function(){
    res.redirect('/books')
  })
})

module.exports = router;
