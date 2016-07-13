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

router.get('/new', function(req, res) {
    res.render('authors/add-author');
});

router.post('/new', function(req, res){
  queries.addAuthor(req.body)
  .then(function(){
    res.redirect('/authors');
  })
})

// router.get('/:id', function(req,res){
//   queries.getBookById(req.params.id)
//   .then(function(book){
//     res.render('books/read-book', {book:book[0]})
//   })
// })

router.get('/:id/edit', function(req, res) {
  queries.getAuthorById(req.params.id)
  .then(function(author){
    res.render('authors/edit-author', {author:author[0]})
  })
});

router.post('/:id/edit', function(req, res){
  queries.editAuthor(req.body, req.params.id)
  .then(function(){
    res.redirect('/authors');
  })
})

router.get('/:id/delete', function(req,res){
  queries.getAuthorById(req.params.id)
  .then(function(author){
    res.render('authors/delete-author', {
      author:author[0]
    })
  })
})

router.get('/:id/delete-author', function(req,res){
  queries.deleteAuthor(req.params.id)
  .then(function(){
    res.redirect('/authors')
  })
})

module.exports = router;
