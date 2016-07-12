var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex.js')
var queries = require('../db/queries.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
