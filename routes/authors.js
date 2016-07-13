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

module.exports = router;
