var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

router.get('/', function(req, res) {
  queries.Authors.listAuthorsWithBooks()
    .then(function (data) {
      return Promise.all(data);
    })
    .then(function(authors) {
      res.render('authors/list-authors', {author: authors});
    });
});


router.get('/new', function(req, res) {
    res.render('authors/add-author');
});

router.post('/new', function(req, res){
  queries.Authors.addAuthor(req.body)
  .then(function(){
    res.redirect('/authors');
  })
})


router.get('/:id', function(req, res, next) {
  Promise.all([
    queries.Authors.getAuthorById(req.params.id),
    queries.Authors.getBooksByAuthorId(req.params.id)
  ]).
  then(function(data) {
    res.render('authors/read-author', {author: data[0], books: data[1]});
  });
});


router.get('/:id/edit', function(req, res) {
  queries.Authors.getAuthorById(req.params.id)
  .then(function(author){
    res.render('authors/edit-author', {author:author})
  })
});

router.post('/:id/edit', function(req, res){
  queries.Authors.editAuthor(req.body, req.params.id)
  .then(function(){
    res.redirect('/authors');
  })
})


router.get('/:id/delete', function(req, res) {
  Promise.all([
    queries.Authors.getAuthorById(req.params.id),
    queries.Authors.getBooksByAuthorId(req.params.id)
  ]).
  then(function(data) {
    res.render('authors/delete-author', {author: data[0], books: data[1]});
  });
});

router.get('/:id/delete-author', function(req,res){
  queries.Authors.deleteAuthor(req.params.id)
  .then(function(){
    res.redirect('/authors')
  })
})

module.exports = router;
