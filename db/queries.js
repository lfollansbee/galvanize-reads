var knex = require('./knex');

module.exports = {
  listBooks: function(){
      return knex('book').select()
    }
}
