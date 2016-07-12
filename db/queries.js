var knex = require('./knex');

module.exports = {
  listBooksWithGenres: function(){
    return knex('book').select().join('genre', 'genre.id', 'genre_id').returning('genre.name')
  },
  getGenres: function(){
    return knex('genre').select()
  }
}
